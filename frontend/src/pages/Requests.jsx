import { useState, useEffect } from 'react';
import { requestAPI } from '../services/requestAPI';
import React from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    component: '',
    requester: '',
    isOpen: ''
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    componentName: '',
    quantity: 1,
    description: ''
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await requestAPI.getRequests(currentPage);
      setRequests(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setRequests([]);
      setTotalPages(0);
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (searchFilters.isOpen) filters.isOpen = searchFilters.isOpen;
      if (searchFilters.requester) filters.requester = searchFilters.requester;
      filters.pageNo = currentPage;
      const res = await requestAPI.searchRequests(filters);
      setRequests(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setRequests([]);
      setTotalPages(0);
      console.error('Error searching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      // Mock API call - in real app, this would create the request
      const mockNewRequest = {
        id: requests.length + 1,
        requester: {
          id: 1,
          name: "Current User",
          username: "currentuser"
        },
        component: {
          id: requests.length + 1,
          name: newRequest.componentName,
          type: "Unknown"
        },
        quantity: parseInt(newRequest.quantity),
        isOpen: true
      };

      setRequests(prev => [mockNewRequest, ...prev]);
      setShowCreateModal(false);
      setNewRequest({ componentName: '', quantity: 1, description: '' });
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  const toggleRequestStatus = async (requestId, currentStatus) => {
    try {
      // Update local state immediately for better UX
      setRequests(prev => prev.map(request => 
        request.id === requestId 
          ? { ...request, isOpen: !currentStatus }
          : request
      ));
      
      // API call would go here
    } catch (error) {
      console.error('Error updating request status:', error);
      // Revert the change if API call fails
      setRequests(prev => prev.map(request => 
        request.id === requestId 
          ? { ...request, isOpen: currentStatus }
          : request
      ));
    }
  };

  if (loading && requests.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Component Requests</h1>
          <p className="mt-2 text-gray-600">Browse and create requests for needed components</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          Create Request
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="input-field"
              value={searchFilters.isOpen}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, isOpen: e.target.value }))}
            >
              <option value="">All Requests</option>
              <option value="true">Open</option>
              <option value="false">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requester
            </label>
            <input
              type="text"
              placeholder="Search by requester name"
              className="input-field"
              value={searchFilters.requester}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, requester: e.target.value }))}
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
                setSearchFilters({ component: '', requester: '', isOpen: '' });
                fetchRequests();
              }}
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div key={request.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {request.component.name}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {request.component.type}
                </span>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  request.isOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {request.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Requested by:</span>
                <span className="text-sm font-medium text-gray-900">{request.requester.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quantity:</span>
                <span className="text-sm font-medium text-gray-900">{request.quantity}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Contact Requester
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleRequestStatus(request.id, request.isOpen)}
                  className={`text-sm px-3 py-1 rounded ${
                    request.isOpen 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {request.isOpen ? 'Mark Closed' : 'Reopen'}
                </button>
                <button className="btn-primary text-sm py-1 px-3">
                  Respond
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {requests.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 text-4xl mb-4">📝</div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search filters or create a new request.
          </p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="mt-4 btn-primary"
          >
            Create Your First Request
          </button>
        </div>
      )}

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Request</h3>
              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Component Name
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="Enter component name"
                    value={newRequest.componentName}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, componentName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="input-field"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, quantity: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    className="input-field"
                    rows="3"
                    placeholder="Additional details about your request"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;