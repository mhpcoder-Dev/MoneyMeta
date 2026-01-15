// API Configuration
// Centralized configuration for backend API endpoints

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Auction endpoints
  AUCTIONS: `${API_BASE_URL}/api/auctions`,
  AUCTION_COUNT: `${API_BASE_URL}/api/auctions/count`,
  
  // Comment endpoints
  COMMENTS: `${API_BASE_URL}/api/comments`,
  COMMENT_BY_AUCTION: (auctionId) => `${API_BASE_URL}/api/comments/${auctionId}`,
  COMMENT_BY_ID: (commentId) => `${API_BASE_URL}/api/comments/${commentId}`,
  
  // Scraper endpoints
  SCRAPE_GCSURPLUS: `${API_BASE_URL}/api/scrape/gcsurplus`,
  SCRAPE_GSA: `${API_BASE_URL}/api/scrape/gsa`,
  SCRAPE_TREASURY: `${API_BASE_URL}/api/scrape/treasury`,
  SCRAPE_STATE_DEPT: `${API_BASE_URL}/api/scrape/state_dept`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_ENDPOINTS;
