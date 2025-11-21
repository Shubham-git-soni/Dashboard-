/**
 * Centralized API Utility
 * Automatically adds UserID and CompanyID from localStorage to headers
 * Handles Basic Authentication for ERP API calls
 * Uses encrypted storage for security
 */

import { getSecureItem } from './encryption'

/**
 * Standard API call without date filters
 * @param endpoint - API endpoint (e.g., 'Approvals/InternalApprovals')
 * @param options - Optional fetch options
 * @returns Promise with API response data
 */
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {

  // Step 1: Get userId and companyId from encrypted localStorage
  const userId = getSecureItem('userId') || '2'
  const companyId = getSecureItem('companyId') || '2'

  // Step 2: Get Basic Auth credentials from environment
  const username = process.env.NEXT_PUBLIC_API_USERNAME!
  const password = process.env.NEXT_PUBLIC_API_PASSWORD!
  const basicAuthToken = btoa(`${username}:${password}`)

  // Step 3: Build headers with dynamic userId and companyId
  const headers = {
    'Authorization': `Basic ${basicAuthToken}`,
    'Content-Type': 'application/json',
    'UserID': userId,           // ✅ Dynamic from localStorage
    'CompanyID': companyId,     // ✅ Dynamic from localStorage
    'FYEAR': '2025-2026',
    ...(options.headers || {})
  }

  // Debug log (remove in production if needed)
  console.log('📤 API Request:', {
    endpoint,
    UserID: userId,
    CompanyID: companyId
  })

  try {
    // Step 4: Make API call
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      {
        method: 'GET',
        ...options,
        headers
      }
    )

    // Step 5: Handle response
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ API Response received:', endpoint)

    return data

  } catch (error) {
    console.error('❌ API Call Failed:', {
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    throw error
  }
}


/**
 * API call with date filters
 * @param endpoint - API endpoint
 * @param fromDate - Start date (YYYY-MM-DD format)
 * @param toDate - End date (YYYY-MM-DD format)
 * @param options - Optional fetch options
 * @returns Promise with API response data
 */
export async function apiCallWithDates(
  endpoint: string,
  fromDate: string,
  toDate: string,
  options: RequestInit = {}
): Promise<any> {

  // Get userId and companyId from encrypted localStorage
  const userId = getSecureItem('userId') || '2'
  const companyId = getSecureItem('companyId') || '2'

  const username = process.env.NEXT_PUBLIC_API_USERNAME!
  const password = process.env.NEXT_PUBLIC_API_PASSWORD!
  const basicAuthToken = btoa(`${username}:${password}`)

  const headers = {
    'Authorization': `Basic ${basicAuthToken}`,
    'Content-Type': 'application/json',
    'UserID': userId,
    'CompanyID': companyId,
    'FYEAR': '2025-2026',
    'FromDate': fromDate,
    'ToDate': toDate,
    ...(options.headers || {})
  }

  console.log('📤 API Request (with dates):', {
    endpoint,
    UserID: userId,
    CompanyID: companyId,
    FromDate: fromDate,
    ToDate: toDate
  })

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      {
        method: 'GET',
        ...options,
        headers
      }
    )

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ API Response received:', endpoint)

    return data

  } catch (error) {
    console.error('❌ API Call Failed:', {
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    throw error
  }
}
