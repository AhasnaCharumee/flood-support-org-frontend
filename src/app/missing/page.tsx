'use client'

import { api } from '@/services/api'
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

export default function MissingList() {
  const [data, setData] = useState<MissingPerson[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'missing' | 'found'>('all')

  useEffect(() => {
    fetchMissing()
  }, [])

  const fetchMissing = async () => {
    try {
      const params: any = {}
      if (search) params.name = search
      
      const res = await api.get('/missing', { params })
      setData(res.data)
    } catch (error) {
      console.error('Error fetching missing persons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setLoading(true)
    fetchMissing()
  }

  const filteredData = filter === 'all'
    ? data
    : data.filter(p => p.status === filter)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f1f5f9 0%, #f3e8ff 100%)',
        padding: '2em 1em',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          className="glass"
          style={{
            padding: '2.5em 2em',
            borderRadius: '1.5em',
            marginBottom: '2em',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '2.2em',
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: '0.5em',
            }}
          >
            🔍 Find Missing Persons
          </h1>
          <p style={{ color: '#334155', marginBottom: '1.5em' }}>
            Help us locate those affected by the disaster
          </p>

          {/* Search and filter controls could go here if needed */}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3em 0' }}>
              <div style={{ fontSize: '2.5em', marginBottom: '1em', animation: 'spin 1s linear infinite' }}>⏳</div>
              <p style={{ color: '#64748b', fontSize: '1.1em' }}>Loading missing persons data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div
              style={{
                background: '#fff',
                borderRadius: '1em',
                boxShadow: '0 2px 12px #64748b22',
                padding: '3em 1em',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '1.2em',
                margin: '2em 0',
              }}
            >
              <p>No missing persons found</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2em',
                marginTop: '2em',
              }}
            >
              {filteredData.map(person => (
                <div
                  key={person._id}
                  style={{
                    borderRadius: '1em',
                    boxShadow: '0 4px 24px #64748b22',
                    overflow: 'hidden',
                    borderTop: `5px solid ${person.status === 'missing' ? '#ef4444' : '#22c55e'}`,
                    background: person.status === 'missing' ? 'rgba(254, 226, 226, 0.7)' : 'rgba(220, 252, 231, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Photo */}
                  {person.photoUrl ? (
                    <div
                      style={{
                        width: '100%',
                        height: '12em',
                        background: '#e5e7eb',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={person.photoUrl}
                        alt={person.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '12em',
                        background: '#cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontSize: '2.5em' }}>👤</span>
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ padding: '1.5em' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1em' }}>
                      <h3 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', margin: 0 }}>{person.name}</h3>
                      <span
                        style={{
                          padding: '0.4em 1em',
                          borderRadius: '1em',
                          fontSize: '0.95em',
                          fontWeight: 600,
                          background: person.status === 'missing' ? '#fecaca' : '#bbf7d0',
                          color: person.status === 'missing' ? '#b91c1c' : '#166534',
                        }}
                      >
                        {person.status === 'missing' ? '🔴 Missing' : '✅ Found'}
                      </span>
                    </div>

                    {person.age && (
                      <p style={{ color: '#334155', marginBottom: '0.5em' }}>
                        <span style={{ fontWeight: 500 }}>Age:</span> {person.age}
                      </p>
                    )}

                    <p style={{ color: '#334155', marginBottom: '0.5em' }}>
                      <span style={{ fontWeight: 500 }}>Last Seen:</span> {person.lastSeen}
                    </p>

                    <p style={{ color: '#334155', marginBottom: '1em' }}>
                      <span style={{ fontWeight: 500 }}>Description:</span> {person.description}
                    </p>

                    <div
                      style={{
                        background: '#fff',
                        borderRadius: '0.7em',
                        padding: '0.8em 1em',
                        marginBottom: '1em',
                        boxShadow: '0 1px 4px #64748b11',
                      }}
                    >
                      <p style={{ fontSize: '0.98em', color: '#64748b', margin: 0 }}>
                        <span style={{ fontWeight: 500 }}>📞 Contact:</span> {person.contact}
                      </p>
                    </div>

                    <p style={{ fontSize: '0.9em', color: '#64748b', margin: 0 }}>
                      Reported on {new Date(person.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
