import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Settings, Plus, Search } from "lucide-react";

const MachineCNCIcon = () => (
  <svg viewBox="0 0 800 600" className="max-w-full max-h-full">
    {/* Base Platform */}
    <path d="M200 400 L600 400 L700 350 L300 350 Z" fill="#434B4D" />
    {/* Machine Body */}
    <path d="M250 350 L250 200 L600 200 L600 350 Z" fill="#5C6BC0" />
    <path d="M600 200 L700 150 L700 350 L600 350 Z" fill="#3949AB" />
    <path d="M250 200 L350 150 L700 150 L600 200 Z" fill="#7986CB" />
    {/* Control Panel */}
    <path d="M500 250 L580 250 L580 320 L500 320 Z" fill="#263238" />
    <rect x="510" y="260" width="60" height="30" fill="#37474F" />
    <circle cx="520" cy="305" r="5" fill="#4CAF50" />
    <circle cx="540" cy="305" r="5" fill="#FDD835" />
    <circle cx="560" cy="305" r="5" fill="#F44336" />
  </svg>
);

const MachineSearch = () => {
  const [machines] = useState([
    {
      id: 1,
      code: "CNC-001",
      name: "CNC Machine Alpha",
      status: "operational",
      location: "Building A, Floor 2",
      manufacturer: "Industrial Corp",
      type: "CNC",
    },
    {
      id: 2,
      code: "DRL-002",
      name: "Drilling Station Beta",
      status: "maintenance",
      location: "Building B, Floor 1",
      manufacturer: "MechTech",
      type: "Drilling",
    },
    {
      id: 3,
      code: "ASM-003",
      name: "Assembly Unit Gamma",
      status: "error",
      location: "Building A, Floor 1",
      manufacturer: "Industrial Corp",
      type: "Assembly",
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = [
    { label: "Operational", value: "operational", color: "bg-green-500" },
    { label: "Maintenance", value: "maintenance", color: "bg-yellow-500" },
    { label: "Error", value: "error", color: "bg-red-500" },
    { label: "CNC", value: "CNC", color: "bg-blue-500" },
    { label: "Drilling", value: "Drilling", color: "bg-purple-500" },
    { label: "Assembly", value: "Assembly", color: "bg-indigo-500" },
  ];

  const toggleFilter = (value) => {
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== value));
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch =
      machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.includes(machine.status) ||
      selectedFilters.includes(machine.type);
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Machines</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Machine
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 text-sm md:text-base"
            placeholder="Search machines by name or code..."
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
                  ? filter.color + " text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => toggleFilter(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMachines.map((machine) => (
          <Card
            key={machine.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <Badge className={`capitalize ${filterOptions[0].color}`}>
                  {machine.status}
                </Badge>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <MachineCNCIcon />
              </div>
              <div className="mt-auto">
                <h3>{machine.name}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MachineSearch;
