"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { FiTrendingUp, FiUsers, FiFileText, FiPackage } from 'react-icons/fi'

export default function BusinessHealthSection() {
  const [timeRange, setTimeRange] = useState('month')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sales Trend Data
  const salesTrendData = [
    { month: 'Jan', current: 45, past: 38 },
    { month: 'Feb', current: 52, past: 42 },
    { month: 'Mar', current: 48, past: 45 },
    { month: 'Apr', current: 61, past: 48 },
    { month: 'May', current: 55, past: 52 },
    { month: 'Jun', current: 67, past: 55 }
  ]

  // Quotations Data
  const quotationsData = [
    { month: 'Jan', quotations: 28, converted: 18 },
    { month: 'Feb', quotations: 32, converted: 22 },
    { month: 'Mar', quotations: 30, converted: 20 },
    { month: 'Apr', quotations: 38, converted: 28 },
    { month: 'May', quotations: 35, converted: 25 },
    { month: 'Jun', quotations: 42, converted: 32 }
  ]

  // Client Segmentation Data
  const clientSegmentationData = [
    { name: 'Repeat Customers', value: 65, color: '#10b981' },
    { name: 'New Customers', value: 25, color: '#3b82f6' },
    { name: 'Inactive', value: 10, color: '#ef4444' }
  ]

  // Top Selling Products
  const topProductsData = [
    { product: 'Brochures', sales: 85, value: 12.5 },
    { product: 'Packaging', sales: 72, value: 18.2 },
    { product: 'Labels', sales: 68, value: 8.5 },
    { product: 'Catalogs', sales: 55, value: 15.8 },
    { product: 'Business Cards', sales: 45, value: 5.2 }
  ]

  // Region-wise Sales
  const regionSalesData = [
    { region: 'Indore', sales: 45, growth: 12 },
    { region: 'Pithampur', sales: 35, growth: 8 },
    { region: 'Pan-India', sales: 65, growth: 15 },
    { region: 'Others', sales: 25, growth: 5 }
  ]

  // Executive Performance
  const executiveData = [
    { name: 'Rajesh Kumar', salesQty: 450, salesValue: 25.5, newClients: 8, oldClients: 12 },
    { name: 'Priya Sharma', salesQty: 380, salesValue: 22.3, newClients: 6, oldClients: 15 },
    { name: 'Amit Patel', salesQty: 420, salesValue: 28.2, newClients: 10, oldClients: 10 },
    { name: 'Sneha Desai', salesQty: 350, salesValue: 19.8, newClients: 5, oldClients: 18 }
  ]

  // New Orders Data (MISSING METRIC #1)
  const newOrdersData = [
    { month: 'Jan', current: 85, past: 72 },
    { month: 'Feb', current: 92, past: 78 },
    { month: 'Mar', current: 88, past: 80 },
    { month: 'Apr', current: 105, past: 85 },
    { month: 'May', current: 98, past: 88 },
    { month: 'Jun', current: 128, past: 95 }
  ]

  const newOrdersList = [
    { orderNo: 'ORD-2024-128', client: 'ABC Corp', value: '₹2.5L', date: '2024-01-15', status: 'Processing' },
    { orderNo: 'ORD-2024-127', client: 'XYZ Industries', value: '₹1.8L', date: '2024-01-14', status: 'Confirmed' },
    { orderNo: 'ORD-2024-126', client: 'Premium Prints', value: '₹3.2L', date: '2024-01-14', status: 'Processing' },
    { orderNo: 'ORD-2024-125', client: 'Deluxe Packaging', value: '₹950', date: '2024-01-13', status: 'Confirmed' }
  ]

  // Customers by Sales Volume (MISSING METRIC #2)
  const customersBySalesVolume = [
    { name: 'ABC Corporation', sales: 12.5, orders: 45, growth: 15 },
    { name: 'XYZ Industries', sales: 10.2, orders: 38, growth: 12 },
    { name: 'Premium Prints Ltd', sales: 8.8, orders: 32, growth: 8 },
    { name: 'Deluxe Packaging', sales: 7.5, orders: 28, growth: 10 },
    { name: 'Elite Graphics', sales: 6.2, orders: 25, growth: 5 },
    { name: 'Modern Prints', sales: 5.8, orders: 22, growth: 7 },
    { name: 'Global Traders', sales: 4.5, orders: 18, growth: 3 }
  ]

  // Product-wise Sales with Qty & Value (MISSING METRIC #3)
  const productWiseSalesDetailed = [
    { product: 'Brochures', qty: 85000, value: 12.5, avgPrice: 14.7 },
    { product: 'Packaging', qty: 72000, value: 18.2, avgPrice: 25.3 },
    { product: 'Labels', qty: 150000, value: 8.5, avgPrice: 5.7 },
    { product: 'Catalogs', qty: 45000, value: 15.8, avgPrice: 35.1 },
    { product: 'Business Cards', qty: 200000, value: 5.2, avgPrice: 2.6 },
    { product: 'Flyers', qty: 95000, value: 4.8, avgPrice: 5.1 }
  ]

  // Average Order Processing Time (MISSING METRIC #4)
  const orderProcessingStats = [
    { type: 'Timely Deliveries', count: 145, percentage: 78, color: '#10b981' },
    { type: 'Delayed Deliveries', count: 35, percentage: 19, color: '#ef4444' },
    { type: 'Early Deliveries', count: 6, percentage: 3, color: '#3b82f6' }
  ]

  const avgProcessingData = [
    { category: 'Brochures', avgDays: 5, targetDays: 7, status: 'On-Time' },
    { category: 'Packaging', avgDays: 8, targetDays: 10, status: 'On-Time' },
    { category: 'Labels', avgDays: 6, targetDays: 5, status: 'Delayed' },
    { category: 'Catalogs', avgDays: 9, targetDays: 12, status: 'On-Time' },
    { category: 'Business Cards', avgDays: 3, targetDays: 5, status: 'Early' }
  ]

  // KPI Cards Data
  const kpiData = [
    { title: 'Total Sales', value: '₹67.5L', change: '+12.5%', trend: 'up', icon: FiTrendingUp },
    { title: 'Quotations', value: '42', change: '+8.3%', trend: 'up', icon: FiFileText },
    { title: 'New Orders', value: '128', change: '+15.2%', trend: 'up', icon: FiPackage },
    { title: 'Total Clients', value: '245', change: '+5.8%', trend: 'up', icon: FiUsers }
  ]

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">My Business Health Overview</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">Comprehensive business metrics and performance analytics</p>
        </div>
        <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="w-full sm:w-auto text-xs sm:text-sm">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="focus:outline-none">
            <CardContent className="pt-3 sm:pt-4 lg:pt-6 pb-3 sm:pb-4 lg:pb-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="p-1.5 sm:p-2 lg:p-3 rounded-lg bg-primary-100">
                  <kpi.icon className="text-primary-600" size={16} />
                </div>
                <Badge variant={kpi.trend === 'up' ? 'success' : 'destructive'} className="text-[10px] sm:text-xs h-5 sm:h-6 px-1.5 sm:px-2">
                  {kpi.change}
                </Badge>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{kpi.value}</h3>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">{kpi.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales & Quotations Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Sales Trend (Current vs Past)</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[160px] sm:h-[200px] lg:h-[260px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrendData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                    width={35}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }}
                    iconSize={10}
                  />
                  <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} name="Current" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="past" stroke="#94a3b8" strokeWidth={2} name="Past" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Quotations & Conversion</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[160px] sm:h-[200px] lg:h-[260px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quotationsData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                    width={35}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                    cursor={{ fill: 'rgba(245, 158, 11, 0.1)' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }}
                    iconSize={10}
                  />
                  <Bar dataKey="quotations" fill="#f59e0b" name="Quotations" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="converted" fill="#10b981" name="Converted" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Segmentation & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Customer Segmentation</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[200px] sm:h-[240px] lg:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientSegmentationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={55}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clientSegmentationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={50}
                    formatter={(_value, entry: any) => `${entry.payload.name} (${entry.payload.value}%)`}
                    wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }}
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Top-Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[200px] sm:h-[240px] lg:h-[280px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData} layout="horizontal" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    dataKey="product"
                    type="category"
                    width={70}
                    tick={{ fontSize: 8 }}
                    tickMargin={5}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                    cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }}
                    iconSize={10}
                  />
                  <Bar dataKey="sales" fill="#8b5cf6" name="Sales Qty" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Region-wise Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm lg:text-base">Region-wise Sales Performance</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 sm:pb-3 lg:pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="h-[160px] sm:h-[200px] lg:h-[240px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionSalesData} margin={{ top: 5, right: 25, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="region"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                    width={30}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '9px', paddingTop: '5px' }}
                    iconSize={8}
                  />
                  <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales (₹L)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="growth" fill="#10b981" name="Growth %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[280px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-xs sm:text-sm">Region</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-xs sm:text-sm">Sales</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-xs sm:text-sm">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionSalesData.map((region, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium">{region.region}</td>
                        <td className="py-2 px-2 sm:px-3 text-xs sm:text-sm text-right">₹{region.sales}L</td>
                        <td className="py-2 px-2 sm:px-3 text-right">
                          <Badge variant={region.growth >= 10 ? 'success' : 'secondary'} className="text-xs">
                            +{region.growth}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NEW ORDERS - Missing Metric #1 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm lg:text-base">New Orders (Current vs Past)</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 sm:pb-3 lg:pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="h-[160px] sm:h-[200px] lg:h-[240px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={newOrdersData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                    width={35}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }}
                    iconSize={10}
                  />
                  <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} name="Current" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="past" stroke="#94a3b8" strokeWidth={2} name="Past" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[400px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Order No</th>
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Client</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Value</th>
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newOrdersList.map((order, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm font-medium">{order.orderNo}</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm">{order.client}</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm text-right font-semibold">{order.value}</td>
                        <td className="py-2 px-2 sm:px-3">
                          <Badge variant={order.status === 'Confirmed' ? 'success' : 'secondary'} className="text-[9px] sm:text-[10px]">
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CUSTOMERS BY SALES VOLUME - Missing Metric #2 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm lg:text-base">Customers by Sales Volume</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 sm:pb-3 lg:pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="h-[200px] sm:h-[240px] lg:h-[280px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customersBySalesVolume} layout="vertical" margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={85}
                    tick={{ fontSize: 8 }}
                    tickMargin={5}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                    cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }}
                    iconSize={10}
                  />
                  <Bar dataKey="sales" fill="#8b5cf6" name="Sales (₹L)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[400px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Customer</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Sales</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Orders</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersBySalesVolume.map((customer, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm font-medium">{customer.name}</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm text-right font-semibold">₹{customer.sales}L</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm text-right">{customer.orders}</td>
                        <td className="py-2 px-2 sm:px-3 text-right">
                          <Badge variant={customer.growth >= 10 ? 'success' : 'secondary'} className="text-[9px] sm:text-[10px]">
                            +{customer.growth}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PRODUCT-WISE SALES (QTY & VALUE) - Missing Metric #3 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm lg:text-base">Product-wise Sales (Quantity & Value)</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 sm:pb-3 lg:pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="h-[180px] sm:h-[220px] lg:h-[260px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productWiseSalesDetailed} margin={{ top: 5, right: 25, left: -15, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="product"
                    tick={{ fontSize: 8 }}
                    angle={-35}
                    textAnchor="end"
                    height={60}
                    tickMargin={5}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                    width={30}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '9px', paddingTop: '5px' }}
                    iconSize={8}
                  />
                  <Bar yAxisId="left" dataKey="qty" fill="#3b82f6" name="Qty (pcs)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="value" fill="#10b981" name="Value (₹L)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[400px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Product</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Qty</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Value</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Avg Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productWiseSalesDetailed.map((product, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm font-medium">{product.product}</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm text-right">{product.qty.toLocaleString()}</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm text-right font-semibold">₹{product.value}L</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm text-right">₹{product.avgPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AVERAGE ORDER PROCESSING TIME - Missing Metric #4 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm lg:text-base">Average Order Processing Time</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 sm:pb-3 lg:pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="h-[200px] sm:h-[240px] lg:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderProcessingStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={55}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {orderProcessingStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={50}
                    formatter={(_value, entry: any) => `${entry.payload.type} (${entry.payload.percentage}%)`}
                    wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }}
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[360px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Category</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Avg Days</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Target</th>
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {avgProcessingData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm font-medium">{item.category}</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm text-right font-semibold">{item.avgDays} days</td>
                        <td className="py-2 px-2 sm:px-3 text-[10px] sm:text-sm text-right">{item.targetDays} days</td>
                        <td className="py-2 px-2 sm:px-3">
                          <Badge
                            variant={item.status === 'On-Time' ? 'success' : item.status === 'Early' ? 'default' : 'destructive'}
                            className="text-[9px] sm:text-[10px]"
                          >
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Executive Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm lg:text-base">Executive-wise Sales & Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <div className="min-w-[600px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Executive Name</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Sales Qty</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Sales Value</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">New Clients</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Old Clients</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {executiveData.map((exec, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm font-medium">{exec.name}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right">{exec.salesQty}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right font-semibold">₹{exec.salesValue}L</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right">{exec.newClients}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right">{exec.oldClients}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <Badge variant={exec.salesValue > 25 ? 'success' : exec.salesValue > 20 ? 'secondary' : 'warning'} className="text-[9px] sm:text-[10px] lg:text-xs">
                          {exec.salesValue > 25 ? 'Excellent' : exec.salesValue > 20 ? 'Good' : 'Average'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
