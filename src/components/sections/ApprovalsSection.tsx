"use client"

import React, { useState, useEffect } from 'react'
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
import { IconType } from 'react-icons'

interface ApprovalItem {
  name: string
  amount: string
  date: string
  urgent: boolean
}

interface ApprovalData {
  id: string
  title: string
  count: number
  icon: IconType
  color: string
  lightColor: string
  textColor: string
  trend: number[]
  priority?: string
  value?: string
  items: ApprovalItem[]
}

const staticApprovalData: ApprovalData[] = [
  {
    id: 'internal',
    title: 'Internal Approval',
    count: 0, // Will be updated dynamically
    icon: FiCheckCircle,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    trend: [5, 8, 6, 9, 8, 7, 8],
    priority: 'high',
    items: [] // Will be populated from API
  },
  {
    id: 'price',
    title: 'Price Approval',
    count: 0, // Will be updated dynamically
    icon: FiDollarSign,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
    trend: [3, 5, 7, 6, 8, 7, 6],
    items: [] // Will be populated from API
  },
  {
    id: 'purchase-req',
    title: 'Purchase Requisition',
    count: 0, // Will be updated dynamically
    icon: FiShoppingCart,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    trend: [10, 12, 11, 13, 15, 14, 12],
    priority: 'high',
    items: [] // Will be populated from API
  },
  {
    id: 'po',
    title: 'PO Approval',
    count: 0, // Will be updated dynamically
    icon: FiFileText,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    trend: [4, 5, 6, 5, 6, 7, 5],
    items: [] // Will be populated from API
  },
  {
    id: 'invoice',
    title: 'Invoice Approval',
    count: 0, // Will be updated dynamically
    icon: FiFileText,
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    trend: [7, 8, 9, 10, 11, 10, 9],
    items: [] // Will be populated from API
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
    count: 0, // Will be updated dynamically
    value: '₹0',
    icon: FiPackage,
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    trend: [20, 22, 21, 23, 25, 24, 18],
    items: [] // Will be populated from API
  }
]

