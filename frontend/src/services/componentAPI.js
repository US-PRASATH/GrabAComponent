import api from './api';

export const componentAPI = {
  getComponents: async (pageNo = 0, pageSize = 10) => {
    try {
      const response = await api.get(`/components?pageNo=${pageNo}&pageSize=${pageSize}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getComponentById: async (id) => {
    try {
      const response = await api.get(`/components/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  searchComponents: async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await api.get(`/components/search?${query}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postComponents: async (components) => {
    try {
      const response = await api.post('/components', components);
      return response;
    } catch (error) {
      throw error;
    }
  }
};