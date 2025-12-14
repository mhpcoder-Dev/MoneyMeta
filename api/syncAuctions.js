// Background sync service for Vercel Functions
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Import the auction cache service dynamically to avoid issues with Supabase client
    const { auctionCacheService } = await import('../../src/services/auctionCacheService');
    
    console.log('Starting GSA auction sync...');
    const result = await auctionCacheService.syncGSAAuctions();
    
    console.log(`Sync completed: ${result.synced} items synced, ${result.errors.length} errors`);
    
    res.status(200).json({
      success: result.success,
      message: `Synced ${result.synced} auction items`,
      synced: result.synced,
      errors: result.errors,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Sync function error:', error);
    res.status(500).json({
      success: false,
      error: 'Sync failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}