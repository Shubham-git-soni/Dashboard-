import { NextResponse } from 'next/server'

export async function GET() {
  const qcData = {
    overall: {
      goodOutput: 85,
      wastage: 15
    },
    jobWise: [
      { job: 'Brochure A', wastage: 12, target: 5 },
      { job: 'Packaging B', wastage: 8, target: 5 },
      { job: 'Labels C', wastage: 18, target: 5 },
      { job: 'Catalog D', wastage: 6, target: 5 },
      { job: 'Cards E', wastage: 15, target: 5 }
    ],
    machineWise: [
      { machine: 'Printer 1', wastage: 8, efficiency: 92 },
      { machine: 'Printer 2', wastage: 12, efficiency: 88 },
      { machine: 'Die Cut 1', wastage: 15, efficiency: 85 },
      { machine: 'Die Cut 2', wastage: 10, efficiency: 90 },
      { machine: 'Finisher 1', wastage: 7, efficiency: 93 }
    ]
  }

  return NextResponse.json(qcData)
}
