import { NextResponse } from 'next/server'

export async function GET() {
  const approvals = [
    {
      id: 1,
      title: 'Internal Approvals',
      count: 12,
      type: 'internal',
      priority: 'high',
      trend: [5, 8, 6, 9, 12, 10, 12]
    },
    {
      id: 2,
      title: 'Price Approvals',
      count: 8,
      type: 'price',
      priority: 'medium',
      trend: [3, 5, 7, 6, 8, 7, 8]
    },
    {
      id: 3,
      title: 'Purchase Requisition',
      count: 15,
      type: 'purchase-req',
      priority: 'high',
      trend: [10, 12, 11, 13, 15, 14, 15]
    }
  ]

  return NextResponse.json(approvals)
}
