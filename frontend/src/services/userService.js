import { fetchAPI } from './authService';

const userService = {
  // Get user profile
  getUserProfile: async (userId) => {
    return await fetchAPI(`/users/profile/${userId}`, { method: 'GET' });
  },

  // Get user by username
  getUserByUsername: async (username) => {
    return await fetchAPI(`/users/username/${username}`, { method: 'GET' });
  },

  // Get all users (teachers only)
  getAllUsers: async (role = null, active = null) => {
    let url = '/users';
    const params = new URLSearchParams();
    
    if (role) params.append('role', role);
    if (active !== null) params.append('active', active);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    return await fetchAPI(url, { method: 'GET' });
  },

  // Get users by role
  getUsersByRole: async (role) => {
    return await fetchAPI(`/users/role/${role}`, { method: 'GET' });
  },

  // Search users
  searchUsers: async (query) => {
    return await fetchAPI(`/users/search?query=${encodeURIComponent(query)}`, { method: 'GET' });
  },

  // Update user profile
  updateUserProfile: async (userId, userData) => {
    return await fetchAPI(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Activate user (admin only)
  activateUser: async (userId) => {
    return await fetchAPI(`/users/${userId}/activate`, { method: 'PUT' });
  },

  // Deactivate user (admin only)
  deactivateUser: async (userId) => {
    return await fetchAPI(`/users/${userId}/deactivate`, { method: 'PUT' });
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    return await fetchAPI(`/users/${userId}`, { method: 'DELETE' });
  },

  // Validate token
  validateToken: async (token) => {
    return await fetchAPI('/users/validate', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

export default userService;