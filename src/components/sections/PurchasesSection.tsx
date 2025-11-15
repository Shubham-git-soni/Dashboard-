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
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { FiShoppingCart, FiTrendingUp, FiFileText, FiUsers, FiX } from 'react-icons/fi'

export default function PurchasesSection() {
  const [timeRange, setTimeRange] = useState('month')
  const [vendorData, setVendorData] = useState<any[]>([])
  const [vendorListData, setVendorListData] = useState<any[]>([])
  const [activeVendorsData, setActiveVendorsData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [categoryListData, setCategoryListData] = useState<any[]>([])
  const [purchaseGrowthData, setPurchaseGrowthData] = useState<any[]>([])
  const [poRaisedData, setPoRaisedData] = useState<any[]>([])
  const [totalPurchaseData, setTotalPurchaseData] = useState<any>(null)
  const [allPurchaseData, setAllPurchaseData] = useState<any[]>([])
  const [growthRateData, setGrowthRateData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [listLoading, setListLoading] = useState(false)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [growthLoading, setGrowthLoading] = useState(false)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [growthRateLoading, setGrowthRateLoading] = useState(false)
  const [poLoading, setPoLoading] = useState(false)
  const [activeVendorsLoading, setActiveVendorsLoading] = useState(false)
  const [showVendorModal, setShowVendorModal] = useState(false)
  const [showGrowthModal, setShowGrowthModal] = useState(false)
  const [showPOModal, setShowPOModal] = useState(false)
  const [monthlyGrowthData, setMonthlyGrowthData] = useState<any[]>([])
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [selectedQuarter, setSelectedQuarter] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  
  // Dynamic filter options from API data
  const [availableYears, setAvailableYears] = useState<string[]>([])
  const [availableQuarters, setAvailableQuarters] = useState<string[]>([])
  const [availableMonths, setAvailableMonths] = useState<string[]>([])

  // Fetch Purchase Orders Raised data from API
  useEffect(() => {
    const fetchPOData = async () => {
      try {
        setPoLoading(true)

        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Purchases/PurchaseOrdersRaised`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const apiData = await response.json()
          console.log('✅ Purchase Orders Raised - Count:', Array.isArray(apiData) ? apiData.length : 0)
          console.log('📊 Purchase Orders Raised - Data:', apiData)

          if (Array.isArray(apiData) && apiData.length > 0) {
            // Map API data to chart format
            const mappedData = apiData.map((item: any) => ({
              month: item.MonthName ? item.MonthName.substring(0, 3) : 'N/A', // Shorten to 3 chars (Jan, Feb, Mar)
              count: item.POCount || 0
            }))
            setPoRaisedData(mappedData)
          } else {
            setPoRaisedData([])
          }
        } else {
          console.error('❌ Purchase Orders Raised Error:', response.status, response.statusText)
          setPoRaisedData([])
        }
      } catch (error) {
        console.error('Failed to fetch Purchase Orders Raised:', error)
        setPoRaisedData([])
      } finally {
        setPoLoading(false)
      }
    }

    fetchPOData()
  }, [])

  // Fetch Top Vendors data from API
  useEffect(() => {
    const fetchTopVendors = async () => {
      try {
        setLoading(true)
        
        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Purchases/TopVendors`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const apiData = await response.json()
          console.log('✅ Top Vendors - Count:', Array.isArray(apiData) ? apiData.length : 0)
          console.log('📊 Top Vendors - Data:', apiData)

          if (Array.isArray(apiData) && apiData.length > 0) {
            // Map API data to component format
            const mappedData = apiData.map((item: any) => ({
              vendor: item.LedgerName || 'Unknown',
              purchase: parseFloat((item.TotalNetAmount / 100000).toFixed(2)), // Convert to Lakhs
              orders: item.RowCount || 0,
              rating: 4.5 // Default rating since API doesn't provide it
            }))
            setVendorData(mappedData)
          } else {
            setVendorData([])
          }
        } else {
          console.error('❌ Top Vendors Error:', response.status, response.statusText)
          setVendorData([])
        }
      } catch (error) {
        console.error('Failed to fetch Top Vendors:', error)
        setVendorData([])
      } finally {
        setLoading(false)
      }
    }

    fetchTopVendors()
  }, [])

  // Fetch Vendor-wise List data from API
  useEffect(() => {
    const fetchVendorWiseList = async () => {
      try {
        setListLoading(true)
        
        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Purchases/VendorWiseList`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const apiData = await response.json()
          console.log('✅ Vendor-wise List - Count:', Array.isArray(apiData) ? apiData.length : 0)
          console.log('📊 Vendor-wise List - Data:', apiData)

          if (Array.isArray(apiData) && apiData.length > 0) {
            // Map API data to component format
            const mappedData = apiData.map((item: any) => ({
              vendor: item.LedgerName || 'Unknown',
              purchase: parseFloat((item.TotalNetAmount / 100000).toFixed(2)), // Convert to Lakhs
              orders: item.RowCount || 0,
              avgAmount: parseFloat((item.AverageNetAmount / 100000).toFixed(2)), // Convert to Lakhs
              rating: 4.5 // Default rating since API doesn't provide it
            }))
            setVendorListData(mappedData)
          } else {
            setVendorListData([])
          }
        } else {
          console.error('❌ Vendor-wise List Error:', response.status, response.statusText)
          setVendorListData([])
        }
      } catch (error) {
        console.error('Failed to fetch Vendor-wise List:', error)
        setVendorListData([])
      } finally {
        setListLoading(false)
      }
    }

    fetchVendorWiseList()
  }, [])

  // Fetch Product Category-wise Purchase data from API
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setCategoryLoading(true)
        
        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Purchases/ProductCategoryWisePurchase`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const apiData = await response.json()
          console.log('✅ Category-wise Purchase - Count:', Array.isArray(apiData) ? apiData.length : 0)
          console.log('📊 Category-wise Purchase - Data:', apiData)

          if (Array.isArray(apiData) && apiData.length > 0) {
            // Define colors for categories
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#06b6d4', '#84cc16']

            // Map API data to pie chart format
            const mappedData = apiData.map((item: any, index: number) => ({
              name: item.ItemGroupName || 'Unknown',
              value: parseFloat(item.TotalPercent) || 0,
              color: colors[index % colors.length]
            }))
            setCategoryData(mappedData)

            // Store raw data for list display
            const listData = apiData.map((item: any, index: number) => ({
              name: item.ItemGroupName || 'Unknown',
              amount: item.NetAmount || 0,
              percent: parseFloat(item.TotalPercent) || 0,
              color: colors[index % colors.length]
            }))
            setCategoryListData(listData)
          } else {
            setCategoryData([])
            setCategoryListData([])
          }
        } else {
          console.error('❌ Category-wise Purchase Error:', response.status, response.statusText)
          setCategoryData([])
        }
      } catch (error) {
        console.error('Failed to fetch Category-wise Purchase:', error)
        setCategoryData([])
      } finally {
        setCategoryLoading(false)
      }
    }

    fetchCategoryData()
  }, [])

  // Fetch Active Vendors data from API
  useEffect(() => {
    const fetchActiveVendors = async () => {
      try {
        setActiveVendorsLoading(true)

        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Purchases/ActiveVendors`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const apiData = await response.json()
          console.log('✅ Active Vendors - Count:', Array.isArray(apiData) ? apiData.length : 0)
          console.log('📊 Active Vendors - Data:', apiData)

          if (Array.isArray(apiData) && apiData.length > 0) {
            setActiveVendorsData(apiData)
          } else {
            setActiveVendorsData([])
          }
        } else {
          console.error('❌ Active Vendors Error:', response.status, response.statusText)
          setActiveVendorsData([])
        }
      } catch (error) {
        console.error('Failed to fetch Active Vendors:', error)
        setActiveVendorsData([])
      } finally {
        setActiveVendorsLoading(false)
      }
    }

    fetchActiveVendors()
  }, [])

  // Fetch Purchase Growth Trend data from API
  useEffect(() => {
    const fetchGrowthTrend = async () => {
      try {
        setGrowthLoading(true)
        
        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Purchases/PurchaseGrowthTrend`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const apiData = await response.json()
          console.log('✅ Purchase Growth Trend - Count:', Array.isArray(apiData) ? apiData.length : 0)
          console.log('📊 Purchase Growth Trend - Data:', apiData)

          if (Array.isArray(apiData) && apiData.length > 0) {
            // Map API data to chart format
            const mappedData = apiData.map((item: any) => ({
              month: item.MonthName ? item.MonthName.substring(0, 3) : 'N/A', // Shorten to 3 chars (Jan, Feb, Mar)
              current: parseFloat((item.CurrentYearPurchase / 100000).toFixed(2)) || 0, // Convert to Lakhs
              past: parseFloat((item.PreviousYearPurchase / 100000).toFixed(2)) || 0 // Convert to Lakhs
            }))
            setPurchaseGrowthData(mappedData)
          } else {
            setPurchaseGrowthData([])
          }
        } else {
          console.error('❌ Purchase Growth Trend Error:', response.status, response.statusText)
          setPurchaseGrowthData([])
        }
      } catch (error) {
        console.error('Failed to fetch Purchase Growth Trend:', error)
        setPurchaseGrowthData([])
      } finally {
        setGrowthLoading(false)
      }
    }

    fetchGrowthTrend()
  }, [])

  // Fetch Growth Rate data from API
  useEffect(() => {
    const fetchGrowthRate = async () => {
      try {
        setGrowthRateLoading(true)
        
        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Purchases/TotalGrowth`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const apiData = await response.json()
          console.log('✅ Total Growth - Count:', Array.isArray(apiData) ? apiData.length : 0)
          console.log('📊 Total Growth - Data:', apiData)

          if (Array.isArray(apiData) && apiData.length > 0) {
            // Store monthly growth data (exclude TOTAL row)
            const monthlyData = apiData.filter(item => item.MonthName !== 'TOTAL')
            setMonthlyGrowthData(monthlyData)

            // Find the TOTAL row which contains TotalGrowthPercent
            const totalRow = apiData.find(item => item.MonthName === 'TOTAL')

            if (totalRow) {
              // TOTAL row exists
              setGrowthRateData({
                growthPercent: totalRow.TotalGrowthPercent || totalRow.GrowthPercent || 0,
                currentYearTotal: totalRow.CurrentYearPurchase || 0,
                previousYearTotal: totalRow.PreviousYearPurchase || 0,
                difference: totalRow.Difference || 0
              })
            } else {
              // TOTAL row doesn't exist, calculate from monthly data
              const totalCurrent = monthlyData.reduce((sum, item) => sum + (item.CurrentYearPurchase || 0), 0)
              const totalPrevious = monthlyData.reduce((sum, item) => sum + (item.PreviousYearPurchase || 0), 0)
              const totalDiff = totalCurrent - totalPrevious
              const calculatedGrowth = totalPrevious > 0 ? ((totalDiff / totalPrevious) * 100) : 0

              setGrowthRateData({
                growthPercent: calculatedGrowth,
                currentYearTotal: totalCurrent,
                previousYearTotal: totalPrevious,
                difference: totalDiff
              })
            }
          } else {
            setMonthlyGrowthData([])
            setGrowthRateData({ growthPercent: 0, currentYearTotal: 0, previousYearTotal: 0, difference: 0 })
          }
        } else {
          console.error('❌ Total Growth Error:', response.status, response.statusText)
          setGrowthRateData({ growthPercent: 0, currentYearTotal: 0, previousYearTotal: 0, difference: 0 })
        }
      } catch (error) {
        console.error('Failed to fetch Total Growth:', error)
        setGrowthRateData({ growthPercent: 0, currentYearTotal: 0, previousYearTotal: 0, difference: 0 })
      } finally {
        setGrowthRateLoading(false)
      }
    }

    fetchGrowthRate()
  }, [])

  // Fetch Total Purchase Amount with filters
  useEffect(() => {
    const fetchTotalPurchase = async () => {
      try {
        setPurchaseLoading(true)
        
        const username = process.env.NEXT_PUBLIC_API_USERNAME!
        const password = process.env.NEXT_PUBLIC_API_PASSWORD!
        const token = btoa(`${username}:${password}`)

        const headers = {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
          'CompanyID': '2',
          'UserID': '2',
          'FYEAR': '2025-2026',
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}Purchases/TotalPurchaseAmount`,
          { method: 'GET', headers }
        )

        if (response.ok) {
          const apiData = await response.json()
          console.log('✅ Total Purchase - Data:', apiData)

          if (Array.isArray(apiData) && apiData.length > 0) {
            // Store all data
            setAllPurchaseData(apiData)
            
            // Extract unique years, quarters, months from API data
            const years = [...new Set(apiData.map(item => item.PurchaseYear?.toString()).filter(Boolean))].sort((a, b) => Number(b) - Number(a))
            const quarters = [...new Set(apiData.map(item => item.PurchaseQuarter?.toString()).filter(Boolean))].sort()
            const months = [...new Set(apiData.map(item => item.PurchaseMonth?.toString()).filter(Boolean))].sort((a, b) => Number(a) - Number(b))
            
            setAvailableYears(years)
            setAvailableQuarters(quarters)
            setAvailableMonths(months)

            // Apply filters
            let filteredData = apiData

            if (selectedYear) {
              filteredData = filteredData.filter(item => item.PurchaseYear?.toString() === selectedYear)
            }
            if (selectedQuarter) {
              filteredData = filteredData.filter(item => item.PurchaseQuarter?.toString() === selectedQuarter)
            }
            if (selectedMonth) {
              filteredData = filteredData.filter(item => item.PurchaseMonth?.toString() === selectedMonth)
            }

            // Calculate total from filtered data
            const totalAmount = filteredData.reduce((sum, item) => sum + (parseFloat(item.TotalPurchaseAmount) || 0), 0)
            const totalInLakhs = totalAmount / 100000

            setTotalPurchaseData({
              totalAmount: totalInLakhs.toFixed(2),
              count: filteredData.length
            })
          } else {
            setAllPurchaseData([])
            setAvailableYears([])
            setAvailableQuarters([])
            setAvailableMonths([])
            setTotalPurchaseData({ totalAmount: '0', count: 0 })
          }
        } else {
          console.error('❌ Total Purchase Error:', response.status, response.statusText)
          setAllPurchaseData([])
          setTotalPurchaseData({ totalAmount: '0', count: 0 })
        }
      } catch (error) {
        console.error('Failed to fetch Total Purchase:', error)
        setTotalPurchaseData({ totalAmount: '0', count: 0 })
      } finally {
        setPurchaseLoading(false)
      }
    }

    fetchTotalPurchase()
  }, [selectedYear, selectedQuarter, selectedMonth])

  // Calculate total POs from poRaisedData
  const totalPOs = poRaisedData.reduce((sum, item) => sum + (item.count || 0), 0)
  const lastMonthPO = poRaisedData.length > 0 ? poRaisedData[poRaisedData.length - 1]?.count || 0 : 0
  const previousMonthPO = poRaisedData.length > 1 ? poRaisedData[poRaisedData.length - 2]?.count || 0 : 0
  const poChange = lastMonthPO - previousMonthPO

  // KPI Cards - Dynamic Total Purchase and Growth Rate
  const kpiData = [
    {
      title: 'Total Purchase',
      value: purchaseLoading ? 'Loading...' : totalPurchaseData ? `₹${totalPurchaseData.totalAmount}L` : '₹0L',
      change: totalPurchaseData ? `${totalPurchaseData.count} records` : '0 records',
      trend: 'up',
      icon: FiShoppingCart
    },
    {
      title: 'Growth Rate',
      value: growthRateLoading ? 'Loading...' : growthRateData ? `${growthRateData.growthPercent ? growthRateData.growthPercent.toFixed(2) : '0.00'}%` : '0.00%',
      change: growthRateData && growthRateData.difference ? `${growthRateData.difference >= 0 ? '+' : ''}₹${(growthRateData.difference / 100000).toFixed(2)}L` : '₹0L',
      trend: growthRateData && growthRateData.growthPercent >= 0 ? 'up' : 'down',
      icon: FiTrendingUp,
      clickable: true,
      onClick: () => setShowGrowthModal(true)
    },
    {
      title: 'Total POs Raised',
      value: poLoading ? 'Loading...' : totalPOs.toString(),
      change: poLoading ? 'Loading...' : poChange !== 0 ? `${poChange >= 0 ? '+' : ''}${poChange} from last month` : 'No change',
      trend: poChange >= 0 ? 'up' : 'down',
      icon: FiFileText,
      clickable: true,
      onClick: () => setShowPOModal(true)
    },
    {
      title: 'Active Vendors',
      value: activeVendorsLoading ? 'Loading...' : activeVendorsData.length.toString(),
      change: activeVendorsLoading ? 'Loading...' : 'Last 3 months',
      trend: 'up',
      icon: FiUsers,
      clickable: true,
      onClick: () => setShowVendorModal(true)
    }
  ]

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Header with Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <div>
            <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">Purchases Summary</h2>
            <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">Purchase analytics, vendor performance, and category insights</p>
          </div>
        </div>
        
        {/* Purchase Filters */}
        <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
            <label className="text-[10px] sm:text-xs font-semibold text-gray-700 whitespace-nowrap">Filters:</label>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-1.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full"
              disabled={purchaseLoading}
            >
              <option value="">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="px-1.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full"
              disabled={purchaseLoading}
            >
              <option value="">All Qtrs</option>
              {availableQuarters.map(quarter => (
                <option key={quarter} value={quarter}>
                  Q{quarter}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-1.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full"
              disabled={purchaseLoading}
            >
              <option value="">All Months</option>
              {availableMonths.map(month => {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                return (
                  <option key={month} value={month}>
                    {monthNames[Number(month) - 1]}
                  </option>
                )
              })}
            </select>
          </div>

          {(selectedYear || selectedQuarter || selectedMonth) && (
            <button
              onClick={() => {
                setSelectedYear('')
                setSelectedQuarter('')
                setSelectedMonth('')
              }}
              className="mt-2 w-full px-2 py-1 text-[10px] sm:text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {kpiData.map((kpi: any, index) => (
          <Card
            key={index}
            className={`focus:outline-none ${kpi.clickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
            onClick={kpi.clickable ? kpi.onClick : undefined}
          >
            <CardContent className="pt-2 sm:pt-4 lg:pt-6 pb-2 sm:pb-4 lg:pb-6 px-2 sm:px-4 lg:px-6">
              <div className="flex items-center justify-between mb-1 sm:mb-3 lg:mb-4">
                <div className="p-1 sm:p-2 lg:p-3 rounded-lg bg-primary-100">
                  <kpi.icon className="text-primary-600" size={14} />
                </div>
              </div>
              <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">{kpi.value}</h3>
              <p className="text-[9px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">{kpi.title}</p>
              <p className="text-[8px] sm:text-xs text-green-600 mt-0.5 sm:mt-2 font-medium truncate">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Growth & PO Raised */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm lg:text-base">Purchase Growth Trend Month Wise</CardTitle>
              {growthLoading && (
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            {growthLoading ? (
              <div className="flex items-center justify-center h-[160px] sm:h-[200px] lg:h-[260px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Loading growth trend data...</p>
                </div>
              </div>
            ) : purchaseGrowthData.length === 0 ? (
              <div className="flex items-center justify-center h-[160px] sm:h-[200px] lg:h-[260px]">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">No growth trend data available</p>
                  <p className="text-xs text-gray-500 mt-1">Please check your database connection</p>
                </div>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm lg:text-base">Purchase Orders Raised</CardTitle>
              {poLoading && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-green-600 border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            {poLoading ? (
              <div className="flex items-center justify-center h-[160px] sm:h-[200px] lg:h-[260px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Loading PO data...</p>
                </div>
              </div>
            ) : poRaisedData.length === 0 ? (
              <div className="flex items-center justify-center h-[160px] sm:h-[200px] lg:h-[260px]">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">No PO data available</p>
                  <p className="text-xs text-gray-500 mt-1">Please check your database connection</p>
                </div>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category-wise Purchase & Vendor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm lg:text-base">Product Category-wise Purchase</CardTitle>
              {categoryLoading && (
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            {categoryLoading ? (
              <div className="flex items-center justify-center h-[200px] sm:h-[240px] lg:h-[320px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Loading category data...</p>
                </div>
              </div>
            ) : categoryData.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] sm:h-[240px] lg:h-[320px]">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">No category data available</p>
                  <p className="text-xs text-gray-500 mt-1">Please check your database connection</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Pie Chart */}
                <div className="h-[200px] sm:h-[240px] lg:h-[320px] overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="45%"
                        labelLine={false}
                        label={false}
                        outerRadius={55}
                        fill="#8884d8"
                        dataKey="value"
                        minAngle={2}
                        paddingAngle={1}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                        formatter={(value: any, name: string) => {
                          const percentage = typeof value === 'number' ? value.toFixed(2) : value
                          return [`${percentage}%`, name]
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={60}
                        wrapperStyle={{
                          fontSize: '8px',
                          paddingTop: '5px',
                          maxWidth: '100%',
                          overflow: 'hidden'
                        }}
                        iconSize={6}
                        formatter={(value, entry: any) => {
                          const percentage = typeof entry.payload.value === 'number'
                            ? entry.payload.value.toFixed(2)
                            : entry.payload.value
                          const name = entry.payload.name
                          // Truncate long names
                          const displayName = name.length > 15 ? name.substring(0, 15) + '...' : name
                          return `${displayName} (${percentage}%)`
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Category List */}
                <div className="h-[200px] sm:h-[240px] lg:h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                  <div className="space-y-2">
                    {categoryListData.map((category, index) => (
                      <div
                        key={index}
                        className="p-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all bg-white"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <p className="text-[11px] sm:text-xs font-semibold text-gray-900 line-clamp-1">
                            {category.name}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 ml-5">
                          <div>
                            <span className="text-[9px] text-gray-500 uppercase tracking-wide block">Amount</span>
                            <span className="text-[11px] font-semibold text-gray-900">
                              ₹{(category.amount / 100000).toFixed(2)}L
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] text-gray-500 uppercase tracking-wide block">Percentage</span>
                            <span className="text-[11px] font-semibold text-blue-600">
                              {category.percent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm lg:text-base">Top Vendors by Purchase Value</CardTitle>
              {loading && (
                <div className="flex items-center gap-1 text-xs text-purple-600">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-purple-600 border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            {loading ? (
              <div className="flex items-center justify-center h-[200px] sm:h-[240px] lg:h-[280px]">
                <p className="text-sm text-gray-500">Loading vendor data...</p>
              </div>
            ) : vendorData.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] sm:h-[240px] lg:h-[280px]">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">No vendor data available</p>
                </div>
              </div>
            ) : (
              <div className="h-[200px] sm:h-[240px] lg:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vendorData} layout="vertical" margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 9 }}
                      tickMargin={5}
                    />
                    <YAxis
                      dataKey="vendor"
                      type="category"
                      width={150}
                      tick={{ fontSize: 9, fill: '#374151' }}
                      tickMargin={8}
                      interval={0}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: '11px', padding: '6px 10px' }}
                      cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                      formatter={(value: any) => [`₹${value}L`, 'Purchase Value']}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }}
                      iconSize={10}
                    />
                    <Bar dataKey="purchase" fill="#8b5cf6" name="Purchase (₹L)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Vendor Performance Table - Dynamic Data */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs sm:text-sm lg:text-base">Vendor-wise Purchase Summary</CardTitle>
            {listLoading && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-600 border-t-transparent"></div>
                <span>Loading...</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          {listLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-purple-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Loading vendor data...</p>
              </div>
            </div>
          ) : vendorListData.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">No vendor data available</p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white z-10 shadow-sm">
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-[10px] sm:text-xs lg:text-sm bg-gray-50">Vendor Name</th>
                        <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-[10px] sm:text-xs lg:text-sm bg-gray-50">Purchase Value</th>
                        <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-[10px] sm:text-xs lg:text-sm bg-gray-50">Total Orders</th>
                        <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-[10px] sm:text-xs lg:text-sm bg-gray-50">Avg Order Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorListData.map((vendor, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm font-medium">{vendor.vendor}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right font-semibold">₹{vendor.purchase}L</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right">{vendor.orders}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-[11px] sm:text-xs lg:text-sm text-right">₹{vendor.avgAmount || (vendor.purchase / vendor.orders).toFixed(2)}L</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile/Tablet Cards */}
              <div className="lg:hidden divide-y divide-gray-100 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                {vendorListData.map((vendor, index) => (
                  <div key={index} className="py-3 space-y-2.5">
                    <div className="pb-2 border-b border-gray-100">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">{vendor.vendor}</p>
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
                        <span className="text-[11px] text-gray-900">₹{vendor.avgAmount || (vendor.purchase / vendor.orders).toFixed(2)}L</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Active Vendors Modal */}
      {showVendorModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowVendorModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <FiUsers className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Active Vendors</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    {activeVendorsData.length} vendors active in last 3 months
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVendorModal(false)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FiX size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body - Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {activeVendorsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-600 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600">Loading vendors...</p>
                  </div>
                </div>
              ) : activeVendorsData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No active vendors found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeVendorsData.map((vendor: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <FiUsers className="text-indigo-600" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {vendor.LedgerName || 'Unknown Vendor'}
                          </p>
                          <p className="text-xs text-gray-500">Active Vendor</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 border-t bg-gray-50 rounded-b-lg flex justify-between items-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing <span className="font-semibold">{activeVendorsData.length}</span> active{' '}
                {activeVendorsData.length === 1 ? 'vendor' : 'vendors'}
              </p>
              <button
                onClick={() => setShowVendorModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Growth Rate Modal */}
      {showGrowthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowGrowthModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <FiTrendingUp className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Month-wise Growth Analysis</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    Year-over-year purchase comparison
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGrowthModal(false)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FiX size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body - Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {growthRateLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600">Loading growth data...</p>
                  </div>
                </div>
              ) : monthlyGrowthData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No growth data available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {monthlyGrowthData.map((month: any, idx: number) => {
                    const currentYear = month.CurrentYearPurchase || 0
                    const previousYear = month.PreviousYearPurchase || 0
                    const difference = month.Difference || 0
                    const growthPercent = month.GrowthPercent
                    const isPositive = difference >= 0
                    const hasComparison = previousYear > 0

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-lg border-2 border-gray-200 hover:border-green-400 hover:shadow-md transition-all bg-white"
                      >
                        {/* Month Header */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                          <h4 className="text-base font-bold text-gray-900">{month.MonthName}</h4>
                          {hasComparison && growthPercent !== null && (
                            <Badge
                              variant={isPositive ? "default" : "destructive"}
                              className={`${isPositive ? 'bg-green-500' : 'bg-red-500'} text-white`}
                            >
                              {isPositive ? '+' : ''}{growthPercent?.toFixed(2)}%
                            </Badge>
                          )}
                          {!hasComparison && (
                            <Badge variant="secondary" className="bg-gray-200 text-gray-600">
                              New Data
                            </Badge>
                          )}
                        </div>

                        {/* Comparison Data */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Current Year */}
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Current Year</p>
                            <p className="text-lg font-bold text-blue-600">
                              ₹{(currentYear / 100000).toFixed(2)}L
                            </p>
                          </div>

                          {/* Previous Year */}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Previous Year</p>
                            <p className="text-lg font-bold text-gray-600">
                              {hasComparison ? `₹${(previousYear / 100000).toFixed(2)}L` : 'N/A'}
                            </p>
                          </div>

                          {/* Difference */}
                          <div className={`${isPositive ? 'bg-green-50' : 'bg-red-50'} p-3 rounded-lg`}>
                            <p className="text-xs text-gray-600 mb-1">Difference</p>
                            <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {isPositive ? '+' : ''}₹{(difference / 100000).toFixed(2)}L
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 border-t bg-gray-50 rounded-b-lg flex justify-between items-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing <span className="font-semibold">{monthlyGrowthData.length}</span> month
                {monthlyGrowthData.length === 1 ? '' : 's'} comparison
              </p>
              <button
                onClick={() => setShowGrowthModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PO Raised Modal */}
      {showPOModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowPOModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <FiFileText className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Purchase Orders Raised</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    Month-wise PO count for current year
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPOModal(false)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <FiX size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body - Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {poLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-600 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600">Loading PO data...</p>
                  </div>
                </div>
              ) : poRaisedData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No PO data available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {poRaisedData.map((month: any, idx: number) => {
                    const poCount = month.count || 0
                    const monthName = month.month || 'N/A'

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all bg-gradient-to-br from-white to-indigo-50"
                      >
                        {/* Month Name */}
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-bold text-gray-900">{monthName}</h4>
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FiFileText className="text-indigo-600" size={14} />
                          </div>
                        </div>

                        {/* PO Count */}
                        <div className="bg-white p-3 rounded-lg border border-indigo-100">
                          <p className="text-xs text-gray-600 mb-1">POs Raised</p>
                          <p className="text-2xl font-bold text-indigo-600">{poCount}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 border-t bg-gray-50 rounded-b-lg flex justify-between items-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Total: <span className="font-semibold">{totalPOs}</span> POs across{' '}
                <span className="font-semibold">{poRaisedData.length}</span> months
              </p>
              <button
                onClick={() => setShowPOModal(false)}
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
