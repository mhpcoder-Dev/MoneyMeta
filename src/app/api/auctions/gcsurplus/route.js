import { NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GCSurplus API configuration
const GCSURPLUS_API_URL = 'https://gcsurplus-scraper.vercel.app/api/auctions';

// Asset type classification helper for Canadian auctions
function classifyAssetType(item) {
  const title = item.title?.toLowerCase() || '';
  const description = item.description?.toLowerCase() || '';
  
  const text = `${title} ${description}`;
  
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
  if (/\b(furniture|desk|chair|table|cabinet|office furniture|bookshel)\b/.test(text)) {
    return 'furniture';
  }
  
  // Collectibles
  if (/\b(coin|stamp|art|collectible|antique|vintage)\b/.test(text)) {
    return 'collectibles';
  }
  
  return 'other';
}

// Calculate auction end date from time_remaining
function calculateEndDate(timeRemaining) {
  if (!timeRemaining) return null;
  
  const now = new Date();
  const match = timeRemaining.match(/(\d+)\s*days?\s*(\d+)?\s*hours?\s*(\d+)?\s*minutes?/i);
  
  if (match) {
    const days = parseInt(match[1]) || 0;
    const hours = parseInt(match[2]) || 0;
    const minutes = parseInt(match[3]) || 0;
    
    const endDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000);
    return endDate.toISOString();
  }
  
  return null;
}

// Transform GCSurplus API data to our format
function transformGCSurplusItem(item) {
  let imageUrls = [];
  try {
    // Parse image_urls if it's a string
    if (typeof item.image_urls === 'string') {
      imageUrls = JSON.parse(item.image_urls);
    } else if (Array.isArray(item.image_urls)) {
      imageUrls = item.image_urls;
    }
  } catch (e) {
    imageUrls = [];
  }
  
  const location = `${item.location_city || ''}, ${item.location_province || ''}, Canada`.replace(/^,\s*|,\s*$/g, '');
  
  return {
    id: `gc-${item.id || item.lot_number}`,
    title: item.title || 'Canadian Government Auction Item',
    description: item.description || '',
    location: location,
    saleLocation: location,
    startingBid: item.minimum_bid || null,
    currentBid: item.current_bid || null,
    imageUrl: imageUrls.length > 0 ? imageUrls[0] : null,
    images: imageUrls,
    url: `https://www.gcsurplus.ca/mn-eng.cfm?snc=wfsav&sc=enc-bid&srchtype=&so=DESC&rpp=50&vndsld=0&sf=ferm-clos&lci=&lco=&srchauct=4&kws=&pm=&aucdate=0&aucstatus=0&sr=1&sc=desc&kws=&ltnbr=${item.lot_number}`,
    auctionStartDate: item.created_at || null,
    auctionEndDate: calculateEndDate(item.time_remaining) || item.closing_date,
    inspectionDate: null,
    inspectionUrl: null,
    category: item.title || 'General',
    agency: 'GC Surplus (Canada)',
    assetType: classifyAssetType(item),
    source: 'gcsurplus',
    isActive: item.status === 'active' && item.is_available,
    isFuture: false,
    isPreview: false,
    bidCount: 0,
    watchCount: 0,
    saleNo: item.sale_number,
    lotNo: item.lot_number,
    contractOfficer: item.contact_name,
    coEmail: item.contact_email,
    coPhone: item.contact_phone,
    auctionIncrement: item.bid_increment,
    inactivityTime: null,
    agencyCode: 'GCS',
    bureauCode: 'GCS',
    propertyAddress: item.location_address || '',
    propertyZip: null,
    instructions: null,
    quantity: item.quantity,
    nextMinimumBid: item.next_minimum_bid,
    timeRemaining: item.time_remaining
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all'; // 'active', 'all'
    
    console.log('Fetching data from GCSurplus API:', GCSURPLUS_API_URL);
    
    // Fetch from GCSurplus API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      const response = await fetch(GCSURPLUS_API_URL, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`GCSurplus API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('GCSurplus API response received:', Array.isArray(data) ? `${data.length} items` : typeof data);
      
      // Transform the data to our format
      let items = [];
      if (Array.isArray(data)) {
        items = data.map(transformGCSurplusItem);
      } else {
        console.warn('Unexpected GCSurplus API response format:', data);
        return NextResponse.json({
          items: [],
          total: 0,
          source: 'gcsurplus',
          status: 'error',
          message: 'Unexpected API response format'
        });
      }
      
      // Filter by status if requested
      if (status === 'active') {
        items = items.filter(item => item.isActive);
      }
      
      console.log(`Returning ${items.length} Canadian auction items`);
      
      return NextResponse.json({
        items: items,
        total: items.length,
        source: 'gcsurplus',
        status: 'success'
      });
      
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        console.error('GCSurplus API request timeout');
        return NextResponse.json({
          items: [],
          total: 0,
          source: 'gcsurplus',
          status: 'timeout',
          message: 'Request timeout'
        }, { status: 408 });
      }
      throw fetchError;
    }
    
  } catch (error) {
    console.error('Error fetching Canadian auctions:', error);
    return NextResponse.json({
      items: [],
      total: 0,
      source: 'gcsurplus',
      status: 'error',
      message: error.message || 'Failed to fetch auctions'
    }, { status: 500 });
  }
}
