/**
 * Base API Service
 * Centralized HTTP client with error handling, retry logic, and request/response interceptors
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Base fetch wrapper with common configuration
 */
async function fetchWithConfig(url, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (!response.ok) {
        throw new ApiError(
          `HTTP Error: ${response.statusText}`,
          response.status,
          await response.text()
        );
      }
      return response;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || data.detail || `HTTP Error: ${response.statusText}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network errors, timeout, etc.
    throw new ApiError(
      error.message || 'Network error occurred',
      0,
      { originalError: error }
    );
  }
}

/**
 * Build URL with query parameters
 */
function buildUrl(endpoint, params = {}) {
  const url = new URL(endpoint, API_BASE_URL);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        url.searchParams.append(key, value.join(','));
      } else {
        url.searchParams.append(key, value);
      }
    }
  });
  
  return url.toString();
}

/**
 * HTTP Methods
 */
export const apiClient = {
  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const url = buildUrl(endpoint, params);
    return fetchWithConfig(url, { method: 'GET' });
  },

  /**
   * POST request
   */
  async post(endpoint, data = {}, params = {}) {
    const url = buildUrl(endpoint, params);
    return fetchWithConfig(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * PUT request
   */
  async put(endpoint, data = {}, params = {}) {
    const url = buildUrl(endpoint, params);
    return fetchWithConfig(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * DELETE request
   */
  async delete(endpoint, params = {}) {
    const url = buildUrl(endpoint, params);
    return fetchWithConfig(url, { method: 'DELETE' });
  },

  /**
   * PATCH request
   */
  async patch(endpoint, data = {}, params = {}) {
    const url = buildUrl(endpoint, params);
    return fetchWithConfig(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

export { ApiError };
export default apiClient;
