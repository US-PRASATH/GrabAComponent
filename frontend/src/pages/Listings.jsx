import { useState, useEffect } from 'react';
import { listingAPI } from '../services/listingAPI';
import { Search, Filter, Plus, Eye, EyeOff, MessageCircle, DollarSign, Package } from 'lucide-react';
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
      setListings(prev => prev.map(listing => 
        listing.id === listingId 
          ? { ...listing, availability: !currentAvailability }
          : listing
      ));
    } catch (error) {
      console.error('Error updating availability:', error);
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
        <div className="loading-spinner h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="mobile-heading font-bold text-gray-100">Listings</h1>
          <p className="text-gray-400 mobile-text">Browse available components for purchase</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Listing
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
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
            <label className="block text-sm font-medium text-gray-300 mb-2">
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
              className="btn-primary w-full flex items-center justify-center"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchFilters({ componentId: '', sellerId: '', availability: '', quantity: '' });
                fetchListings();
              }}
              className="btn-secondary w-full flex items-center justify-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="card group hover:scale-105 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 flex-1">
                <div className="p-2 bg-dark-800 rounded-lg">
                  <Package className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-100 group-hover:text-primary-400 transition-colors truncate">
                    {listing.component.name}
                  </h3>
                  <span className="component-type-badge">
                    {listing.component.type}
                  </span>
                </div>
              </div>
              <div className={listing.availability ? 'status-badge-available' : 'status-badge-unavailable'}>
                {listing.availability ? 'Available' : 'Sold Out'}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Seller:</span>
                <span className="text-sm font-medium text-gray-100">{listing.seller.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Quantity:</span>
                <span className="text-sm font-medium text-gray-100">{listing.quantity} units</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Price:</span>
                <span className="text-sm font-medium text-primary-400">$12.99</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button className="flex-1 btn-secondary text-sm flex items-center justify-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact
              </button>
              <button
                onClick={() => toggleAvailability(listing.id, listing.availability)}
                className={`flex-1 text-sm px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  listing.availability 
                    ? 'bg-error-900/20 text-error-400 hover:bg-error-900/30 border border-error-800/30' 
                    : 'bg-success-900/20 text-success-400 hover:bg-success-900/30 border border-success-800/30'
                }`}
              >
                {listing.availability ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Mark Sold
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Mark Available
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {listings.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-dark-800 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-100 mb-2">No listings found</h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search filters or create a new listing.
          </p>
          <button className="btn-primary">
            Create Your First Listing
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 text-sm font-medium text-gray-400 bg-dark-800 border border-dark-700 rounded-lg hover:bg-dark-700 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm font-medium text-gray-300 bg-dark-900 border border-dark-700 rounded-lg">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 text-sm font-medium text-gray-400 bg-dark-800 border border-dark-700 rounded-lg hover:bg-dark-700 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Listings;