'use client'

import { api } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      if (isRegister) {
        if (!name) {
          setError('Please enter your name')
          return
        }
        await api.post('/auth/register', { name, email, password })
        setError('')
        alert('✅ Registration successful! Now login with your credentials.')
        setIsRegister(false)
        setName('')
        setEmail('')
        setPassword('')
      } else {
        const res = await api.post('/auth/login', { email, password })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role)
        alert('✅ Login successful!')
        
        // Redirect based on role
        if (res.data.role === 'admin') {
          router.push('/admin/help-requests')
        } else {
          router.push('/request-help')
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuth()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0ecff 0%, #f8fafc 60%, #e0e7ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2em 1em' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div className="glass" style={{ padding: '2.5em 2em', borderRadius: '1.5em', boxShadow: '0 4px 32px #2563eb22', backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.35)' }}>
          <h1 style={{ fontSize: '2.1em', fontWeight: 800, textAlign: 'center', marginBottom: '0.5em', color: '#1e293b', letterSpacing: '-1px' }}>
            {isRegister ? 'Sign Up' : 'Login'}
          </h1>
          <p style={{ textAlign: 'center', color: '#334155', marginBottom: '2em' }}>
            {isRegister ? 'Create your account to get help' : 'Login to your account'}
          </p>

          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#b91c1c', padding: '0.8em 1em', borderRadius: '0.7em', marginBottom: '1.2em', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2em' }}>
            {isRegister && (
              <div>
                <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.7em', padding: '0.9em 1em', fontSize: '1em', marginBottom: 0 }}
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            )}

            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block', fontSize: '1em' }}>
                Email
              </label>
              <input
                type="email"
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.7em', padding: '0.9em 1em', fontSize: '1em', marginBottom: 0 }}
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5em', display: 'block', fontSize: '1em' }}>
                Password
              </label>
              <input
                type="password"
                style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '0.7em', padding: '0.9em 1em', fontSize: '1em', marginBottom: 0 }}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              style={{ width: '100%', background: '#2563eb', color: '#fff', fontWeight: 600, padding: '1em 0', borderRadius: '0.7em', fontSize: '1.1em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'background .2s', marginTop: '1.2em' }}
            >
              {loading ? 'Loading...' : isRegister ? 'Sign Up' : 'Login'}
            </button>
          </div>

          <div style={{ marginTop: '2em', paddingTop: '2em', borderTop: '1.5px solid #e5e7eb' }}>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1em' }}>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsRegister(!isRegister)
                  setError('')
                  setEmail('')
                  setPassword('')
                  setName('')
                }}
                style={{ color: '#2563eb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', marginLeft: '0.5em', fontSize: '1em', textDecoration: 'underline' }}
              >
                {isRegister ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* <div style={{ marginTop: '2em', padding: '1.2em', background: 'rgba(59,130,246,0.07)', borderRadius: '1em' }}>
            <p style={{ fontSize: '0.98em', color: '#64748b', textAlign: 'center' }}>
              <strong>Demo Accounts:</strong>
              <br />
              User: user@test.com / password123
              <br />
              Admin: admin@test.com / password123
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
