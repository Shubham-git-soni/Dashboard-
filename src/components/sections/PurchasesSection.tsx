"use client"

import React, { useState } from 'react'
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
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { FiShoppingCart, FiTrendingUp, FiFileText, FiUsers } from 'react-icons/fi'

export default function PurchasesSection() {
  const [timeRange, setTimeRange] = useState('month')

  // Purchase Growth Trend
  const purchaseGrowthData = [
    { month: 'Jan', current: 32, past: 28 },
    { month: 'Feb', current: 38, past: 30 },
    { month: 'Mar', current: 35, past: 32 },
    { month: 'Apr', current: 42, past: 35 },
    { month: 'May', current: 48, past: 38 },
    { month: 'Jun', current: 55, past: 42 }
  ]

  // Purchase Orders Raised
  const poRaisedData = [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 48 },
    { month: 'Apr', count: 58 },
    { month: 'May', count: 62 },
    { month: 'Jun', count: 68 }
  ]

  // Vendor-wise Purchase Data
  const vendorData = [
    { vendor: 'Paper Supplies Inc', purchase: 18.5, orders: 24, rating: 4.5 },
    { vendor: 'Ink Solutions Ltd', purchase: 12.3, orders: 18, rating: 4.2 },
    { vendor: 'Die & Plate Works', purchase: 8.7, orders: 12, rating: 4.8 },
    { vendor: 'Packaging Materials Co', purchase: 15.2, orders: 20, rating: 4.3 },
    { vendor: 'Chemical Supplies', purchase: 6.8, orders: 15, rating: 4.0 }
  ]

  // Category-wise Purchase Data
  const categoryData = [
    { name: 'Paper & Board', value: 35, color: '#3b82f6' },
    { name: 'Inks & Chemicals', value: 25, color: '#10b981' },
    { name: 'Dies & Plates', value: 20, color: '#f59e0b' },
    { name: 'Packaging Materials', value: 15, color: '#8b5cf6' },
    { name: 'Others', value: 5, color: '#ef4444' }
  ]

  // KPI Cards
  const kpiData = [
    { title: 'Total Purchase', value: '₹55.2L', change: '+15.8%', trend: 'up', icon: FiShoppingCart },
    { title: 'Growth Rate', value: '15.8%', change: '+2.3%', trend: 'up', icon: FiTrendingUp },
    { title: 'Total POs Raised', value: '68', change: '+12 from last month', trend: 'up', icon: FiFileText },
    { title: 'Active Vendors', value: '42', change: '+3 new vendors', trend: 'up', icon: FiUsers }
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">Purchases Summary</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">Purchase analytics, vendor performance, and category insights</p>
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
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{kpi.value}</h3>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">{kpi.title}</p>
              <p className="text-[10px] sm:text-xs text-green-600 mt-1 sm:mt-2 font-medium">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Growth & PO Raised */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Purchase Growth Trend</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[160px] sm:h-[200px] lg:h-[260px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={purchaseGrowthData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                    wrapperStyle={{ fontSize: '9px', paddingTop: '5px' }}
                    iconSize={8}
                  />
                  <Area type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCurrent)" name="Current (₹L)" />
                  <Area type="monotone" dataKey="past" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorPast)" name="Past (₹L)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Purchase Orders Raised</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[160px] sm:h-[200px] lg:h-[260px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={poRaisedData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
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
                    cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }}
                    iconSize={10}
                  />
                  <Bar dataKey="count" fill="#10b981" name="PO Count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category-wise Purchase & Vendor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Product Category-wise Purchase</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[200px] sm:h-[240px] lg:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={50}
                    wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }}
                    iconSize={8}
                    formatter={(value, entry: any) => `${entry.payload.name} (${entry.payload.value}%)`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Top Vendors by Purchase Value</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[200px] sm:h-[240px] lg:h-[280px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorData} layout="horizontal" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    dataKey="vendor"
                    type="category"
                    width={80}
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
                  <Bar dataKey="purchase" fill="#8b5cf6" name="Purchase (₹L)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm lg:text-base">Vendor-wise Purchase Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Vendor Name</th>
                  <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Purchase Value</th>
                  <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Total Orders</th>
                  <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Avg Order Value</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Rating</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {vendorData.map((vendor, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm font-medium">{vendor.vendor}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right font-semibold">₹{vendor.purchase}L</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right">{vendor.orders}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right">₹{(vendor.purchase / vendor.orders).toFixed(2)}L</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs sm:text-sm">★</span>
                        <span className="text-[11px] sm:text-xs lg:text-sm font-medium">{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <Badge variant={vendor.rating >= 4.5 ? 'success' : vendor.rating >= 4.0 ? 'secondary' : 'warning'} className="text-[9px] sm:text-[10px] lg:text-xs">
                        {vendor.rating >= 4.5 ? 'Excellent' : vendor.rating >= 4.0 ? 'Good' : 'Average'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {vendorData.map((vendor, index) => (
              <div key={index} className="py-3 space-y-2.5">
                <div className="flex justify-between items-start gap-2 pb-2 border-b border-gray-100">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">{vendor.vendor}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700">{vendor.rating}</span>
                      </div>
                      <Badge variant={vendor.rating >= 4.5 ? 'success' : vendor.rating >= 4.0 ? 'secondary' : 'warning'} className="text-[9px]">
                        {vendor.rating >= 4.5 ? 'Excellent' : vendor.rating >= 4.0 ? 'Good' : 'Average'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Purchase</span>
                    <span className="text-[11px] font-semibold text-gray-900">₹{vendor.purchase}L</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Orders</span>
                    <span className="text-[11px] text-gray-900">{vendor.orders}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Avg Value</span>
                    <span className="text-[11px] text-gray-900">₹{(vendor.purchase / vendor.orders).toFixed(2)}L</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
