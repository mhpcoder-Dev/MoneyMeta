'use client';

import { useState, useEffect } from 'react';
import ItemCard from '@/components/ItemCard';
import SearchFilters from '@/components/SearchFilters';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const locationParts = auction.location.split(',').map(part => part.trim());
  const usStateCodes = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  const lastPart = locationParts[locationParts.length - 1];
  
  // If source is GSA or location ends with US state code, it's United States
  if (auction.source === 'GSA' || usStateCodes.includes(lastPart)) {
    return 'United States';
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

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auctions?status=active');
      const data = await response.json();
      setAuctions(data.items || []);
      setTotalItems(data.items?.length || 0);
      setCurrentPage(1); // Reset to first page when new data is fetched
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = !searchQuery || 
      auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const country = getCountryFromAuction(auction);
    
    const matchesCountry = selectedCountries.length === 0 || 
      selectedCountries.includes(country);
    
    const matchesAssetType = selectedAssetTypes.length === 0 || 
      selectedAssetTypes.includes(auction.assetType);

    return matchesSearch && matchesCountry && matchesAssetType;
  });

  const availableCountries = [...new Set(auctions.map(auction => getCountryFromAuction(auction)))].filter(Boolean);

  const handleCountryToggle = (country) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleAssetTypeToggle = (assetType) => {
    setSelectedAssetTypes(prev => 
      prev.includes(assetType) 
        ? prev.filter(t => t !== assetType)
        : [...prev, assetType]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Calculate pagination (only for desktop)
  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredAuctions.slice(startIndex, endIndex);
  
  // For mobile, show all items (no pagination)
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
                <div className="mb-6 hidden md:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="text-sm text-white/60">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredAuctions.length)} of {filteredAuctions.length} auction{filteredAuctions.length !== 1 ? 's' : ''}
                  </div>
                  {totalPages > 1 && (
                    <div className="text-sm text-white/60">
                      Page {currentPage} of {totalPages}
                    </div>
                  )}
                </div>

              {/* Desktop View - Grid Layout */}
              <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {currentItems.map(auction => (
                  <ItemCard key={auction.id} item={auction} />
                ))}
              </div>

              {/* Mobile View - Grouped by Country with Horizontal Scrolling */}
              <div className="md:hidden space-y-8 mb-8">
                {(() => {
                  // Group items by country (use ALL items, not paginated)
                  const itemsByCountry = allItems.reduce((acc, auction) => {
                    const country = getCountryFromAuction(auction);
                    
                    if (!acc[country]) {
                      acc[country] = [];
                    }
                    acc[country].push(auction);
                    return acc;
                  }, {});

                  // Sort countries to show United States first, then others
                  const sortedCountries = Object.keys(itemsByCountry).sort((a, b) => {
                    if (a === 'United States') return -1;
                    if (b === 'United States') return 1;
                    return a.localeCompare(b);
                  });

                  return sortedCountries.map(country => (
                    <div key={country} className="space-y-4">
                      {/* Country Header */}
                      <div className="px-1">
                        <h2 className="text-2xl font-bold text-[#d4ff00] mb-1">{country}</h2>
                        <p className="text-xs text-white/60">{itemsByCountry[country].length} item{itemsByCountry[country].length !== 1 ? 's' : ''} available</p>
                      </div>

                      {/* Items in this country - grouped by asset type with horizontal scroll */}
                      <div className="space-y-5">
                        {(() => {
                          // Group by asset type within country
                          const itemsByType = itemsByCountry[country].reduce((acc, auction) => {
                            const type = auction.assetType || 'Other';
                            if (!acc[type]) {
                              acc[type] = [];
                            }
                            acc[type].push(auction);
                            return acc;
                          }, {});

                          // Sort asset types: land/real-estate first, then vehicles, motorcycles, then others
                          const typePriority = {
                            'land': 1,
                            'real-estate': 2,
                            'vehicles': 3,
                            'motorcycles': 4,
                            'electronics': 5,
                            'industrial': 6,
                            'furniture': 7,
                            'collectibles': 8
                          };

                          const sortedTypes = Object.keys(itemsByType).sort((a, b) => {
                            const aPriority = typePriority[a] || 999;
                            const bPriority = typePriority[b] || 999;
                            return aPriority - bPriority;
                          });

                          return sortedTypes.map(assetType => {
                            const scrollContainerId = `scroll-${country}-${assetType}`.replace(/\s+/g, '-');
                            
                            return (
                              <div key={assetType} className="space-y-2">
                                {/* Asset Type Header */}
                                <div className="px-1">
                                  <h3 className="text-base font-bold text-white uppercase tracking-wide">
                                    {getAssetTypeLabel(assetType)}
                                  </h3>
                                  <p className="text-xs text-white/50">
                                    {itemsByType[assetType].length} item{itemsByType[assetType].length !== 1 ? 's' : ''}
                                  </p>
                                </div>
                                
                                {/* Horizontal Scrolling Container with Navigation Arrows */}
                                <div className="relative group">
                                  {/* Left Arrow */}
                                  {itemsByType[assetType].length > 1 && (
                                    <button
                                      onClick={() => {
                                        const container = document.getElementById(scrollContainerId);
                                        container.scrollBy({ left: -300, behavior: 'smooth' });
                                      }}
                                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0a0e27]/90 hover:bg-[#d4ff00] text-white hover:text-[#0a0e27] p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 ml-2"
                                      aria-label="Scroll left"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                      </svg>
                                    </button>
                                  )}
                                  
                                  {/* Scrollable Container */}
                                  <div id={scrollContainerId} className="overflow-x-auto scrollbar-hide -mx-4 px-4 scroll-smooth">
                                    <div className="flex gap-3 pb-2">
                                      {itemsByType[assetType].map(auction => (
                                        <div key={auction.id} className="flex-shrink-0 w-[85vw] sm:w-[45vw]">
                                          <ItemCard item={auction} />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Right Arrow */}
                                  {itemsByType[assetType].length > 1 && (
                                    <button
                                      onClick={() => {
                                        const container = document.getElementById(scrollContainerId);
                                        container.scrollBy({ left: 300, behavior: 'smooth' });
                                      }}
                                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#0a0e27]/90 hover:bg-[#d4ff00] text-white hover:text-[#0a0e27] p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 mr-2"
                                      aria-label="Scroll right"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  ));
                })()}
              </div>
              
              {/* Pagination Controls - Hidden on Mobile */}
              {totalPages > 1 && (
                <div className="hidden md:flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 mt-8">
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