import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus,
  MessageSquare,
  ThumbsUp,
  User,
  Clock,
  ChevronUp,
  ChevronDown,
  Share2,
  AlertCircle,
  BookOpen,
  Bookmark,
  TrendingUp,
  Flag,
  LayoutGrid
} from 'lucide-react';

const ForumPage = () => {
  // State declarations
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeChannel, setActiveChannel] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Data
  const channels = [
    { id: "all", name: "All Topics", count: 156 },
    { id: "general", name: "General Discussion", count: 45 },
    { id: "technical", name: "Technical Support", count: 38 },
    { id: "maintenance", name: "Maintenance", count: 29 },
    { id: "safety", name: "Safety & Compliance", count: 24 },
    { id: "training", name: "Training & Documentation", count: 20 }
  ];

  const tagOptions = [
    { label: "CNC", value: "cnc", color: "bg-blue-500" },
    { label: "Maintenance", value: "maintenance", color: "bg-green-500" },
    { label: "Safety", value: "safety", color: "bg-red-500" },
    { label: "Training", value: "training", color: "bg-purple-500" },
    { label: "Best Practices", value: "best-practices", color: "bg-indigo-500" },
    { label: "Troubleshooting", value: "troubleshooting", color: "bg-yellow-500" }
  ];

  const [questions] = useState([
    {
      id: 1,
      title: "How to troubleshoot CNC machine calibration issues?",
      content: "I'm facing recurring calibration problems with the CNC-1000 model. The X-axis seems to drift after a few hours of operation. Any suggestions for maintaining consistent calibration?",
      author: {
        name: "John Smith",
        role: "Senior Technician",
        avatar: "/api/placeholder/32/32"
      },
      channel: "technical",
      timestamp: "2025-01-12",
      votes: 15,
      answers: 3,
      views: 124,
      tags: ["cnc", "calibration", "maintenance"],
      solved: true,
      bookmarked: true,
      lastActivity: "2025-01-13",
      featured: true
    },
    {
      id: 2,
      title: "Best practices for preventive maintenance scheduling",
      content: "What's the recommended frequency for preventive maintenance checks on industrial drilling machines? Looking for a balanced approach between maintenance costs and machine health.",
      author: {
        name: "Maria Garcia",
        role: "Maintenance Lead",
        avatar: "/api/placeholder/32/32"
      },
      channel: "maintenance",
      timestamp: "2025-01-10",
      votes: 8,
      answers: 5,
      views: 97,
      tags: ["maintenance", "scheduling", "best-practices"],
      solved: false,
      bookmarked: false,
      lastActivity: "2025-01-11",
      featured: false
    }
  ]);

  // Helper functions
  const toggleTag = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter(t => t !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       question.tags.some(tag => selectedTags.includes(tag));
    const matchesChannel = activeChannel === "all" || question.channel === activeChannel;
    return matchesSearch && matchesTags && matchesChannel;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Community Forum</h1>
          <p className="text-gray-600">Ask questions, share knowledge, and learn from others</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="w-4 h-4 mr-2" />
            Guidelines
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Ask Question
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 w-full"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Channels Dropdown */}
          <select
            className="px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-[180px]"
            value={activeChannel}
            onChange={(e) => setActiveChannel(e.target.value)}
          >
            {channels.map(channel => (
              <option key={channel.id} value={channel.id}>
                {channel.name} ({channel.count})
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            className="px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-[150px]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="votes">Most Votes</option>
            <option value="active">Most Active</option>
            <option value="unanswered">Unanswered</option>
          </select>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag) => (
            <Badge
              key={tag.value}
              className={`cursor-pointer ${
                selectedTags.includes(tag.value)
                  ? tag.color + ' text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => toggleTag(tag.value)}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card 
            key={question.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Vote Column */}
                <div className="flex flex-col items-center justify-start">
                  <Button variant="ghost" size="sm" className="px-2">
                    <ChevronUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-semibold">{question.votes}</span>
                  <Button variant="ghost" size="sm" className="px-2">
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer">
                        {question.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {question.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 gap-y-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={question.author.avatar}
                          alt={question.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{question.author.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {question.author.role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {question.answers} answers
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {question.timestamp}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {question.solved && (
                        <Badge className="bg-green-500">
                          Solved
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <Bookmark className={`w-4 h-4 ${question.bookmarked ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No questions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ForumPage;