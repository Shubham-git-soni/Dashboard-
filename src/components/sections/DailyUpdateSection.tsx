"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FiFileText,
  FiTruck,
  FiShoppingBag,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiFilter,
  FiX
} from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useWindowSize } from '@/hooks/useWindowSize'
import { ResponsiveChartWrapper, getChartConfig } from '@/components/ui/responsive-chart'

// Order BOM Check Data
const orderBOMData = [
  {
    orderDate: '2024-01-15',
    clientName: 'ABC Corporation',
    jobName: 'Brochure Printing - 5000 pcs',
    plate: 'Received',
    die: 'Received',
    paper: 'Available',
    paperIssued: '2000 RM',
    productionStatus: 'Printing'
  },
  {
    orderDate: '2024-01-14',
    clientName: 'XYZ Industries',
    jobName: 'Packaging Boxes - 10000 pcs',
    plate: 'Old/Received',
    die: 'Available',
    paper: 'OP Raised',
    paperIssued: '5000 RM',
    productionStatus: 'Die Cutting'
  },
  {
    orderDate: '2024-01-14',
    clientName: 'Premium Prints Ltd',
    jobName: 'Catalogs - 3000 pcs',
    plate: 'Pending',
    die: 'Received',
    paper: 'Available',
    paperIssued: '1500 RM',
    productionStatus: 'Pending'
  },
  {
    orderDate: '2024-01-13',
    clientName: 'Deluxe Packaging',
    jobName: 'Labels - 20000 pcs',
    plate: 'Received',
    die: 'Received',
    paper: 'Available',
    paperIssued: '3000 RM',
    productionStatus: 'Lamination'
  },
  {
    orderDate: '2024-01-13',
    clientName: 'Elite Graphics',
    jobName: 'Business Cards - 15000 pcs',
    plate: 'Old/Received',
    die: 'Available',
    paper: 'OP Raised',
    paperIssued: 'Pending',
    productionStatus: 'Pending'
  }
]

// Pending Sales POs
const pendingSalesPOs = [
  { poNumber: 'SO-2024-125', client: 'ABC Corp', jobName: 'Brochure Printing', value: '₹2,50,000', deliveryDate: '2024-01-22', expectedDate: '2024-01-20', dueDate: '2024-01-20', delay: 2, status: 'delayed' },
  { poNumber: 'SO-2024-124', client: 'XYZ Industries', jobName: 'Packaging Boxes', value: '₹1,85,000', deliveryDate: '2024-01-21', expectedDate: '2024-01-22', dueDate: '2024-01-22', delay: 0, status: 'on-time' },
  { poNumber: 'SO-2024-123', client: 'Premium Prints', jobName: 'Catalogs', value: '₹95,000', deliveryDate: 'N/A', expectedDate: '2024-01-25', dueDate: '2024-01-25', delay: 5, status: 'delayed' },
  { poNumber: 'SO-2024-122', client: 'Deluxe Packaging', jobName: 'Labels', value: '₹3,20,000', deliveryDate: '2024-01-17', expectedDate: '2024-01-18', dueDate: '2024-01-18', delay: 0, status: 'on-time' }
]

// Pending Deliveries
const pendingDeliveries = [
  { deliveryNo: 'DEL-2024-089', client: 'ABC Corp', jobName: 'Brochure Printing', value: '₹1,50,000', scheduled: '2024-01-16', delay: 1, status: 'delayed' },
  { deliveryNo: 'DEL-2024-088', client: 'XYZ Industries', jobName: 'Packaging Boxes', value: '₹2,25,000', scheduled: '2024-01-17', delay: 0, status: 'on-time' },
  { deliveryNo: 'DEL-2024-087', client: 'Elite Graphics', jobName: 'Business Cards', value: '₹85,000', scheduled: '2024-01-15', delay: 3, status: 'delayed' },
  { deliveryNo: 'DEL-2024-086', client: 'Modern Prints', jobName: 'Catalogs', value: '₹1,95,000', scheduled: '2024-01-18', delay: 0, status: 'on-time' }
]

