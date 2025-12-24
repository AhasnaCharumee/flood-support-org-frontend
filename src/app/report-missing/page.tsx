'use client'

import { api } from '@/services/api'
import { useState } from 'react'

export default function ReportMissing() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    lastSeen: '',
    description: '',
    contact: '',
    photoUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/missing', formData)
      setSubmitted(true)
      setFormData({
        name: '',
        age: '',
        lastSeen: '',
        description: '',
        contact: '',
        photoUrl: '',
      })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Error reporting missing person:', error)
      alert('Failed to submit report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fce7f3 60%, #f3e8ff 100%)',
        padding: '2em 1em',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div
          className="glass"
          style={{
            padding: '2.5em 2em',
            borderRadius: '1.5em',
            boxShadow: '0 4px 32px #ef444422',
            marginBottom: '2em',
          }}
        >
          <h1
            style={{
              fontSize: '2.2em',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: '0.5em',
              color: '#b91c1c',
              letterSpacing: '-1px',
            }}
          >
            Report Missing Person
          </h1>
          <p style={{ textAlign: 'center', color: '#7f1d1d', marginBottom: '2em' }}>
            Help us find your loved ones. Provide as much detail as possible.
          </p>

          {submitted && (
            <div
              style={{
                background: '#dcfce7',
                border: '1px solid #4ade80',
                color: '#166534',
                padding: '0.8em 1em',
                borderRadius: '0.7em',
                marginBottom: '1.2em',
                textAlign: 'center',
              }}
            >
              ✅ Missing person report submitted successfully! Authorities will be notified.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5em' }}>
              <div>
                <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Missing person's name"
                  required
                  style={{
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.7em',
                    padding: '0.9em 1em',
                    fontSize: '1em',
                    marginBottom: 0,
                  }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  style={{
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.7em',
                    padding: '0.9em 1em',
                    fontSize: '1em',
                    marginBottom: 0,
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Last Seen Location <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="lastSeen"
                value={formData.lastSeen}
                onChange={handleChange}
                placeholder="Where were they last seen? (e.g., area, landmark)"
                required
                style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.7em',
                  padding: '0.9em 1em',
                  fontSize: '1em',
                  marginBottom: 0,
                }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Description <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Physical description - height, build, clothing, distinctive marks, etc."
                required
                rows={4}
                style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.7em',
                  padding: '0.9em 1em',
                  fontSize: '1em',
                  marginBottom: 0,
                  resize: 'vertical',
                }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Contact Number <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+94..."
                required
                style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.7em',
                  padding: '0.9em 1em',
                  fontSize: '1em',
                  marginBottom: 0,
                }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Photo URL
              </label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.7em',
                  padding: '0.9em 1em',
                  fontSize: '1em',
                  marginBottom: 0,
                }}
              />
              <p style={{ fontSize: '0.95em', color: '#64748b', marginTop: '0.5em' }}>
                Upload photo to an image service first, then paste the URL here
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#d1d5db' : '#dc2626',
                color: '#fff',
                fontWeight: 600,
                padding: '1em',
                borderRadius: '0.7em',
                fontSize: '1.1em',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                marginTop: '0.5em',
              }}
            >
              {loading ? 'Submitting...' : '🚨 Submit Missing Person Report'}
            </button>
          </form>

          <div
            style={{
              marginTop: '2.5em',
              background: '#f0f9ff',
              borderRadius: '1em',
              padding: '1.5em',
              border: '1px solid #bae6fd',
            }}
          >
            <p style={{ color: '#0c4a6e', fontWeight: 600, marginBottom: '0.7em' }}>
              ℹ️ What happens next?
            </p>
            <ul style={{ color: '#0369a1', fontSize: '1em', paddingLeft: '1.2em', margin: 0 }}>
              <li style={{ marginBottom: '0.5em' }}>✓ Your report will be added to the public missing persons database</li>
              <li style={{ marginBottom: '0.5em' }}>✓ Authorities will be notified immediately</li>
              <li style={{ marginBottom: '0.5em' }}>✓ Other users can search and view the report</li>
              <li>✓ You can verify when the person is found</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
