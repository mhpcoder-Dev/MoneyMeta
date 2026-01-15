// Database configuration and utilities
// Direct connection to Neon PostgreSQL database

import { neon } from '@neondatabase/serverless';

// Get database connection from environment variable
const sql = neon(process.env.DATABASE_URL);

// ============================================================
// COMMENTS ARE NOW HANDLED BY BACKEND API
// All comment operations should use:
// - GET    http://localhost:8000/api/comments/{auction_id}
// - POST   http://localhost:8000/api/comments
// - DELETE http://localhost:8000/api/comments/{comment_id}
// ============================================================

/**
 * Get GC Surplus auctions with optional filters
 * @param {Object} options - Filter options (skip, limit, status)
 * @returns {Promise<Array>} Array of auction items
 */
export async function getGCSurplusAuctions({ skip = 0, limit = 100, status = null } = {}) {
  try {
    let query;
    
    if (status && status !== 'all') {
      query = await sql`
        SELECT 
          id, lot_number, sale_number, title, description,
          current_bid, minimum_bid, bid_increment, next_minimum_bid,
          quantity, status, is_available,
          city, region, address_raw,
          closing_date, bid_date,
          image_urls, contact_name, contact_phone, contact_email,
          created_at, updated_at
        FROM auction_items
        WHERE is_available = true AND status = ${status}
        ORDER BY closing_date ASC NULLS LAST
        OFFSET ${skip}
        LIMIT ${limit}
      `;
    } else {
      query = await sql`
        SELECT 
          id, lot_number, sale_number, title, description,
          current_bid, minimum_bid, bid_increment, next_minimum_bid,
          quantity, status, is_available,
          city, region, address_raw,
          closing_date, bid_date,
          image_urls, contact_name, contact_phone, contact_email,
          created_at, updated_at
        FROM auction_items
        WHERE is_available = true
        ORDER BY closing_date ASC NULLS LAST
        OFFSET ${skip}
        LIMIT ${limit}
      `;
    }

    return query;
  } catch (error) {
    console.error('Error fetching GC Surplus auctions:', error);
    return [];
  }
}

/**
 * Search GC Surplus auctions by keyword
 * @param {Object} options - Search options (search, skip, limit, status)
 * @returns {Promise<Array>} Array of matching auction items
 */
export async function searchGCSurplusAuctions({ 
  search, 
  skip = 0, 
  limit = 100, 
  status = null 
} = {}) {
  try {
    const searchPattern = `%${search}%`;
    
    if (status && status !== 'all') {
      return await sql`
        SELECT 
          id, lot_number, sale_number, title, description,
          current_bid, minimum_bid, bid_increment, next_minimum_bid,
          quantity, status, is_available,
          city, region, address_raw,
          closing_date, bid_date,
          image_urls, contact_name, contact_phone, contact_email,
          created_at, updated_at
        FROM auction_items
        WHERE is_available = true 
          ${status ? sql`AND status = ${status}` : sql``}
          AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})
        ORDER BY closing_date ASC NULLS LAST
        OFFSET ${skip}
        LIMIT ${limit}
      `;
    } else {
      return await sql`
        SELECT 
          id, lot_number, sale_number, title, description,
          current_bid, minimum_bid, bid_increment, next_minimum_bid,
          quantity, status, is_available,
          city, region, address_raw,
          closing_date, bid_date,
          image_urls, contact_name, contact_phone, contact_email,
          created_at, updated_at
        FROM auction_items
        WHERE is_available = true 
          AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})
        ORDER BY closing_date ASC NULLS LAST
        OFFSET ${skip}
        LIMIT ${limit}
      `;
    }
  } catch (error) {
    console.error('Error searching GC Surplus auctions:', error);
    return [];
  }
}

/**
 * Get a single auction by lot number
 * @param {string} lotNumber - The lot number to search for
 * @returns {Promise<Object|null>} Auction item or null
 */
export async function getGCSurplusAuctionByLotNumber(lotNumber) {
  try {
    const items = await sql`
      SELECT 
        id, lot_number, sale_number, title, description,
        current_bid, minimum_bid, bid_increment, next_minimum_bid,
        quantity, status, is_available,
        city, region, address_raw,
        closing_date, bid_date,
        image_urls, contact_name, contact_phone, contact_email,
        created_at, updated_at
      FROM auction_items
      WHERE lot_number = ${lotNumber}
      LIMIT 1
    `;

    return items.length > 0 ? items[0] : null;
  } catch (error) {
    console.error('Error fetching GC Surplus auction by lot number:', error);
    return null;
  }
}

/**
 * Count GC Surplus auctions matching criteria
 * @param {Object} options - Filter options (status, search)
 * @returns {Promise<number>} Count of matching auctions
 */
export async function getGCSurplusAuctionCount({ status = null, search = null } = {}) {
  try {
    let result;

    if (search) {
      const searchPattern = `%${search}%`;
      result = await sql`
        SELECT COUNT(*) as count
        FROM auction_items
        WHERE is_available = true
          ${status ? sql`AND status = ${status}` : sql``}
          AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})
      `;
    } else if (status && status !== 'all') {
      result = await sql`
        SELECT COUNT(*) as count
        FROM auction_items
        WHERE is_available = true AND status = ${status}
      `;
    } else {
      result = await sql`
        SELECT COUNT(*) as count
        FROM auction_items
        WHERE is_available = true
      `;
    }

    return Number(result[0]?.count || 0);
  } catch (error) {
    console.error('Error counting GC Surplus auctions:', error);
    return 0;
  }
}

/**
 * Get statistics about auctions
 * @returns {Promise<Object>} Statistics object
 */
export async function getAuctionStats() {
  try {
    const [totalActive, totalClosed, totalUpcoming] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM auction_items WHERE status = 'active' AND is_available = true`,
      sql`SELECT COUNT(*) as count FROM auction_items WHERE status = 'closed' AND is_available = true`,
      sql`SELECT COUNT(*) as count FROM auction_items WHERE status = 'upcoming' AND is_available = true`,
    ]);

    return {
      active: Number(totalActive[0]?.count || 0),
      closed: Number(totalClosed[0]?.count || 0),
      upcoming: Number(totalUpcoming[0]?.count || 0),
      total: Number(totalActive[0]?.count || 0) + Number(totalClosed[0]?.count || 0) + Number(totalUpcoming[0]?.count || 0),
    };
  } catch (error) {
    console.error('Error getting auction stats:', error);
    return { active: 0, closed: 0, upcoming: 0, total: 0 };
  }
}
