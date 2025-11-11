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

  // Fetch Region-wise Sales Data
  useEffect(() => {
    const fetchRegionSales = async () => {
      try {
        setRegionLoading(true)

        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        // Calculate date range (last 12 months)
        const toDate = new Date()
        const fromDate = new Date()
        fromDate.setMonth(fromDate.getMonth() - 12)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
          'FromDate': fromDate.toISOString().split('T')[0],
          'ToDate': toDate.toISOString().split('T')[0],
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}BusinessHealth/RegionWiseSales`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const data = await response.json()
          console.log('✅ Region-wise Sales - Count:', Array.isArray(data) ? data.length : 0)
          console.log('📊 Region-wise Sales - Data:', data)

          // Map API data to component format
          if (Array.isArray(data) && data.length > 0) {
            const mappedData = data.map((item: any) => ({
              region: item.City || 'Unknown',
              country: item.Country || 'Unknown',
              sales: parseFloat((item.CurrentYearSales / 100000).toFixed(1)) || 0, // Convert to lakhs
              previousSales: item.PreviousYearSales ? parseFloat((item.PreviousYearSales / 100000).toFixed(1)) : 0,
              growth: item.GrowthPercent ? parseFloat(item.GrowthPercent.toFixed(1)) : 0,
              difference: item.Difference ? parseFloat((item.Difference / 100000).toFixed(1)) : 0
            }))
            setRegionSalesData(mappedData)
          }
        } else {
          console.error('❌ Region-wise Sales Error:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Failed to fetch region sales:', error)
      } finally {
        setRegionLoading(false)
      }
    }

    fetchRegionSales()
  }, [])

  // Fetch Sales Trend Data
  useEffect(() => {
    const fetchSalesTrend = async () => {
      try {
        setSalesTrendLoading(true)

        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        // Calculate date range (current year)
        const toDate = new Date()
        const fromDate = new Date(toDate.getFullYear(), 0, 1) // January 1st of current year

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
          'FromDate': fromDate.toISOString().split('T')[0],
          'ToDate': toDate.toISOString().split('T')[0],
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}BusinessHealth/SalesTrend`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const data = await response.json()
          console.log('✅ Sales Trend - Count:', Array.isArray(data) ? data.length : 0)
          console.log('📊 Sales Trend - Data:', data)

          // Map API data to chart format
          if (Array.isArray(data) && data.length > 0) {
            const mappedData = data.map((item: any) => ({
              month: item.MonthName ? item.MonthName.substring(0, 3) : 'N/A', // "November" → "Nov"
              monthFull: item.MonthName || 'N/A',
              current: item.CurrentYearSales || 0,
              past: item.PreviousYearSales || 0,
              difference: item.Difference || 0,
              growthPercent: parseFloat(item.GrowthPercent?.toFixed(1)) || 0
            }))
            setSalesTrendData(mappedData)
          }
        } else {
          console.error('❌ Sales Trend Error:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Failed to fetch sales trend:', error)
      } finally {
        setSalesTrendLoading(false)
      }
    }

    fetchSalesTrend()
  }, [])

  // Fetch Top-Selling Products Data
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setProductsLoading(true)

        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        // Calculate date range (current year)
        const toDate = new Date()
        const fromDate = new Date(toDate.getFullYear(), 0, 1) // January 1st of current year

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
          'FromDate': fromDate.toISOString().split('T')[0],
          'ToDate': toDate.toISOString().split('T')[0],
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}BusinessHealth/TopSellingProducts`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const data = await response.json()
          console.log('✅ Top Products - Count:', Array.isArray(data) ? data.length : 0)
          console.log('📊 Top Products - Data:', data)

          // Map API data to chart format
          if (Array.isArray(data) && data.length > 0) {
            const mappedData = data.map((item: any) => ({
              product: item.CategoryName || 'N/A',
              sales: item.TotalSales || 0,
              totalSales: item.TotalSales || 0,
              quantity: item.TotalQuantity || 0,
              sharePercent: parseFloat(item.SalesSharePercent?.toFixed(1)) || 0
            }))
            setTopProductsData(mappedData)
          }
        } else {
          console.error('❌ Top Products Error:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Failed to fetch top products:', error)
      } finally {
        setProductsLoading(false)
      }
    }

    fetchTopProducts()
  }, [])

  // Sales Trend Data (Dynamic)
  const [salesTrendData, setSalesTrendData] = useState<any[]>([])
  const [salesTrendLoading, setSalesTrendLoading] = useState(false)

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

  // Top Selling Products (Dynamic)
  const [topProductsData, setTopProductsData] = useState<{
    product: string
    sales: number
    totalSales: number
    quantity: number
    sharePercent: number
  }[]>([])
  const [productsLoading, setProductsLoading] = useState(false)

  // Region-wise Sales (Dynamic)
  const [regionSalesData, setRegionSalesData] = useState<{
    region: string
    country: string
    sales: number
    previousSales: number
    growth: number
    difference: number
  }[]>([])
  const [regionLoading, setRegionLoading] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  // Filter region sales data based on selected region
  const filteredRegionData = React.useMemo(() => {
    if (selectedRegion === 'all') {
      return regionSalesData
    }
    return regionSalesData.filter(item => item.region === selectedRegion)
  }, [regionSalesData, selectedRegion])

  // Get unique regions for filter dropdown
  const availableRegions = React.useMemo(() => {
    return ['all', ...Array.from(new Set(regionSalesData.map(item => item.region)))]
  }, [regionSalesData])

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
            {salesTrendLoading ? (
              <div className="flex items-center justify-center h-[160px] sm:h-[200px] lg:h-[260px]">
                <p className="text-sm text-gray-500">Loading sales trend data...</p>
              </div>
            ) : salesTrendData.length === 0 ? (
              <div className="flex items-center justify-center h-[160px] sm:h-[200px] lg:h-[260px]">
                <p className="text-sm text-gray-500">No sales trend data available</p>
              </div>
            ) : (
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
                    <Line type="monotone" dataKey="growthPercent" stroke="#10b981" strokeWidth={2} name="Growth %" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
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
            {productsLoading ? (
              <div className="flex items-center justify-center h-[200px] sm:h-[240px] lg:h-[280px]">
                <p className="text-sm text-gray-500">Loading products data...</p>
              </div>
            ) : topProductsData.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] sm:h-[240px] lg:h-[280px]">
                <p className="text-sm text-gray-500">No products data available</p>
              </div>
            ) : (
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
                    <Bar dataKey="sales" fill="#8b5cf6" name="Total Sales" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Region-wise Sales */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <CardTitle className="text-xs sm:text-sm lg:text-base">Region-wise Sales Performance</CardTitle>

            {/* Region Filter Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-[10px] sm:text-xs text-gray-600">Filter:</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {availableRegions.map((region) => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
              <Badge variant="outline" className="text-[10px] sm:text-xs">
                {filteredRegionData.length} {filteredRegionData.length === 1 ? 'Region' : 'Regions'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2 sm:pb-3 lg:pb-4">
          {regionLoading ? (
            <div className="flex items-center justify-center h-[240px]">
              <p className="text-sm text-gray-500">Loading region sales data...</p>
            </div>
          ) : regionSalesData.length === 0 ? (
            <div className="flex items-center justify-center h-[240px]">
              <p className="text-sm text-gray-500">No region sales data available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div className="h-[160px] sm:h-[200px] lg:h-[240px] -mx-2 sm:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredRegionData} margin={{ top: 5, right: 25, left: -15, bottom: 5 }}>
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
                    <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Current Sales (₹L)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="previousSales" fill="#94a3b8" name="Previous Sales (₹L)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="growth" fill="#10b981" name="Growth %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <div className="max-h-[240px] overflow-y-auto scrollbar-thin">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs bg-gray-50">Region (City)</th>
                        <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs bg-gray-50">Country</th>
                        <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs bg-gray-50">Current Sales</th>
                        <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs bg-gray-50">Previous</th>
                        <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs bg-gray-50">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegionData.map((region, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-2 px-2 sm:px-3 text-[11px] sm:text-sm font-medium">{region.region}</td>
                          <td className="py-2 px-2 sm:px-3 text-[11px] sm:text-sm text-gray-600">{region.country}</td>
                          <td className="py-2 px-2 sm:px-3 text-[11px] sm:text-sm text-right font-semibold">₹{region.sales}L</td>
                          <td className="py-2 px-2 sm:px-3 text-[11px] sm:text-sm text-right text-gray-600">
                            {region.previousSales > 0 ? `₹${region.previousSales}L` : 'N/A'}
                          </td>
                          <td className="py-2 px-2 sm:px-3 text-right">
                            {region.growth !== null && region.growth !== 0 ? (
                              <Badge variant={region.growth >= 10 ? 'success' : region.growth > 0 ? 'secondary' : 'destructive'} className="text-[9px] sm:text-xs">
                                {region.growth > 0 ? '+' : ''}{region.growth}%
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[9px] sm:text-xs">New</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
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

            {/* Desktop Table */}
            <div className="hidden md:block">
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

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {newOrdersList.map((order, index) => (
                <div key={index} className="py-3 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold text-gray-900">{order.orderNo}</p>
                      <p className="text-[10px] text-gray-600 mt-0.5">{order.client}</p>
                    </div>
                    <Badge variant={order.status === 'Confirmed' ? 'success' : 'secondary'} className="text-[9px]">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-gray-500">Value:</span>
                    <span className="text-[11px] font-semibold text-gray-900">{order.value}</span>
                  </div>
                </div>
              ))}
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

            {/* Desktop Table */}
            <div className="hidden md:block">
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

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {customersBySalesVolume.map((customer, index) => (
                <div key={index} className="py-3 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-[11px] font-semibold text-gray-900 flex-1">{customer.name}</p>
                    <Badge variant={customer.growth >= 10 ? 'success' : 'secondary'} className="text-[9px]">
                      +{customer.growth}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[9px] text-gray-500 block">Sales</span>
                      <span className="text-[11px] font-semibold text-gray-900">₹{customer.sales}L</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 block">Orders</span>
                      <span className="text-[11px] text-gray-900">{customer.orders}</span>
                    </div>
                  </div>
                </div>
              ))}
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

            {/* Desktop Table */}
            <div className="hidden md:block">
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

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {productWiseSalesDetailed.map((product, index) => (
                <div key={index} className="py-3 space-y-2">
                  <p className="text-[11px] font-semibold text-gray-900">{product.product}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[9px] text-gray-500 block">Quantity</span>
                      <span className="text-[10px] text-gray-900">{product.qty.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 block">Value</span>
                      <span className="text-[10px] font-semibold text-gray-900">₹{product.value}L</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 block">Avg Price</span>
                      <span className="text-[10px] text-gray-900">₹{product.avgPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
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

            {/* Desktop Table */}
            <div className="hidden md:block">
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

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {avgProcessingData.map((item, index) => (
                <div key={index} className="py-3 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-[11px] font-semibold text-gray-900 flex-1">{item.category}</p>
                    <Badge
                      variant={item.status === 'On-Time' ? 'success' : item.status === 'Early' ? 'default' : 'destructive'}
                      className="text-[9px]"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[9px] text-gray-500 block">Avg Days</span>
                      <span className="text-[11px] font-semibold text-gray-900">{item.avgDays} days</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 block">Target</span>
                      <span className="text-[11px] text-gray-900">{item.targetDays} days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Executive Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm lg:text-base">Executive-wise Sales & Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          {/* Desktop Table */}
          <div className="hidden lg:block">
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

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {executiveData.map((exec, index) => (
              <div key={index} className="py-3 space-y-2.5">
                <div className="flex justify-between items-start gap-2 pb-2 border-b border-gray-100">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">{exec.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">Sales Value: ₹{exec.salesValue}L</p>
                  </div>
                  <Badge variant={exec.salesValue > 25 ? 'success' : exec.salesValue > 20 ? 'secondary' : 'warning'} className="text-[9px]">
                    {exec.salesValue > 25 ? 'Excellent' : exec.salesValue > 20 ? 'Good' : 'Average'}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Sales Qty</span>
                    <span className="text-[11px] text-gray-900">{exec.salesQty}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">New Clients</span>
                    <span className="text-[11px] text-gray-900">{exec.newClients}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Old Clients</span>
                    <span className="text-[11px] text-gray-900">{exec.oldClients}</span>
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
