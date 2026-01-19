/**
 * Auction Service
 * All auction-related API calls centralized here
 */

import apiClient from './api.service';

const ENDPOINTS = {
  AUCTIONS: '/api/auctions',
  AUCTION_BY_ID: (source, saleNo, lotNo) => `/api/auctions/${source}/${saleNo}/${lotNo}`,
  AUCTION_COUNT: '/api/auctions/count',
  GCSURPLUS: '/api/auctions/gcsurplus',
  GSA: '/api/auctions/gsa',
  TREASURY: '/api/auctions/treasury',
  STATE_DEPT: '/api/auctions/state_dept',
};

export const auctionService = {
  /**
   * Get all auctions with filters
   * @param {Object} filters - Filter parameters
   * @returns {Promise<{items: Array, total: number}>}
   */
  async getAll(filters = {}) {
    const params = {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      source: filters.source || 'all',
      status: filters.status || 'active',
      search: filters.search || null,
      asset_type: filters.assetTypes?.length > 0 ? filters.assetTypes.join(',') : null,
    };

    return apiClient.get(ENDPOINTS.AUCTIONS, params);
  },

  /**
   * Get GC Surplus (Canadian) auctions
   * @param {Object} filters - Filter parameters
   * @returns {Promise<{items: Array, total: number}>}
   */
  async getGCSurplus(filters = {}) {
    const params = {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      status: filters.status || 'active',
      search: filters.search || null,
    };

    return apiClient.get(ENDPOINTS.GCSURPLUS, params);
  },

  /**
   * Get GSA (US Government) auctions
   * @param {Object} filters - Filter parameters
   * @returns {Promise<{items: Array, total: number}>}
   */
  async getGSA(filters = {}) {
    const params = {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      status: filters.status || 'active',
      search: filters.search || null,
    };

    return apiClient.get(ENDPOINTS.GSA, params);
  },

  /**
   * Get Treasury auctions
   * @param {Object} filters - Filter parameters
   * @returns {Promise<{items: Array, total: number}>}
   */
  async getTreasury(filters = {}) {
    const params = {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      status: filters.status || null,
    };

    return apiClient.get(ENDPOINTS.TREASURY, params);
  },

  /**
   * Get State Department auctions
   * @param {Object} filters - Filter parameters
   * @returns {Promise<{items: Array, total: number}>}
   */
  async getStateDept(filters = {}) {
    const params = {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      status: filters.status || null,
    };

    return apiClient.get(ENDPOINTS.STATE_DEPT, params);
  },

  /**
   * Get auction count
   * @param {Object} filters - Filter parameters
   * @returns {Promise<{count: number}>}
   */
  async getCount(filters = {}) {
    const params = {
      source: filters.source || 'all',
      status: filters.status || 'active',
    };

    return apiClient.get(ENDPOINTS.AUCTION_COUNT, params);
  },

  /**
   * Get single auction by ID
   * @param {string} source - Auction source (gsa, gcsurplus, etc.)
   * @param {string} saleNo - Sale number
   * @param {string} lotNo - Lot number
   * @returns {Promise<Object>}
   */
  async getById(source, saleNo, lotNo) {
    return apiClient.get(ENDPOINTS.AUCTION_BY_ID(source, saleNo, lotNo));
  },

  /**
   * Search auctions
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise<{items: Array, total: number}>}
   */
  async search(query, filters = {}) {
    const params = {
      search: query,
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      source: filters.source || 'all',
      status: filters.status || 'active',
    };

    return apiClient.get(ENDPOINTS.AUCTIONS, params);
  },
};

export default auctionService;
