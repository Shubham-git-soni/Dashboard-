import { NextResponse } from 'next/server'

export async function GET() {
  const orders = [
    {
      id: 1,
      orderDate: '2024-10-15',
      clientName: 'ABC Corporation',
      jobName: 'Brochure Design',
      plate: 'Received',
      die: 'Received',
      paper: 'Available',
      paperIssued: 2000,
      productionStatus: 'Printing',
      isDelayed: false
    },
    {
      id: 2,
      orderDate: '2024-10-14',
      clientName: 'XYZ Industries',
      jobName: 'Packaging Labels',
      plate: 'Old',
      die: 'Available',
      paper: 'OP Raised',
      paperIssued: 1500,
      productionStatus: 'Die Cutting',
      isDelayed: false
    },
    {
      id: 3,
      orderDate: '2024-10-12',
      clientName: 'Global Traders',
      jobName: 'Business Cards',
      plate: 'Received',
      die: 'Received',
      paper: 'Available',
      paperIssued: 500,
      productionStatus: 'Finishing',
      isDelayed: true
    }
  ]

  return NextResponse.json(orders)
}
