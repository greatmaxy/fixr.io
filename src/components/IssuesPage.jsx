import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Search, 
  Plus, 
  AlertCircle, 
  Clock, 
  CheckCircle,
  Calendar,
  User,
  Settings,
  Eye,
  MessageSquare,
  RefreshCcw,
  Info
} from 'lucide-react';

const IssuesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  const [stats] = useState({
    total: 156,
    open: 45,
    inProgress: 28,
    resolved: 83,
    critical: 12
  });

  const [issues] = useState([
    {
      id: 1,
      title: "Calibration Error on CNC-001",
      machineId: "CNC-001",
      priority: "high",
      status: "open",
      reporter: "John Doe",
      assignee: "Mike Smith",
      createdAt: "2025-01-12",
      type: "mechanical",
      description: "Machine is showing calibration errors during startup sequence"
    },
    {
      id: 2,
      title: "Cooling System Warning",
      machineId: "DRL-002",
      priority: "medium",
      status: "in_progress",
      reporter: "Jane Smith",
      assignee: "Tech Team",
      createdAt: "2025-01-10",
      type: "maintenance",
      description: "Temperature readings are above normal range"
    },
    {
      id: 3,
      title: "Assembly Line Stoppage",
      machineId: "ASM-003",
      priority: "critical",
      status: "resolved",
      reporter: "Robert Johnson",
      assignee: "Sarah Wilson",
      createdAt: "2025-01-08",
      resolvedAt: "2025-01-09",
      type: "electrical",
      description: "Complete shutdown of assembly line due to electrical fault"
    }
  ]);

  const filterOptions = [
    { label: "High Priority", value: "high", color: "bg-red-500" },
    { label: "Medium Priority", value: "medium", color: "bg-yellow-500" },
    { label: "Low Priority", value: "low", color: "bg-blue-500" },
    { label: "Mechanical", value: "mechanical", color: "bg-purple-500" },
    { label: "Electrical", value: "electrical", color: "bg-indigo-500" },
    { label: "Maintenance", value: "maintenance", color: "bg-green-500" }
  ];

  const toggleFilter = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter(f => f !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: "bg-red-600",
      high: "bg-red-500",
      medium: "bg-yellow-500",
      low: "bg-blue-500"
    };
    return colors[priority] || "bg-gray-500";
  };

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-red-500",
      in_progress: "bg-yellow-500",
      resolved: "bg-green-500",
      closed: "bg-gray-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.machineId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.includes(issue.priority) ||
                          selectedFilters.includes(issue.type);
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Issues</h1>
          <p className="text-gray-600">Track and manage machine issues</p>
        </div>
        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Log Issue
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
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
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-xl font-bold">{stats.open}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-xl font-bold">{stats.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-xl font-bold">{stats.critical}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 w-full"
            placeholder="Search issues by title or machine ID..."
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
        {filteredIssues.map((issue) => (
          <Card 
            key={issue.id} 
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <h3 className="font-medium text-lg">{issue.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={getPriorityColor(issue.priority)}>
                      {issue.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      #{issue.machineId}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{issue.description}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {issue.assignee}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {issue.createdAt}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      3 comments
                    </div>
                    {issue.status === 'resolved' && (
                      <div className="flex items-center gap-1">
                        <RefreshCcw className="w-3 h-3" />
                        Resolution time: 2d 4h
                      </div>
                    )}
                  </div>
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Issue Details</SheetTitle>
                    </SheetHeader>
                    {selectedIssue && (
                      <div className="py-4 space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold mb-2">{selectedIssue.title}</h2>
                          <div className="flex gap-2">
                            <Badge className={getPriorityColor(selectedIssue.priority)}>
                              {selectedIssue.priority.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(selectedIssue.status)}>
                              {selectedIssue.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Details</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Machine ID: {selectedIssue.machineId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Assignee: {selectedIssue.assignee}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Created: {selectedIssue.createdAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className="text-sm text-gray-600">{selectedIssue.description}</p>
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Activity</h3>
                          <div className="space-y-3">
                            <div className="flex gap-2 text-sm">
                              <User className="w-4 h-4 text-gray-400" />
                              <div>
                                <p><span className="font-medium">John Doe</span> created this issue</p>
                                <p className="text-gray-500">2 days ago</p>
                              </div>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <MessageSquare className="w-4 h-4 text-gray-400" />
                              <div>
                                <p><span className="font-medium">Mike Smith</span> commented</p>
                                <p className="text-gray-600">"Looking into the calibration issue now."</p>
                                <p className="text-gray-500">1 day ago</p>
                              </div>
                            </div>
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

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No issues found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;