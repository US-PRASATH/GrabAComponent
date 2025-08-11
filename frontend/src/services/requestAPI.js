import api from './api';

export const requestAPI = {
  getRequests: async (pageNo = 0, pageSize = 10) => {
    try {
      const response = await api.get(`/requests?pageNo=${pageNo}&pageSize=${pageSize}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  searchRequests: async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await api.get(`/requests/search?${query}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postRequests: async (requests) => {
    try {
      const response = await api.post('/requests', requests);
      return response;
    } catch (error) {
      throw error;
    }
  }
};