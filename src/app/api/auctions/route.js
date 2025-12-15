import { NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const source = searchParams.get('source') || 'all'; // 'gsa', 'gcsurplus', 'all'
    
    // Fetch from both sources in parallel
    const promises = [];
    
    if (source === 'all' || source === 'gsa') {
      const gsaUrl = new URL('/api/auctions/gsa', request.url);
      if (status) gsaUrl.searchParams.set('status', status);
      promises.push(
        fetch(gsaUrl.toString()).then(res => res.json()).catch(err => {
          console.error('Error fetching GSA auctions:', err);
          return { items: [], total: 0, source: 'gsa', status: 'error' };
        })
      );
    }
    
    if (source === 'all' || source === 'gcsurplus') {
      const gcsUrl = new URL('/api/auctions/gcsurplus', request.url);
      if (status) gcsUrl.searchParams.set('status', status);
      promises.push(
        fetch(gcsUrl.toString()).then(res => res.json()).catch(err => {
          console.error('Error fetching Canadian auctions:', err);
          return { items: [], total: 0, source: 'gcsurplus', status: 'error' };
        })
      );
    }
    
    // Wait for both responses
    const results = await Promise.all(promises);
    
    // Merge items from both sources
    let allItems = [];
    let sourceStats = {};
    
    for (const result of results) {
      if (result.items && Array.isArray(result.items)) {
        allItems = allItems.concat(result.items);
        sourceStats[result.source] = {
          count: result.items.length,
          status: result.status || 'success'
        };
      }
    }
    
    // Sort by auction end date (closest to ending first)
    allItems.sort((a, b) => {
      if (!a.auctionEndDate) return 1;
      if (!b.auctionEndDate) return -1;
      return new Date(a.auctionEndDate) - new Date(b.auctionEndDate);
    });
    
    console.log(`Unified auctions API: returning ${allItems.length} total items`);
    console.log('Source breakdown:', sourceStats);
    
    return NextResponse.json({
      items: allItems,
      total: allItems.length,
      sources: sourceStats,
      status: 'success'
    });
    
  } catch (error) {
    console.error('Error in unified auctions endpoint:', error);
    return NextResponse.json({
      items: [],
      total: 0,
      sources: {},
      status: 'error',
      message: error.message || 'Failed to fetch auctions'
    }, { status: 500 });
  }
}
