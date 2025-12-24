'use client'

import { api } from '@/services/api'
import { isAdmin, logout } from '@/utils/adminGuard'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const router = useRouter()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all')

  useEffect(() => {
    // Protect route
    if (!isAdmin()) {
      router.push('/admin/login')
      return
    }

    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await api.get('/help')
      setRequests(res.data)
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResolve = async (id: string) => {
    if (!confirm('Mark this request as resolved?')) return
    try {
      await api.put(`/help/${id}/resolve`)
      fetchRequests()
    } catch (error) {
      console.error('Error resolving request:', error)
      alert('Failed to resolve request')
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter)

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    resolved: requests.filter(r => r.status === 'resolved').length,
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f3e8ff 0%, #fef2f2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5em', marginBottom: '1em', animation: 'spin 1s linear infinite' }}>⏳</div>
          <p style={{ color: '#64748b', fontSize: '1.1em' }}>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f3e8ff 0%, #fef2f2 100%)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(90deg, #dc2626 0%, #f59e42 100%)', color: '#fff', boxShadow: '0 4px 24px #dc262622' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2em 1em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5em', fontWeight: 800, margin: 0 }}>🚨 Admin Dashboard</h1>
            <p style={{ color: '#fee2e2', marginTop: '0.3em', fontSize: '1.1em' }}>Emergency Relief Management System</p>
          </div>
          <div style={{ display: 'flex', gap: '1em' }}>
            <button
              onClick={() => router.push('/admin/analytics')}
              style={{ background: '#fff', color: '#dc2626', fontWeight: 600, padding: '0.7em 2em', borderRadius: '0.7em', fontSize: '1em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #fff2' }}
            >
              📊 Analytics
            </button>
            <button
              onClick={handleLogout}
              style={{ background: '#fff', color: '#dc2626', fontWeight: 600, padding: '0.7em 2em', borderRadius: '0.7em', fontSize: '1em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #fff2' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5em 1em' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2em', marginBottom: '2.5em' }}>
          <div className="glass" style={{ borderRadius: '1.2em', padding: '2em', boxShadow: '0 2px 16px #64748b22', textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontWeight: 500, fontSize: '1em' }}>Total Requests</div>
            <div style={{ fontSize: '2.2em', fontWeight: 700, color: '#1e293b', marginTop: '0.5em' }}>{stats.total}</div>
          </div>
          <div className="glass" style={{ borderRadius: '1.2em', padding: '2em', boxShadow: '0 2px 16px #facc1533', textAlign: 'center', background: 'rgba(254, 243, 199, 0.7)' }}>
            <div style={{ color: '#f59e42', fontWeight: 500, fontSize: '1em' }}>Pending</div>
            <div style={{ fontSize: '2.2em', fontWeight: 700, color: '#b45309', marginTop: '0.5em' }}>{stats.pending}</div>
          </div>
          <div className="glass" style={{ borderRadius: '1.2em', padding: '2em', boxShadow: '0 2px 16px #60a5fa33', textAlign: 'center', background: 'rgba(219, 234, 254, 0.7)' }}>
            <div style={{ color: '#2563eb', fontWeight: 500, fontSize: '1em' }}>In Progress</div>
            <div style={{ fontSize: '2.2em', fontWeight: 700, color: '#1d4ed8', marginTop: '0.5em' }}>{stats.inProgress}</div>
          </div>
          <div className="glass" style={{ borderRadius: '1.2em', padding: '2em', boxShadow: '0 2px 16px #4ade8033', textAlign: 'center', background: 'rgba(220, 252, 231, 0.7)' }}>
            <div style={{ color: '#22c55e', fontWeight: 500, fontSize: '1em' }}>Resolved</div>
            <div style={{ fontSize: '2.2em', fontWeight: 700, color: '#15803d', marginTop: '0.5em' }}>{stats.resolved}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '2em', display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
          {(['all', 'pending', 'in-progress', 'resolved'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '0.7em 2em',
                borderRadius: '0.7em',
                fontWeight: 600,
                fontSize: '1em',
                border: filter === status ? 'none' : '1.5px solid #e5e7eb',
                background: filter === status ? '#dc2626' : '#fff',
                color: filter === status ? '#fff' : '#1e293b',
                boxShadow: filter === status ? '0 2px 8px #dc262622' : 'none',
                cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="glass" style={{ borderRadius: '1.2em', boxShadow: '0 4px 32px #64748b22', overflow: 'hidden', background: 'rgba(255,255,255,0.7)' }}>
          {filteredRequests.length === 0 ? (
            <div style={{ padding: '3em 1em', textAlign: 'center', color: '#64748b', fontSize: '1.2em' }}>
              <p>No requests found</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'rgba(243, 244, 246, 0.7)', borderBottom: '2px solid #e5e7eb' }}>
                  <tr>
                    <th style={{ padding: '1em', textAlign: 'left', fontSize: '1em', fontWeight: 700, color: '#334155' }}>Name</th>
                    <th style={{ padding: '1em', textAlign: 'left', fontSize: '1em', fontWeight: 700, color: '#334155' }}>Phone</th>
                    <th style={{ padding: '1em', textAlign: 'left', fontSize: '1em', fontWeight: 700, color: '#334155' }}>Type</th>
                    <th style={{ padding: '1em', textAlign: 'left', fontSize: '1em', fontWeight: 700, color: '#334155' }}>Status</th>
                    <th style={{ padding: '1em', textAlign: 'left', fontSize: '1em', fontWeight: 700, color: '#334155' }}>Description</th>
                    <th style={{ padding: '1em', textAlign: 'left', fontSize: '1em', fontWeight: 700, color: '#334155' }}>Date</th>
                    <th style={{ padding: '1em', textAlign: 'left', fontSize: '1em', fontWeight: 700, color: '#334155' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request, idx) => (
                    <tr
                      key={request._id}
                      style={{
                        borderBottom: '1.5px solid #e5e7eb',
                        background: idx % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(243,244,246,0.7)',
                        transition: 'background .2s',
                      }}
                    >
                      <td style={{ padding: '1em', fontWeight: 600, color: '#1e293b' }}>{request.name}</td>
                      <td style={{ padding: '1em', color: '#64748b' }}>{request.phone}</td>
                      <td style={{ padding: '1em' }}>
                        <span style={{ padding: '0.4em 1em', background: '#dbeafe', color: '#1e40af', borderRadius: '1em', fontSize: '0.98em', fontWeight: 600 }}>{request.type}</span>
                      </td>
                      <td style={{ padding: '1em' }}>
                        <span
                          style={{
                            padding: '0.4em 1em',
                            borderRadius: '1em',
                            fontSize: '0.98em',
                            fontWeight: 600,
                            background:
                              request.status === 'pending'
                                ? '#fef9c3'
                                : request.status === 'in-progress'
                                ? '#dbeafe'
                                : '#bbf7d0',
                            color:
                              request.status === 'pending'
                                ? '#b45309'
                                : request.status === 'in-progress'
                                ? '#1d4ed8'
                                : '#15803d',
                          }}
                        >
                          {request.status || 'pending'}
                        </span>
                      </td>
                      <td style={{ padding: '1em', color: '#64748b', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{request.description}</td>
                      <td style={{ padding: '1em', color: '#64748b', fontSize: '0.98em' }}>{new Date(request.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1em' }}>
                        {request.status !== 'resolved' && (
                          <button
                            onClick={() => handleResolve(request._id!)}
                            style={{ padding: '0.5em 1.2em', background: '#22c55e', color: '#fff', borderRadius: '0.7em', fontWeight: 600, fontSize: '0.98em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #22c55e22', transition: 'background .2s' }}
                          >
                            ✓ Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
