/**
 * Encryption Utility for localStorage
 * Uses AES encryption to secure sensitive data
 */

import CryptoJS from 'crypto-js'

// Secret key for encryption (Store in environment variable in production)
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'your-secret-key-change-in-production-2024'

/**
 * Encrypt data using AES encryption
 * @param data - Plain text data to encrypt
 * @returns Encrypted string
 */
export function encrypt(data: string): string {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
    return encrypted
  } catch (error) {
    console.error('❌ Encryption failed:', error)
    return data // Fallback to plain text (not recommended)
  }
}

/**
 * Decrypt data using AES decryption
 * @param encryptedData - Encrypted string
 * @returns Decrypted plain text
 */
export function decrypt(encryptedData: string): string {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    const plainText = decrypted.toString(CryptoJS.enc.Utf8)

    if (!plainText) {
      console.error('❌ Decryption failed: Empty result')
      return ''
    }

    return plainText
  } catch (error) {
    console.error('❌ Decryption failed:', error)
    return ''
  }
}

/**
 * Securely set item in localStorage (encrypted)
 * @param key - Storage key
 * @param value - Value to store
 */
export function setSecureItem(key: string, value: string): void {
  try {
    const encrypted = encrypt(value)
    localStorage.setItem(key, encrypted)
    console.log(`🔐 Encrypted and saved: ${key}`)
  } catch (error) {
    console.error(`❌ Failed to save ${key}:`, error)
  }
}

/**
 * Securely get item from localStorage (decrypted)
 * @param key - Storage key
 * @returns Decrypted value or null
 */
export function getSecureItem(key: string): string | null {
  try {
    const encrypted = localStorage.getItem(key)

    if (!encrypted) {
      return null
    }

    const decrypted = decrypt(encrypted)
    console.log(`🔓 Decrypted and loaded: ${key}`)

    return decrypted || null
  } catch (error) {
    console.error(`❌ Failed to load ${key}:`, error)
    return null
  }
}

/**
 * Remove item from localStorage
 * @param key - Storage key
 */
export function removeSecureItem(key: string): void {
  try {
    localStorage.removeItem(key)
    console.log(`🗑️ Removed: ${key}`)
  } catch (error) {
    console.error(`❌ Failed to remove ${key}:`, error)
  }
}

/**
 * Clear all secure items
 */
export function clearSecureStorage(): void {
  try {
    localStorage.removeItem('userId')
    localStorage.removeItem('companyId')
    localStorage.removeItem('userName')
    console.log('🗑️ All secure items cleared')
  } catch (error) {
    console.error('❌ Failed to clear storage:', error)
  }
}
