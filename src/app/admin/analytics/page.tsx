'use client'

import { api } from '@/services/api'
import { isAdmin, logout } from '@/utils/adminGuard'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import FloodSeverityChart from '@/components/FloodSeverityChart'

interface StatsData {
  total: number
  resolved: number
  pending: number
  inProgress: number
  byType: Array<{ _id: string; count: number }>
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function Analytics() {
  const router = useRouter()
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/admin/login')
      return
    }

    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await api.get('/stats')
      setData(res.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '1em', animation: 'spin 1s linear infinite' }}>⏳</div>
          <p style={{ color: '#64748b', fontSize: '1.1em' }}>Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#dc2626', fontSize: '1.3em', fontWeight: 600 }}>Failed to load analytics</p>
        </div>
      </div>
    )
  }

  const chartData = data.byType.map(item => ({
    name: item._id,
    count: item.count
  }))

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 100%)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(90deg, #a21caf 0%, #ec4899 100%)', color: '#fff', boxShadow: '0 4px 24px #a21caf22' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2em 1em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5em', fontWeight: 800, margin: 0 }}>📊 Analytics Dashboard</h1>
            <p style={{ color: '#f3e8ff', marginTop: '0.3em', fontSize: '1.1em' }}>Real-time Help Request Statistics</p>
          </div>
          <button
            onClick={handleLogout}
            style={{ background: '#fff', color: '#a21caf', fontWeight: 600, padding: '0.7em 2em', borderRadius: '0.7em', fontSize: '1em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #fff2' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5em 1em' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2em', marginBottom: '2.5em' }}>
          <div className="glass" style={{ borderRadius: '1.2em', padding: '2em', boxShadow: '0 2px 16px #3b82f633', borderTop: '5px solid #3b82f6', background: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
            <div style={{ color: '#3b82f6', fontWeight: 600, fontSize: '1em', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Requests</div>
            <div style={{ fontSize: '2.2em', fontWeight: 700, color: '#1e293b', marginTop: '0.5em' }}>{data.total}</div>
            <p style={{ color: '#64748b', fontSize: '1em', marginTop: '0.7em' }}>All help requests received</p>
          </div>
          <div className="glass" style={{ borderRadius: '1.2em', padding: '2em', boxShadow: '0 2px 16px #f59e0b33', borderTop: '5px solid #f59e0b', background: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
            <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: '1em', textTransform: 'uppercase', letterSpacing: '1px' }}>Pending</div>
            <div style={{ fontSize: '2.2em', fontWeight: 700, color: '#b45309', marginTop: '0.5em' }}>{data.pending}</div>
            <p style={{ color: '#64748b', fontSize: '1em', marginTop: '0.7em' }}>Awaiting action</p>
          </div>
          <div className="glass" style={{ borderRadius: '1.2em', padding: '2em', boxShadow: '0 2px 16px #60a5fa33', borderTop: '5px solid #60a5fa', background: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
            <div style={{ color: '#60a5fa', fontWeight: 600, fontSize: '1em', textTransform: 'uppercase', letterSpacing: '1px' }}>In Progress</div>
            <div style={{ fontSize: '2.2em', fontWeight: 700, color: '#1d4ed8', marginTop: '0.5em' }}>{data.inProgress || 0}</div>
            <p style={{ color: '#64748b', fontSize: '1em', marginTop: '0.7em' }}>Being handled</p>
          </div>
          <div className="glass" style={{ borderRadius: '1.2em', padding: '2em', boxShadow: '0 2px 16px #22c55e33', borderTop: '5px solid #22c55e', background: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
            <div style={{ color: '#22c55e', fontWeight: 600, fontSize: '1em', textTransform: 'uppercase', letterSpacing: '1px' }}>Resolved</div>
            <div style={{ fontSize: '2.2em', fontWeight: 700, color: '#15803d', marginTop: '0.5em' }}>{data.resolved}</div>
            <p style={{ color: '#64748b', fontSize: '1em', marginTop: '0.7em' }}>Completed requests</p>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2em', marginBottom: '2.5em' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2em' }}>
            {/* Bar Chart - Requests by Type */}
            <div className="glass" style={{ borderRadius: '1.2em', background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 16px #64748b22', padding: '2em' }}>
              <h2 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '1.2em' }}>Requests by Type</h2>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ color: '#64748b', textAlign: 'center', padding: '3em 0' }}>No data available</p>
              )}
            </div>

            {/* Pie Chart - Status Distribution */}
            <div className="glass" style={{ borderRadius: '1.2em', background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 16px #64748b22', padding: '2em' }}>
              <h2 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '1.2em' }}>Status Distribution</h2>
              {data.total > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Pending', value: data.pending },
                        { name: 'In Progress', value: data.inProgress || 0 },
                        { name: 'Resolved', value: data.resolved }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1, 2].map((index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} requests`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ color: '#64748b', textAlign: 'center', padding: '3em 0' }}>No data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Flood Severity Chart */}
        <div className="glass" style={{ borderRadius: '1.2em', background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 16px #64748b22', padding: '2em', marginTop: '2.5em' }}>
          <h2 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '1.2em' }}>🌊 Flood Severity Distribution</h2>
          <FloodSeverityChart />
        </div>

        {/* Summary Stats */}
        <div className="glass" style={{ borderRadius: '1.2em', background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 16px #64748b22', padding: '2em', marginTop: '2.5em' }}>
          <h2 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '1.2em' }}>Summary</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2em' }}>
            <div>
              <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '0.5em' }}>Resolution Rate</p>
              <p style={{ fontSize: '2em', fontWeight: 700, color: '#22c55e' }}>{data.total > 0 ? ((data.resolved / data.total) * 100).toFixed(1) : '0'}%</p>
            </div>
            <div>
              <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '0.5em' }}>Most Common Request Type</p>
              <p style={{ fontSize: '2em', fontWeight: 700, color: '#3b82f6' }}>{chartData.length > 0 ? chartData.reduce((prev, current) => current.count > prev.count ? current : prev).name : 'N/A'}</p>
            </div>
            <div>
              <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '0.5em' }}>Pending Response Time</p>
              <p style={{ fontSize: '2em', fontWeight: 700, color: '#f59e0b' }}>{data.pending}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '2.5em', display: 'flex', gap: '1.5em', justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/admin/dashboard')}
            style={{ background: '#3b82f6', color: '#fff', fontWeight: 600, padding: '0.9em 2.2em', borderRadius: '0.7em', fontSize: '1em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #3b82f622', transition: 'background .2s' }}
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => router.push('/admin/help-requests')}
            style={{ background: '#6366f1', color: '#fff', fontWeight: 600, padding: '0.9em 2.2em', borderRadius: '0.7em', fontSize: '1em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #6366f122', transition: 'background .2s' }}
          >
            Manage Requests
          </button>
        </div>
      </div>
    </div>
  )
}
