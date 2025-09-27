// Base URL for API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Native fetch wrapper with error handling
const fetchAPI = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
      throw new Error('Unauthorized');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const authService = {
  // Register user
  register: async (userData) => {
    return await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
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