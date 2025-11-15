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
  FiClock,
  FiX
} from 'react-icons/fi'
import { IconType } from 'react-icons'

interface ApprovalItem {
  name: string
  amount: string
  date: string
}

interface ApprovalData {
  id: string
  title: string
  count: number
  icon: IconType
  color: string
  lightColor: string
  textColor: string
  priority?: string
  value?: string
  items: ApprovalItem[]
}

const staticApprovalData: ApprovalData[] = [
  {
    id: 'internal',
    title: 'Internal Approval',
    count: 0,
    icon: FiCheckCircle,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    priority: 'high',
    items: []
  },
  {
    id: 'price',
    title: 'Price Approval',
    count: 0,
    icon: FiDollarSign,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
    items: []
  },
  {
    id: 'purchase-req',
    title: 'Purchase Requisition',
    count: 0,
    icon: FiShoppingCart,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    priority: 'high',
    items: []
  },
  {
    id: 'po',
    title: 'PO Approval',
    count: 0,
    icon: FiFileText,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    items: []
  },
  {
    id: 'invoice',
    title: 'Invoice Approval',
    count: 0,
    icon: FiFileText,
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    items: []
  },
  {
    id: 'critical-stock',
    title: 'Critical Stock Items',
    count: 0,
    value: '₹0',
    icon: FiAlertTriangle,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
    priority: 'high',
    items: []
  },
  {
    id: 'paper-req',
    title: 'Paper Requirements',
    count: 0,
    value: '₹0',
    icon: FiPackage,
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    items: []
  }
]

export default function ApprovalsSection() {
  const [approvalData, setApprovalData] = useState<ApprovalData[]>(staticApprovalData)
  const [loading, setLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedApproval, setSelectedApproval] = useState<ApprovalData | null>(null)

  // Open modal with selected approval data
  const openModal = (approval: ApprovalData) => {
    setSelectedApproval(approval)
    setModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setModalOpen(false)
    setSelectedApproval(null)
  }

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
                  ? internalData.map((approval: any) => ({
                      name: `${approval.JobName} - ${approval.ClientName}`,
                      amount: approval.QuotedCost || '',
                      date: approval.CreatedDate || 'N/A',
                      urgent: false,
                    }))
                  : [],
              }
            } else if (item.id === 'invoice') {
              return {
                ...item,
                count: Array.isArray(invoiceData) ? invoiceData.length : 0,
                items: Array.isArray(invoiceData)
                  ? invoiceData.map((invoice: any) => ({
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
                  ? priceData.map((price: any) => ({
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
                  ? poData.map((po: any) => ({
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
                  ? purchaseReqData.map((req: any) => ({
                      name: `${req.ItemName || 'N/A'} - ${req.VoucherNo}`,
                      amount: `${req.RequiredQuantity || 0} ${req.StockUnit || 'Units'}`,
                      date: req.VoucherDate || 'N/A',
                      urgent: false,
                    }))
                  : [],
              }
            } else if (item.id === 'paper-req') {
              return {
                ...item,
                count: Array.isArray(paperReqData) ? paperReqData.length : 0,
                items: Array.isArray(paperReqData)
                  ? paperReqData.map((paper: any) => ({
                      name: `${paper.JobName || 'N/A'} - ${paper.ClientName}`,
                      amount: `₹${paper.TotalAmount?.toLocaleString('en-IN') || '0'}`,
                      date: paper.DeliveryDate || 'N/A',
                      urgent: false,
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
        </div>
      </div>

      {/* Compact Grid of Approval Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {approvalData.map((approval: ApprovalData) => {
          const Icon = approval.icon

          return (
            <Card key={approval.id} className="border hover:shadow-lg transition-all group overflow-hidden focus:outline-none">
              <CardContent className="p-0">
                {/* Compact Header */}
                <div className={`${approval.lightColor} p-2 sm:p-3 border-b`}>
                  <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${approval.color} flex items-center justify-center`}>
                      <Icon className="text-white" size={16} />
                    </div>
                  </div>

                  <div>
                    <div className={`text-xl sm:text-2xl font-bold ${approval.textColor}`}>{approval.count}</div>
                    <div className="text-[9px] sm:text-[10px] text-gray-600 uppercase tracking-wide">Pending</div>
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
                  <div className="space-y-1">
                    {approval.items.slice(0, 3).map((item: ApprovalItem, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors group/item"
                      >
                        <div className="flex-1 min-w-0 mr-1.5 sm:mr-2">
                          <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                            <p className="text-[11px] sm:text-xs font-medium text-gray-900 truncate">{item.name}</p>
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
                  </div>

                  {approval.items.length > 3 && (
                    <button
                      onClick={() => openModal(approval)}
                      className={`w-full mt-0.5 sm:mt-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold ${approval.textColor} bg-gradient-to-r ${approval.lightColor} border-2 border-transparent hover:border-current rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-1.5 group`}
                    >
                      <span>View All {approval.count} Items</span>
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={12} />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal for View All Items */}
      {modalOpen && selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeModal}>
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${selectedApproval.lightColor} px-4 sm:px-6 py-4 border-b flex items-center justify-between rounded-t-lg`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${selectedApproval.color} flex items-center justify-center`}>
                  {React.createElement(selectedApproval.icon, { className: 'text-white', size: 20 })}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{selectedApproval.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    {selectedApproval.count} pending {selectedApproval.count === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FiX size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body - Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="space-y-2 sm:space-y-3">
                {selectedApproval.items.map((item: ApprovalItem, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      {/* Left: Item Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm sm:text-base font-semibold text-gray-900">{item.name}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <FiClock size={14} />
                            <span>{item.date}</span>
                          </span>
                          {item.amount && (
                            <span className="font-semibold text-gray-900 px-2 py-1 bg-gray-100 rounded">
                              {item.amount}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Action Button */}
                      <button className="flex-shrink-0 self-start sm:self-center">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${selectedApproval.color} flex items-center justify-center hover:scale-110 transition-transform shadow-md`}>
                          <FiArrowRight className="text-white" size={16} />
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedApproval.items.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No items found</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 border-t bg-gray-50 rounded-b-lg flex justify-between items-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing <span className="font-semibold">{selectedApproval.items.length}</span> {selectedApproval.items.length === 1 ? 'item' : 'items'}
              </p>
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
