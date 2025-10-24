"use client"

import React, { useState } from 'react'
import {
  FiCheckSquare,
  FiCalendar,
  FiActivity,
  FiTrendingUp,
  FiShoppingCart,
  FiAlertCircle,
  FiClock,
  FiPackage,
  FiArrowRight
} from 'react-icons/fi'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ApprovalsSection from '@/components/sections/ApprovalsSection'
import DailyUpdateSection from '@/components/sections/DailyUpdateSection'
import QCSection from '@/components/sections/QCSection'
import BusinessHealthSection from '@/components/sections/BusinessHealthSection'
import PurchasesSection from '@/components/sections/PurchasesSection'

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const metrics = [
    {
      id: 'approvals',
      title: 'Approvals',
      value: '63',
      subtitle: 'Pending actions',
      change: '+8 today',
      icon: FiCheckSquare,
      gradient: 'from-orange-500 to-red-500',
      alert: 12,
      component: ApprovalsSection
    },
    {
      id: 'daily-update',
      title: 'Daily Operations',
      value: '28',
      subtitle: 'Active orders',
      change: '5 delayed',
      icon: FiCalendar,
      gradient: 'from-blue-500 to-cyan-500',
      alert: 5,
      component: DailyUpdateSection
    },
    {
      id: 'qc',
      title: 'Quality Control',
      value: '15%',
      subtitle: 'Wastage rate',
      change: '85% efficiency',
      icon: FiActivity,
      gradient: 'from-purple-500 to-pink-500',
      alert: 2,
      component: QCSection
    },
    {
      id: 'business-health',
      title: 'Business Health',
      value: '₹67.5L',
      subtitle: 'Total sales',
      change: '+12.5% growth',
      icon: FiTrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      alert: 0,
      component: BusinessHealthSection
    },
    {
      id: 'purchases',
      title: 'Purchases',
      value: '₹55.2L',
      subtitle: 'Total spend',
      change: '68 POs raised',
      icon: FiShoppingCart,
      gradient: 'from-indigo-500 to-blue-600',
      alert: 0,
      component: PurchasesSection
    }
  ]

  const handleCardClick = (id: string) => {
    setActiveSection(activeSection === id ? null : id)
  }

  const SectionComponent = activeSection
    ? metrics.find(m => m.id === activeSection)?.component
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 w-full overflow-x-hidden">
      {/* Compact Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <FiAlertCircle className="text-orange-600" size={14} />
            </div>
            <Badge className="bg-orange-500 h-4 sm:h-5 px-1.5 sm:px-2 text-[9px] sm:text-[10px]">Urgent</Badge>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">12</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Critical Actions</div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <FiPackage className="text-blue-600" size={14} />
            </div>
            <Badge className="bg-blue-500 h-4 sm:h-5 px-1.5 sm:px-2 text-[9px] sm:text-[10px]">Active</Badge>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">28</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Orders Running</div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <FiClock className="text-red-600" size={14} />
            </div>
            <Badge className="bg-red-500 h-4 sm:h-5 px-1.5 sm:px-2 text-[9px] sm:text-[10px]">Delayed</Badge>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">5</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Behind Schedule</div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <FiTrendingUp className="text-green-600" size={14} />
            </div>
            <Badge className="bg-green-500 h-4 sm:h-5 px-1.5 sm:px-2 text-[9px] sm:text-[10px]">Growth</Badge>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">₹67L</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Monthly Sales</div>
        </div>
      </div>

      {/* Main Metric Cards - Modern Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const isActive = activeSection === metric.id

          return (
            <div
              key={metric.id}
              onClick={() => handleCardClick(metric.id)}
              className={`
                relative group cursor-pointer transition-all duration-300 transform
                ${isActive
                  ? 'scale-105 shadow-2xl ring-4 ring-sky-400/30'
                  : 'hover:scale-105 hover:shadow-xl'
                }
              `}
            >
              <Card className={`
                h-full border-2 overflow-hidden focus:outline-none
                ${isActive ? 'border-sky-400 bg-gradient-to-br from-white to-sky-50' : 'border-transparent bg-white'}
              `}>
                <CardContent className="p-0">
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-br ${metric.gradient} p-3 sm:p-4 relative`}>
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon className="text-white" size={18} />
                      </div>
                      {metric.alert > 0 && (
                        <div className="relative">
                          <Badge variant="destructive" className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 h-4 sm:h-5 animate-pulse">
                            {metric.alert}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="text-white">
                      <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">{metric.value}</div>
                      <div className="text-[10px] sm:text-xs text-white/90 font-medium">{metric.subtitle}</div>
                    </div>
                  </div>

                  {/* White Content Area */}
                  <div className="p-3 sm:p-4 bg-white">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900">{metric.title}</h3>
                      <FiArrowRight
                        className={`text-gray-400 transition-transform duration-300 ${
                          isActive ? 'rotate-90' : 'group-hover:translate-x-1'
                        }`}
                        size={14}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                      <span className="text-gray-600">{metric.change}</span>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute inset-0 border-4 border-sky-400 rounded-xl pointer-events-none"></div>
                  )}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Expanded Section View */}
      {activeSection && SectionComponent && (
        <div className="animate-in slide-in-from-top duration-500 w-full">
          <Card className="border-2 border-sky-400 shadow-2xl bg-white w-full overflow-hidden">
            <CardContent className="p-2 sm:p-3 lg:p-6 w-full overflow-x-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 truncate">
                    {metrics.find(m => m.id === activeSection)?.title} Details
                  </h2>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5">
                    Comprehensive analytics and data insights
                  </p>
                </div>
                <button
                  onClick={() => setActiveSection(null)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm font-medium transition-colors flex-shrink-0"
                >
                  Close View
                </button>
              </div>
              <div className="w-full overflow-x-hidden">
                <SectionComponent />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Help Text */}
      {!activeSection && (
        <div className="text-center py-8 sm:py-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white shadow-sm border border-gray-200">
            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
            <span className="text-xs sm:text-sm text-gray-600">Click any card above to view detailed analytics</span>
          </div>
        </div>
      )}
    </div>
  )
}
