import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, AlertCircle, Package, Filter, RefreshCcw } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const SparePartsInventory = () => {
  const [spareParts] = useState([
    {
      id: 1,
      name: "Cutting Tool Insert",
      category: "Tooling",
      sku: "CT-001",
      currentStock: 45,
      minThreshold: 20,
      maxStock: 100,
      unitPrice: 29.99,
      location: "Warehouse A-12",
      lastRestocked: "2025-01-10",
      status: "normal",
      compatibleMachines: ["CNC-001", "CNC-002"]
    },
    {
      id: 2,
      name: "Ball Bearing Assembly",
      category: "Mechanical",
      sku: "BB-203",
      currentStock: 15,
      minThreshold: 25,
      maxStock: 75,
      unitPrice: 45.50,
      location: "Warehouse B-03",
      lastRestocked: "2025-01-05",
      status: "low",
      compatibleMachines: ["CNC-001", "CNC-003"]
    },
    {
      id: 3,
      name: "Hydraulic Oil Filter",
      category: "Maintenance",
      sku: "HF-104",
      currentStock: 8,
      minThreshold: 10,
      maxStock: 50,
      unitPrice: 18.75,
      location: "Warehouse A-05",
      lastRestocked: "2025-01-08",
      status: "critical",
      compatibleMachines: ["CNC-001"]
    },
    {
      id: 4,
      name: "Drive Belt",
      category: "Mechanical",
      sku: "DB-405",
      currentStock: 30,
      minThreshold: 15,
      maxStock: 60,
      unitPrice: 125.00,
      location: "Warehouse C-08",
      lastRestocked: "2025-01-12",
      status: "normal",
      compatibleMachines: ["CNC-002", "CNC-003"]
    }
  ]);

  const [consumptionData] = useState([
    { month: 'Jan', consumed: 24, ordered: 30, cost: 2800 },
    { month: 'Feb', consumed: 18, ordered: 20, cost: 2200 },
    { month: 'Mar', consumed: 32, ordered: 35, cost: 3600 },
    { month: 'Apr', consumed: 15, ordered: 15, cost: 1800 },
    { month: 'May', consumed: 28, ordered: 30, cost: 3200 },
    { month: 'Jun', consumed: 22, ordered: 25, cost: 2600 }
  ]);

  const [categoryData] = useState([
    { category: 'Tooling', count: 145, value: 12500 },
    { category: 'Mechanical', count: 98, value: 28600 },
    { category: 'Electrical', count: 76, value: 18900 },
    { category: 'Maintenance', count: 168, value: 15400 }
  ]);

  const [purchaseOrders] = useState([
    {
      id: "PO-2025-001",
      date: "2025-01-12",
      supplier: "Industrial Parts Co.",
      items: [
        { name: "Cutting Tool Insert", quantity: 50, price: 29.99 },
        { name: "Ball Bearing Assembly", quantity: 20, price: 45.50 }
      ],
      status: "pending",
      totalAmount: 2399.50,
      expectedDelivery: "2025-01-19"
    },
    {
      id: "PO-2025-002",
      date: "2025-01-10",
      supplier: "Mechanical Solutions Ltd",
      items: [
        { name: "Hydraulic Oil Filter", quantity: 30, price: 18.75 },
        { name: "Drive Belt", quantity: 10, price: 125.00 }
      ],
      status: "delivered",
      totalAmount: 1812.50,
      expectedDelivery: "2025-01-17"
    },
    {
      id: "PO-2025-003",
      date: "2025-01-08",
      supplier: "Tech Parts Global",
      items: [
        { name: "Sensor Assembly", quantity: 15, price: 89.99 },
        { name: "Control Panel Switch", quantity: 25, price: 35.00 }
      ],
      status: "in-transit",
      totalAmount: 2224.85,
      expectedDelivery: "2025-01-15"
    }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      normal: "bg-green-500",
      low: "bg-yellow-500",
      critical: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const getStockLevelColor = (current, min) => {
    if (current <= min * 0.5) return "text-red-500";
    if (current <= min) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Spare Parts Inventory</h1>
          <p className="text-gray-600">Manage and track machine spare parts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Package className="w-4 h-4 mr-2" />
            Add New Part
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Parts</p>
                <p className="text-xl font-bold">487</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Alerts</p>
                <p className="text-xl font-bold">12</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Stock</p>
                <p className="text-xl font-bold">5</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Restock</p>
                <p className="text-xl font-bold">Today</p>
              </div>
              <RefreshCcw className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList>
          <TabsTrigger value="inventory">Inventory List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Inventory</CardTitle>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search parts..."
                    className="pl-10 pr-4 py-2 border rounded-md"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spareParts.map((part) => (
                  <div key={part.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{part.name}</h3>
                        <Badge className={getStatusColor(part.status)}>
                          {part.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="text-sm text-gray-600">
                          SKU: {part.sku}
                        </div>
                        <div className="text-sm text-gray-600">
                          Category: {part.category}
                        </div>
                        <div className="text-sm text-gray-600">
                          Location: {part.location}
                        </div>
                        <div className="text-sm text-gray-600">
                          Last Restocked: {part.lastRestocked}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 ml-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Current Stock</p>
                        <p className={`text-xl font-bold ${getStockLevelColor(part.currentStock, part.minThreshold)}`}>
                          {part.currentStock}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Min. Threshold</p>
                        <p className="text-xl font-bold text-gray-700">{part.minThreshold}</p>
                      </div>
                      <Button variant="outline" className="ml-4">
                        Update Stock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Parts Consumption vs Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consumptionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="consumed" fill="#2563eb" name="Consumed" />
                      <Bar dataKey="ordered" fill="#4ade80" name="Ordered" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={consumptionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cost" stroke="#2563eb" name="Cost ($)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.category} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{category.category}</h3>
                        <Badge variant="outline">{category.count} items</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Total Value</span>
                        <span className="font-medium">${category.value.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(category.count / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Inventory Turnover Rate</p>
                    <p className="text-2xl font-bold">4.2x</p>
                    <p className="text-sm text-green-500">↑ 0.3 from last quarter</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Stock Accuracy</p>
                    <p className="text-2xl font-bold">98.5%</p>
                    <p className="text-sm text-green-500">↑ 1.2% from last month</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Avg. Order Fulfillment</p>
                    <p className="text-2xl font-bold">2.4 days</p>
                    <p className="text-sm text-green-500">↓ 0.3 days improvement</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Stock-out Rate</p>
                    <p className="text-2xl font-bold">1.2%</p>
                    <p className="text-sm text-red-500">↑ 0.2% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Purchase Orders</CardTitle>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Create New Order
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.id}</h3>
                              <Badge
                                className={
                                  order.status === 'delivered'
                                    ? 'bg-green-500'
                                    : order.status === 'in-transit'
                                    ? 'bg-blue-500'
                                    : 'bg-yellow-500'
                                }
                              >
                                {order.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Supplier: {order.supplier}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Order Date</p>
                            <p className="font-medium">{order.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} × {item.quantity}</span>
                              <span className="font-medium">
                                ${(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                          <div className="pt-2 mt-2 border-t flex justify-between font-medium">
                            <span>Total Amount</span>
                            <span>${order.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center text-sm">
                          <div className="text-gray-600">
                            Expected Delivery: {order.expectedDelivery}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Orders (This Month)</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Order Value</span>
                      <span className="font-medium">$2,145.25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Orders</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industrial Parts Co.</span>
                      <span className="font-medium">$45,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mechanical Solutions Ltd</span>
                      <span className="font-medium">$38,900</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tech Parts Global</span>
                      <span className="font-medium">$32,750</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">On-Time Delivery Rate</span>
                      <span className="font-medium">94.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Delivery Time</span>
                      <span className="font-medium">4.2 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return Rate</span>
                      <span className="font-medium">1.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SparePartsInventory;