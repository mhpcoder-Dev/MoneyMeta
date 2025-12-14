'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, ExternalLink, Building, Tag, DollarSign, RefreshCw, Users, Clock } from 'lucide-react';

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-navy">{displayItem.title}</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLatestData}
              disabled={loading}
              className="ml-2"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Updating...' : 'Refresh'}
            </Button>
          </div>
          <DialogDescription className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {displayItem.location}
            {lastUpdated && (
              <span className="text-xs text-muted-foreground ml-auto">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image and basic info */}
          {primaryImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400">Loading image...</div>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-navy" />
                  <span className="font-medium text-navy">Asset Type</span>
                </div>
                <Badge variant="secondary" className="bg-navy/10 text-navy">
                  {getAssetTypeLabel(displayItem.assetType)}
                </Badge>
              </CardContent>
            </Card>

            {displayItem.currentBid && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-navy">Current Bid</span>
                  </div>
                  <p className="text-lg font-semibold text-green-600">{formatCurrency(displayItem.currentBid)}</p>
                  {displayItem.bidCount > 0 && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3" />
                      {displayItem.bidCount} bid{displayItem.bidCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {displayItem.startingBid && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-navy" />
                    <span className="font-medium text-navy">Starting Bid</span>
                  </div>
                  <p className="text-lg font-semibold">{formatCurrency(displayItem.startingBid)}</p>
                </CardContent>
              </Card>
            )}

            {displayItem.auctionEndDate && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-navy" />
                    <span className="font-medium text-navy">Auction Ends</span>
                  </div>
                  <p className="text-sm">{formatDate(displayItem.auctionEndDate)}</p>
                  {displayItem.auctionStatus && (
                    <Badge 
                      variant="outline" 
                      className={`mt-1 text-xs ${
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
              <h3 className="font-semibold text-navy">Description</h3>
              <div 
                className="text-sm text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: displayItem.description }}
              />
            </div>
          )}

          {/* Instructions */}
          {displayItem.instructions && (
            <div className="space-y-2">
              <h3 className="font-semibold text-navy">Instructions</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {displayItem.instructions}
              </p>
            </div>
          )}

          {/* Additional details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-navy">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {displayItem.agency && (
                <div>
                  <span className="font-medium text-navy">Agency:</span>
                  <p className="text-muted-foreground">{displayItem.agency}</p>
                </div>
              )}
              {displayItem.category && (
                <div>
                  <span className="font-medium text-navy">Category:</span>
                  <p className="text-muted-foreground">{displayItem.category}</p>
                </div>
              )}
              {displayItem.auctionStartDate && (
                <div>
                  <span className="font-medium text-navy">Auction Start:</span>
                  <p className="text-muted-foreground">{formatDate(displayItem.auctionStartDate)}</p>
                </div>
              )}
              {displayItem.propertyAddress && (
                <div>
                  <span className="font-medium text-navy">Property Address:</span>
                  <p className="text-muted-foreground">{displayItem.propertyAddress}</p>
                </div>
              )}
              {displayItem.contractOfficer && (
                <div>
                  <span className="font-medium text-navy">Contract Officer:</span>
                  <p className="text-muted-foreground">{displayItem.contractOfficer}</p>
                </div>
              )}
              {displayItem.coEmail && (
                <div>
                  <span className="font-medium text-navy">Contact Email:</span>
                  <p className="text-muted-foreground">{displayItem.coEmail}</p>
                </div>
              )}
              {displayItem.coPhone && (
                <div>
                  <span className="font-medium text-navy">Contact Phone:</span>
                  <p className="text-muted-foreground">{displayItem.coPhone}</p>
                </div>
              )}
              {displayItem.inspectionDate && (
                <div>
                  <span className="font-medium text-navy">Inspection Date:</span>
                  <p className="text-muted-foreground">{formatDate(displayItem.inspectionDate)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {displayItem.url && (
              <Button 
                asChild
                className="bg-navy hover:bg-navy/90 text-white"
              >
                <a href={displayItem.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Auction
                </a>
              </Button>
            )}
            {displayItem.inspectionUrl && (
              <Button variant="outline" asChild>
                <a href={displayItem.inspectionUrl} target="_blank" rel="noopener noreferrer">
                  <Building className="h-4 w-4 mr-2" />
                  Inspection Details
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}