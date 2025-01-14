import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Settings,
  AlertCircle,
  MessageSquare,
  BarChart,
  Bell,
  Plus,
  Home,
  Boxes
} from 'lucide-react';

import MachineSearch from './MachineSearch';
import IssuePage from './IssuesPage';
import ForumsPage from './ForumsPage';
import DowntimeAnalyticsDashboard from './DowntimeAnalyticsDashboard';
import SparePartsInventory from './SparePartInventory';

// Dashboard Content Component
const DashboardContent = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Machines</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <Settings className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Open Issues</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Forum Posts</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <MessageSquare className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">System Health</p>
              <p className="text-2xl font-bold">98%</p>
            </div>
            <BarChart className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <div>
              <p className="font-medium">New Issue Reported</p>
              <p className="text-sm text-gray-500">CNC-001 Calibration Error</p>
            </div>
            <span className="text-sm text-gray-500 ml-auto">5 mins ago</span>
          </div>
          <div className="flex items-center gap-4">
            <MessageSquare className="w-8 h-8 text-green-500" />
            <div>
              <p className="font-medium">New Forum Post</p>
              <p className="text-sm text-gray-500">Maintenance Schedule Question</p>
            </div>
            <span className="text-sm text-gray-500 ml-auto">15 mins ago</span>
          </div>
          <div className="flex items-center gap-4">
            <Settings className="w-8 h-8 text-blue-500" />
            <div>
              <p className="font-medium">Machine Status Update</p>
              <p className="text-sm text-gray-500">DRL-002 Back Online</p>
            </div>
            <span className="text-sm text-gray-500 ml-auto">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navigation = [
    { name: 'Dashboard', icon: Home, id: 'dashboard' },
    { name: 'Machines', icon: Settings, id: 'machines' },
    { name: 'Issues', icon: AlertCircle, id: 'issues' },
    { name: 'Forum', icon: MessageSquare, id: 'forum' },
    { name: 'Analytics', icon: BarChart, id: 'analytics' },
    { name: 'Spare Parts', icon: Boxes, id: 'inventory' },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'machines':
        return <MachineSearch />;
      case 'issues':
        return <IssuePage />;
      case 'forum':
        return <ForumsPage />;
      case 'analytics':
        return <DowntimeAnalyticsDashboard />;
      case 'inventory':
          return <SparePartsInventory />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b">
            <h1 className="text-xl font-bold">Machine Monitor</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  currentPage === item.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <img
                src="/api/placeholder/32/32"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Header */}
        {currentPage === "dashboard" && (
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold">
              {navigation.find(item => item.id === currentPage)?.name}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Quick Actions
            </Button>
          </div>
        </header>
        )}


        {/* Dynamic Content Area */}
        <main className="h-[calc(100vh-4rem)] overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default HomePage;