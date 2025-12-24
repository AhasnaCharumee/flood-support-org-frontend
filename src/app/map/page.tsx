'use client'

import { useEffect, useState } from 'react'
import FloodShelterMap from '@/components/FloodShelterMap'

export default function MapPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineNotice, setShowOfflineNotice] = useState(false)

  useEffect(() => {
    function updateOnlineStatus() {
      const online = navigator.onLine
      setIsOnline(online)
      if (!online) {
        setShowOfflineNotice(true)
      } else if (showOfflineNotice) {
        setTimeout(() => setShowOfflineNotice(false), 3000)
      }
    }
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    updateOnlineStatus()
    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [showOfflineNotice])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0ecff 0%, #f8fafc 60%, #d1fae5 100%)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(90deg, #2563eb 0%, #14b8a6 100%)', color: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderBottomLeftRadius: '2em', borderBottomRightRadius: '2em', position: 'relative', zIndex: 2 }}>
        <div className="container flex glass-dark" style={{ padding: '2em 0', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '2em', marginBottom: '2em' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5em', textShadow: '0 2px 8px #0002' }}>🗺️ Flood & Shelter Map</h1>
            <p style={{ color: '#dbeafe', fontSize: '1.2rem', margin: 0 }}>Real-time flood zones and emergency shelters</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5em', marginTop: '1em' }}>
            <span className="glass" style={{ padding: '0.5em 1.2em', borderRadius: '0.7em', fontWeight: 600, border: '1px solid #fff3', fontSize: '0.95em', color: '#fff' }}>Live Data</span>
            <span className="glass" style={{ padding: '0.5em 1.2em', borderRadius: '0.7em', fontWeight: 600, border: '1px solid #fff3', fontSize: '0.95em', color: '#fff' }}>Auto-refresh</span>
          </div>
        </div>
      </div>

      {/* Offline Notice */}
      {!isOnline && (
        <div style={{ background: '#fef9c3', borderBottom: '2px solid #fde047', padding: '1em 0' }}>
          <div className="container flex" style={{ alignItems: 'center', gap: '1em' }}>
            <span style={{ fontSize: '2em' }}>⚠️</span>
            <div>
              <p style={{ fontWeight: 700, color: '#92400e', margin: 0 }}>You are currently offline</p>
              <p style={{ color: '#b45309', fontSize: '0.95em', margin: 0 }}>Map data may be unavailable or outdated. Please check your internet connection.</p>
            </div>
          </div>
        </div>
      )}

      {/* Back Online Notice */}
      {isOnline && showOfflineNotice && (
        <div style={{ background: '#dcfce7', borderBottom: '2px solid #4ade80', padding: '1em 0' }}>
          <div className="container flex" style={{ alignItems: 'center', gap: '1em' }}>
            <span style={{ fontSize: '2em' }}>✅</span>
            <p style={{ fontWeight: 700, color: '#166534', margin: 0 }}>Back online! Map data is now available.</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="container glass" style={{ height: '60vh', marginTop: '2em', borderRadius: '1.5em', boxShadow: '0 4px 24px #0002', overflow: 'hidden', background: 'rgba(255,255,255,0.18)' }}>
        {!isOnline ? (
          <div className="flex text-center" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2em' }}>
            <div style={{ fontSize: '3em', marginBottom: '1em' }}>📡</div>
            <h2 style={{ fontSize: '1.5em', fontWeight: 700, color: '#222', marginBottom: '0.5em' }}>No Internet Connection</h2>
            <p style={{ color: '#555', maxWidth: 400, marginBottom: '1.5em' }}>The map requires an active internet connection to display flood zones and shelters. Please check your connection and try again.</p>
            <button className="button" onClick={() => window.location.reload()}>Retry Connection</button>
          </div>
        ) : (
          <FloodShelterMap />
        )}
      </div>

      {/* Quick Info Section */}
      <div className="container grid glass" style={{ margin: '2em auto', gridTemplateColumns: '1fr 1fr 1fr', gap: '2em', background: 'rgba(255,255,255,0.35)', border: '1px solid #e5e7eb', borderRadius: '1em', boxShadow: '0 2px 8px #0002', padding: '2em 1em' }}>
        <div className="flex" style={{ alignItems: 'flex-start', gap: '1em' }}>
          <span style={{ fontSize: '2em' }}>🔴</span>
          <div>
            <p style={{ fontWeight: 700, color: '#b91c1c', margin: 0 }}>High Risk Areas</p>
            <p style={{ color: '#444', margin: 0 }}>Immediate evacuation recommended</p>
          </div>
        </div>
        <div className="flex" style={{ alignItems: 'flex-start', gap: '1em' }}>
          <span style={{ fontSize: '2em' }}>🟡</span>
          <div>
            <p style={{ fontWeight: 700, color: '#b45309', margin: 0 }}>Moderate Risk</p>
            <p style={{ color: '#444', margin: 0 }}>Stay alert and monitor updates</p>
          </div>
        </div>
        <div className="flex" style={{ alignItems: 'flex-start', gap: '1em' }}>
          <span style={{ fontSize: '2em' }}>🟢</span>
          <div>
            <p style={{ fontWeight: 700, color: '#15803d', margin: 0 }}>Emergency Shelters</p>
            <p style={{ color: '#444', margin: 0 }}>Safe zones with facilities</p>
          </div>
        </div>
      </div>
    </div>
  )
}
