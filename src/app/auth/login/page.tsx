'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setSecureItem } from '@/lib/encryption'
import { setAuthSession } from '@/lib/auth'

/**
 * Login Page - Receives userId and companyId from ERP
 * URL Format: /auth/login?userId=101&companyId=5&userName=Shubham
 * Data is encrypted before storing in localStorage
 */
function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Step 1: Extract URL parameters from ERP
    const userId = searchParams.get('userId')
    const companyId = searchParams.get('companyId')
    const userName = searchParams.get('userName') || 'User'

    console.log('📥 Received from ERP (Plain):', { userId, companyId, userName })

    // Step 2: Validate parameters
    if (!userId || !companyId) {
      console.error('❌ Missing userId or companyId in URL')
      setError('Invalid login parameters. Please login from ERP.')
      setLoading(false)
      return
    }

    // Step 3: Encrypt and save to localStorage + Set Auth Cookies
    try {
      // ✅ Save encrypted data to localStorage (for API calls)
      setSecureItem('userId', userId)
      setSecureItem('companyId', companyId)
      setSecureItem('userName', userName)

      // ✅ Set authentication cookies (for middleware protection)
      setAuthSession(userId, companyId, userName)

      console.log('✅ User data encrypted and saved to localStorage')
      console.log('🔐 Encrypted values stored securely')
      console.log('🍪 Authentication cookies set for route protection')

      // Step 4: Redirect to dashboard after short delay
      setTimeout(() => {
        console.log('🔄 Redirecting to dashboard...')
        router.push('/dashboard')
      }, 1000)

    } catch (err) {
      console.error('❌ localStorage error:', err)
      setError('Failed to save user data. Please try again.')
      setLoading(false)
    }

  }, [searchParams, router])

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-2xl max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Login Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <p className="text-sm text-red-700 font-medium mb-2">Expected URL format:</p>
            <code className="text-xs text-red-600 block bg-red-100 p-2 rounded">
              /auth/login?userId=XXX&companyId=YYY
            </code>
          </div>
          <p className="text-sm text-gray-500 mt-6">Please try again from ERP application</p>
        </div>
      </div>
    )
  }

  // Loading state
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center bg-white p-10 rounded-xl shadow-2xl max-w-md">

        {/* Animated Spinner */}
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">✓</span>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>
        <p className="text-gray-600 mb-6">Logging you into dashboard...</p>

        {/* Progress Indicator */}
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full animate-pulse"
               style={{ width: '70%' }}>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">Please wait a moment</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center bg-white p-10 rounded-xl shadow-2xl max-w-md">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
