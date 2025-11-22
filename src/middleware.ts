import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import CryptoJS from 'crypto-js'

/**
 * Decrypt function for middleware (server-side)
 * Same logic as client-side but works in middleware
 */
function decryptCookie(encryptedData: string): string {
  try {
    const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'your-secret-key-change-in-production-2024'
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), SECRET_KEY)
    const plainText = decrypted.toString(CryptoJS.enc.Utf8)
    return plainText || ''
  } catch (error) {
    console.error('❌ Cookie decryption failed:', error)
    return ''
  }
}

/**
 * Middleware - Protects all routes except public ones
 * Runs on server-side BEFORE page loads
 * This prevents unauthorized access to any page
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Public routes (accessible without login)
  const publicRoutes = [
    '/auth/login',
    '/auth/error',
  ]

  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Allow access to public routes
  if (isPublicRoute) {
    console.log(`✅ Public route accessed: ${pathname}`)
    return NextResponse.next()
  }

  // 🔒 For protected routes, check authentication
  const authenticated = request.cookies.get('authenticated')?.value
  const encryptedUserId = request.cookies.get('userId')?.value
  const encryptedCompanyId = request.cookies.get('companyId')?.value

  // Check if cookies exist
  if (!authenticated || authenticated !== 'true' || !encryptedUserId || !encryptedCompanyId) {
    console.log(`❌ Unauthorized access attempt to: ${pathname}`)
    console.log(`   Missing auth cookies - Redirecting to /auth/error`)

    const errorUrl = new URL('/auth/error', request.url)
    return NextResponse.redirect(errorUrl)
  }

  // Decrypt and validate
  try {
    const userId = decryptCookie(encryptedUserId)
    const companyId = decryptCookie(encryptedCompanyId)

    if (!userId || !companyId) {
      console.log(`❌ Invalid or corrupted auth cookies for: ${pathname}`)
      const errorUrl = new URL('/auth/error', request.url)
      return NextResponse.redirect(errorUrl)
    }

    // ✅ User is authenticated, allow access
    console.log(`✅ Authenticated access: ${pathname} (User: ${userId}, Company: ${companyId})`)
    return NextResponse.next()
  } catch (error) {
    console.log(`❌ Cookie validation failed for: ${pathname}`)
    const errorUrl = new URL('/auth/error', request.url)
    return NextResponse.redirect(errorUrl)
  }
}

/**
 * Configure which routes this middleware should run on
 * Excludes: static files, images, favicon, etc.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, images
     * - API routes are also checked
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico).*)',
  ],
}
