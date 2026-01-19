/**
 * Location Utilities
 * Helper functions to safely handle location data that can be either string or object
 */

/**
 * Format location for display
 * Handles both string locations and object locations from backend
 * 
 * @param {string|object} location - Location data (string or object with city, region, etc.)
 * @returns {string} Formatted location string
 */
export function formatLocation(location) {
  // Handle null/undefined
  if (!location) {
    return 'Location not specified';
  }

  // If it's already a string, return it
  if (typeof location === 'string') {
    return location;
  }

  // If it's an object, construct the location string
  if (typeof location === 'object') {
    const parts = [];
    
    if (location.city) parts.push(location.city);
    if (location.region) parts.push(location.region);
    if (location.country) parts.push(location.country);
    
    // If we have parts, join them
    if (parts.length > 0) {
      return parts.join(', ');
    }
    
    // Fallback to address_raw if available
    if (location.address_raw) {
      return location.address_raw;
    }
  }

  return 'Location not specified';
}

/**
 * Get country from location data
 * 
 * @param {string|object} location - Location data
 * @returns {string} Country name
 */
export function getCountryFromLocation(location) {
  if (!location) return 'Unknown';

  // If object, get country directly
  if (typeof location === 'object' && location.country) {
    return location.country;
  }

  // If string, parse it
  if (typeof location === 'string') {
    const parts = location.split(',').map(s => s.trim());
    return parts[parts.length - 1] || 'Unknown';
  }

  return 'Unknown';
}

/**
 * Get city from location data
 * 
 * @param {string|object} location - Location data
 * @returns {string} City name
 */
export function getCityFromLocation(location) {
  if (!location) return '';

  // If object, get city directly
  if (typeof location === 'object' && location.city) {
    return location.city;
  }

  // If string, parse it (city is usually first)
  if (typeof location === 'string') {
    const parts = location.split(',').map(s => s.trim());
    return parts[0] || '';
  }

  return '';
}

export default { formatLocation, getCountryFromLocation, getCityFromLocation };
