import { NextResponse } from 'next/server';

// Official GSA Auctions API configuration
const GSA_API_BASE = process.env.GSA_API_BASE_URL || 'https://api.gsa.gov/assets/gsaauctions/v2';
const GSA_API_KEY = process.env.GSA_API_KEY || 'rXyfDnTjMh3d0Zu56fNcMbHb5dgFBQrmzfTjZqq3';

export async function GET(request, { params }) {
  try {
    const { saleNo, lotNo } = params;
    
    if (!saleNo || !lotNo) {
      return NextResponse.json(
        { error: 'Sale number and lot number are required' },
        { status: 400 }
      );
    }

    // Build GSA API URL for specific item
    const apiUrl = new URL(`${GSA_API_BASE}/auctions`);
    apiUrl.searchParams.append('api_key', GSA_API_KEY);
    apiUrl.searchParams.append('format', 'JSON');
    apiUrl.searchParams.append('q', `saleNo:${saleNo} AND lotNo:${lotNo}`);

    console.log(`Fetching latest data for item ${saleNo}-${lotNo}`);

    // Fetch from GSA API with timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      const response = await fetch(apiUrl.toString(), {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'MoneyMeta-AuctionExplorer/1.0 (+https://moneymeta.com)',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`GSA API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      let item = null;
      if (data && data.Results && Array.isArray(data.Results) && data.Results.length > 0) {
        // Find the exact item
        const foundItem = data.Results.find(result => 
          result.saleNo === saleNo && result.lotNo === lotNo
        );
        
        if (foundItem) {
          item = {
            id: `${foundItem.saleNo}-${foundItem.lotNo}`,
            saleNo: foundItem.saleNo,
            lotNo: foundItem.lotNo,
            currentBid: foundItem.highBidAmount,
            bidCount: foundItem.biddersCount || 0,
            auctionStatus: foundItem.auctionStatus,
            auctionEndDate: foundItem.aucEndDt,
            auctionStartDate: foundItem.aucStartDt,
            title: foundItem.itemName,
            description: foundItem.lotInfo,
            imageUrl: foundItem.imageURL,
            location: `${foundItem.propertyCity || ''}, ${foundItem.propertyState || ''}`.replace(/^,\\s*|,\\s*$/g, ''),
            agency: foundItem.agencyName || foundItem.bureauName,
            contractOfficer: foundItem.contractOfficer,
            coEmail: foundItem.coEmail,
            coPhone: foundItem.coPhone,
            instructions: foundItem.instruction,
            propertyAddress: `${foundItem.propertyAddr1 || ''} ${foundItem.propertyAddr2 || ''} ${foundItem.propertyAddr3 || ''}`.trim(),
            propertyZip: foundItem.propertyZip,
            url: foundItem.itemDescURL,
            lastUpdated: new Date().toISOString()
          };
        }
      }
      
      if (!item) {
        return NextResponse.json(
          { error: 'Item not found' },
          { status: 404 }
        );
      }
      
      console.log(`Successfully fetched latest data for ${saleNo}-${lotNo}, current bid: $${item.currentBid}`);
      
      return NextResponse.json({
        item,
        metadata: {
          source: 'gsa-api-live',
          timestamp: new Date().toISOString(),
          saleNo,
          lotNo
        }
      });
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('GSA API timeout for item lookup');
        throw new Error('Request timed out while fetching latest bid data');
      }
      
      throw fetchError;
    }
    
  } catch (error) {
    console.error(`Error fetching item ${params?.saleNo}-${params?.lotNo}:`, error);
    
    return NextResponse.json({
      error: 'Failed to fetch latest item data',
      message: error.message
    }, { 
      status: 500 
    });
  }
}