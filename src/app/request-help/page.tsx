'use client'

import { helpApi } from '@/services/api'
import { useState } from 'react'
import GoogleMapComponent from '@/components/GoogleMapComponent'

export default function RequestHelp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Food',
    description: '',
    location: { lat: 6.9, lng: 79.9 },
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
      await helpApi.create(formData)
      setSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        type: 'Food',
        description: '',
        location: { lat: 6.9, lng: 79.9 },
      })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0ecff 0%, #f8fafc 60%, #e0e7ff 100%)', padding: '2em 1em' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="glass" style={{ padding: '2.5em 2em', borderRadius: '1.5em', boxShadow: '0 4px 32px #2563eb22', marginBottom: '2em' }}>
          <h1 style={{ fontSize: '2.2em', fontWeight: 800, textAlign: 'center', marginBottom: '0.5em', color: '#1e293b', letterSpacing: '-1px' }}>Request Help</h1>
          <p style={{ textAlign: 'center', color: '#334155', marginBottom: '2em' }}>
            Tell us how we can help you. Our team will respond as soon as possible.
          </p>

          {submitted && (
            <div style={{ background: '#dcfce7', border: '1px solid #4ade80', color: '#166534', padding: '0.8em 1em', borderRadius: '0.7em', marginBottom: '1.2em', textAlign: 'center' }}>
              ✅ Request submitted successfully! We'll contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.7em', padding: '0.9em 1em', fontSize: '1em', marginBottom: 0 }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94..."
                required
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.7em', padding: '0.9em 1em', fontSize: '1em', marginBottom: 0 }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Type of Help Needed
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.7em', padding: '0.9em 1em', fontSize: '1em', marginBottom: 0 }}
              >
                <option>Food</option>
                <option>Water</option>
                <option>Medicine</option>
                <option>Rescue</option>
                <option>Shelter</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your situation in detail..."
                required
                rows={4}
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.7em', padding: '0.9em 1em', fontSize: '1em', marginBottom: 0 }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                Location (Click on the map to select)
              </label>
              <GoogleMapComponent
                zoom={12}
                center={formData.location}
                location={formData.location}
                height="300px"
                onLocationSelect={(coords) => setFormData(prev => ({ ...prev, location: coords }))}
              />
              <p style={{ color: '#64748b', fontSize: '0.95em', marginTop: '0.7em' }}>
                Selected location: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: '#2563eb', color: '#fff', fontWeight: 600, padding: '1em 0', borderRadius: '0.7em', fontSize: '1.1em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'background .2s' }}
            >
              {loading ? 'Submitting...' : 'Submit Help Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
