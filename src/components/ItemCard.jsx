'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ItemModal from './ItemModal';

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

export default function ItemCard({ item }) {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading earlier (200px before viewport)
        threshold: 0.01
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Check if modal should open on mount (deep link with expand)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === `#item-${item.id}+expand`) {
      setShowModal(true);
    }
  }, [item.id]);

  const getTimeRemaining = () => {
    if (!item.auctionEndDate) return null;
    
    const now = new Date();
    const end = new Date(item.auctionEndDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `Ending in ${days}d`;
    if (hours > 0) return `Ending in ${hours}h`;
    return `Ending in ${minutes}m`;
  };

  const primaryImage = item.images?.[0] || item.imageUrl;
  const timeRemaining = getTimeRemaining();

  return (
    <>
      <Card 
        id={`item-${item.id}`}
        className="scroll-mt-24 shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden group"
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowModal(true);
          }
        }}
        aria-label={`View details for ${item.title}`}
      >
        <article className="flex flex-col h-full">
          {/* Image with overlay tag */}
          {primaryImage && (
            <div 
              ref={imgRef}
              className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100"
            >
              {shouldLoad ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400 text-xs">Loading image...</div>
                    </div>
                  )}
                  <img
                    src={primaryImage}
                    alt={item.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      setImageLoaded(true);
                      e.target.src = '/images/placeholder-auction.jpg'; // Fallback image
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500 text-xs">📷</div>
                </div>
              )}
              
              {/* LIVE Badge */}
              {item.isActive && (
                <div className="absolute top-3 right-3">
                  <div className="live-badge">
                    <span className="text-[10px]">⚡</span>
                    LIVE
                  </div>
                </div>
              )}
            </div>
          )}

          <CardContent className="p-4 flex-grow">
            <div className="space-y-3">
              {/* Agency/Source */}
              <div className="text-xs text-gray-600 font-medium">
                {item.agency || 'Government Auction'}
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs truncate">{item.location}</span>
              </div>

              {/* Title */}
              <CardTitle className="text-base leading-tight line-clamp-2 text-gray-900 font-semibold">
                {item.title}
              </CardTitle>
              
              {/* Bid Info */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                {item.currentBid ? (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600">Current Bid</span>
                    <span className="font-bold text-green-600">
                      ${item.currentBid?.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600">Starting Bid</span>
                    <span className="font-bold text-gray-900">
                      {item.startingBid && typeof item.startingBid === 'number' 
                        ? `$${item.startingBid.toLocaleString()}` 
                        : 'Not Available'}
                    </span>
                  </div>
                )}
                
                {timeRemaining && (
                  <div className="flex items-center gap-1 text-gray-700">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span className="text-xs font-medium">{timeRemaining}</span>
                  </div>
                )}
              </div>
              
              {/* Comments Link */}
              <div className="pt-2 mt-2 border-t border-gray-200">
                <div className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 cursor-pointer">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Comments</span>
                </div>
              </div>
            </div>
          </CardContent>
        </article>
      </Card>

      <ItemModal item={item} open={showModal} onOpenChange={setShowModal} />
    </>
  );
}