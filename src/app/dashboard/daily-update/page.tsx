import DailyUpdateSection from '@/components/sections/DailyUpdateSection'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function DailyUpdatePage() {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </Link>

      {/* Page Content */}
      <DailyUpdateSection />
    </div>
  )
}
