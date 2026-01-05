'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, ExternalLink, Building, Tag, DollarSign, RefreshCw, Users, Clock } from 'lucide-react';
import CommentSection from '@/components/CommentSection';

const getAssetTypeLabel = (assetType) => {
  const labels = {
    'land-buildings': 'Land & Buildings',
    'real-estate': 'Real Estate',
    'vehicles': 'Vehicles',
    'cars': 'Cars',
    'trailers': 'Trailers',
    'motorcycles': 'Motorcycles',
    'bikes': 'Bikes',
    'electronics': 'Electronics',
    'industrial': 'Industrial',
    'furniture': 'Furniture',
    'collectibles': 'Collectibles',
    'other': 'Other'
  };
  return labels[assetType] || 'Other';
};

export default function ItemModal({ item, open, onOpenChange }) {
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch latest bid data when modal opens
  useEffect(() => {
    if (open && item?.saleNo && item?.lotNo) {
      fetchLatestData();
      setImageLoaded(false); // Reset image loading state
    }
  }, [open, item?.saleNo, item?.lotNo]);

  const fetchLatestData = async () => {
    if (!item?.saleNo || !item?.lotNo) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/auctions/gsa/${item.saleNo}/${item.lotNo}`);
      
      if (response.ok) {
        const data = await response.json();
        setLatestData(data.item);
        setLastUpdated(new Date());
      } else {
        console.error('Failed to fetch latest data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching latest bid data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!item) return null;

  // Use latest data if available, otherwise fall back to original item data
  const displayItem = latestData || item;

  const primaryImage = displayItem.images?.[0] || displayItem.imageUrl;

  const formatCurrency = (amount, currency = 'USD') => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <DialogTitle className="text-lg sm:text-xl text-white pr-8 sm:pr-0 break-words">{displayItem.title}</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLatestData}
              disabled={loading}
              className="sm:ml-2 self-start sm:self-auto flex-shrink-0"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{loading ? 'Updating...' : 'Refresh'}</span>
            </Button>
          </div>
          <DialogDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="break-words">{displayItem.location}</span>
            </div>
            {lastUpdated && (
              <span className="text-xs text-muted-foreground sm:ml-auto">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image and basic info */}
          {primaryImage && (
            <div className="relative aspect-video sm:aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Loading image...</div>
                </div>
              )}
              <img
                src={primaryImage}
                alt={displayItem.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                loading="lazy"
              />
            </div>
          )}

          {/* Key details cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
                  <span className="font-medium text-white text-xs sm:text-sm">Asset Type</span>
                </div>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                  {getAssetTypeLabel(displayItem.assetType)}
                </Badge>
              </CardContent>
            </Card>

            {displayItem.currentBid && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400 flex-shrink-0" />
                    <span className="font-medium text-white text-xs sm:text-sm">Current Bid</span>
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-green-600">{formatCurrency(displayItem.currentBid)}</p>
                  {displayItem.bidCount > 0 && (
                    <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {displayItem.bidCount} bid{displayItem.bidCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {displayItem.auctionEndDate && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
                    <span className="font-medium text-white text-xs sm:text-sm">Auction Ends</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white break-words">{formatDate(displayItem.auctionEndDate)}</p>
                  {displayItem.auctionStatus && (
                    <Badge 
                      variant="outline" 
                      className={`mt-1 text-[10px] sm:text-xs ${
                        displayItem.auctionStatus === 'Active' 
                          ? 'border-green-500 text-green-600' 
                          : 'border-gray-500 text-gray-600'
                      }`}
                    >
                      {displayItem.auctionStatus}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Description */}
          {displayItem.description && (
            <div className="space-y-2">
              <h3 className="font-semibold text-white text-base sm:text-lg">Description</h3>
              <div 
                className="text-sm text-gray-300 prose prose-sm max-w-none prose-invert break-words overflow-wrap-anywhere"
                dangerouslySetInnerHTML={{ __html: displayItem.description }}
              />
            </div>
          )}

          {/* Instructions */}
          {displayItem.instructions && (
            <div className="space-y-2">
              <h3 className="font-semibold text-white text-base sm:text-lg">Instructions</h3>
              <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                {displayItem.instructions}
              </p>
            </div>
          )}

          {/* Additional details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-base sm:text-lg">Additional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
              {displayItem.agency && (
                <div>
                  <span className="font-medium text-white">Agency:</span>
                  <p className="text-gray-300">{displayItem.agency}</p>
                </div>
              )}
              {displayItem.category && (
                <div>
                  <span className="font-medium text-white">Category:</span>
                  <p className="text-gray-300">{displayItem.category}</p>
                </div>
              )}
              {displayItem.auctionStartDate && (
                <div>
                  <span className="font-medium text-white">Auction Start:</span>
                  <p className="text-gray-300">{formatDate(displayItem.auctionStartDate)}</p>
                </div>
              )}
              {displayItem.propertyAddress && (
                <div className="break-words">
                  <span className="font-medium text-white">Property Address:</span>
                  <p className="text-gray-300">{displayItem.propertyAddress}</p>
                </div>
              )}
              {displayItem.contractOfficer && (
                <div className="break-words">
                  <span className="font-medium text-white">Contract Officer:</span>
                  <p className="text-gray-300">{displayItem.contractOfficer}</p>
                </div>
              )}
              {displayItem.coEmail && (
                <div className="break-words">
                  <span className="font-medium text-white">Contact Email:</span>
                  <p className="text-gray-300 break-all">{displayItem.coEmail}</p>
                </div>
              )}
              {displayItem.coPhone && (
                <div className="break-words">
                  <span className="font-medium text-white">Contact Phone:</span>
                  <p className="text-gray-300">{displayItem.coPhone}</p>
                </div>
              )}
              {displayItem.inspectionDate && (
                <div className="break-words">
                  <span className="font-medium text-white">Inspection Date:</span>
                  <p className="text-gray-300">{formatDate(displayItem.inspectionDate)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            {displayItem.url && (
              <Button 
                asChild
                className="bg-navy hover:bg-navy/90 text-white w-full sm:w-auto"
              >
                <a href={displayItem.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Auction
                </a>
              </Button>
            )}
            {displayItem.inspectionUrl && (
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <a href={displayItem.inspectionUrl} target="_blank" rel="noopener noreferrer">
                  <Building className="h-4 w-4 mr-2" />
                  Inspection Details
                </a>
              </Button>
            )}
          </div>

          {/* Comment Section */}
          <div className="pt-6 border-t border-white/10">
            <CommentSection auctionId={displayItem.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}