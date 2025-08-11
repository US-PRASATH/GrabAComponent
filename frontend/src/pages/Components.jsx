import { useState, useEffect } from 'react';
import { componentAPI } from '../services/componentAPI';
import React from 'react';

const Components = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchComponents();
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm || selectedType) {
      handleSearch();
    } else {
      fetchComponents();
    }
    // eslint-disable-next-line
  }, [searchTerm, selectedType]);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const res = await componentAPI.getComponents(currentPage);
      setComponents(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setComponents([]);
      setTotalPages(0);
      console.error('Error fetching components:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (searchTerm) filters.name = searchTerm;
      if (selectedType) filters.type = selectedType;
      filters.pageNo = currentPage;
      const res = await componentAPI.searchComponents(filters);
      setComponents(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setComponents([]);
      setTotalPages(0);
      console.error('Error searching components:', error);
    } finally {
      setLoading(false);
    }
  };

  const componentTypes = [
    'Microcontroller',
    'Single Board Computer',
    'WiFi Module',
    'Sensor',
    'Motor',
    'LED',
    'Driver',
    'Display',
    'Power Supply',
    'Resistor',
    'Capacitor',
    'IC'
  ];

  if (loading && components.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Components</h1>
          <p className="mt-2 text-gray-600">Browse our extensive catalog of electronic components</p>
        </div>
        <button className="btn-primary">
          Add Component
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Components
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Component Type
            </label>
            <select
              className="input-field"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {componentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                fetchComponents();
              }}
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <div key={component.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {component.name}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-3">
                  {component.type}
                </span>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {component.description}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                View Details
              </button>
              <button className="btn-primary text-sm py-1 px-3">
                Create Listing
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {components.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 text-4xl mb-4">🔧</div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No components found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedType ? 'Try adjusting your search filters.' : 'Get started by adding your first component.'}
          </p>
        </div>
      )}

      {/* Pagination (if needed) */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Components;