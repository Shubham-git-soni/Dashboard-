"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function QCSection() {
  // Overall Wastage Data
  const overallWastageData = [
    { name: 'Good Output', value: 85, color: '#10b981' },
    { name: 'Wastage', value: 15, color: '#ef4444' }
  ]

  // Job-wise Wastage Data
  const jobWiseData = [
    { job: 'Brochure A', wastage: 12, target: 5 },
    { job: 'Packaging B', wastage: 8, target: 5 },
    { job: 'Labels C', wastage: 18, target: 5 },
    { job: 'Catalog D', wastage: 6, target: 5 },
    { job: 'Cards E', wastage: 15, target: 5 }
  ]

  // Machine-wise Wastage Data
  const machineWiseData = [
    { machine: 'Printer 1', wastage: 8, efficiency: 92 },
    { machine: 'Printer 2', wastage: 12, efficiency: 88 },
    { machine: 'Die Cut 1', wastage: 15, efficiency: 85 },
    { machine: 'Die Cut 2', wastage: 10, efficiency: 90 },
    { machine: 'Finisher 1', wastage: 7, efficiency: 93 }
  ]

  const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6']

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div>
        <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">My QC - Wastage Analytics</h2>
        <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">Quality control metrics and wastage tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Overall Wastage - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Overall Wastage</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[140px] sm:h-[160px] lg:h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overallWastageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={45}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {overallWastageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={30}
                    wrapperStyle={{ fontSize: '9px' }}
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 sm:mt-3 lg:mt-4 text-center">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">15%</p>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600">Total Wastage Rate</p>
            </div>
          </CardContent>
        </Card>

        {/* Job-wise Wastage - Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Job-wise Wastage Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 sm:pb-3 lg:pb-4">
            <div className="h-[160px] sm:h-[200px] lg:h-[240px] -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobWiseData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="job"
                    tick={{ fontSize: 8 }}
                    angle={-20}
                    textAnchor="end"
                    height={50}
                    tickMargin={5}
                  />
                  <YAxis
                    tick={{ fontSize: 9 }}
                    tickMargin={5}
                    width={35}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                    cursor={{ fill: 'rgba(239, 68, 68, 0.1)' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }}
                    iconSize={10}
                  />
                  <Bar dataKey="wastage" fill="#ef4444" name="Wastage %" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#10b981" name="Target %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Machine-wise Wastage - Table & Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm lg:text-base">Machine-wise Wastage & Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {/* Chart */}
              <div className="h-[180px] sm:h-[220px] lg:h-[260px] -mx-2 sm:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={machineWiseData} margin={{ top: 5, right: 25, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="machine"
                      tick={{ fontSize: 8 }}
                      angle={-20}
                      textAnchor="end"
                      height={50}
                      tickMargin={5}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tick={{ fontSize: 9 }}
                      tickMargin={5}
                      width={30}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 9 }}
                      tickMargin={5}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: '10px', padding: '4px 8px' }}
                      cursor={{ fill: 'rgba(239, 68, 68, 0.1)' }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '9px', paddingTop: '5px' }}
                      iconSize={8}
                    />
                    <Bar yAxisId="left" dataKey="wastage" fill="#ef4444" name="Wastage %" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="efficiency" fill="#10b981" name="Efficiency %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table */}
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Machine</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Wastage %</th>
                      <th className="text-right py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Efficiency %</th>
                      <th className="text-left py-2 px-2 sm:px-3 font-medium text-gray-700 text-[10px] sm:text-xs lg:text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineWiseData.map((machine, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2 sm:px-3 text-[11px] sm:text-xs lg:text-sm font-medium">{machine.machine}</td>
                        <td className={`py-2 px-2 sm:px-3 text-[11px] sm:text-xs lg:text-sm text-right font-semibold ${machine.wastage > 10 ? 'text-red-600' : 'text-green-600'}`}>
                          {machine.wastage}%
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-[11px] sm:text-xs lg:text-sm text-right">{machine.efficiency}%</td>
                        <td className="py-2 px-2 sm:px-3">
                          <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] lg:text-xs font-medium ${machine.efficiency >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {machine.efficiency >= 90 ? 'Good' : 'Needs Attention'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
