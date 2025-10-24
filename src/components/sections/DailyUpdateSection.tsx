"use client"

import React from 'react'
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
  FiClock
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
  { poNumber: 'SO-2024-125', client: 'ABC Corp', value: '₹2,50,000', dueDate: '2024-01-20', delay: 2, status: 'delayed' },
  { poNumber: 'SO-2024-124', client: 'XYZ Industries', value: '₹1,85,000', dueDate: '2024-01-22', delay: 0, status: 'on-time' },
  { poNumber: 'SO-2024-123', client: 'Premium Prints', value: '₹95,000', dueDate: '2024-01-25', delay: 5, status: 'delayed' },
  { poNumber: 'SO-2024-122', client: 'Deluxe Packaging', value: '₹3,20,000', dueDate: '2024-01-18', delay: 0, status: 'on-time' }
]

// Pending Deliveries
const pendingDeliveries = [
  { deliveryNo: 'DEL-2024-089', client: 'ABC Corp', value: '₹1,50,000', scheduled: '2024-01-16', delay: 1, status: 'delayed' },
  { deliveryNo: 'DEL-2024-088', client: 'XYZ Industries', value: '₹2,25,000', scheduled: '2024-01-17', delay: 0, status: 'on-time' },
  { deliveryNo: 'DEL-2024-087', client: 'Elite Graphics', value: '₹85,000', scheduled: '2024-01-15', delay: 3, status: 'delayed' },
  { deliveryNo: 'DEL-2024-086', client: 'Modern Prints', value: '₹1,95,000', scheduled: '2024-01-18', delay: 0, status: 'on-time' }
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

// Chart data for visualization
const salesPOChartData = [
  { name: 'On-Time', count: 15, value: 45 },
  { name: 'Delayed', count: 8, value: 22 }
]

const deliveryChartData = [
  { name: 'Completed', count: 45, value: 120 },
  { name: 'Pending', count: 12, value: 35 },
  { name: 'Delayed', count: 5, value: 15 }
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
  return (
    <Card>
      <CardHeader className={`${bgColor} border-b`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg bg-white shadow-sm">
              <Icon className={color} size={16} />
            </div>
            <div>
              <CardTitle className="text-sm sm:text-base font-bold">{title}</CardTitle>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{value}</p>
            </div>
          </div>
          <Badge className={`${color.replace('text-', 'bg-')} text-white font-bold text-xs sm:text-sm h-6 sm:h-7 px-2 sm:px-3`}>
            {count} Items
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {columns.map((col) => (
                  <th key={col.key} className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
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
      </CardContent>
    </Card>
  )
}

export default function DailyUpdateSection() {
  const { isMobile, isTablet } = useWindowSize()
  const chartConfig = getChartConfig(isMobile, isTablet)

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div>
        <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">My Daily Update</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Current orders, production tracking, and delivery status</p>
      </div>

      {/* Order BOM Check Table */}
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-lg bg-white shadow-sm">
                <FiFileText className="text-blue-600" size={16} />
              </div>
              <div>
                <CardTitle className="text-sm sm:text-base font-bold">Order BOM Check</CardTitle>
                <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">Real-time production status and material availability</p>
              </div>
            </div>
            <Badge className="bg-blue-600 text-white font-bold text-xs sm:text-sm h-6 sm:h-7 px-2 sm:px-3">
              {orderBOMData.length} Active Orders
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">Order Date</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">Client Name</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Name</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">Plate</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">Die</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">Paper</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">Paper Issued</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">Production Status</th>
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
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base font-semibold">Sales POs Status</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 lg:p-6">
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
                  />
                  <Legend
                    wrapperStyle={chartConfig.legendStyle}
                    iconSize={chartConfig.iconSize}
                  />
                  <Bar dataKey="count" fill="#3b82f6" name="Count" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="value" fill="#10b981" name="Value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ResponsiveChartWrapper>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base font-semibold">Delivery Status</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 lg:p-6">
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
                  />
                  <Legend
                    wrapperStyle={chartConfig.legendStyle}
                    iconSize={chartConfig.iconSize}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" name="Count" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="value" fill="#f59e0b" name="Value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ResponsiveChartWrapper>
          </CardContent>
        </Card>
      </div>

      {/* Pending Sales POs */}
      <PendingItemsTable
        title="Pending Sales POs"
        icon={FiShoppingBag}
        color="text-blue-600"
        bgColor="bg-blue-50"
        count={pendingSalesPOs.length}
        value="Total Value: ₹8.5L"
        data={pendingSalesPOs}
        columns={[
          { key: 'poNumber', label: 'PO Number' },
          { key: 'client', label: 'Client' },
          { key: 'value', label: 'Value' },
          { key: 'dueDate', label: 'Due Date' },
          { key: 'status', label: 'Status' }
        ]}
      />

      {/* Pending Deliveries */}
      <PendingItemsTable
        title="Pending Deliveries"
        icon={FiTruck}
        color="text-purple-600"
        bgColor="bg-purple-50"
        count={pendingDeliveries.length}
        value="Total Value: ₹6.5L"
        data={pendingDeliveries}
        columns={[
          { key: 'deliveryNo', label: 'Delivery No' },
          { key: 'client', label: 'Client' },
          { key: 'value', label: 'Value' },
          { key: 'scheduled', label: 'Scheduled' },
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
