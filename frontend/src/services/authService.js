
// Import mock auth for fallback
import testAuth from './testAuth';

// Base URL for API calls - use API Gateway
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Native fetch wrapper with error handling and timeout
const fetchAPI = async (url, options = {}) => {
  // For development mode, don't send authorization header to avoid 401 errors
  // const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Temporarily disable auth header: ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
  
  config.signal = controller.signal;

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      // Convert HTTP errors to recognizable error messages for fallback
      if (response.status >= 500) {
        throw new Error('BACKEND_ERROR');
      }
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Fetch error:', error);
    
    if (error.name === 'AbortError') {
      throw new Error('TIMEOUT');
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('ERR_CONNECTION')) {
      throw new Error('NETWORK_ERROR');
    }
    
    throw error;
  }
};

const authService = {
  // Set auth token (kept for compatibility; fetchAPI reads from localStorage)
  setAuthToken: (token) => {
    try {
      if (token) {
        localStorage.setItem('token', token);
      }
    } catch (e) {
      console.error('setAuthToken failed:', e);
    }
  },

  // Remove auth token (kept for compatibility)
  removeAuthToken: () => {
    try {
      localStorage.removeItem('token');
    } catch (e) {
      console.error('removeAuthToken failed:', e);
    }
  },

  // Register user
  register: async (userData) => {
    try {
      return await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.warn('Backend registration failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR') {
        // Fall back to mock registration
        return await testAuth.mockRegister(userData);
      }
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    // For now, always use mock authentication until JWT is properly configured
    console.log('Using mock authentication for development...');
    return await testAuth.mockLogin(credentials);
    
    /* Commented out backend authentication until JWT is properly configured
    try {
      const response = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      console.log('Backend login successful:', response);
      return response;
    } catch (error) {
      console.warn('Backend login failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        console.log('Falling back to mock authentication...');
        // Fall back to mock authentication
        return await testAuth.mockLogin(credentials);
      }
      throw error;
    }
    */
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    return await fetchAPI('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  // Logout user
  logout: async () => {
    try {
      await fetchAPI('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Validate token
  validateToken: async () => {
    return await fetchAPI('/users/validate', {
      method: 'POST',
    });
  },
};

export default authService;
export { fetchAPI };