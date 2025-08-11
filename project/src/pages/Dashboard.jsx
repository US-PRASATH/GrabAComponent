import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { componentAPI } from '../services/componentAPI';
import { listingAPI } from '../services/listingAPI';
import { requestAPI } from '../services/requestAPI';
import React from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    components: 0,
    listings: 0,
    requests: 0,
    loading: true
  });
  const [recentComponents, setRecentComponents] = useState([]);
  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats with dummy data
      const [componentsRes, listingsRes, requestsRes] = await Promise.all([
        componentAPI.getComponents(0, 5),
        listingAPI.getListings(0, 5),
        requestAPI.getRequests(0, 5)
      ]);

      // Mock data for demonstration
      setStats({
        components: 125,
        listings: 89,
        requests: 45,
        loading: false
      });

      // Mock recent data
      setRecentComponents([
        { id: 1, name: "Arduino Uno R3", type: "Microcontroller", description: "Popular development board" },
        { id: 2, name: "Raspberry Pi 4", type: "Single Board Computer", description: "Powerful mini computer" },
        { id: 3, name: "ESP32 WiFi Module", type: "WiFi Module", description: "IoT connectivity solution" }
      ]);

      setRecentListings([
        { id: 1, component: { name: "Arduino Nano" }, seller: { name: "John Doe" }, quantity: 5, availability: true },
        { id: 2, component: { name: "LED Strip 5m" }, seller: { name: "Jane Smith" }, quantity: 10, availability: true },
        { id: 3, component: { name: "Servo Motor SG90" }, seller: { name: "Bob Johnson" }, quantity: 20, availability: false }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const StatCard = ({ title, value, icon, color, link }) => (
    <div className="card p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-lg ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-medium text-gray-900">{value}</dd>
          </dl>
        </div>
        <div className="ml-5 flex-shrink-0">
          <Link to={link} className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            View all →
          </Link>
        </div>
      </div>
    </div>
  );

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white p-6">
        <h1 className="text-3xl font-bold">Welcome to GrabAComponent!</h1>
        <p className="mt-2 text-primary-100">
          Your one-stop marketplace for electronic components. Buy, sell, and request components with ease.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Components"
          value={stats.components}
          icon="🔧"
          color="bg-blue-100 text-blue-600"
          link="/components"
        />
        <StatCard
          title="Active Listings"
          value={stats.listings}
          icon="🛍️"
          color="bg-green-100 text-green-600"
          link="/listings"
        />
        <StatCard
          title="Open Requests"
          value={stats.requests}
          icon="📝"
          color="bg-purple-100 text-purple-600"
          link="/requests"
        />
      </div>

      {/* Recent sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Components */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Components</h3>
              <Link to="/components" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentComponents.map((component) => (
              <div key={component.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{component.name}</p>
                    <p className="text-sm text-gray-500">{component.type}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Listings */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Listings</h3>
              <Link to="/listings" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentListings.map((listing) => (
              <div key={listing.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{listing.component.name}</p>
                    <p className="text-sm text-gray-500">by {listing.seller.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Qty: {listing.quantity}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      listing.availability 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {listing.availability ? 'Available' : 'Sold Out'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/components" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2">🔍</span>
            <span className="text-sm font-medium">Browse Components</span>
          </Link>
          <Link to="/listings" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2">🛒</span>
            <span className="text-sm font-medium">View Listings</span>
          </Link>
          <Link to="/requests" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2">📋</span>
            <span className="text-sm font-medium">Make Request</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2">⚙️</span>
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;