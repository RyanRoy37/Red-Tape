// API utilities for communicating with the backend
// Handles all HTTP requests to the phishing detection service

const API_CONFIG = {
  BASE_URL: 'http://localhost:4000',
  ENDPOINTS: {
    SCAN_URL: '/endpoints/scan_url'
  },
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY: 1000 // 1 second
};

class PhishingAPI {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }
  
  /**
   * Scan a URL for phishing threats
   * @param {string} url - The URL to scan
   * @returns {Promise<Object>} Scan results
   */
  async scanUrl(url) {
    const endpoint = `${this.baseUrl}${API_CONFIG.ENDPOINTS.SCAN_URL}`;
    
    try {
      const response = await this.fetchWithTimeout(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      }, this.timeout);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate response structure
      if (!this.isValidResponse(data)) {
        throw new Error('Invalid response format from backend');
      }
      
      return data;
      
    } catch (error) {
      console.error('API Error:', error);
      throw this.handleError(error);
    }
  }
  
  /**
   * Scan URL with retry logic
   * @param {string} url - The URL to scan
   * @param {number} attempts - Number of retry attempts
   * @returns {Promise<Object>} Scan results
   */
  async scanUrlWithRetry(url, attempts = API_CONFIG.RETRY_ATTEMPTS) {
    for (let i = 0; i <= attempts; i++) {
      try {
        return await this.scanUrl(url);
      } catch (error) {
        if (i === attempts) {
          // Last attempt failed, throw error
          throw error;
        }
        
        // Wait before retry
        await this.delay(API_CONFIG.RETRY_DELAY * (i + 1));
        console.log(`Retrying scan... Attempt ${i + 2}/${attempts + 1}`);
      }
    }
  }
  
  /**
   * Check if backend service is online
   * @returns {Promise<boolean>} Service status
   */
  async checkServiceStatus() {
    try {
      const response = await this.fetchWithTimeout(
        `${this.baseUrl}${API_CONFIG.ENDPOINTS.SCAN_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: 'https://example.com' })
        },
        5000 // 5 second timeout for status check
      );
      
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Fetch with timeout
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<Response>}
   */
  async fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  
  /**
   * Validate API response structure
   * @param {Object} data - Response data
   * @returns {boolean}
   */
  isValidResponse(data) {
    return (
      data &&
      typeof data === 'object' &&
      'url' in data &&
      'is_phishing' in data &&
      'risk_score' in data &&
      typeof data.is_phishing === 'boolean' &&
      typeof data.risk_score === 'number' &&
      data.risk_score >= 0 &&
      data.risk_score <= 100
    );
  }
  
  /**
   * Handle and format API errors
   * @param {Error} error - Original error
   * @returns {Error} Formatted error
   */
  handleError(error) {
    if (error.name === 'AbortError') {
      return new Error('REQUEST_TIMEOUT');
    }
    
    if (error.message.includes('Failed to fetch')) {
      return new Error('CONNECTION_FAILED');
    }
    
    if (error.message.includes('HTTP')) {
      return new Error('SERVER_ERROR');
    }
    
    return error;
  }
  
  /**
   * Delay helper for retry logic
   * @param {number} ms - Delay in milliseconds
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Get API configuration
   * @returns {Object} Current configuration
   */
  getConfig() {
    return {
      baseUrl: this.baseUrl,
      timeout: this.timeout,
      endpoints: API_CONFIG.ENDPOINTS
    };
  }
  
  /**
   * Update API configuration
   * @param {Object} config - New configuration
   */
  setConfig(config) {
    if (config.baseUrl) this.baseUrl = config.baseUrl;
    if (config.timeout) this.timeout = config.timeout;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhishingAPI;
} else {
  window.PhishingAPI = PhishingAPI;
}

// Create singleton instance
const apiInstance = new PhishingAPI();

// Export singleton for convenience
if (typeof module !== 'undefined' && module.exports) {
  module.exports.api = apiInstance;
} else {
  window.phishingAPI = apiInstance;
}