// Pending Purchase POs
const pendingPurchasePOs = [
  { poNumber: 'PO-2024-156', vendor: 'Paper Suppliers Inc', value: '₹5,25,000', dueDate: '2024-01-20', delay: 0, status: 'on-time' },
  { poNumber: 'PO-2024-155', vendor: 'Ink Vendors Ltd', value: '₹2,80,000', dueDate: '2024-01-18', delay: 2, status: 'delayed' },
  { poNumber: 'PO-2024-154', vendor: 'Equipment Co', value: '₹95,000', dueDate: '2024-01-22', delay: 0, status: 'on-time' }
]

// Pending GRN
const pendingGRN = [
  { grnNo: 'GRN-2024-245', vendor: 'Paper Suppliers Inc', value: '₹4,50,000', poNumber: 'PO-2024-145', delay: 3, status: 'delayed' },
  { grnNo: 'GRN-2024-244', vendor: 'Ink Vendors Ltd', value: '₹1,85,000', poNumber: 'PO-2024-144', delay: 0, status: 'on-time' },
  { grnNo: 'GRN-2024-243', vendor: 'Die Makers', value: '₹75,000', poNumber: 'PO-2024-143', delay: 1, status: 'delayed' }
]

interface PendingItemsTableProps {
  title: string
  icon: React.ElementType
  color: string
  bgColor: string
  count: number
  value: string
  data: any[]
  columns: { key: string; label: string }[]
}

