"use client"

import React, { ReactNode } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'

interface ResponsiveChartWrapperProps {
  children: ReactNode
  className?: string
}

export function ResponsiveChartWrapper({ children, className = '' }: ResponsiveChartWrapperProps) {
  const { isMobile, isTablet } = useWindowSize()

  const height = isMobile ? 180 : isTablet ? 220 : 280

  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: `${height}px`,
        minHeight: `${height}px`,
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {children}
    </div>
  )
}

export function getChartConfig(isMobile: boolean, isTablet: boolean) {
  return {
    margin: isMobile
      ? { top: 5, right: 5, left: -20, bottom: 5 }
      : isTablet
      ? { top: 8, right: 8, left: -10, bottom: 5 }
      : { top: 10, right: 10, left: 0, bottom: 5 },

    fontSize: isMobile ? 10 : isTablet ? 11 : 12,
    tickMargin: isMobile ? 3 : 5,
    yAxisWidth: isMobile ? 25 : isTablet ? 30 : 40,

    tooltipStyle: {
      fontSize: isMobile ? '11px' : '12px',
      padding: isMobile ? '4px 6px' : '6px 10px'
    },

    legendStyle: {
      fontSize: isMobile ? '10px' : isTablet ? '11px' : '12px',
      paddingTop: isMobile ? '5px' : '8px'
    },

    iconSize: isMobile ? 10 : 12
  }
}
