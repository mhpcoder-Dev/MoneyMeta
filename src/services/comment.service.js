/**
 * Comment Service
 * All comment-related API calls centralized here
 */

import apiClient from './api.service';

const ENDPOINTS = {
  COMMENTS: '/api/comments',
  COMMENT_BY_AUCTION: (auctionId) => `/api/comments/${auctionId}`,
  COMMENT_BY_ID: (commentId) => `/api/comments/${commentId}`,
};

export const commentService = {
  /**
   * Get all comments for an auction
   * @param {string} auctionId - Auction ID
   * @returns {Promise<Array>}
   */
  async getByAuction(auctionId) {
    return apiClient.get(ENDPOINTS.COMMENT_BY_AUCTION(auctionId));
  },

  /**
   * Create a new comment
   * @param {Object} commentData - Comment data
   * @param {string} commentData.auction_id - Auction ID
   * @param {string} commentData.user_name - User name
   * @param {string} commentData.comment_text - Comment text
   * @returns {Promise<Object>}
   */
  async create(commentData) {
    return apiClient.post(ENDPOINTS.COMMENTS, commentData);
  },

  /**
   * Delete a comment
   * @param {number} commentId - Comment ID
   * @returns {Promise<Object>}
   */
  async delete(commentId) {
    return apiClient.delete(ENDPOINTS.COMMENT_BY_ID(commentId));
  },

  /**
   * Update a comment (if supported by backend)
   * @param {number} commentId - Comment ID
   * @param {Object} updateData - Updated comment data
   * @returns {Promise<Object>}
   */
  async update(commentId, updateData) {
    return apiClient.put(ENDPOINTS.COMMENT_BY_ID(commentId), updateData);
  },
};

export default commentService;
