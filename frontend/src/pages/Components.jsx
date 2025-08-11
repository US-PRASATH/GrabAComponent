import { useState, useEffect } from 'react';
import { componentAPI } from '../services/componentAPI';
import { Search, Filter, Plus, Grid, List, Package, Zap, Cpu, Wifi } from 'lucide-react';
import React from 'react';

const Components = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

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
    { value: 'Microcontroller', icon: Cpu, color: 'text-blue-400' },
    { value: 'Single Board Computer', icon: Cpu, color: 'text-purple-400' },
    { value: 'WiFi Module', icon: Wifi, color: 'text-green-400' },
    { value: 'Sensor', icon: Zap, color: 'text-yellow-400' },
    { value: 'Motor', icon: Zap, color: 'text-red-400' },
    { value: 'LED', icon: Zap, color: 'text-pink-400' },
    { value: 'Driver', icon: Package, color: 'text-indigo-400' },
    { value: 'Display', icon: Package, color: 'text-cyan-400' },
    { value: 'Power Supply', icon: Zap, color: 'text-orange-400' },
    { value: 'Resistor', icon: Package, color: 'text-gray-400' },
    { value: 'Capacitor', icon: Package, color: 'text-teal-400' },
    { value: 'IC', icon: Cpu, color: 'text-emerald-400' }
  ];

  const getTypeIcon = (type) => {
    const typeInfo = componentTypes.find(t => t.value === type);
    return typeInfo ? { Icon: typeInfo.icon, color: typeInfo.color } : { Icon: Package, color: 'text-gray-400' };
  };

  if (loading && components.length === 0) {
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
          <h1 className="mobile-heading font-bold text-gray-100">Components</h1>
          <p className="text-gray-400 mobile-text">Browse our extensive catalog of electronic components</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Component
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search components by name..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full lg:w-64">
            <select
              className="input-field"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {componentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.value}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-gray-300'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-gray-300'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('');
              fetchComponents();
            }}
            className="btn-secondary flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Clear
          </button>
        </div>
      </div>

      {/* Components Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {components.map((component) => {
            const { Icon, color } = getTypeIcon(component.type);
            return (
              <div key={component.id} className="card group hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-dark-800 rounded-lg">
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-100 group-hover:text-primary-400 transition-colors">
                        {component.name}
                      </h3>
                      <span className="component-type-badge">
                        {component.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {component.description}
                </p>
                <div className="flex justify-between items-center">
                  <button className="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors">
                    View Details
                  </button>
                  <button className="btn-primary text-sm py-2 px-4">
                    Create Listing
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <div className="divide-y divide-dark-800">
            {components.map((component) => {
              const { Icon, color } = getTypeIcon(component.type);
              return (
                <div key={component.id} className="py-4 first:pt-0 last:pb-0 hover:bg-dark-800/30 -mx-6 px-6 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="p-2 bg-dark-800 rounded-lg">
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-100 truncate">{component.name}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="component-type-badge">
                            {component.type}
                          </span>
                          <p className="text-gray-400 text-sm truncate">{component.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      <button className="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors">
                        View Details
                      </button>
                      <button className="btn-primary text-sm py-2 px-4">
                        Create Listing
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {components.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-dark-800 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-100 mb-2">No components found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || selectedType ? 'Try adjusting your search filters.' : 'Get started by adding your first component.'}
          </p>
          <button className="btn-primary">
            Add Component
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

export default Components;