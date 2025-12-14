// Vercel API Route for GSA Auctions
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page = 1, limit = 50, status = 'A' } = req.query;
    
    // Use demo key for now - in production, this should be an environment variable
    const apiKey = process.env.GSA_API_KEY || 'DEMO_KEY';
    
    const gsaUrl = new URL('https://api.gsa.gov/assets/gsaauctions/v2/auctions');
    gsaUrl.searchParams.set('api_key', apiKey);
    gsaUrl.searchParams.set('format', 'JSON');
    
    // Add pagination and filtering if supported
    if (status) {
      gsaUrl.searchParams.set('auctionStatus', status);
    }

    console.log('Fetching GSA data from:', gsaUrl.toString());

    const response = await fetch(gsaUrl.toString(), {
      headers: {
        'User-Agent': 'Moneymeta-AuctionExplorer/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`GSA API responded with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform GSA data to our auction item format
    const transformedData = data.auctions ? data.auctions.map(auction => ({
      id: `gsa_${auction.SaleNo}_${auction.LotNo}`,
      title: auction.ItemName || 'Untitled Item',
      description: auction.LotDescript || '',
      currentPrice: auction.HighBidAmount || 0,
      reservePrice: auction.Reserve || 0,
      bidIncrement: auction.AucIncrement || 1,
      bidCount: auction.BiddersCount || 0,
      auctionStartDate: auction.AucStartDt ? new Date(auction.AucStartDt).toISOString() : null,
      auctionEndDate: auction.AucEndDt ? new Date(auction.AucEndDt).toISOString() : null,
      location: [
        auction.PropertyCity,
        auction.PropertyState
      ].filter(Boolean).join(', ') || 'Location not specified',
      imageUrl: auction.ImageURL || null,
      images: auction.ImageURL ? [auction.ImageURL] : [],
      assetType: classifyAssetType(auction.ItemName, auction.LotDescript),
      isActive: auction.AuctionStatus === 'A',
      status: getAuctionStatus(auction.AuctionStatus),
      source: 'GSA',
      externalUrl: auction.ItemDescURL || null,
      contactInfo: {
        officer: auction.ContractOfficer || null,
        email: auction.COEmail || null,
        phone: auction.COPhone || null
      },
      agency: {
        name: auction.AgencyName || null,
        bureau: auction.BureauName || null,
        code: auction.AgencyCode || null
      },
      saleLocation: {
        address: auction.SaleLocation || null,
        city: auction.LocationCity || null,
        state: auction.LocationST || null,
        zip: auction.LocationZip || null
      },
      propertyAddress: {
        address1: auction.PropertyAddr1 || null,
        address2: auction.PropertyAddr2 || null,
        address3: auction.PropertyAddr3 || null,
        city: auction.PropertyCity || null,
        state: auction.PropertyState || null,
        zip: auction.PropertyZip || null
      },
      inspectionInstructions: [
        auction.Instruction1,
        auction.Instruction2,
        auction.Instruction3
      ].filter(Boolean),
      inactivityTime: auction.InactivityTime || null,
      sequence: auction.LotSequence || 0
    })) : [];

    // Apply pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedData = transformedData.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: paginatedData,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: transformedData.length,
        totalPages: Math.ceil(transformedData.length / parseInt(limit))
      },
      source: 'GSA Auctions API',
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('GSA API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch GSA auction data',
      message: error.message
    });
  }
}

// Helper function to classify asset types based on GSA data
function classifyAssetType(itemName = '', description = '') {
  const text = `${itemName} ${description}`.toLowerCase();
  
  if (text.includes('vehicle') || text.includes('car') || text.includes('truck') || text.includes('motorcycle')) {
    return 'vehicles';
  }
  if (text.includes('land') || text.includes('property') || text.includes('real estate') || text.includes('building')) {
    return 'real-estate';
  }
  if (text.includes('computer') || text.includes('laptop') || text.includes('server') || text.includes('electronic')) {
    return 'electronics';
  }
  if (text.includes('equipment') || text.includes('machinery') || text.includes('tool')) {
    return 'industrial';
  }
  if (text.includes('furniture') || text.includes('office')) {
    return 'furniture';
  }
  if (text.includes('art') || text.includes('jewelry') || text.includes('antique')) {
    return 'collectibles';
  }
  
  return 'other';
}

// Helper function to convert GSA auction status
function getAuctionStatus(status) {
  switch (status) {
    case 'A': return 'active';
    case 'P': return 'preview';
    case ' ': return 'scheduled';
    default: return 'unknown';
  }
}