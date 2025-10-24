"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FiCheckCircle,
  FiDollarSign,
  FiShoppingCart,
  FiFileText,
  FiAlertTriangle,
  FiPackage,
  FiArrowRight,
  FiClock
} from 'react-icons/fi'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

const approvalData = [
  {
    id: 'internal',
    title: 'Internal Approval',
    count: 8,
    icon: FiCheckCircle,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    trend: [5, 8, 6, 9, 8, 7, 8],
    priority: 'high',
    items: [
      { name: 'Budget Allocation - Marketing', amount: '', date: 'Today', urgent: true },
      { name: 'Process Change - Production', amount: '', date: 'Yesterday', urgent: false },
      { name: 'Equipment Purchase Auth', amount: '', date: '2 days ago', urgent: false }
    ]
  },
  {
    id: 'price',
    title: 'Price Approval',
    count: 6,
    icon: FiDollarSign,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
    trend: [3, 5, 7, 6, 8, 7, 6],
    items: [
      { name: 'Client XYZ - Packaging Quote', amount: '₹85,000', date: 'Today', urgent: false },
      { name: 'ABC Corp - Brochure Printing', amount: '₹1,25,000', date: 'Today', urgent: true }
    ]
  },
  {
    id: 'purchase-req',
    title: 'Purchase Requisition',
    count: 12,
    icon: FiShoppingCart,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    trend: [10, 12, 11, 13, 15, 14, 12],
    priority: 'high',
    items: [
      { name: 'Raw Paper Stock - 5000 sheets', amount: '₹3,50,000', date: 'Today', urgent: true },
      { name: 'Printing Ink - CMYK Set', amount: '₹1,20,000', date: 'Today', urgent: true },
      { name: 'Die Cutting Blades', amount: '₹45,000', date: 'Yesterday', urgent: false }
    ]
  },
  {
    id: 'po',
    title: 'PO Approval',
    count: 5,
    icon: FiFileText,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    trend: [4, 5, 6, 5, 6, 7, 5],
    items: [
      { name: 'PO-2024-156 - Paper Supplier', amount: '₹5,25,000', date: 'Today', urgent: false },
      { name: 'PO-2024-155 - Ink Vendor', amount: '₹2,80,000', date: 'Yesterday', urgent: true }
    ]
  },
  {
    id: 'invoice',
    title: 'Invoice Approval',
    count: 9,
    icon: FiFileText,
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    trend: [7, 8, 9, 10, 11, 10, 9],
    items: [
      { name: 'INV-2024-089 - ABC Suppliers', amount: '₹1,85,000', date: 'Today', urgent: false },
      { name: 'INV-2024-088 - XYZ Vendors', amount: '₹95,000', date: 'Today', urgent: false },
      { name: 'INV-2024-087 - Equipment Co', amount: '₹3,25,000', date: 'Yesterday', urgent: true }
    ]
  },
  {
    id: 'critical-stock',
    title: 'Critical Stock Items',
    count: 15,
    value: '₹4.2L',
    icon: FiAlertTriangle,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
    trend: [12, 15, 14, 16, 18, 17, 15],
    priority: 'high',
    items: [
      { name: 'A4 Premium Paper Stock', amount: '₹85,000', date: 'Below Min', urgent: true },
      { name: 'Cyan Printing Ink', amount: '₹35,000', date: 'Below Min', urgent: true },
      { name: 'Lamination Film (Glossy)', amount: '₹55,000', date: 'Below Min', urgent: true }
    ]
  },
  {
    id: 'paper-req',
    title: 'Paper Requirements',
    count: 18,
    value: '₹8.5L',
    icon: FiPackage,
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    trend: [20, 22, 21, 23, 25, 24, 18],
    items: [
      { name: 'SO-2024-125 - ABC Corp Order', amount: '₹1,25,000', date: 'Req: Jan 20', urgent: true },
      { name: 'SO-2024-124 - XYZ Industries', amount: '₹2,50,000', date: 'Req: Jan 22', urgent: true },
      { name: 'SO-2024-123 - Premium Prints', amount: '₹95,000', date: 'Req: Jan 25', urgent: false }
    ]
  }
]

export default function ApprovalsSection() {
  const totalPending = approvalData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Pending Approvals & Actions</h3>
          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">Review and execute critical tasks</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Badge className="bg-orange-500 h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm font-bold">{totalPending} Total</Badge>
          <Badge variant="destructive" className="h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm font-bold animate-pulse">
            {approvalData.filter(a => a.priority === 'high').length} Urgent
          </Badge>
        </div>
      </div>

      {/* Compact Grid of Approval Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {approvalData.map((approval) => {
          const Icon = approval.icon
          const trendData = approval.trend.map((value, index) => ({ value, index }))

          return (
            <Card key={approval.id} className="border hover:shadow-lg transition-all group overflow-hidden focus:outline-none">
              <CardContent className="p-0">
                {/* Compact Header with Trend */}
                <div className={`${approval.lightColor} p-2 sm:p-3 border-b`}>
                  <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${approval.color} flex items-center justify-center`}>
                      <Icon className="text-white" size={16} />
                    </div>
                    {approval.priority === 'high' && (
                      <Badge variant="destructive" className="h-4 sm:h-5 px-1.5 sm:px-2 text-[8px] sm:text-[9px] animate-pulse">URGENT</Badge>
                    )}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className={`text-xl sm:text-2xl font-bold ${approval.textColor}`}>{approval.count}</div>
                      <div className="text-[9px] sm:text-[10px] text-gray-600 uppercase tracking-wide">Pending</div>
                    </div>

                    {/* Mini Trend Chart */}
                    <div className="h-8 w-12 sm:h-10 sm:w-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                          <defs>
                            <linearGradient id={`gradient-${approval.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={approval.color.replace('bg-', '#')} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={approval.color.replace('bg-', '#')} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Tooltip contentStyle={{ fontSize: '10px', padding: '2px 6px' }} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={approval.color.replace('bg-', '#')}
                            strokeWidth={1.5}
                            fill={`url(#gradient-${approval.id})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white border-b">
                  <h4 className="text-[11px] sm:text-xs font-bold text-gray-900">{approval.title}</h4>
                  {approval.value && (
                    <p className="text-[9px] sm:text-[10px] text-gray-600 mt-0.5">Total Value: {approval.value}</p>
                  )}
                </div>

                {/* Compact Item List */}
                <div className="p-1.5 sm:p-2 bg-white space-y-1">
                  {approval.items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors group/item"
                    >
                      <div className="flex-1 min-w-0 mr-1.5 sm:mr-2">
                        <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                          <p className="text-[11px] sm:text-xs font-medium text-gray-900 truncate">{item.name}</p>
                          {item.urgent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-gray-600">
                          <span className="flex items-center gap-0.5 sm:gap-1">
                            <FiClock size={9} />
                            {item.date}
                          </span>
                          {item.amount && (
                            <span className="font-semibold text-gray-900">{item.amount}</span>
                          )}
                        </div>
                      </div>
                      <button className="opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0">
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${approval.color} flex items-center justify-center hover:scale-110 transition-transform`}>
                          <FiArrowRight className="text-white" size={11} />
                        </div>
                      </button>
                    </div>
                  ))}

                  {approval.items.length > 3 && (
                    <button className="w-full mt-0.5 sm:mt-1 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      View All {approval.count} Items →
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
