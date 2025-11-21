"use client"

import React, { useEffect, useState } from 'react'
import { FiSearch, FiBell, FiSettings, FiChevronDown, FiMaximize2 } from 'react-icons/fi'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { getSecureItem } from '@/lib/encryption'

export default function Topbar() {
  const today = new Date()

  // User info from encrypted localStorage
  const [userName, setUserName] = useState('User')
  const [userId, setUserId] = useState('')
  const [companyId, setCompanyId] = useState('')

  useEffect(() => {
    // Load user info from encrypted localStorage
    const storedName = getSecureItem('userName')
    const storedUserId = getSecureItem('userId')
    const storedCompanyId = getSecureItem('companyId')

    if (storedName) setUserName(storedName)
    if (storedUserId) setUserId(storedUserId)
    if (storedCompanyId) setCompanyId(storedCompanyId)
  }, [])

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      {/* Main Topbar */}
      <div className="h-14 px-4 sm:px-6 lg:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 ml-12 lg:ml-0">
          {/* Title */}
          <div className="hidden md:block">
            <h1 className="text-sm lg:text-base font-bold text-gray-900">Dashboard</h1>
            <p className="text-[10px] lg:text-[11px] text-gray-500 leading-tight">
              {format(today, 'EEE, MMM d, yyyy')}
            </p>
          </div>
        </div>

        {/* Center Search */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <FiSearch className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:pl-9 pr-2 h-8 sm:h-9 text-xs sm:text-sm bg-gray-50 border-gray-200 focus:bg-white focus:border-sky-400 transition-all"
            />

          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-0.5 sm:gap-1.5">
          {/* Fullscreen */}
          <button
            className="hidden md:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 transition-colors group"
            title="Fullscreen"
          >
          </button>

       
          {/* Notifications */}
          <button
            className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 transition-colors group"
            title="Notifications"
          >
            <FiBell size={16} className="text-gray-600 group-hover:text-gray-900" />
            <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-200 mx-1"></div>

          {/* User Menu */}
          <button className="flex items-center gap-1.5 sm:gap-2 px-1 sm:px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group">
            <div className="relative">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shadow-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-gray-900 leading-tight">{userName}</p>
              <p className="text-[10px] text-gray-500">
                {userId && companyId ? `User: ${userId} | Company: ${companyId}` : 'Loading...'}
              </p>
            </div>
            <FiChevronDown size={14} className="hidden lg:block text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
      </div>

      {/* Quick Stats Strip */}
      {/* <div className="hidden xl:flex items-center h-8 px-6 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-100">
        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Pending Approvals</span>
            <Badge className="h-5 px-1.5 bg-orange-500 hover:bg-orange-500 text-white text-[10px] font-bold">
              12
            </Badge>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Active Orders</span>
            <Badge className="h-5 px-1.5 bg-sky-500 hover:bg-sky-500 text-white text-[10px] font-bold">
              28
            </Badge>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Today's Sales</span>
            <span className="font-bold text-green-600">₹2.4L</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">System</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-bold text-green-600">Online</span>
            </span>
          </div>
        </div>
      </div> */}
    </header>
  )
}
