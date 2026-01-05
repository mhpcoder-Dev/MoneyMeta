import { NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// FastAPI backend URL
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

/**
 * Unified auctions endpoint - proxies to FastAPI backend
 * FastAPI now handles all data fetching and caching
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Forward all query parameters to FastAPI
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });
    
    // Default to getting all sources if not specified
    if (!searchParams.has('source')) {
      params.append('source', 'all');
    }
    
    // Default to active status if not specified
    if (!searchParams.has('status')) {
      params.append('status', 'active');
    }
    
    // Fetch from FastAPI backend
    const fastApiUrl = `${FASTAPI_URL}/api/auctions?${params.toString()}`;
    console.log('Fetching auctions from FastAPI:', fastApiUrl);
    
    const response = await fetch(fastApiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`FastAPI error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform to frontend format if needed
    const items = data.items.map(item => transformToFrontendFormat(item));
    
    return NextResponse.json({
      items: items,
      total: data.total,
      sources: {
        gcsurplus: items.filter(i => i.source === 'gcsurplus').length,
        gsa: items.filter(i => i.source === 'gsa').length
      },
      status: 'success',
      metadata: {
        source: 'fastapi',
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error fetching auctions from FastAPI:', error);
    
    // Return error response
    return NextResponse.json({
      items: [],
      total: 0,
      sources: {},
      status: 'error',
      message: error.message || 'Failed to fetch auctions from backend'
    }, { status: 500 });
  }
}

/**
 * Transform database format to frontend format
 */
function transformToFrontendFormat(item) {
  // Build location string
  let location = '';
  if (item.location_city || item.location_province || item.location_state) {
    const parts = [
      item.location_city,
      item.location_province || item.location_state
    ].filter(Boolean);
    
    location = parts.join(', ');
    if (item.source === 'gcsurplus') {
      location += ', Canada';
    } else if (item.source === 'gsa') {
      location += ', USA';
    }
  }
  
  return {
    id: `${item.source}-${item.lot_number}`,
    title: item.title || 'Auction Item',
    description: item.description || '',
    location: location || 'Location TBD',
    saleLocation: location || 'Location TBD',
    startingBid: item.minimum_bid,
    currentBid: item.current_bid,
    imageUrl: item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : null,
    images: item.image_urls || [],
    url: item.item_url || '#',
    auctionStartDate: item.bid_date,
    auctionEndDate: item.closing_date,
    inspectionDate: null,
    inspectionUrl: null,
    category: item.title || 'General',
    agency: item.agency || (item.source === 'gcsurplus' ? 'GC Surplus (Canada)' : 'GSA'),
    assetType: item.asset_type || 'other',
    source: item.source,
    isActive: item.status === 'active' && item.is_available,
    isFuture: false,
    isPreview: false,
    bidCount: item.extra_data?.bidders_count || 0,
    watchCount: 0,
    saleNo: item.sale_number,
    lotNo: item.lot_number,
    contractOfficer: item.contact_name,
    coEmail: item.contact_email,
    coPhone: item.contact_phone,
    auctionIncrement: item.bid_increment,
    inactivityTime: item.extra_data?.inactivity_time,
    agencyCode: item.extra_data?.agency_code,
    bureauCode: item.extra_data?.bureau_code,
    propertyAddress: item.location_address || '',
    propertyZip: item.extra_data?.property_zip,
    instructions: item.extra_data?.instructions,
    quantity: item.quantity,
    nextMinimumBid: item.next_minimum_bid,
    timeRemaining: item.time_remaining
  };
}
