'use client'

import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#0088FE', '#FFBB28', '#FF4C4C']

interface FloodSeverityData {
  low: number
  medium: number
  high: number
}

export default function FloodSeverityChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<FloodSeverityData>('/analytics/flood-severity')
        const formatted = Object.entries(response.data).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: value as number,
        }))
        setData(formatted)
        setLoading(false)
      } catch (err) {
        setError('Failed to load flood severity data')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-500">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
