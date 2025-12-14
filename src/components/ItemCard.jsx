'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';
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
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.1
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
        className="scroll-mt-24 shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full bg-[#1a1f3a] border-0 rounded-xl overflow-hidden group"
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
              className="relative aspect-[16/9] w-full overflow-hidden bg-[#0f1429]"
            >
              {shouldLoad ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-[#0f1429] animate-pulse flex items-center justify-center">
                      <div className="text-gray-600 text-sm">Loading...</div>
                    </div>
                  )}
                  <img
                    src={primaryImage}
                    alt={item.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-[#0f1429] animate-pulse flex items-center justify-center">
                  <div className="text-gray-600 text-xs">📷</div>
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
              <div className="text-xs text-white/60 font-medium">
                {item.agency || 'Government Auction'}
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs truncate">{item.location}</span>
              </div>

              {/* Title */}
              <CardTitle className="text-base leading-tight line-clamp-2 text-white font-semibold">
                {item.title}
              </CardTitle>
              
              {/* Bid Info */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                {item.currentBid ? (
                  <div className="flex flex-col">
                    <span className="text-xs text-white/60">Current Bid</span>
                    <span className="font-bold text-[#d4ff00]">
                      ${item.currentBid?.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-xs text-white/60">Starting Bid</span>
                    <span className="font-bold text-white">
                      ${item.startingBid?.toLocaleString() || 'TBD'}
                    </span>
                  </div>
                )}
                
                {timeRemaining && (
                  <div className="flex items-center gap-1 text-white/80">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span className="text-xs font-medium">{timeRemaining}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </article>
      </Card>

      <ItemModal item={item} open={showModal} onOpenChange={setShowModal} />
    </>
  );
}