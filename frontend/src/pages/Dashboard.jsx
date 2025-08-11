import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { componentAPI } from '../services/componentAPI';
import { listingAPI } from '../services/listingAPI';
import { requestAPI } from '../services/requestAPI';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Users, 
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
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
      // Mock data for demonstration
      setStats({
        components: 125,
        listings: 89,
        requests: 45,
        loading: false
      });

      setRecentComponents([
        { id: 1, name: "Arduino Uno R3", type: "Microcontroller", description: "Popular development board for prototyping" },
        { id: 2, name: "Raspberry Pi 4", type: "Single Board Computer", description: "Powerful mini computer for IoT projects" },
        { id: 3, name: "ESP32 WiFi Module", type: "WiFi Module", description: "IoT connectivity solution with Bluetooth" }
      ]);

      setRecentListings([
        { id: 1, component: { name: "Arduino Nano" }, seller: { name: "John Doe" }, quantity: 5, availability: true, price: "$12.99" },
        { id: 2, component: { name: "LED Strip 5m" }, seller: { name: "Jane Smith" }, quantity: 10, availability: true, price: "$24.99" },
        { id: 3, component: { name: "Servo Motor SG90" }, seller: { name: "Bob Johnson" }, quantity: 20, availability: false, price: "$8.50" }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, link, trend }) => (
    <div className="card group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl ${color} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-100">{value}</p>
            {trend && (
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-success-400 mr-1" />
                <span className="text-xs text-success-400">+{trend}% this month</span>
              </div>
            )}
          </div>
        </div>
        <Link 
          to={link} 
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-dark-800 rounded-lg"
        >
          <ArrowUpRight className="w-5 h-5 text-gray-400 hover:text-primary-400" />
        </Link>
      </div>
    </div>
  );

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="relative overflow-hidden">
        <div className="card bg-gradient-to-r from-primary-600/20 to-accent-600/20 border-primary-800/30">
          <div className="relative z-10">
            <h1 className="mobile-heading font-bold text-gray-100 mb-2">
              Welcome to GrabAComponent! 👋
            </h1>
            <p className="text-gray-300 mobile-text mb-6">
              Your one-stop marketplace for electronic components. Buy, sell, and request components with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/components" className="btn-primary inline-flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Browse Components
              </Link>
              <Link to="/listings" className="btn-secondary inline-flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Listings
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Components"
          value={stats.components}
          icon={Package}
          color="bg-gradient-to-r from-blue-600 to-blue-700"
          link="/components"
          trend={12}
        />
        <StatCard
          title="Active Listings"
          value={stats.listings}
          icon={ShoppingCart}
          color="bg-gradient-to-r from-success-600 to-success-700"
          link="/listings"
          trend={8}
        />
        <StatCard
          title="Open Requests"
          value={stats.requests}
          icon={MessageSquare}
          color="bg-gradient-to-r from-purple-600 to-purple-700"
          link="/requests"
          trend={15}
        />
        <StatCard
          title="Active Users"
          value="1.2k"
          icon={Users}
          color="bg-gradient-to-r from-accent-600 to-accent-700"
          link="/profile"
          trend={5}
        />
      </div>

      {/* Recent sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Components */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-600/20 rounded-lg">
                <Package className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100">Recent Components</h3>
            </div>
            <Link to="/components" className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center">
              View all
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentComponents.map((component) => (
              <div key={component.id} className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg hover:bg-dark-800/50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-100">{component.name}</p>
                  <p className="text-sm text-gray-400">{component.type}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{component.description}</p>
                </div>
                <div className="status-badge-available">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Available
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Listings */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success-600/20 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-success-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100">Recent Listings</h3>
            </div>
            <Link to="/listings" className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center">
              View all
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg hover:bg-dark-800/50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-100">{listing.component.name}</p>
                  <p className="text-sm text-gray-400">by {listing.seller.name}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-xs text-gray-500">Qty: {listing.quantity}</span>
                    <span className="text-xs font-medium text-primary-400">{listing.price}</span>
                  </div>
                </div>
                <div className={listing.availability ? 'status-badge-available' : 'status-badge-unavailable'}>
                  {listing.availability ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Available
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Sold Out
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-600/20 rounded-lg">
              <Activity className="w-5 h-5 text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100">Recent Activity</h3>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { id: 1, action: "New listing created", item: "Arduino Uno R3", time: "2 minutes ago", type: "listing" },
            { id: 2, action: "Component request fulfilled", item: "ESP32 Module", time: "15 minutes ago", type: "request" },
            { id: 3, action: "New component added", item: "Raspberry Pi 4", time: "1 hour ago", type: "component" },
            { id: 4, action: "Listing updated", item: "LED Strip", time: "2 hours ago", type: "listing" }
          ].map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 bg-dark-800/20 rounded-lg">
              <div className={`p-2 rounded-lg ${
                activity.type === 'listing' ? 'bg-success-600/20' :
                activity.type === 'request' ? 'bg-purple-600/20' :
                'bg-primary-600/20'
              }`}>
                {activity.type === 'listing' && <ShoppingCart className="w-4 h-4 text-success-400" />}
                {activity.type === 'request' && <MessageSquare className="w-4 h-4 text-purple-400" />}
                {activity.type === 'component' && <Package className="w-4 h-4 text-primary-400" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-100">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.item}</p>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-100 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Package, label: "Browse Components", link: "/components", color: "hover:bg-primary-600/10" },
            { icon: ShoppingCart, label: "View Listings", link: "/listings", color: "hover:bg-success-600/10" },
            { icon: MessageSquare, label: "Make Request", link: "/requests", color: "hover:bg-purple-600/10" },
            { icon: Users, label: "Profile Settings", link: "/profile", color: "hover:bg-accent-600/10" }
          ].map((action, index) => (
            <Link 
              key={index}
              to={action.link} 
              className={`flex flex-col items-center p-6 border border-dark-700 rounded-xl transition-all duration-200 ${action.color} hover:border-dark-600 group`}
            >
              <action.icon className="w-8 h-8 text-gray-400 group-hover:text-gray-300 mb-3" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-gray-100 text-center">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;