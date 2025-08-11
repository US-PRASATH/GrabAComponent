import { useState, useEffect } from 'react';
import { listingAPI } from '../services/listingAPI';
import React from 'react';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    componentId: '',
    sellerId: '',
    availability: '',
    quantity: ''
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await listingAPI.getListings(currentPage);
      setListings(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setListings([]);
      setTotalPages(0);
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (searchFilters.availability) filters.availability = searchFilters.availability;
      if (searchFilters.quantity) filters.quantity = searchFilters.quantity;
      filters.pageNo = currentPage;
      const res = await listingAPI.searchListings(filters);
      setListings(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setListings([]);
      setTotalPages(0);
      console.error('Error searching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (listingId, currentAvailability) => {
    try {
      // Update local state immediately for better UX
      setListings(prev => prev.map(listing => 
        listing.id === listingId 
          ? { ...listing, availability: !currentAvailability }
          : listing
      ));
      
      // API call would go here
      // await listingAPI.updateAvailability(listingId, !currentAvailability);
    } catch (error) {
      console.error('Error updating availability:', error);
      // Revert the change if API call fails
      setListings(prev => prev.map(listing => 
        listing.id === listingId 
          ? { ...listing, availability: currentAvailability }
          : listing
      ));
    }
  };

  if (loading && listings.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listings</h1>
          <p className="mt-2 text-gray-600">Browse available components for purchase</p>
        </div>
        <button className="btn-primary">
          Create Listing
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              className="input-field"
              value={searchFilters.availability}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, availability: e.target.value }))}
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Sold Out</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Quantity
            </label>
            <input
              type="number"
              min="0"
              placeholder="Enter minimum quantity"
              className="input-field"
              value={searchFilters.quantity}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, quantity: e.target.value }))}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="btn-primary w-full"
            >
              Search
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchFilters({ componentId: '', sellerId: '', availability: '', quantity: '' });
                fetchListings();
              }}
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {listing.component.name}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {listing.component.type}
                </span>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  listing.availability 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {listing.availability ? 'Available' : 'Sold Out'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Seller:</span>
                <span className="text-sm font-medium text-gray-900">{listing.seller.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quantity:</span>
                <span className="text-sm font-medium text-gray-900">{listing.quantity}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Contact Seller
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleAvailability(listing.id, listing.availability)}
                  className={`text-sm px-3 py-1 rounded ${
                    listing.availability 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {listing.availability ? 'Mark Sold' : 'Mark Available'}
                </button>
                <button className="btn-primary text-sm py-1 px-3">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {listings.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 text-4xl mb-4">🛍️</div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No listings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search filters or create a new listing.
          </p>
          <button className="mt-4 btn-primary">
            Create Your First Listing
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;