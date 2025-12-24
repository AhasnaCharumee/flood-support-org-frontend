'use client'

import { helpApi, HelpRequest } from '@/services/api'
import { isAdmin, logout } from '@/utils/adminGuard'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminHelp() {
  const router = useRouter()
  const [data, setData] = useState<HelpRequest[]>([])
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
      const res = await helpApi.getAll()
      setData(res.data)
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await helpApi.updateStatus(id, newStatus)
      setData(data.map(item => 
        item._id === id ? { ...item, status: newStatus as 'pending' | 'in-progress' | 'resolved' } : item
      ))
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const filteredData = filter === 'all' 
    ? data 
    : data.filter(item => item.status === filter)

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0ecff 0%, #f3e8ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', fontSize: '1.3em', color: '#64748b' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0ecff 0%, #f3e8ff 100%)' }}>
      {/* Header with Logout */}
      <div style={{ background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 100%)', color: '#fff', boxShadow: '0 4px 24px #2563eb22' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2em 1em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2em', fontWeight: 800, margin: 0 }}>Help Requests Management</h1>
          <button
            onClick={handleLogout}
            style={{ background: '#fff', color: '#2563eb', fontWeight: 600, padding: '0.7em 2em', borderRadius: '0.7em', fontSize: '1em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #fff2' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5em 1em' }}>
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
                background: filter === status ? '#2563eb' : '#fff',
                color: filter === status ? '#fff' : '#1e293b',
                boxShadow: filter === status ? '0 2px 8px #2563eb22' : 'none',
                cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '2em' }}>
          {filteredData.length === 0 ? (
            <div className="glass" style={{ padding: '3em 1em', borderRadius: '1.2em', boxShadow: '0 2px 16px #64748b22', textAlign: 'center', color: '#64748b', fontSize: '1.2em', background: 'rgba(255,255,255,0.7)' }}>
              No help requests found
            </div>
          ) : (
            filteredData.map(request => (
              <div
                key={request._id}
                className="glass"
                style={{
                  borderRadius: '1.2em',
                  boxShadow: '0 2px 16px #2563eb22',
                  padding: '2em',
                  borderLeft: '6px solid #2563eb',
                  background: 'rgba(255,255,255,0.8)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2em', flexWrap: 'wrap', gap: '1em' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2em', fontWeight: 700, color: '#1e293b', margin: 0 }}>{request.name}</h3>
                    <p style={{ color: '#64748b', margin: 0 }}>📞 {request.phone}</p>
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.4em 1em',
                      borderRadius: '1em',
                      fontSize: '0.98em',
                      fontWeight: 600,
                      background:
                        request.status === 'pending'
                          ? '#fef9c3'
                          : request.status === 'in-progress'
                          ? '#dbeafe'
                          : request.status === 'resolved'
                          ? '#bbf7d0'
                          : '#f1f5f9',
                      color:
                        request.status === 'pending'
                          ? '#b45309'
                          : request.status === 'in-progress'
                          ? '#1d4ed8'
                          : request.status === 'resolved'
                          ? '#15803d'
                          : '#64748b',
                    }}>{request.status || 'pending'}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.2em' }}>
                  <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '0.3em', fontSize: '1em' }}>Type: <span style={{ fontWeight: 400 }}>{request.type}</span></p>
                  <p style={{ color: '#1e293b', fontSize: '1.05em', marginBottom: 0 }}>{request.description}</p>
                  <p style={{ color: '#64748b', fontSize: '0.98em', marginTop: '0.5em' }}>📍 {request.location.lat.toFixed(4)}, {request.location.lng.toFixed(4)}</p>
                </div>

                <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
                  {(request.status || 'pending') !== 'in-progress' && (
                    <button
                      onClick={() => updateStatus(request._id!, 'in-progress')}
                      style={{ padding: '0.5em 1.2em', background: '#2563eb', color: '#fff', borderRadius: '0.7em', fontWeight: 600, fontSize: '0.98em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #2563eb22', transition: 'background .2s' }}
                    >
                      Start
                    </button>
                  )}
                  {(request.status || 'pending') !== 'resolved' && (
                    <button
                      onClick={() => updateStatus(request._id!, 'resolved')}
                      style={{ padding: '0.5em 1.2em', background: '#22c55e', color: '#fff', borderRadius: '0.7em', fontWeight: 600, fontSize: '0.98em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #22c55e22', transition: 'background .2s' }}
                    >
                      Resolve
                    </button>
                  )}
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.95em', marginTop: '1.2em' }}>
                  Created: {new Date(request.createdAt!).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
        {/* Back to Dashboard Button */}
        <div style={{ marginTop: '2.5em', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/admin/dashboard')}
            style={{ background: '#2563eb', color: '#fff', fontWeight: 600, padding: '0.9em 2.2em', borderRadius: '0.7em', fontSize: '1em', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #2563eb22', transition: 'background .2s' }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