function PendingItemsTable({ title, icon: Icon, color, bgColor, count, value, data, columns }: PendingItemsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'on-time' | 'delayed'>('all')

  // Filter data based on search and status
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search filter
      const searchMatch = Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )

      // Status filter
      const statusMatch = statusFilter === 'all' || item.status === statusFilter

      return searchMatch && statusMatch
    })
  }, [data, searchTerm, statusFilter])

  return (
    <Card>
      <CardHeader className={`${bgColor} border-b p-3 sm:p-6 space-y-3 sm:space-y-4`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg bg-white shadow-sm">
              <Icon className={color} size={14} />
            </div>
            <div>
              <CardTitle className="text-xs sm:text-sm lg:text-base font-bold">{title}</CardTitle>
              <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-600 mt-0.5">{value}</p>
            </div>
          </div>
          <Badge className={`${color.replace('text-', 'bg-')} text-white font-bold text-[10px] sm:text-xs h-5 sm:h-6 lg:h-7 px-2 sm:px-3`}>
            {count} Items
          </Badge>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search by client, job, order no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'on-time' | 'delayed')}
                className="pl-8 pr-8 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="on-time">On-Time</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>

            {/* Results Count */}
            <Badge variant="outline" className="text-[10px] sm:text-xs whitespace-nowrap">
              {filteredData.length} of {data.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Empty State */}
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <FiSearch className="text-gray-300 mb-3" size={48} />
            <p className="text-sm font-medium text-gray-600">No results found</p>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your search or filter</p>
            {(searchTerm || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                className="mt-4 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View with Scrollbar */}
            <div className="hidden md:block overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {columns.map((col) => (
                      <th key={col.key} className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm">
                      {col.key === 'status' ? (
                        <Badge
                          variant={row.delay > 0 ? 'destructive' : 'success'}
                          className="text-[9px] sm:text-[10px]"
                        >
                          {row.delay > 0 ? `Delayed ${row.delay}d` : 'On-Time'}
                        </Badge>
                      ) : (
                        <span className={col.key.includes('value') ? 'font-semibold text-gray-900' : ''}>
                          {row[col.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View with Scrollbar */}
        <div className="md:hidden divide-y divide-gray-100 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          {filteredData.map((row, idx) => (
            <div key={idx} className="p-3 hover:bg-gray-50 transition-colors">
              <div className="space-y-2">
                {columns.map((col) => (
                  <div key={col.key} className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide min-w-[80px]">
                      {col.label}
                    </span>
                    <div className="text-right flex-1">
                      {col.key === 'status' ? (
                        <Badge
                          variant={row.delay > 0 ? 'destructive' : 'success'}
                          className="text-[9px]"
                        >
                          {row.delay > 0 ? `Delayed ${row.delay}d` : 'On-Time'}
                        </Badge>
                      ) : (
                        <span className={`text-[11px] ${col.key.includes('value') ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {row[col.key]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default function DailyUpdateSection() {
  const { isMobile, isTablet } = useWindowSize()
  const chartConfig = getChartConfig(isMobile, isTablet)

  // State for dynamic data
  const [salesPOsData, setSalesPOsData] = useState<any[]>([])
  const [deliveriesData, setDeliveriesData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Calculate chart data dynamically
  const salesPOChartData = useMemo(() => {
    const onTimeCount = salesPOsData.filter(item => item.status === 'on-time').length
    const delayedCount = salesPOsData.filter(item => item.status === 'delayed').length

    const onTimeValue = salesPOsData
      .filter(item => item.status === 'on-time')
      .reduce((sum, item) => sum + (parseFloat(item.value.replace(/[₹,]/g, '')) || 0), 0) / 100000 // Convert to lakhs

    const delayedValue = salesPOsData
      .filter(item => item.status === 'delayed')
      .reduce((sum, item) => sum + (parseFloat(item.value.replace(/[₹,]/g, '')) || 0), 0) / 100000 // Convert to lakhs

    return [
      { name: 'On-Time', count: onTimeCount, value: parseFloat(onTimeValue.toFixed(1)) },
      { name: 'Delayed', count: delayedCount, value: parseFloat(delayedValue.toFixed(1)) }
    ]
  }, [salesPOsData])

  const deliveryChartData = useMemo(() => {
    const onTimeCount = deliveriesData.filter(item => item.status === 'on-time').length
    const delayedCount = deliveriesData.filter(item => item.status === 'delayed').length
    const totalCount = deliveriesData.length

    const onTimeValue = deliveriesData
      .filter(item => item.status === 'on-time')
      .reduce((sum, item) => sum + (parseFloat(item.value.replace(/[₹,]/g, '')) || 0), 0) / 100000

    const delayedValue = deliveriesData
      .filter(item => item.status === 'delayed')
      .reduce((sum, item) => sum + (parseFloat(item.value.replace(/[₹,]/g, '')) || 0), 0) / 100000

    return [
      { name: 'On-Time', count: onTimeCount, value: parseFloat(onTimeValue.toFixed(1)) },
      { name: 'Delayed', count: delayedCount, value: parseFloat(delayedValue.toFixed(1)) },
      { name: 'Total Pending', count: totalCount, value: parseFloat(((onTimeValue + delayedValue)).toFixed(1)) }
    ]
  }, [deliveriesData])

  // Fetch Pending Sales Orders and Deliveries
  useEffect(() => {
    const fetchDailyUpdates = async () => {
      try {
        setLoading(true)

        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        // Calculate date range (last 30 days)
        const toDate = new Date()
        const fromDate = new Date()
        fromDate.setDate(fromDate.getDate() - 30)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2', 
          'FYEAR': '2025-2026',
          'FromDate': fromDate.toISOString().split('T')[0], // YYYY-MM-DD format
          'ToDate': toDate.toISOString().split('T')[0], // YYYY-MM-DD format
        }

        // Fetch Pending Sales Orders
        const salesPOsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}DailyUpdate/PendingSalesOrders`,
          { method: 'GET', headers }
        )

        // Fetch Pending Deliveries
        const deliveriesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}DailyUpdate/PendingDeliveries`,
          { method: 'GET', headers }
        )

        let salesPOsApiData = []
        let deliveriesApiData = []

        if (salesPOsResponse.ok) {
          salesPOsApiData = await salesPOsResponse.json()
          console.log('✅ Pending Sales Orders - Count:', Array.isArray(salesPOsApiData) ? salesPOsApiData.length : 0)
          console.log('📊 Pending Sales Orders - Data:', salesPOsApiData)

          // Map API data to component format
          if (Array.isArray(salesPOsApiData) && salesPOsApiData.length > 0) {
            const mappedData = salesPOsApiData.map((item: any) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0) // Reset time to start of day

              // Use current date if DeliveryDate is null, otherwise use DeliveryDate
              const comparisonDate = item.DeliveryDate
                ? new Date(item.DeliveryDate)
                : today // Current system date

              comparisonDate.setHours(0, 0, 0, 0)

              const expectedDate = item.ExpectedDeliveryDate
                ? new Date(item.ExpectedDeliveryDate)
                : null

              if (expectedDate) {
                expectedDate.setHours(0, 0, 0, 0)
              }

              // Calculate delay and status
              let delayDays = 0
              let calculatedStatus = 'on-time'
              let displayDeliveryDate = item.DeliveryDate || 'Pending'

              if (expectedDate) {
                // Calculate difference in days
                const diffTime = comparisonDate.getTime() - expectedDate.getTime()
                const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                // Status decide karo based on comparison
                if (daysDiff > 0) {
                  // Late hai (comparison date > expected date)
                  delayDays = daysDiff
                  calculatedStatus = 'delayed'
                } else {
                  // On-time hai (comparison date <= expected date)
                  delayDays = 0
                  calculatedStatus = 'on-time'
                }
              }

              return {
                poNumber: item.SalesOrderNo || 'N/A',
                client: item.ClientName || 'N/A',
                jobName: item.JobName || 'N/A',
                value: `₹${item.NetAmount?.toLocaleString('en-IN') || '0'}`,
                deliveryDate: displayDeliveryDate,
                expectedDate: item.ExpectedDeliveryDate || 'N/A',
                dueDate: item.ExpectedDeliveryDate || 'N/A',
                delay: delayDays,
                status: calculatedStatus
              }
            })
            setSalesPOsData(mappedData)
          }
        } else {
          console.error(' Pending Sales Orders Error:', salesPOsResponse.status, salesPOsResponse.statusText)
        }

        if (deliveriesResponse.ok) {
          deliveriesApiData = await deliveriesResponse.json()
          console.log(' Pending Deliveries - Count:', Array.isArray(deliveriesApiData) ? deliveriesApiData.length : 0)
          console.log(' Pending Deliveries - Data:', deliveriesApiData)

          // Map API data to component format
          if (Array.isArray(deliveriesApiData) && deliveriesApiData.length > 0) {
            const mappedData = deliveriesApiData.map((item: any) => {
              // Calculate delay days if DeliveryStatus is "Delay"
              let delayDays = 0
              if (item.DeliveryStatus === 'Delay' && item.ExpectedDeliveryDate) {
                const expectedDate = new Date(item.ExpectedDeliveryDate)
                const today = new Date()
                const diffTime = today.getTime() - expectedDate.getTime()
                delayDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
              }

              return {
                deliveryNo: item.SalesOrderNo || 'N/A',
                client: item.ClientName || 'N/A',
                jobName: item.JobName || 'N/A',
                value: `₹${item.NetAmount?.toLocaleString('en-IN') || '0'}`,
                deliverydate: item.DeliveryDate || 'Pending',
                scheduled: item.ExpectedDeliveryDate || item.DeliveryDate || 'N/A',
                delay: delayDays,
                status: item.DeliveryStatus === 'Delay' ? 'delayed' : 'on-time'
              }
            })
            setDeliveriesData(mappedData)
          }
        } else {
          console.error(' Pending Deliveries Error:', deliveriesResponse.status, deliveriesResponse.statusText)
        }
      } catch (error) {
        console.error('Failed to fetch daily updates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDailyUpdates()
  }, [])

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div>
        <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">My Daily Update</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Current orders, production tracking, and delivery status</p>
      </div>

      {/* Order BOM Check Table */}
      <Card>
        <CardHeader className="bg-blue-50 border-b p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-lg bg-white shadow-sm">
                <FiFileText className="text-blue-600" size={14} />
              </div>
              <div>
                <CardTitle className="text-xs sm:text-sm lg:text-base font-bold">Order BOM Check</CardTitle>
                <p className="text-[9px] sm:text-[10px] lg:text-xs text-gray-600 mt-0.5">Real-time production status and material availability</p>
              </div>
            </div>
            <Badge className="bg-blue-600 text-white font-bold text-[10px] sm:text-xs h-5 sm:h-6 lg:h-7 px-2 sm:px-3">
              {orderBOMData.length} Active Orders
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Order Date</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Client Name</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Job Name</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Plate</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Die</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Paper</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Paper Issued</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Production Status</th>
                </tr>
              </thead>
              <tbody>
                {orderBOMData.map((order, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm whitespace-nowrap">{order.orderDate}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm font-medium">{order.clientName}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm">{order.jobName}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm">
                      <Badge variant={order.plate.includes('Received') ? 'success' : 'secondary'} className="text-[9px] sm:text-[10px]">
                        {order.plate}
                      </Badge>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm">
                      <Badge variant={order.die.includes('Received') || order.die === 'Available' ? 'success' : 'secondary'} className="text-[9px] sm:text-[10px]">
                        {order.die}
                      </Badge>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm">
                      <Badge variant={order.paper === 'Available' ? 'success' : 'warning'} className="text-[9px] sm:text-[10px]">
                        {order.paper}
                      </Badge>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm font-semibold">{order.paperIssued}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-sm">
                      <Badge variant={order.productionStatus === 'Pending' ? 'secondary' : 'default'} className="text-[9px] sm:text-[10px]">
                        {order.productionStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden divide-y divide-gray-100">
            {orderBOMData.map((order, idx) => (
              <div key={idx} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                <div className="space-y-2.5">
                  {/* Header Row */}
                  <div className="flex justify-between items-start gap-2 pb-2 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">{order.clientName}</p>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{order.jobName}</p>
                    </div>
                    <Badge variant={order.productionStatus === 'Pending' ? 'secondary' : 'default'} className="text-[9px] whitespace-nowrap">
                      {order.productionStatus}
                    </Badge>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Order Date</span>
                      <span className="text-[11px] text-gray-700">{order.orderDate}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide block mb-1">Paper Issued</span>
                      <span className="text-[11px] text-gray-900 font-semibold">{order.paperIssued}</span>
                    </div>
                  </div>

                  {/* Material Status */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-500">Plate:</span>
                      <Badge variant={order.plate.includes('Received') ? 'success' : 'secondary'} className="text-[8px] h-4 px-1.5">
                        {order.plate}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-500">Die:</span>
                      <Badge variant={order.die.includes('Received') || order.die === 'Available' ? 'success' : 'secondary'} className="text-[8px] h-4 px-1.5">
                        {order.die}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-500">Paper:</span>
                      <Badge variant={order.paper === 'Available' ? 'success' : 'warning'} className="text-[8px] h-4 px-1.5">
                        {order.paper}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base font-semibold">Sales POs Status</CardTitle>
              <Badge variant="outline" className="text-[10px] sm:text-xs">
                {salesPOsData.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 lg:p-6">
            {loading ? (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-sm text-gray-500">Loading Sales POs data...</p>
              </div>
            ) : salesPOsData.length === 0 ? (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-sm text-gray-500">No Sales POs data available</p>
              </div>
            ) : (
              <ResponsiveChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesPOChartData} margin={chartConfig.margin}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: chartConfig.fontSize }}
                      tickMargin={chartConfig.tickMargin}
                    />
                    <YAxis
                      tick={{ fontSize: chartConfig.fontSize }}
                      tickMargin={chartConfig.tickMargin}
                      width={chartConfig.yAxisWidth}
                    />
                    <Tooltip
                      contentStyle={chartConfig.tooltipStyle}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                      formatter={(value: any, name: string) => {
                        if (name === 'Count') return [value, 'Orders']
                        if (name === 'Value') return [`₹${value}L`, 'Value']
                        return [value, name]
                      }}
                    />
                    <Legend
                      wrapperStyle={chartConfig.legendStyle}
                      iconSize={chartConfig.iconSize}
                    />
                    <Bar dataKey="count" fill="#3b82f6" name="Count" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="value" fill="#10b981" name="Value (₹L)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ResponsiveChartWrapper>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base font-semibold">Delivery Status</CardTitle>
              <Badge variant="outline" className="text-[10px] sm:text-xs">
                {deliveriesData.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 lg:p-6">
            {loading ? (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-sm text-gray-500">Loading Deliveries data...</p>
              </div>
            ) : deliveriesData.length === 0 ? (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-sm text-gray-500">No Deliveries data available</p>
              </div>
            ) : (
              <ResponsiveChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deliveryChartData} margin={chartConfig.margin}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: chartConfig.fontSize }}
                      tickMargin={chartConfig.tickMargin}
                    />
                    <YAxis
                      tick={{ fontSize: chartConfig.fontSize }}
                      tickMargin={chartConfig.tickMargin}
                      width={chartConfig.yAxisWidth}
                    />
                    <Tooltip
                      contentStyle={chartConfig.tooltipStyle}
                      cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                      formatter={(value: any, name: string) => {
                        if (name === 'Count') return [value, 'Deliveries']
                        if (name === 'Value (₹L)') return [`₹${value}L`, 'Value']
                        return [value, name]
                      }}
                    />
                    <Legend
                      wrapperStyle={chartConfig.legendStyle}
                      iconSize={chartConfig.iconSize}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" name="Count" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="value" fill="#f59e0b" name="Value (₹L)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ResponsiveChartWrapper>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pending Sales POs */}
      <PendingItemsTable
        title="Pending Sales POs"
        icon={FiShoppingBag}
        color="text-blue-600"
        bgColor="bg-blue-50"
        count={salesPOsData.length}
        value={loading ? 'Loading...' : `Total Value: ₹${(salesPOsData.reduce((sum, item) => sum + (parseFloat(item.value.replace(/[₹,]/g, '')) || 0), 0) / 100000).toFixed(1)}L`}
        data={salesPOsData}
        columns={[
          { key: 'poNumber', label: 'Sales Order No' },
          { key: 'client', label: 'Client' },
          { key: 'jobName', label: 'Job Name' },
          { key: 'value', label: 'Value' },
          { key: 'deliveryDate', label: 'Delivery Date' },
          { key: 'expectedDate', label: 'Expected Date' },
          { key: 'status', label: 'Status' }
        ]}
      />

      {/* Pending Deliveries */}
      <PendingItemsTable
        title="Pending Deliveries"
        icon={FiTruck}
        color="text-purple-600"
        bgColor="bg-purple-50"
        count={deliveriesData.length}
        value={loading ? 'Loading...' : `Total Value: ₹${(deliveriesData.reduce((sum, item) => sum + (parseFloat(item.value.replace(/[₹,]/g, '')) || 0), 0) / 100000).toFixed(1)}L`}
        data={deliveriesData}
        columns={[
          { key: 'deliveryNo', label: 'Sales Order No' },
          { key: 'client', label: 'Client' },
          { key: 'jobName', label: 'Job Name' },
          { key: 'value', label: 'Value' },
          { key: 'deliverydate', label: 'Delivery Date' },
          { key: 'scheduled', label: 'Expected Delivery' },
          { key: 'status', label: 'Status' }
        ]}
      />

      {/* Pending Purchase POs */}
      <PendingItemsTable
        title="Pending Purchase POs"
        icon={FiShoppingBag}
        color="text-orange-600"
        bgColor="bg-orange-50"
        count={pendingPurchasePOs.length}
        value="Total Value: ₹9.0L"
        data={pendingPurchasePOs}
        columns={[
          { key: 'poNumber', label: 'PO Number' },
          { key: 'vendor', label: 'Vendor' },
          { key: 'value', label: 'Value' },
          { key: 'dueDate', label: 'Due Date' },
          { key: 'status', label: 'Status' }
        ]}
      />

      {/* Pending GRN */}
      <PendingItemsTable
        title="Pending GRN (Goods Receipt Note)"
        icon={FiPackage}
        color="text-teal-600"
        bgColor="bg-teal-50"
        count={pendingGRN.length}
        value="Total Value: ₹7.1L"
        data={pendingGRN}
        columns={[
          { key: 'grnNo', label: 'GRN No' },
          { key: 'vendor', label: 'Vendor' },
          { key: 'value', label: 'Value' },
          { key: 'poNumber', label: 'PO Number' },
          { key: 'status', label: 'Status' }
        ]}
      />
    </div>
  )
}
