import api from './api';

export const authAPI = {
  login: async (credentials) => {
    try {
      // Call backend login endpoint
      const response = await api.post('/api/auth/login', credentials);
      // Expecting response: { token: '...', user: {...} }
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  },

  register: async (userData) => {
    try {
      // You may want to update this to call your backend register endpoint
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  }
};