const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // Increased to 120 seconds for service startup
  config.signal = controller.signal;

  try {
    console.log(`Making API call to: ${API_BASE_URL}${url}`);
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
      }
      
      console.error('API Error:', response.status, errorData);
      
      if (response.status === 401) {
        throw new Error('Invalid username or password');
      }
      if (response.status === 403) {
        throw new Error('Access denied');
      }
      if (response.status === 409) {
        throw new Error(errorData.message || 'User already exists with this email or username');
      }
      if (response.status >= 500) {
        throw new Error(`Server error (${response.status}): ${errorData.message || 'Please check if database is running and services are properly configured'}`);
      }
      if (response.status === 404) {
        throw new Error('Service endpoint not found. Please check if all microservices are running and registered with Eureka.');
      }
      
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response received successfully');
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Fetch error:', error);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out after 2 minutes. Services may still be starting up. Please wait a bit longer and try again. Check if all services are running at:\n- Eureka Server: http://localhost:8761\n- API Gateway: http://localhost:8080\n- User Service: http://localhost:8083');
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('ECONNREFUSED')) {
      throw new Error('Cannot connect to API Gateway on localhost:8080. Please ensure all backend services are running and registered:\n\n1. Check Eureka Dashboard: http://localhost:8761\n2. Verify services are registered\n3. Wait 2-3 minutes after starting services\n4. Check MySQL is running\n\nIf services just started, please wait a few minutes for complete registration.');
    }
    
    if (error.message.includes('TypeError: Failed to fetch')) {
      throw new Error('Network error: Cannot reach the backend services. Please check if:\n1. All services are running\n2. No firewall is blocking the connections\n3. CORS is properly configured');
    }
    
    throw error;
  }
};



const authService = {
  setAuthToken: (token) => {
    try {
      if (token) {
        localStorage.setItem('token', token);
      }
    } catch (e) {
      console.error('setAuthToken failed:', e);
    }
  },

  removeAuthToken: () => {
    try {
      localStorage.removeItem('token');
    } catch (e) {
      console.error('removeAuthToken failed:', e);
    }
  },

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