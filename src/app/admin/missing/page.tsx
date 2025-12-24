'use client'

import { api } from '@/services/api'
import { isAdmin, logout } from '@/utils/adminGuard'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface MissingPerson {
  _id: string
  name: string
  age?: number
  lastSeen: string
  description: string
  contact: string
  photoUrl?: string
  status: 'missing' | 'found'
  createdAt: string
}

export default function AdminMissing() {
  const router = useRouter()
  const [data, setData] = useState<MissingPerson[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'missing' | 'found'>('all')

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/admin/login')
      return
    }

    fetchMissing()
  }, [])

  const fetchMissing = async () => {
    try {
      const res = await api.get('/missing')
      setData(res.data)
    } catch (error) {
      console.error('Error fetching missing persons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  const markFound = async (id: string) => {
    if (!confirm('Mark this person as found?')) return

    try {
      await api.put(`/missing/${id}/found`)
      setData(data.map(p => (p._id === id ? { ...p, status: 'found' } : p)))
    } catch (error) {
      console.error('Error marking as found:', error)
      alert('Failed to update status')
    }
  }

  const filteredData = filter === 'all'
    ? data
    : data.filter(p => p.status === filter)

  const stats = {
    total: data.length,
    missing: data.filter(p => p.status === 'missing').length,
    found: data.filter(p => p.status === 'found').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading missing persons...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">🧍‍♂️ Missing Persons Management</h1>
            <p className="text-purple-100 mt-1">Track and update missing person reports</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-lg hover:bg-purple-50 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Reports</div>
            <div className="text-4xl font-bold text-gray-800 mt-2">{stats.total}</div>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-6">
            <div className="text-red-600 text-sm font-medium">Still Missing</div>
            <div className="text-4xl font-bold text-red-700 mt-2">{stats.missing}</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-6">
            <div className="text-green-600 text-sm font-medium">Found</div>
            <div className="text-4xl font-bold text-green-700 mt-2">{stats.found}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {(['all', 'missing', 'found'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All Reports' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No missing persons in this category</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Seen</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Reported</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((person, idx) => (
                    <tr
                      key={person._id}
                      className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">{person.name}</td>
                      <td className="px-6 py-4 text-gray-600">{person.age || '-'}</td>
                      <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{person.lastSeen}</td>
                      <td className="px-6 py-4 text-gray-600">{person.contact}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            person.status === 'missing'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {person.status === 'missing' ? '🔴 Missing' : '✅ Found'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(person.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {person.status !== 'found' && (
                          <button
                            onClick={() => markFound(person._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                          >
                            Mark Found
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

        {/* Description View */}
        {filteredData.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Detailed Descriptions</h2>
            <div className="grid gap-4">
              {filteredData.map(person => (
                <div
                  key={person._id}
                  className={`rounded-lg border-l-4 p-6 ${
                    person.status === 'missing'
                      ? 'bg-red-50 border-red-500'
                      : 'bg-green-50 border-green-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{person.name}</h3>
                    <span className="text-sm text-gray-600">{person.status}</span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Description:</span> {person.description}
                  </p>
                  {person.photoUrl && (
                    <p className="text-gray-700">
                      <span className="font-medium">Photo:</span>{' '}
                      <a
                        href={person.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Photo
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
