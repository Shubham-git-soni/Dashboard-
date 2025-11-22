/**
 * Authentication Helper Functions
 * Handles session management with encrypted cookies
 */

import { encrypt, decrypt } from './encryption'

/**
 * Set authentication session (called after successful login)
 * Sets ENCRYPTED cookies that middleware can read
 */
export function setAuthSession(userId: string, companyId: string, userName: string) {
  // Set cookies with 24 hour expiry
  const maxAge = 24 * 60 * 60 // 24 hours in seconds

  // Encrypt sensitive data before storing in cookies
  const encryptedUserId = encrypt(userId)
  const encryptedCompanyId = encrypt(companyId)
  const encryptedUserName = encrypt(userName)

  // URL encode the encrypted values (because they may contain special characters)
  document.cookie = `userId=${encodeURIComponent(encryptedUserId)}; path=/; max-age=${maxAge}; SameSite=Strict`
  document.cookie = `companyId=${encodeURIComponent(encryptedCompanyId)}; path=/; max-age=${maxAge}; SameSite=Strict`
  document.cookie = `userName=${encodeURIComponent(encryptedUserName)}; path=/; max-age=${maxAge}; SameSite=Strict`
  document.cookie = `authenticated=true; path=/; max-age=${maxAge}; SameSite=Strict`

  console.log('🔐 Auth session created with ENCRYPTED cookies (expires in 24 hours)')
}

/**
 * Clear authentication session (logout)
 */
export function clearAuthSession() {
  document.cookie = 'userId=; path=/; max-age=0'
  document.cookie = 'companyId=; path=/; max-age=0'
  document.cookie = 'userName=; path=/; max-age=0'
  document.cookie = 'authenticated=; path=/; max-age=0'

  console.log('🔓 Auth session cleared')
}

/**
 * Check if user is authenticated (client-side)
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false

  const cookies = document.cookie.split(';')
  const authCookie = cookies.find(c => c.trim().startsWith('authenticated='))

  return authCookie?.includes('true') || false
}

/**
 * Get user data from cookies (client-side)
 * Decrypts the encrypted cookie values
 */
export function getUserData() {
  if (typeof window === 'undefined') return null

  const cookies = document.cookie.split(';')
  const getCookie = (name: string) => {
    const cookie = cookies.find(c => c.trim().startsWith(`${name}=`))
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
  }

  const encryptedUserId = getCookie('userId')
  const encryptedCompanyId = getCookie('companyId')
  const encryptedUserName = getCookie('userName')

  if (!encryptedUserId || !encryptedCompanyId) return null

  // Decrypt the values
  const userId = decrypt(encryptedUserId)
  const companyId = decrypt(encryptedCompanyId)
  const userName = encryptedUserName ? decrypt(encryptedUserName) : 'User'

  if (!userId || !companyId) return null

  return {
    userId,
    companyId,
    userName
  }
}
