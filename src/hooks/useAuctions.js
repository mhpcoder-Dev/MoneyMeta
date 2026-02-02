/**
 * useAuctions Hook
 * Custom React hook for fetching auctions with loading and error states
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { auctionService } from '@/services';

export function useAuctions(initialFilters = {}) {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 100,
    source: 'all',
    status: 'active',
    ...initialFilters,
  });

  const fetchAuctions = useCallback(async (newFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const mergedFilters = { ...filters, ...newFilters };
      const data = await auctionService.getAll(mergedFilters);
      
      setAuctions(data.items || []);
      setTotal(data.total || 0);
      setFilters(mergedFilters);
    } catch (err) {
      setError(err.message || 'Failed to fetch auctions');
      console.error('Error fetching auctions:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadMore = useCallback(() => {
    fetchAuctions({ skip: filters.skip + filters.limit });
  }, [filters, fetchAuctions]);

  const refresh = useCallback(() => {
    fetchAuctions({ skip: 0 });
  }, [fetchAuctions]);

  const updateFilters = useCallback((newFilters) => {
    fetchAuctions({ ...newFilters, skip: 0 });
  }, [fetchAuctions]);

  useEffect(() => {
    fetchAuctions();
  }, []); // Only run once on mount

  return {
    auctions,
    loading,
    error,
    total,
    filters,
    loadMore,
    refresh,
    updateFilters,
  };
}

export default useAuctions;
