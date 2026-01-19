/**
 * useComments Hook
 * Custom React hook for managing comments with loading and error states
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { commentService } from '@/services';

export function useComments(auctionId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!auctionId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await commentService.getByAuction(auctionId);
      setComments(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  }, [auctionId]);

  const addComment = useCallback(async (commentData) => {
    setSubmitting(true);
    setError(null);

    try {
      const newComment = await commentService.create({
        auction_id: auctionId,
        ...commentData,
      });
      
      setComments((prev) => [...prev, newComment]);
      return newComment;
    } catch (err) {
      setError(err.message || 'Failed to add comment');
      console.error('Error adding comment:', err);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [auctionId]);

  const deleteComment = useCallback(async (commentId) => {
    setError(null);

    try {
      await commentService.delete(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      setError(err.message || 'Failed to delete comment');
      console.error('Error deleting comment:', err);
      throw err;
    }
  }, []);

  const refresh = useCallback(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    loading,
    error,
    submitting,
    addComment,
    deleteComment,
    refresh,
  };
}

export default useComments;
