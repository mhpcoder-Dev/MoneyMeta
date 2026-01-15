import { NextResponse } from 'next/server';
import { getGCSurplusAuctions, getGCSurplusAuctionCount } from '@/lib/db';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    auctionEndDate: item.closing_date,
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
    nextMinimumBid: item.next_minimum_bid
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all'; // 'active', 'all'
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '100');
    
    console.log('Fetching Canadian auctions from database with status:', status);
    
    // Fetch from database instead of external API
    const dbStatus = status === 'active' ? 'active' : null;
    const dbItems = await getGCSurplusAuctions({ 
      skip, 
      limit, 
      status: dbStatus 
    });
    
    console.log(`Retrieved ${dbItems.length} items from database`);
    
    // Transform database items to frontend format
    const items = dbItems.map(transformGCSurplusItem);
    
    // Get total count
    const total = await getGCSurplusAuctionCount(dbStatus);
    
    console.log(`Returning ${items.length} Canadian auction items`);
    
    return NextResponse.json({
      items: items,
      total: total,
      source: 'gcsurplus',
      status: 'success'
    });
    
  } catch (error) {
    console.error('Error fetching Canadian auctions from database:', error);
    return NextResponse.json({
      items: [],
      total: 0,
      source: 'gcsurplus',
      status: 'error',
      message: error.message || 'Failed to fetch auctions'
    }, { status: 500 });
  }
}
