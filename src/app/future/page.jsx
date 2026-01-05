'use client';

import { useState, useEffect } from 'react';
import ItemCard from '@/components/ItemCard';
import SearchFilters from '@/components/SearchFilters';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

const ITEMS_PER_PAGE = 24; // Number of items to show per page

export default function Future() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedAssetTypes, setSelectedAssetTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Debounce search query to reduce API calls while typing
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetchAuctions();
  }, [currentPage, selectedCountries, selectedAssetTypes, debouncedSearchQuery]);

  const fetchAuctions = async () => {
    try {
      setLoading(currentPage === 1);
      setIsLoadingMore(currentPage > 1);
      
      // Build query parameters for server-side filtering and pagination
      const params = new URLSearchParams({
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
      
      // Include both scheduled (GSA) and upcoming (Treasury) auctions
      // Note: Backend will handle filtering by these statuses
      params.append('status', 'scheduled');
      params.append('status', 'upcoming');
      
      // Add filters
      if (debouncedSearchQuery) {
        params.append('search', debouncedSearchQuery);
      }
      if (selectedAssetTypes.length > 0) {
        params.append('asset_type', selectedAssetTypes.join(','));
      }
      
      const response = await fetch(`/api/auctions?${params.toString()}`);
      const data = await response.json();
      
      setAuctions(data.items || []);
      setTotalItems(data.total || 0);
    } catch (error) {
      console.error('Error fetching future auctions:', error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Apply client-side country filter only (search and asset type are server-side)
  const filteredAuctions = auctions.filter(auction => {
    const matchesCountry = selectedCountries.length === 0 || 
      selectedCountries.some(country => auction.location.includes(country));
    return matchesCountry;
  });

  const availableCountries = [...new Set(auctions.map(auction => 
    auction.location.split(',')[auction.location.split(',').length - 1].trim()
  ))].filter(Boolean);

  const handleCountryToggle = (country) => {
    setCurrentPage(1); // Reset to first page when filters change
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleAssetTypeToggle = (assetType) => {
    setCurrentPage(1); // Reset to first page when filters change
    setSelectedAssetTypes(prev => 
      prev.includes(assetType) 
        ? prev.filter(t => t !== assetType)
        : [...prev, assetType]
    );
  };

  const handleSearchChange = (query) => {
    setCurrentPage(1); // Reset to first page when search changes
    setSearchQuery(query);
  };

  // Calculate pagination using server-side total
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredAuctions; // Already paginated from server

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4ff00]"></div>
            <p className="mt-2 text-white/60">Loading future auctions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Future Government Auctions</h1>
          <p className="text-white/60">
            Upcoming scheduled government surplus auctions - preview items before bidding starts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <SearchFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                selectedCountries={selectedCountries}
                onCountryToggle={handleCountryToggle}
                selectedAssetTypes={selectedAssetTypes}
                onAssetTypeToggle={handleAssetTypeToggle}
                availableCountries={availableCountries}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredAuctions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60">
                  No scheduled auctions found matching your criteria
                </p>
              </div>
            ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div className="text-sm text-white/60">
                  Showing {startIndex + 1}-{Math.min(startIndex + filteredAuctions.length, totalItems)} of {totalItems} scheduled auction{totalItems !== 1 ? 's' : ''}
                </div>
                {totalPages > 1 && (
                  <div className="text-sm text-white/60">
                    Page {currentPage} of {totalPages}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 relative">
                {isLoadingMore && (
                  <div className="absolute inset-0 bg-[#0a0e27]/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4ff00]"></div>
                  </div>
                )}
                {currentItems.map(auction => (
                  <ItemCard key={auction.id} item={auction} />
                ))}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-transparent border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {currentPage > 3 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(1)}
                          className="bg-transparent border-white/20 text-white hover:bg-white/10"
                        >
                          1
                        </Button>
                        {currentPage > 4 && <span className="px-2 text-white/60">...</span>}
                      </>
                    )}
                    
                    {generatePageNumbers().map(page => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={page === currentPage ? "bg-[#d4ff00] text-[#0a0e27] hover:bg-[#d4ff00]/90 font-bold" : "bg-transparent border-white/20 text-white hover:bg-white/10"}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && <span className="px-2 text-white/60">...</span>}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(totalPages)}
                          className="bg-transparent border-white/20 text-white hover:bg-white/10"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-transparent border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}