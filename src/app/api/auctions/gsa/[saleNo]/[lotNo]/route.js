import { NextResponse } from 'next/server';

// Force dynamic rendering for this route - disable caching for large responses
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// New PPMS API configuration
const PPMS_API_BASE = 'https://www.ppms.gov/gw/auction/ppms/api/v1/auctions';
const PPMS_SEARCH_API = 'https://www.ppms.gov/gw/auction/ppms/api/v1/auctions/search';

// FastAPI backend URL for database updates
const FASTAPI_URL = process.env.FASTAPI_URL || process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export async function GET(request, { params }) {
  try {
    const { saleNo, lotNo } = params;
    
    if (!saleNo || !lotNo) {
      return NextResponse.json(
        { error: 'Sale number and lot number are required' },
        { status: 400 }
      );
    }

    // Convert hyphenated format to PPMS format
    // Old GSA API: "4-1-QSC-I-26-100" -> PPMS: "41QSCI26100"
    // Old GSA API: "4-1-QSC-I-26-100-001" -> PPMS: "1"
    const cleanSaleNo = saleNo.replace(/-/g, ''); // Remove all hyphens
    const cleanLotNo = lotNo.split('-').pop(); // Get the last part after splitting by hyphen
    
    console.log(`Converting: ${saleNo} -> ${cleanSaleNo}, ${lotNo} -> ${cleanLotNo}`);

    // Search for the auction using sales number to get auction ID
    console.log(`Searching for auction with sales number ${cleanSaleNo} and lot ${cleanLotNo}`);
    
    const searchUrl = new URL(PPMS_SEARCH_API);
    searchUrl.searchParams.append('salesNumber', cleanSaleNo);
    searchUrl.searchParams.append('lotNumber', cleanLotNo);
    
    const searchResponse = await fetch(searchUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MoneyMeta-AuctionExplorer/1.0',
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    });
    
    if (!searchResponse.ok) {
      console.error(`PPMS search failed: ${searchResponse.status}`);
      return NextResponse.json(
        { error: 'Unable to find auction in PPMS system' },
        { status: 404 }
      );
    }
    
    const searchData = await searchResponse.json();
    let auctionId = null;
    
    // Extract auction ID from search results
    if (searchData && Array.isArray(searchData) && searchData.length > 0) {
      // Find the matching lot
      const matchingLot = searchData.find(lot => 
        lot.salesNumber === cleanSaleNo && lot.lotNumber?.toString() === cleanLotNo.toString()
      );
      auctionId = matchingLot?.auctionId;
    } else if (searchData?.auctionId) {
      auctionId = searchData.auctionId;
    }

    if (!auctionId) {
      console.error('Search data:', searchData);
      return NextResponse.json(
        { error: 'Auction ID not found. This auction may not be available in the PPMS system.' },
        { status: 404 }
      );
    }

    console.log(`Found auction ID: ${auctionId} for ${cleanSaleNo}-${cleanLotNo}`);

    // Build PPMS API URL for specific auction
    const apiUrl = `${PPMS_API_BASE}/getAuction/${auctionId}`;

    console.log(`Fetching latest data for auction ${auctionId} (${saleNo}-${lotNo})`);

    // Fetch from PPMS API with timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'MoneyMeta-AuctionExplorer/1.0',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal,
        cache: 'no-store'
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`PPMS API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Parse PPMS API response format
      if (!data || !data.lotId) {
        return NextResponse.json(
          { error: 'Item not found' },
          { status: 404 }
        );
      }
      
      // Build location string
      const location = data.location 
        ? `${data.location.city || ''}, ${data.location.state || ''}`.replace(/^,\s*|,\s*$/g, '')
        : '';
      
      const item = {
        id: `${saleNo}-${lotNo}`,
        saleNo: data.salesNumber || saleNo,
        lotNo: data.lotNumber?.toString() || lotNo,
        auctionId: data.auctionId,
        currentBid: data.currentBid || 0,
        bidCount: data.numberOfBidders || 0,
        auctionStatus: data.status,
        auctionEndDate: data.endDate,
        auctionStartDate: data.startDate,
        title: data.lotName,
        description: data.lotDescription,
        imageUrl: data.uri ? `https://www.ppms.gov/gw/auction/ppms/${data.uri}` : null,
        location: location,
        agency: data.sellingAgency,
        minBid: data.minBid,
        bidIncrement: data.bidIncrement,
        reserveAmount: data.reserveAmount,
        reservePricePresent: data.reservePricePresent,
        isReserveNotMet: data.isReserveNotMet,
        propertyAddress: data.location?.addressLine1 || '',
        propertyZip: data.location?.zipCode || '',
        url: `https://www.gsaauctions.gov/gsaauctions/aucdsclnk?sl=${saleNo}`,
        lastUpdated: new Date().toISOString()
      };
      
      // Update database with latest bid amount if it has changed
      if (data.currentBid) {
        try {
          const updateUrl = `${FASTAPI_URL}/api/auctions/update-bid`;
          await fetch(updateUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sale_number: saleNo,
              lot_number: lotNo,
              current_bid: data.currentBid,
              bid_count: data.numberOfBidders || 0,
              status: data.status
            })
          });
          console.log(`Updated database with latest bid: $${data.currentBid} for ${saleNo}-${lotNo}`);
        } catch (updateError) {
          console.error('Failed to update database:', updateError);
          // Continue even if database update fails
        }
      }
      
      console.log(`Successfully fetched latest data for ${saleNo}-${lotNo}, current bid: $${item.currentBid}`);
      
      return NextResponse.json({
        item,
        metadata: {
          source: 'ppms-api-live',
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