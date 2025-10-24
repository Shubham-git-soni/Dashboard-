import { NextResponse } from 'next/server'

export async function GET() {
  const businessHealth = {
    kpis: {
      totalSales: { value: 67.5, change: 12.5 },
      quotations: { value: 42, change: 8.3 },
      newOrders: { value: 128, change: 15.2 },
      totalClients: { value: 245, change: 5.8 }
    },
    salesTrend: [
      { month: 'Jan', current: 45, past: 38 },
      { month: 'Feb', current: 52, past: 42 },
      { month: 'Mar', current: 48, past: 45 },
      { month: 'Apr', current: 61, past: 48 },
      { month: 'May', current: 55, past: 52 },
      { month: 'Jun', current: 67, past: 55 }
    ],
    topProducts: [
      { product: 'Brochures', sales: 85, value: 12.5 },
      { product: 'Packaging', sales: 72, value: 18.2 },
      { product: 'Labels', sales: 68, value: 8.5 },
      { product: 'Catalogs', sales: 55, value: 15.8 },
      { product: 'Business Cards', sales: 45, value: 5.2 }
    ],
    regionSales: [
      { region: 'Indore', sales: 45, growth: 12 },
      { region: 'Pithampur', sales: 35, growth: 8 },
      { region: 'Pan-India', sales: 65, growth: 15 },
      { region: 'Others', sales: 25, growth: 5 }
    ]
  }

  return NextResponse.json(businessHealth)
}
