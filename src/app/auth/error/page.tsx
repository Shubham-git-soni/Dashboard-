'use client'

/**
 * Authentication Error Page
 * Shown when login fails or invalid parameters
 */
export default function AuthErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center bg-white p-10 rounded-xl shadow-2xl max-w-lg">

        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-5xl">✖</span>
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Authentication Failed
        </h1>

        {/* Error Description */}
        <p className="text-gray-600 mb-6">
          Unable to authenticate your session. This could be due to:
        </p>

        {/* Error Reasons */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-left mb-6">
          <ul className="space-y-2 text-sm text-red-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Missing or invalid user credentials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Direct URL access without proper parameters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Session expired or corrupted</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Invalid company or user ID</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium mb-3">
            Please login from your ERP application
          </p>
          <p className="text-xs text-blue-600">
            Use the "Dashboard" button in your ERP to access this application
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-8">
          If the problem persists, contact your system administrator
        </p>
      </div>
    </div>
  )
}
