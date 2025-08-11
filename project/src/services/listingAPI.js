import api from './api';

export const listingAPI = {
  getListings: async (pageNo = 0, pageSize = 10) => {
    try {
      const response = await api.get(`/listings?pageNo=${pageNo}&pageSize=${pageSize}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getListingById: async (id) => {
    try {
      const response = await api.get(`/listings/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  searchListings: async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await api.get(`/listings/search?${query}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  postListings: async (listings) => {
    try {
      const response = await api.post('/listings', listings);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateListing: async (id, listing) => {
    try {
      const response = await api.put(`/listings/${id}`, listing);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteListing: async (id) => {
    try {
      const response = await api.delete(`/listings/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateAvailability: async (id, availability) => {
    try {
      const response = await api.put(`/listings/availability/${id}`, availability);
      return response;
    } catch (error) {
      throw error;
    }
  }
};