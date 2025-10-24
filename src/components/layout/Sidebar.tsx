"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  FiHome,
  FiMenu,
  FiX,
  FiChevronLeft,
} from 'react-icons/fi'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
  isCollapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ className, isCollapsed, onToggle }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedRegion, setSelectedRegion] = useState('all')

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? <FiX size={20} className="text-gray-700" /> : <FiMenu size={20} className="text-gray-700" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200",
          "transition-all duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "lg:w-16" : "lg:w-56",
          "w-56",
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={cn(
            "h-14 border-b border-gray-200 flex items-center px-3 flex-shrink-0",
            isCollapsed && "lg:justify-center lg:px-2"
          )}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">ID</span>
              </div>
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                isCollapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
              )}>
                <h1 className="text-sm font-bold text-gray-900 whitespace-nowrap">Dashboard</h1>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={cn(
            "border-b border-gray-200 overflow-hidden transition-all duration-300",
            isCollapsed ? "lg:h-0 lg:opacity-0" : "h-auto opacity-100"
          )}>
            <div className="p-3 space-y-2.5">
              <div>
                <label className="text-[10px] font-semibold text-gray-600 mb-1 block uppercase tracking-wider">Year</label>
                <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="text-xs h-8">
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </Select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-600 mb-1 block uppercase tracking-wider">Region</label>
                <Select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="text-xs h-8">
                  <option value="all">All Regions</option>
                  <option value="indore">Indore</option>
                  <option value="pithampur">Pithampur</option>
                  <option value="pan-india">Pan-India</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Navigation - Only Dashboard */}
          <nav className="flex-1 overflow-y-auto py-2">
            <ul className="px-2 space-y-0.5">
              <li className="relative group">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-200",
                    "bg-sky-600 text-white font-medium shadow-sm",
                    isCollapsed && "lg:justify-center"
                  )}
                >
                  <FiHome size={18} className="flex-shrink-0" />
                  <span className={cn(
                    "transition-all duration-300 whitespace-nowrap text-xs font-medium",
                    isCollapsed ? "lg:w-0 lg:opacity-0 lg:hidden" : "w-auto opacity-100"
                  )}>
                    Dashboard
                  </span>
                </Link>

                {/* Tooltip */}
                {isCollapsed && (
                  <div className="hidden lg:block absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                    Dashboard
                    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-3px] w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* Toggle Button */}
          <div className="border-t border-gray-200 p-2">
            <button
              onClick={onToggle}
              className={cn(
                "hidden lg:flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-xs font-medium",
                "bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200",
                isCollapsed && "lg:justify-center"
              )}
            >
              <FiChevronLeft size={16} className={cn(
                "transition-transform duration-300",
                isCollapsed && "rotate-180"
              )} />
              <span className={cn(
                "transition-all duration-300",
                isCollapsed ? "lg:w-0 lg:opacity-0 lg:hidden" : "w-auto opacity-100"
              )}>
                Collapse
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
