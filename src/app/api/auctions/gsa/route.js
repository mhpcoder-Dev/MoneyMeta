import { NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Official GSA Auctions API configuration
const GSA_API_BASE = process.env.GSA_API_BASE_URL || 'https://api.gsa.gov/assets/gsaauctions/v2';
const GSA_API_KEY = process.env.GSA_API_KEY || 'rXyfDnTjMh3d0Zu56fNcMbHb5dgFBQrmzfTjZqq3';

// Asset type classification helper
function classifyAssetType(item) {
  const itemName = item.itemName?.toLowerCase() || '';
  const lotInfo = item.lotInfo?.toLowerCase() || '';
  
  const text = `${itemName} ${lotInfo}`;
  
  // Real estate and land
  if (/\b(real estate|land|building|property|warehouse|office|facility|acre|commercial|residential)\b/.test(text)) {
    return 'real-estate';
  }
  
  // Vehicles
  if (/\b(vehicle|car|truck|van|suv|sedan|pickup|automobile|auto)\b/.test(text)) {
    return 'cars';
  }
  
  if (/\b(trailer|semi|tractor|flatbed)\b/.test(text)) {
    return 'trailers';
  }
  
  if (/\b(motorcycle|bike|scooter|harley|honda|yamaha)\b/.test(text)) {
    return 'motorcycles';
  }
  
  // Electronics
  if (/\b(computer|laptop|tablet|phone|electronic|equipment|server|monitor)\b/.test(text)) {
    return 'electronics';
  }
  
  // Industrial
  if (/\b(industrial|machinery|equipment|tool|generator|compressor|forklift)\b/.test(text)) {
    return 'industrial';
  }
  
  // Furniture
  if (/\b(furniture|desk|chair|table|cabinet|office furniture)\b/.test(text)) {
    return 'furniture';
  }
  
  // Collectibles
  if (/\b(coin|stamp|art|collectible|antique|vintage)\b/.test(text)) {
    return 'collectibles';
  }
  
  return 'other';
}

// Transform GSA API data to our format
function transformGSAItem(item) {
  const location = `${item.propertyCity || ''}, ${item.propertyState || ''}`.replace(/^,\s*|,\s*$/g, '') || 'Location TBD';
  const saleLocation = `${item.locationCity || ''}, ${item.locationST || ''}`.replace(/^,\s*|,\s*$/g, '') || location;
  
  return {
    id: `${item.saleNo}-${item.lotNo}` || Math.random().toString(),
    title: item.itemName || 'Government Auction Item',
    description: item.lotInfo || '',
    location: location,
    saleLocation: saleLocation,
    startingBid: item.reserve || null,
    currentBid: item.highBidAmount || null,
    imageUrl: item.imageURL || null,
    images: item.imageURL ? [item.imageURL] : [],
    url: item.itemDescURL || `https://www.gsaauctions.gov/gsaauctions/aucitsrh/?sl=${item.saleNo}`,
    auctionStartDate: item.aucStartDt || null,
    auctionEndDate: item.aucEndDt || null,
    inspectionDate: null,
    inspectionUrl: null,
    category: item.lotInfo || 'General',
    agency: item.agencyName || item.bureauName || 'GSA',
    assetType: classifyAssetType(item),
    source: 'gsa',
    isActive: item.auctionStatus === 'Active',
    isFuture: item.auctionStatus === 'Scheduled' || item.auctionStatus === ' ',
    isPreview: item.auctionStatus === 'Preview',
    bidCount: item.biddersCount || 0,
    watchCount: 0,
    saleNo: item.saleNo,
    lotNo: item.lotNo,
    contractOfficer: item.contractOfficer,
    coEmail: item.coEmail,
    coPhone: item.coPhone,
    auctionIncrement: item.aucIncrement,
    inactivityTime: item.inactivityTime,
    agencyCode: item.agencyCode,
    bureauCode: item.bureauCode,
    propertyAddress: `${item.propertyAddr1 || ''} ${item.propertyAddr2 || ''} ${item.propertyAddr3 || ''}`.trim(),
    propertyZip: item.propertyZip,
    instructions: item.instruction
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all'; // 'active', 'preview', 'scheduled', 'all'
    
    // Initialize items array
    let items = [];
    
    // Build GSA API URL - remove any limits to get all data
    const apiUrl = new URL(`${GSA_API_BASE}/auctions`);
    apiUrl.searchParams.append('api_key', GSA_API_KEY);
    apiUrl.searchParams.append('format', 'JSON');
    // Remove any default limits to get all available data
    
    console.log('Fetching ALL data from GSA API:', apiUrl.toString().replace(GSA_API_KEY, '[API_KEY_HIDDEN]'));
    
    // Fetch from GSA API with improved timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
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
      console.log('GSA API response received, processing data...');
      console.log('Data structure:', Object.keys(data || {}));
      console.log('Data sample:', data ? (Array.isArray(data) ? `Array with ${data.length} items` : typeof data) : 'null');
      
      // Transform the data to our format
      if (data && data.Results && Array.isArray(data.Results)) {
        items = data.Results.map(transformGSAItem);
      } else if (data && Array.isArray(data)) {
        items = data.map(transformGSAItem);
      } else if (data && data.auctions && Array.isArray(data.auctions)) {
        items = data.auctions.map(transformGSAItem);
      } else if (data && data.results && Array.isArray(data.results)) {
        items = data.results.map(transformGSAItem);
      } else {
        console.log('Unexpected data structure:', data ? Object.keys(data) : 'null data');
        items = [];
      }
      
      console.log(`Processed ${items.length} items from GSA API`);
      
      // Filter by status if specified
      if (status !== 'all') {
        items = items.filter(item => {
          switch (status) {
            case 'active': return item.isActive;
            case 'preview': return item.isPreview;
            case 'scheduled': return item.isFuture;
            default: return true;
          }
        });
      }
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('GSA API timeout after 30 seconds');
        throw new Error('GSA API request timed out');
      }
      
      console.error('GSA API fetch error:', fetchError.message);
      throw fetchError;
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.agency.toLowerCase().includes(searchLower)
      );
    }
    
    console.log(`Returning ALL ${items.length} items from GSA API`);
    
    return NextResponse.json({
      items: items, // Return ALL items without pagination
      pagination: {
        page: 1,
        limit: items.length,
        total: items.length,
        totalPages: 1
      },
      metadata: {
        source: 'gsa-api',
        timestamp: new Date().toISOString(),
        query: {
          search,
          status,
          totalItems: items.length
        },
        apiStatus: 'connected'
      }
    });
    
  } catch (error) {
    console.error('GSA API Error:', error);
    
    // Enhanced fallback mock data
    const mockItems = Array.from({ length: 15 }, (_, i) => ({
      id: `gsa-mock-${i + 1}`,
      title: [
        'Government Office Furniture Lot - Desks & Chairs',
        'Fleet Vehicle - 2018 Ford Explorer',
        'Industrial Equipment - Generator Set',
        'Computer Equipment - Desktop Workstations',
        'Military Surplus - Field Equipment',
        'Office Building - Downtown Location',
        'Construction Equipment - Excavator',
        'Laboratory Equipment - Scientific Instruments',
        'Warehouse Facility - 50,000 sq ft',
        'Police Vehicles - Patrol Cars',
        'Medical Equipment - Hospital Surplus',
        'Aircraft Parts - Aviation Components',
        'Heavy Machinery - Bulldozer',
        'Electronic Equipment - Communication Gear',
        'Real Estate - Commercial Property'
      ][i],
      description: `Government surplus auction item. Item has been thoroughly inspected and comes with all necessary documentation. Pickup required at government facility.`,
      location: [
        'Washington, DC', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 
        'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX',
        'San Diego, CA', 'Dallas, TX', 'San Jose, CA', 'Austin, TX',
        'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH'
      ][i],
      startingBid: Math.floor(Math.random() * 50000) + 500,
      currentBid: Math.random() > 0.5 ? Math.floor(Math.random() * 10000) + 1000 : null,
      imageUrl: `https://picsum.photos/400/300?random=${i + 200}`,
      images: [`https://picsum.photos/400/300?random=${i + 200}`],
      url: `https://www.gsaauctions.gov/auctions/mock-${i + 1}`,
      auctionStartDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      auctionEndDate: new Date(Date.now() + (Math.random() * 30 + 1) * 24 * 60 * 60 * 1000).toISOString(),
      category: ['Office Equipment', 'Vehicles', 'Industrial', 'Electronics', 'Real Estate'][i % 5],
      agency: ['General Services Administration', 'Department of Defense', 'Department of Health'][i % 3],
      assetType: ['furniture', 'cars', 'industrial', 'electronics', 'real-estate'][i % 5],
      source: 'gsa-mock',
      isActive: Math.random() > 0.2,
      isFuture: Math.random() > 0.8,
      isPreview: Math.random() > 0.9,
      bidCount: Math.floor(Math.random() * 25),
      watchCount: Math.floor(Math.random() * 100)
    }));
    
    return NextResponse.json({
      items: mockItems, // Return all mock items
      pagination: {
        page: 1,
        limit: mockItems.length,
        total: mockItems.length,
        totalPages: 1
      },
      metadata: {
        source: 'mock-fallback',
        timestamp: new Date().toISOString(),
        error: 'GSA API temporarily unavailable, using mock data',
        originalError: error.message,
        apiStatus: 'disconnected',
        totalItems: mockItems.length
      }
    });
  }
}