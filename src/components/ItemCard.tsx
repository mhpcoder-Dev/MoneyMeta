import { AuctionItem } from '@/types/auction';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';
import { getAssetTypeLabel } from '@/lib/assetClassifier';
import { useState, useEffect } from 'react';
import ItemModal from './ItemModal';
import { supabase } from '@/integrations/supabase/client';
import { DATA_SOURCES } from '@/lib/dataFetcher';

interface ItemCardProps {
  item: AuctionItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const [showModal, setShowModal] = useState(false);

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
        className="scroll-mt-24 shadow-card hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full"
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
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-muted">
              <img
                src={primaryImage}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="font-semibold shadow-lg backdrop-blur-md bg-secondary/95 hover:bg-secondary border border-secondary-foreground/20">
                  {getAssetTypeLabel(item.assetType)}
                </Badge>
              </div>
              {!item.isActive && (
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="font-semibold shadow-lg backdrop-blur-md bg-background/95 hover:bg-background border-2">Historical</Badge>
                </div>
              )}
            </div>
          )}

          <CardHeader className="flex-grow pb-3">
            <CardTitle className="text-lg leading-tight line-clamp-2">{item.title}</CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
              
              {timeRemaining && (
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{timeRemaining}</span>
                </div>
              )}
            </div>
          </CardContent>
        </article>
      </Card>

      <ItemModal item={item} open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
