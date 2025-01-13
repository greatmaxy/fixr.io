import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MachineSearch from './MachineSearch';
import IssuesPage from './IssuesPage';
import DowntimeAnalyticsDashboard from './DowntimeAnalyticsDashboard';

const MaintenancePortal = () => {
  const [activeTab, setActiveTab] = useState('qa');
  const navigate = useNavigate();
  // Custom icon components using basic SVG to replace unsupported lucide icons
  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );

  const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );

  const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );

  const BoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  );

  const IssueIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-alert"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
  );

  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );

  const handleCardClick = () => {
    navigate("/machine-profile"); // Navigate to the mockup page
  };

  

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center p-3 w-full hover:bg-gray-100 ${
        activeTab === id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Maintenance Portal</h1>
        </div>
        <nav className="py-4">
          <TabButton id="qa" icon={AlertIcon} label="Q&A System" />
          <TabButton id="machines" icon={Camera} label="Machine Profiles" />
          <TabButton id="kb" icon={BookIcon} label="Knowledge Base" />
          <TabButton id="issues" icon={IssueIcon} label="Issues" />
          <TabButton id="analytics" icon={IssueIcon} label="Analytics" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        {/* <header className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions, machines, or documentation..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
              <span className="mr-2">New Question</span>
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </header> */}

        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'qa' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Hydraulic pressure loss on Machine #1234</h3>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          Pending Solution
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="mr-4">Plant: North Wing</span>
                        <span>Category: Hydraulics</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Bearing replacement procedure for Model XYZ</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          Solved
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="mr-4">Machine: XYZ-789</span>
                        <span>Category: Maintenance</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recurring Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center">
                          <AlertIcon className="w-5 h-5 text-red-500 mr-2" />
                          <span>Error Code E-123</span>
                        </div>
                        <span className="text-sm text-gray-500">12 occurrences</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center">
                          <ClockIcon className="w-5 h-5 text-orange-500 mr-2" />
                          <span>Calibration Drift</span>
                        </div>
                        <span className="text-sm text-gray-500">8 occurrences</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center">
                          <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                          <span>Updated bearing replacement guide</span>
                        </div>
                        <span className="text-sm text-gray-500">2h ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center">
                          <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                          <span>New calibration procedure</span>
                        </div>
                        <span className="text-sm text-gray-500">1d ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'machines' && (
            <div className=""
            onClick={handleCardClick}>
              <MachineSearch/>
            </div>
          )}

            {activeTab === 'issues' && (
                        <div className="">
                        <IssuesPage/>
                        </div>
            )}

            {activeTab === 'analytics' && (
            <div className="">
            <DowntimeAnalyticsDashboard/>
            </div>
            )}

          {activeTab === 'kb' && (
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border rounded hover:bg-gray-50">
                      <BookIcon className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <h4 className="font-medium">Maintenance Manual v2.1</h4>
                        <p className="text-sm text-gray-500">Updated 3d ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded hover:bg-gray-50">
                      <BoxIcon className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <h4 className="font-medium">Spare Parts Catalog</h4>
                        <p className="text-sm text-gray-500">Updated 1w ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium">Spare Parts Catalog</h4>
                        <p className="text-sm text-gray-500">Updated 1w ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MaintenancePortal;