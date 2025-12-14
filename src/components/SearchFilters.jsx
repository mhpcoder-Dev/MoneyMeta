'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

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

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCountries,
  onCountryToggle,
  selectedAssetTypes,
  onAssetTypeToggle,
  availableCountries,
}) {
  const assetTypes = [
    'land', 'real-estate', 'vehicles', 'motorcycles', 
    'electronics', 'industrial', 'furniture', 'collectibles'
  ];

  const clearAllFilters = () => {
    onSearchChange('');
    selectedCountries.forEach(country => onCountryToggle(country));
    selectedAssetTypes.forEach(type => onAssetTypeToggle(type));
  };

  const hasActiveFilters = searchQuery || selectedCountries.length > 0 || selectedAssetTypes.length > 0;

  return (
    <div className="space-y-4 bg-[#1a1f3a] rounded-xl p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
        <Input
          type="text"
          placeholder="Search auctions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-[#0f1429] border-white/10 text-white placeholder:text-white/40 focus:ring-[#d4ff00] focus:border-[#d4ff00]"
        />
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">Active filters:</span>
          <Button
            onClick={clearAllFilters}
            size="sm"
            variant="ghost"
            className="h-8 text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      )}

      {/* Asset type filters */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white">Asset Types</h3>
        <div className="flex flex-wrap gap-2">
          {assetTypes.map((type) => (
            <Badge
              key={type}
              variant={selectedAssetTypes.includes(type) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedAssetTypes.includes(type)
                  ? "bg-[#d4ff00] text-[#0a0e27] hover:bg-[#d4ff00]/90 font-semibold"
                  : "bg-transparent border-white/30 text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => onAssetTypeToggle(type)}
            >
              {getAssetTypeLabel(type)}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}