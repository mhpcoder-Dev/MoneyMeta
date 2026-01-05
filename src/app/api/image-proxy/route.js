import { NextResponse } from 'next/server';

/**
 * Image proxy to optimize and cache external auction images
 * Reduces load times by proxying through Next.js edge
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Validate URL is from allowed domains
    const allowedDomains = [
      'gcsurplus.ca',
      'gsa.gov',
      'gsaauctions.gov'
    ];
    
    const url = new URL(imageUrl);
    const isAllowed = allowedDomains.some(domain => url.hostname.includes(domain));
    
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Image domain not allowed' },
        { status: 403 }
      );
    }

    // Fetch the image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS/14.0)',
      },
      // Cache for 1 hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Return the image with caching headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'max-age=3600',
      },
    });

  } catch (error) {
    console.error('Image proxy error:', error);
    
    // Return a placeholder image on error
    return NextResponse.redirect('/images/placeholder-auction.jpg');
  }
}