export default function ApprovalsSection() {
  const [approvalData, setApprovalData] = useState<ApprovalData[]>(staticApprovalData)
  const [loading, setLoading] = useState<boolean>(false)

  // Fetch Approval Data from API
  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        setLoading(true)

        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        // Calculate date range (last 30 days)
        const toDate = new Date()
        const fromDate = new Date()
        fromDate.setDate(fromDate.getDate() - 30)

        const fromDateStr = fromDate.toISOString().split('T')[0]
        const toDateStr = toDate.toISOString().split('T')[0]

        console.log('📅 Date Range:', { fromDateStr, toDateStr })

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
          'FromDate': fromDateStr, // YYYY-MM-DD format
          'ToDate': toDateStr, // YYYY-MM-DD format
        }

        console.log('📤 Request Headers:', headers)

        // Fetch Internal Approvals
        const internalResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Approvals/InternalApprovals`,
          { method: 'GET', headers }
        )

        // Fetch Invoice Approvals
        const invoiceResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Approvals/InvoiceApprovals`,
          { method: 'GET', headers }
        )

        // Fetch Price Approvals
        const priceResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Approvals/PriceApprovals`,
          { method: 'GET', headers }
        )

        // Fetch PO Approvals
        const poResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Approvals/POApprovals`,
          { method: 'GET', headers }
        )

        // Fetch Purchase Requisitions
        const purchaseReqResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Approvals/PurchaseRequisitions`,
          { method: 'GET', headers }
        )

        // Fetch Paper Requirements
        const paperReqResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Approvals/PaperRequirements`,
          { method: 'GET', headers }
        )

        let internalData = []
        let invoiceData = []
        let priceData = []
        let poData = []
        let purchaseReqData = []
        let paperReqData = []

        if (internalResponse.ok) {
          internalData = await internalResponse.json()
          console.log('✅ Internal Approvals - Count:', Array.isArray(internalData) ? internalData.length : 0)
          console.log('📊 Internal Approvals - Data:', internalData)
        } else {
          console.error('❌ Internal Approvals Error:', internalResponse.status, internalResponse.statusText)
        }

        if (invoiceResponse.ok) {
          invoiceData = await invoiceResponse.json()
          console.log('✅ Invoice Approvals - Count:', Array.isArray(invoiceData) ? invoiceData.length : 0)
          console.log('📊 Invoice Approvals - Data:', invoiceData)
        } else {
          console.error('❌ Invoice Approvals Error:', invoiceResponse.status, invoiceResponse.statusText)
        }

        if (priceResponse.ok) {
          priceData = await priceResponse.json()
          console.log('✅ Price Approvals - Count:', Array.isArray(priceData) ? priceData.length : 0)
          console.log('📊 Price Approvals - Data:', priceData)
        } else {
          console.error('❌ Price Approvals Error:', priceResponse.status, priceResponse.statusText)
        }

        if (poResponse.ok) {
          poData = await poResponse.json()
          console.log('✅ PO Approvals - Count:', Array.isArray(poData) ? poData.length : 0)
          console.log('📊 PO Approvals - Data:', poData)
        } else {
          const errorText = await poResponse.text()
          console.error('❌ PO Approvals Error - Status:', poResponse.status)
          console.error('❌ PO Approvals Error - Response:', errorText)
          console.error('❌ PO Approvals Error - URL:', `${process.env.NEXT_PUBLIC_API_BASE_URL}Approvals/POApprovals`)
        }

        if (purchaseReqResponse.ok) {
          purchaseReqData = await purchaseReqResponse.json()
          console.log('✅ Purchase Requisitions - Count:', Array.isArray(purchaseReqData) ? purchaseReqData.length : 0)
          console.log('📊 Purchase Requisitions - Data:', purchaseReqData)
        } else {
          console.error('❌ Purchase Requisitions Error:', purchaseReqResponse.status, purchaseReqResponse.statusText)
        }

        if (paperReqResponse.ok) {
          paperReqData = await paperReqResponse.json()
          console.log('✅ Paper Requirements - Count:', Array.isArray(paperReqData) ? paperReqData.length : 0)
          console.log('📊 Paper Requirements - Data:', paperReqData)
        } else {
          console.error('❌ Paper Requirements Error:', paperReqResponse.status, paperReqResponse.statusText)
        }

        // Update approval data
        setApprovalData((prevData) =>
          prevData.map((item) => {
            if (item.id === 'internal') {
              return {
                ...item,
                count: Array.isArray(internalData) ? internalData.length : 0,
                items: Array.isArray(internalData)
                  ? internalData.slice(0, 3).map((approval: any) => ({
                      name: `${approval.JobName} - ${approval.ClientName}`,
                      amount: approval.QuotedCost || '',
                      date: approval.CreatedDate || 'N/A',
                      urgent: true,
                    }))
                  : [],
              }
            } else if (item.id === 'invoice') {
              return {
                ...item,
                count: Array.isArray(invoiceData) ? invoiceData.length : 0,
                items: Array.isArray(invoiceData)
                  ? invoiceData.slice(0, 3).map((invoice: any) => ({
                      name: `${invoice.InvoiceNo || 'N/A'} - ${invoice.ClientName}`,
                      amount: `₹${invoice.NetAmount?.toLocaleString('en-IN') || '0'}`,
                      date: invoice.InvoiceDate || 'N/A',
                      urgent: false,
                    }))
                  : [],
              }
            } else if (item.id === 'price') {
              return {
                ...item,
                count: Array.isArray(priceData) ? priceData.length : 0,
                items: Array.isArray(priceData)
                  ? priceData.slice(0, 3).map((price: any) => ({
                      name: `${price.JobName || 'N/A'} - ${price.ClientName}`,
                      amount: `${price.OrderQuantity || 0} ${price.EstimationUnit || 'PCS'}`,
                      date: price.BookingNo || 'N/A',
                      urgent: false,
                    }))
                  : [],
              }
            } else if (item.id === 'po') {
              return {
                ...item,
                count: Array.isArray(poData) ? poData.length : 0,
                items: Array.isArray(poData)
                  ? poData.slice(0, 3).map((po: any) => ({
                      name: `${po.VoucherNo || 'N/A'} - ${po.LedgerName}`,
                      amount: `₹${po.NetAmount?.toLocaleString('en-IN') || '0'}`,
                      date: po.VoucherDate || 'N/A',
                      urgent: false,
                    }))
                  : [],
              }
            } else if (item.id === 'purchase-req') {
              return {
                ...item,
                count: Array.isArray(purchaseReqData) ? purchaseReqData.length : 0,
                items: Array.isArray(purchaseReqData)
                  ? purchaseReqData.slice(0, 3).map((req: any) => ({
                      name: `${req.ItemName || 'N/A'} - ${req.VoucherNo}`,
                      amount: `${req.RequiredQuantity || 0} ${req.StockUnit || 'Units'}`,
                      date: req.VoucherDate || 'N/A',
                      urgent: true,
                    }))
                  : [],
              }
            } else if (item.id === 'paper-req') {
              return {
                ...item,
                count: Array.isArray(paperReqData) ? paperReqData.length : 0,
                items: Array.isArray(paperReqData)
                  ? paperReqData.slice(0, 3).map((paper: any) => ({
                      name: `${paper.JobName || 'N/A'} - ${paper.ClientName}`,
                      amount: `₹${paper.TotalAmount?.toLocaleString('en-IN') || '0'}`,
                      date: paper.DeliveryDate || 'N/A',
                      urgent: true,
                    }))
                  : [],
              }
            }
            return item
          })
        )
      } catch (error) {
        console.error('Failed to fetch approvals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApprovals()
  }, [])

  const totalPending = approvalData.reduce((sum: number, item: ApprovalData) => sum + item.count, 0)

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Pending Approvals & Actions</h3>
          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">Review and execute critical tasks</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Badge className="bg-orange-500 h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm font-bold">
            {loading ? '...' : totalPending} Total
          </Badge>
          <Badge variant="destructive" className="h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm font-bold animate-pulse">
            {approvalData.filter((a: ApprovalData) => a.priority === 'high').length} Urgent
          </Badge>
        </div>
      </div>

      {/* Compact Grid of Approval Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {approvalData.map((approval: ApprovalData) => {
          const Icon = approval.icon
          const trendData = approval.trend.map((value: number, index: number) => ({ value, index }))

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
                  {approval.items.slice(0,3).map((item: ApprovalItem, idx: number) => (
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
