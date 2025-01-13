import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle, Settings, Calendar, MapPin } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const MachineSVG = () => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    {/* Base Platform */}
    <path d="M200 400 L600 400 L700 350 L300 350 Z" fill="#434B4D"/>
   
    {/* Machine Body */}
    <path d="M250 350 L250 200 L600 200 L600 350 Z" fill="#5C6BC0"/>
    <path d="M600 200 L700 150 L700 350 L600 350 Z" fill="#3949AB"/>
    <path d="M250 200 L350 150 L700 150 L600 200 Z" fill="#7986CB"/>
   
    {/* Control Panel */}
    <path d="M500 250 L580 250 L580 320 L500 320 Z" fill="#263238"/>
    <rect x="510" y="260" width="60" height="30" fill="#37474F"/>
    <circle cx="520" cy="305" r="5" fill="#4CAF50"/>
    <circle cx="540" cy="305" r="5" fill="#FDD835"/>
    <circle cx="560" cy="305" r="5" fill="#F44336"/>
   
    {/* Tool Head */}
    <path d="M300 200 L350 180 L400 180 L450 200" fill="none" stroke="#90A4AE" strokeWidth="8"/>
    <path d="M370 180 L370 250" fill="none" stroke="#90A4AE" strokeWidth="8"/>
    <path d="M365 250 L375 250 L375 280 L365 280 Z" fill="#78909C"/>
   
    {/* Working Platform */}
    <path d="M300 300 L500 300 L550 275 L350 275 Z" fill="#455A64"/>
    <path d="M320 290 L480 290" stroke="#37474F" strokeWidth="2"/>
    <path d="M320 285 L480 285" stroke="#37474F" strokeWidth="2"/>
    <path d="M320 295 L480 295" stroke="#37474F" strokeWidth="2"/>
   
    {/* Guide Rails */}
    <path d="M270 220 L580 220" stroke="#B0BEC5" strokeWidth="4"/>
    <path d="M270 330 L580 330" stroke="#B0BEC5" strokeWidth="4"/>
   
    {/* Details and Highlights */}
    <circle cx="300" cy="220" r="8" fill="#90A4AE"/>
    <circle cx="300" cy="330" r="8" fill="#90A4AE"/>
    <path d="M280 210 L280 340" stroke="#CFD8DC" strokeWidth="2"/>
    <path d="M570 210 L570 340" stroke="#CFD8DC" strokeWidth="2"/>
   
    {/* Ventilation Grills */}
    <g transform="translate(450,230)">
      <rect width="30" height="2" fill="#CFD8DC"/>
      <rect y="4" width="30" height="2" fill="#CFD8DC"/>
      <rect y="8" width="30" height="2" fill="#CFD8DC"/>
      <rect y="12" width="30" height="2" fill="#CFD8DC"/>
    </g>
   
    {/* Brand Logo Placeholder */}
    <rect x="520" y="210" width="30" height="20" rx="2" fill="#1976D2"/>
   
    {/* Power Indicator */}
    <circle cx="510" cy="215" r="3" fill="#4CAF50"/>
   
    {/* Shadows */}
    <path d="M200 400 L600 400" stroke="#263238" strokeWidth="2" opacity="0.3"/>
    <path d="M300 350 L700 350" stroke="#263238" strokeWidth="2" opacity="0.3"/>
  </svg>
);

const MachineProfile = () => {
  const [machine] = useState({
    id: 1,
    code: "CNC-001",
    name: "CNC Machine Alpha",
    status: "operational",
    availability: "92%",
    totalIssues: 24,
    openIssues: 2,
    manufacturer: "Industrial Corp",
    model: "CNC-X1000",
    installationDate: "2024-06-15",
    location: "Building A, Floor 2",
    lastMaintenance: "2025-01-01",
    nextMaintenance: "2025-02-01"
  });

  const [downtimeData] = useState([
    { month: 'Jan', hours: 12 },
    { month: 'Feb', hours: 8 },
    { month: 'Mar', hours: 15 },
    { month: 'Apr', hours: 5 },
    { month: 'May', hours: 10 },
    { month: 'Jun', hours: 7 }
  ]);

  const [recentIssues] = useState([
    {
      id: 1,
      title: "Calibration Error",
      status: "open",
      date: "2025-01-12",
      priority: "high"
    },
    {
      id: 2,
      title: "Cooling System Warning",
      status: "open",
      date: "2025-01-10",
      priority: "medium"
    }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      operational: "bg-green-500",
      maintenance: "bg-yellow-500",
      error: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-500",
      medium: "bg-yellow-500",
      low: "bg-blue-500"
    };
    return colors[priority] || "bg-gray-500";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Machine Header with SVG */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* SVG Section */}
        <div className="md:col-span-1">
          <Card className="overflow-hidden bg-gray-50">
            <div className="w-full h-64 p-4">
              <MachineSVG />
            </div>
          </Card>
        </div>

        {/* Basic Details Section */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{machine.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getStatusColor(machine.status)}>
                      {machine.status.toUpperCase()}
                    </Badge>
                    <span className="text-gray-600">Code: {machine.code}</span>
                  </div>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Log New Issue
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Manufacturer</p>
                      <p className="font-medium">{machine.manufacturer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Installation Date</p>
                      <p className="font-medium">{machine.installationDate}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{machine.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Next Maintenance</p>
                      <p className="font-medium">{machine.nextMaintenance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Availability</p>
                <p className="text-xl font-bold">{machine.availability}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Open Issues</p>
                <p className="text-xl font-bold">{machine.openIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Issues Resolved</p>
                <p className="text-xl font-bold">{machine.totalIssues - machine.openIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Downtime History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={downtimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#2563eb" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Recent Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{issue.title}</h3>
                      <p className="text-sm text-gray-600">Reported: {issue.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(issue.priority)}>
                        {issue.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{issue.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Maintenance content here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MachineProfile;