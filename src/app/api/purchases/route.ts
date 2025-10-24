import { NextResponse } from 'next/server'

export async function GET() {
  const purchases = {
    kpis: {
      totalPurchase: { value: 55.2, change: 15.8 },
      growthRate: { value: 15.8, change: 2.3 },
      totalPOs: { value: 68, change: 12 },
      activeVendors: { value: 42, change: 3 }
    },
    purchaseGrowth: [
      { month: 'Jan', current: 32, past: 28 },
      { month: 'Feb', current: 38, past: 30 },
      { month: 'Mar', current: 35, past: 32 },
      { month: 'Apr', current: 42, past: 35 },
      { month: 'May', current: 48, past: 38 },
      { month: 'Jun', current: 55, past: 42 }
    ],
    vendorData: [
      { vendor: 'Paper Supplies Inc', purchase: 18.5, orders: 24, rating: 4.5 },
      { vendor: 'Ink Solutions Ltd', purchase: 12.3, orders: 18, rating: 4.2 },
      { vendor: 'Die & Plate Works', purchase: 8.7, orders: 12, rating: 4.8 },
      { vendor: 'Packaging Materials Co', purchase: 15.2, orders: 20, rating: 4.3 },
      { vendor: 'Chemical Supplies', purchase: 6.8, orders: 15, rating: 4.0 }
    ],
    categoryData: [
      { name: 'Paper & Board', value: 35 },
      { name: 'Inks & Chemicals', value: 25 },
      { name: 'Dies & Plates', value: 20 },
      { name: 'Packaging Materials', value: 15 },
      { name: 'Others', value: 5 }
    ]
  }

  return NextResponse.json(purchases)
}
