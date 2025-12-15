// Database configuration and utilities
// Direct connection to Neon PostgreSQL database

import { neon } from '@neondatabase/serverless';

// Get database connection from environment variable
const sql = neon(process.env.DATABASE_URL);

/**
 * Initialize database tables if they don't exist
 * Run this once to create the comments table
 */
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id VARCHAR(255) PRIMARY KEY,
        auction_id VARCHAR(255) NOT NULL,
        author VARCHAR(100) NOT NULL DEFAULT 'Anonymous',
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_auction_id ON comments(auction_id)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_created_at ON comments(created_at DESC)
    `;
    
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

/**
 * Get all comments for a specific auction
 * @param {string} auctionId - The unique auction identifier
 * @returns {Promise<Array>} Array of comments
 */
export async function getCommentsByAuctionId(auctionId) {
  try {
    const comments = await sql`
      SELECT id, auction_id as "auctionId", author, text, created_at as "createdAt"
      FROM comments
      WHERE auction_id = ${auctionId}
      ORDER BY created_at DESC
    `;
    
    return comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toISOString()
    }));
  } catch (error) {
    console.error('Error reading comments:', error);
    return [];
  }
}

/**
 * Add a new comment
 * @param {Object} commentData - Comment data including auctionId, author, text
 * @returns {Promise<Object>} The created comment
 */
export async function addComment(commentData) {
  try {
    const commentId = `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const author = commentData.author || 'Anonymous';
    const createdAt = new Date();
    
    await sql`
      INSERT INTO comments (id, auction_id, author, text, created_at)
      VALUES (${commentId}, ${commentData.auctionId}, ${author}, ${commentData.text}, ${createdAt})
    `;
    
    return {
      id: commentId,
      auctionId: commentData.auctionId,
      author,
      text: commentData.text,
      createdAt: createdAt.toISOString(),
    };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
}

/**
 * Delete a comment
 * @param {string} commentId - The comment ID to delete
 * @returns {Promise<boolean>} Success status
 */
export async function deleteComment(commentId) {
  try {
    await sql`
      DELETE FROM comments
      WHERE id = ${commentId}
    `;
    
    return true;
  } catch (error) {
    console.error('Error deleting comment:', error);
    return false;
  }
}

/**
 * Get comment count for an auction
 * @param {string} auctionId - The auction ID
 * @returns {Promise<number>} Number of comments
 */
export async function getCommentCount(auctionId) {
  try {
    const result = await sql`
      SELECT COUNT(*) as count
      FROM comments
      WHERE auction_id = ${auctionId}
    `;
    
    return parseInt(result[0].count);
  } catch (error) {
    console.error('Error getting comment count:', error);
    return 0;
  }
}

// ==================== AUCTION DATA FUNCTIONS ====================

/**
 * Get all GC Surplus auction items from database
 * @param {Object} options - Query options
 * @param {number} options.skip - Number of items to skip
 * @param {number} options.limit - Maximum number of items to return
 * @param {string} options.status - Filter by status (active, closed, expired)
 * @param {string} options.search - Search in title and description
 * @returns {Promise<Array>} Array of auction items
 */
export async function getGCSurplusAuctions({ skip = 0, limit = 50, status = null, search = null } = {}) {
  try {
    let query = sql`
      SELECT 
        id, lot_number, sale_number, title, description,
        current_bid, minimum_bid, bid_increment, next_minimum_bid,
        quantity, status, is_available,
        location_city, location_province, location_address,
        closing_date, bid_date, time_remaining,
        image_urls, contact_name, contact_phone, contact_email,
        created_at, updated_at
      FROM auction_items
      WHERE is_available = true
    `;

    // Add status filter if provided
    if (status) {
      query = sql`
        SELECT 
          id, lot_number, sale_number, title, description,
          current_bid, minimum_bid, bid_increment, next_minimum_bid,
          quantity, status, is_available,
          location_city, location_province, location_address,
          closing_date, bid_date, time_remaining,
          image_urls, contact_name, contact_phone, contact_email,
          created_at, updated_at
        FROM auction_items
        WHERE is_available = true AND status = ${status}
      `;
    }

    // Add search filter if provided
    if (search) {
      const searchPattern = `%${search}%`;
      query = sql`
        SELECT 
          id, lot_number, sale_number, title, description,
          current_bid, minimum_bid, bid_increment, next_minimum_bid,
          quantity, status, is_available,
          location_city, location_province, location_address,
          closing_date, bid_date, time_remaining,
          image_urls, contact_name, contact_phone, contact_email,
          created_at, updated_at
        FROM auction_items
        WHERE is_available = true 
          ${status ? sql`AND status = ${status}` : sql``}
          AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})
      `;
    }

    // Add ordering and pagination
    const items = await sql`
      ${query}
      ORDER BY closing_date ASC NULLS LAST, created_at DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;

    return items;
  } catch (error) {
    console.error('Error fetching GC Surplus auctions:', error);
    return [];
  }
}

/**
 * Get single GC Surplus auction by lot number
 * @param {string} lotNumber - The lot number
 * @returns {Promise<Object|null>} Auction item or null
 */
export async function getGCSurplusAuctionByLotNumber(lotNumber) {
  try {
    const items = await sql`
      SELECT 
        id, lot_number, sale_number, title, description,
        current_bid, minimum_bid, bid_increment, next_minimum_bid,
        quantity, status, is_available,
        location_city, location_province, location_address,
        closing_date, bid_date, time_remaining,
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
 * Get count of GC Surplus auctions
 * @param {string} status - Filter by status
 * @returns {Promise<number>} Count of auctions
 */
export async function getGCSurplusAuctionCount(status = null) {
  try {
    let result;
    
    if (status) {
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

    return parseInt(result[0].count);
  } catch (error) {
    console.error('Error getting GC Surplus auction count:', error);
    return 0;
  }
}
