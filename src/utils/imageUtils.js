/**
 * Image utility to optimize external auction images
 */

export function getOptimizedImageUrl(imageUrl, options = {}) {
  if (!imageUrl) return null;
  
  // If it's already a local image, return as is
  if (imageUrl.startsWith('/')) return imageUrl;
  
  const { 
    width = 800, 
    quality = 75,
    useProxy = true // Set to false to load directly (faster but no optimization)
  } = options;
  
  // For development/testing: Skip proxy for faster loads
  if (!useProxy || process.env.NODE_ENV === 'development') {
    return imageUrl;
  }
  
  // Use Next.js image proxy for caching and optimization
  const params = new URLSearchParams({
    url: imageUrl,
    w: width,
    q: quality
  });
  
  return `/api/image-proxy?${params.toString()}`;
}

export function getPlaceholderImage() {
  // Return a lightweight SVG placeholder
  return 'data:image/svg+xml;base64,' + btoa(`
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#e5e7eb"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
        Loading Image...
      </text>
    </svg>
  `);
}
