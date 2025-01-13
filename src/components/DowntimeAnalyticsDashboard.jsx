import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  AlertCircle, 
  Clock, 
  CheckCircle,
  Calendar,
  Settings,
  Eye,
  BarChart2,
  Activity,
  Info
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

const DowntimeAnalyticsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);

  // Sample static data
  const stats = {
    total: 156,
    critical: 12,
    major: 28,
    minor: 83,
    maintenance: 33
  };

  const sampleMachines = [
    {
      id: "M1",
      name: "Machine HCM-001",
      totalDowntime: 145,
      incidents: 5,
      mtbf: 240,
      lastIncident: "2024-01-13",
      status: "Calibration error during operation",
      type: "Breakdown"
    },
    {
      id: "M2",
      name: "Machine HCM-002",
      totalDowntime: 85,
      incidents: 3,
      mtbf: 320,
      lastIncident: "2024-01-12",
      status: "Regular maintenance check",
      type: "Preventive"
    },
    {
      id: "M3",
      name: "Machine HCM-003",
      totalDowntime: 45,
      incidents: 2,
      mtbf: 480,
      lastIncident: "2024-01-14",
      status: "Minor adjustment needed",
      type: "Breakdown"
    },
    {
      id: "M4",
      name: "Machine HCM-004",
      totalDowntime: 180,
      incidents: 7,
      mtbf: 180,
      lastIncident: "2024-01-14",
      status: "Critical component failure",
      type: "Breakdown"
    },
    {
      id: "M5",
      name: "Machine HCM-005",
      totalDowntime: 65,
      incidents: 4,
      mtbf: 360,
      lastIncident: "2024-01-13",
      status: "Scheduled maintenance",
      type: "Preventive"
    }
  ];

  const trendData = [
    { date: "Jan 10", totalDowntime: 120, avgMTBF: 280 },
    { date: "Jan 11", totalDowntime: 90, avgMTBF: 310 },
    { date: "Jan 12", totalDowntime: 150, avgMTBF: 260 },
    { date: "Jan 13", totalDowntime: 80, avgMTBF: 340 },
    { date: "Jan 14", totalDowntime: 110, avgMTBF: 290 }
  ];

  const filterOptions = [
    { label: "Critical Downtime", value: "critical", color: "bg-red-500" },
    { label: "Major Downtime", value: "major", color: "bg-yellow-500" },
    { label: "Minor Downtime", value: "minor", color: "bg-blue-500" },
    { label: "Preventive", value: "preventive", color: "bg-green-500" },
    { label: "Breakdown", value: "breakdown", color: "bg-purple-500" }
  ];

  const toggleFilter = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter(f => f !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const getStatusColor = (downtime) => {
    if (downtime > 120) return "bg-red-500";
    if (downtime > 60) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const filteredMachines = sampleMachines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = selectedFilters.length === 0 || 
                          (selectedFilters.includes('critical') && machine.totalDowntime > 120) ||
                          (selectedFilters.includes('major') && machine.totalDowntime > 60 && machine.totalDowntime <= 120) ||
                          (selectedFilters.includes('minor') && machine.totalDowntime <= 60) ||
                          (selectedFilters.includes('preventive') && machine.type === 'Preventive') ||
                          (selectedFilters.includes('breakdown') && machine.type === 'Breakdown');
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Downtime Analytics</h1>
          <p className="text-gray-600">Monitor and analyze machine downtime</p>
        </div>
        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
          <BarChart2 className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Total Incidents</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-xl font-bold">{stats.critical}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Major</p>
                <p className="text-xl font-bold">{stats.major}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Minor</p>
                <p className="text-xl font-bold">{stats.minor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-xl font-bold">{stats.maintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Shift Performance Analysis */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-4">Shift Performance Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { shift: 'Shift A', downtime: 245, incidents: 12 },
                  { shift: 'Shift B', downtime: 190, incidents: 8 },
                  { shift: 'Shift C', downtime: 310, incidents: 15 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="shift" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="downtime" fill="#8884d8" name="Downtime (min)" />
                  <Bar yAxisId="right" dataKey="incidents" fill="#82ca9d" name="Incidents" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* MTBF Trends */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-4">MTBF Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { date: 'Jan 10', mtbf: 280, efficiency: 85 },
                  { date: 'Jan 11', mtbf: 310, efficiency: 88 },
                  { date: 'Jan 12', mtbf: 260, efficiency: 82 },
                  { date: 'Jan 13', mtbf: 340, efficiency: 90 },
                  { date: 'Jan 14', mtbf: 290, efficiency: 86 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="mtbf" stroke="#8884d8" name="MTBF (min)" />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#82ca9d" name="Efficiency %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Problem Distribution */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-4">Problem Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={[
                  { problem: 'Mechanical Failure', count: 25, duration: 420 },
                  { problem: 'Electrical Issues', count: 18, duration: 380 },
                  { problem: 'Calibration', count: 15, duration: 290 },
                  { problem: 'Software Error', count: 12, duration: 240 },
                  { problem: 'Maintenance', count: 10, duration: 180 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="problem" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Incident Count" />
                  <Bar dataKey="duration" fill="#82ca9d" name="Duration (min)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Machine Efficiency */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-4">Machine Efficiency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { machine: 'HCM-001', availability: 92, performance: 88 },
                  { machine: 'HCM-002', availability: 88, performance: 85 },
                  { machine: 'HCM-003', availability: 95, performance: 90 },
                  { machine: 'HCM-004', availability: 85, performance: 82 },
                  { machine: 'HCM-005', availability: 90, performance: 87 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="machine" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="availability" fill="#8884d8" name="Availability %" />
                  <Bar dataKey="performance" fill="#82ca9d" name="Performance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 w-full"
            placeholder="Search machines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <Badge
              key={filter.value}
              className={`cursor-pointer ${
                selectedFilters.includes(filter.value)
                  ? filter.color + ' text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => toggleFilter(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredMachines.map((machine) => (
          <Card 
            key={machine.id} 
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <h3 className="font-medium text-lg">{machine.name}</h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={getStatusColor(machine.totalDowntime)}>
                      {machine.totalDowntime > 120 ? 'CRITICAL' : machine.totalDowntime > 60 ? 'MAJOR' : 'MINOR'}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      {machine.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{machine.status}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {machine.incidents} incidents
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {machine.totalDowntime} minutes downtime
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Last incident: {new Date(machine.lastIncident).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedMachine(machine)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Machine Details - {machine.name}</SheetTitle>
                    </SheetHeader>
                    {selectedMachine && (
                      <div className="py-4 space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold mb-2">{selectedMachine.name}</h2>
                          <div className="flex gap-2">
                            <Badge className={getStatusColor(selectedMachine.totalDowntime)}>
                              {selectedMachine.totalDowntime > 120 ? 'CRITICAL' : selectedMachine.totalDowntime > 60 ? 'MAJOR' : 'MINOR'}
                            </Badge>
                            <Badge variant="outline">{selectedMachine.type}</Badge>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Performance Metrics</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Total Incidents: {selectedMachine.incidents}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Total Downtime: {selectedMachine.totalDowntime} minutes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">MTBF: {selectedMachine.mtbf} minutes</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Downtime Trend</h3>
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="totalDowntime" stroke="#8884d8" name="Downtime (min)" />
                                <Line type="monotone" dataKey="avgMTBF" stroke="#82ca9d" name="MTBF" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMachines.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No machines found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DowntimeAnalyticsDashboard;