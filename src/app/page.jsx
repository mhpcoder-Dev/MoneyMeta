'use client';

import { useState, useEffect } from 'react';
import ItemCard from '@/components/ItemCard';
import SearchFilters from '@/components/SearchFilters';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { API_ENDPOINTS } from '@/lib/api-config';
import { auctionService } from '@/services';

const ITEMS_PER_PAGE = 24; // Number of items to show per page

const getAssetTypeLabel = (assetType) => {
  const labels = {
    'land': 'Land',
    'real-estate': 'Real Estate',
    'vehicles': 'Vehicles',
    'motorcycles': 'Motorcycles',
    'electronics': 'Electronics',
    'industrial': 'Industrial',
    'furniture': 'Furniture',
    'collectibles': 'Collectibles'
  };
  return labels[assetType] || assetType;
};

// Extract country from auction location
const getCountryFromAuction = (auction) => {
  // Safety check: ensure location exists and is a string
  if (!auction.location || typeof auction.location !== 'string') {
    return auction.source === 'gcsurplus' ? 'Canada' : 'United States';
  }

  const locationParts = auction.location.split(',').map(part => part.trim());
  const usStateCodes = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  const lastPart = locationParts[locationParts.length - 1];
  
  // If source is GSA or location ends with US state code, it's United States
  if (auction.source === 'gsa' || usStateCodes.includes(lastPart)) {
    return 'United States';
  } else if (auction.source === 'gcsurplus') {
    return 'Canada';
  } else if (lastPart && lastPart.length > 2) {
    // If last part is longer than 2 chars, it's likely a country name
    return lastPart;
  }
  // Default to United States
  return 'United States';
};

export default function Home() {
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
      
      // Use auction service instead of direct fetch
      const data = await auctionService.getAll({
        status: 'active',
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearchQuery || null,
        assetTypes: selectedAssetTypes.length > 0 ? selectedAssetTypes : null,
      });
      
      setAuctions(data.items || []);
      setTotalItems(data.pagination?.total || 0);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Apply client-side country filter only (search and asset type are server-side)
  const filteredAuctions = auctions
    .filter(auction => {
      const country = getCountryFromAuction(auction);
      const matchesCountry = selectedCountries.length === 0 || 
        selectedCountries.includes(country);
      return matchesCountry;
    })
    .sort((a, b) => {
      // Check if auction has ended
      const aEnded = a.auctionEndDate && new Date(a.auctionEndDate) < new Date();
      const bEnded = b.auctionEndDate && new Date(b.auctionEndDate) < new Date();
      
      // Live auctions come before ended auctions
      if (aEnded && !bEnded) return 1;
      if (!aEnded && bEnded) return -1;
      
      // If both are same status, keep original order
      return 0;
    });

  const availableCountries = [...new Set(auctions.map(auction => getCountryFromAuction(auction)))].filter(Boolean);

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
  
  // For mobile, use same items (server-side pagination)
  const allItems = filteredAuctions;

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
            <p className="mt-2 text-white/60">Loading auctions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Active Government Auctions</h1>
          <p className="text-sm md:text-base text-white/60">
            Browse currently active government surplus auctions from US (GSA) and Canada (GC Surplus)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
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
                  No auctions found matching your criteria
                </p>
              </div>
            ) : (
              <>
                {/* Results Info - Show on all devices */}
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="text-sm text-white/60">
                    Showing {startIndex + 1}-{Math.min(startIndex + filteredAuctions.length, totalItems)} of {totalItems} auction{totalItems !== 1 ? 's' : ''}
                  </div>
                  {totalPages > 1 && (
                    <div className="text-sm text-white/60">
                      Page {currentPage} of {totalPages}
                    </div>
                  )}
                </div>

              {/* Grid Layout - All Devices (Responsive columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 relative">
                {isLoadingMore && (
                  <div className="absolute inset-0 bg-[#0a0e27]/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4ff00]"></div>
                  </div>
                )}
                {currentItems.map(auction => (
                  <ItemCard key={auction.id} item={auction} />
                ))}
              </div>
              
              {/* Pagination Controls - Show on all devices */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-full sm:w-auto bg-transparent border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  
                  <div className="flex items-center gap-1 flex-wrap justify-center">
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
                        {currentPage > 4 && <span className="px-1 sm:px-2 text-white/60">...</span>}
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
                        {currentPage < totalPages - 3 && <span className="px-1 sm:px-2 text-white/60">...</span>}
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
                    className="w-full sm:w-auto bg-transparent border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <span className="hidden sm:inline">Next</span>
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