import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0ecff 0%, #f8fafc 60%, #e0e7ff 100%)' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 100%)', color: '#fff', position: 'relative', zIndex: 2 }}>
        <div className="container glass-dark" style={{ padding: '4em 1em 3em 1em', textAlign: 'center', marginTop: '2em', marginBottom: '2em' }}>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, marginBottom: '0.7em', letterSpacing: '-1px', textShadow: '0 2px 8px #0002' }}>🌊 FloodSupport</h1>
          <p style={{ fontSize: '1.5rem', color: '#dbeafe', maxWidth: 700, margin: '0 auto' }}>
            Emergency Relief & Management System for Flood Disasters
          </p>
          <p style={{ color: '#c7d2fe', marginTop: '1em', fontSize: '1.1em' }}>
            Real-time help requests, missing persons tracking, and emergency shelter locations
          </p>
        </div>
      </div>

      {/* Main Features */}
      <div className="container" style={{ margin: '0 auto', padding: '4em 1em' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, textAlign: 'center', color: '#1e293b', marginBottom: '2.5em' }}>
          How Can We Help You?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2em' }}>
          {/* Request Help */}
          <Link href="/request-help">
            <div className="glass" style={{ cursor: 'pointer', borderTop: '4px solid #2563eb', padding: '2.5em 2em', transition: 'box-shadow .2s, transform .2s', boxShadow: '0 2px 16px #2563eb22', borderRadius: '1.2em', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5em', marginBottom: '0.7em' }}>🆘</div>
              <h3 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '0.5em' }}>Request Help</h3>
              <p style={{ color: '#334155' }}>
                Need immediate assistance? Submit a help request for food, water, medicine, or rescue.
              </p>
            </div>
          </Link>
          {/* Report Missing Person */}
          <Link href="/report-missing">
            <div className="glass" style={{ cursor: 'pointer', borderTop: '4px solid #ef4444', padding: '2.5em 2em', transition: 'box-shadow .2s, transform .2s', boxShadow: '0 2px 16px #ef444422', borderRadius: '1.2em', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5em', marginBottom: '0.7em' }}>🚨</div>
              <h3 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '0.5em' }}>Report Missing</h3>
              <p style={{ color: '#334155' }}>
                Report a missing person and help us locate those affected by the disaster.
              </p>
            </div>
          </Link>
          {/* Find Missing Persons */}
          <Link href="/missing">
            <div className="glass" style={{ cursor: 'pointer', borderTop: '4px solid #a21caf', padding: '2.5em 2em', transition: 'box-shadow .2s, transform .2s', boxShadow: '0 2px 16px #a21caf22', borderRadius: '1.2em', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5em', marginBottom: '0.7em' }}>🔍</div>
              <h3 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '0.5em' }}>Find Missing</h3>
              <p style={{ color: '#334155' }}>
                Search our database of missing persons and help reunite families.
              </p>
            </div>
          </Link>
          {/* Flood & Shelter Map */}
          <Link href="/map">
            <div className="glass" style={{ cursor: 'pointer', borderTop: '4px solid #22c55e', padding: '2.5em 2em', transition: 'box-shadow .2s, transform .2s', boxShadow: '0 2px 16px #22c55e22', borderRadius: '1.2em', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5em', marginBottom: '0.7em' }}>🗺️</div>
              <h3 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '0.5em' }}>Live Map</h3>
              <p style={{ color: '#334155' }}>
                View real-time flood zones and emergency shelter locations on an interactive map.
              </p>
            </div>
          </Link>
          {/* User Login */}
          <Link href="/login">
            <div className="glass" style={{ cursor: 'pointer', borderTop: '4px solid #6366f1', padding: '2.5em 2em', transition: 'box-shadow .2s, transform .2s', boxShadow: '0 2px 16px #6366f122', borderRadius: '1.2em', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5em', marginBottom: '0.7em' }}>👤</div>
              <h3 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '0.5em' }}>Login</h3>
              <p style={{ color: '#334155' }}>
                Access your account to track your requests and manage your profile.
              </p>
            </div>
          </Link>
          {/* Admin Access */}
          {/* <Link href="/admin/login">
            <div className="glass" style={{ cursor: 'pointer', borderTop: '4px solid #f59e42', padding: '2.5em 2em', transition: 'box-shadow .2s, transform .2s', boxShadow: '0 2px 16px #f59e4222', borderRadius: '1.2em', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5em', marginBottom: '0.7em' }}>⚡</div>
              <h3 style={{ fontSize: '1.5em', fontWeight: 700, color: '#1e293b', marginBottom: '0.5em' }}>Admin Panel</h3>
              <p style={{ color: '#334155' }}>
                Authorized personnel can manage requests, track operations, and view analytics.
              </p>
            </div>
          </Link> */}
        </div>
      </div>

      {/* Emergency Info */}
      <div style={{ background: 'rgba(254,242,242,0.7)', borderTop: '2px solid #fecaca', padding: '4em 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2em' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#b91c1c', marginBottom: '0.7em' }}>⚠️ Emergency Information</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2em' }}>
            <div className="glass" style={{ padding: '2em', textAlign: 'center' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1em', color: '#1e293b', marginBottom: '0.5em' }}>Emergency Hotline</h3>
              <p style={{ fontSize: '2em', fontWeight: 700, color: '#ef4444', margin: 0 }}>119</p>
              <p style={{ color: '#334155', fontSize: '0.95em', marginTop: '0.7em' }}>Available 24/7</p>
            </div>
            <div className="glass" style={{ padding: '2em', textAlign: 'center' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1em', color: '#1e293b', marginBottom: '0.5em' }}>Disaster Management</h3>
              <p style={{ fontSize: '2em', fontWeight: 700, color: '#ef4444', margin: 0 }}>117</p>
              <p style={{ color: '#334155', fontSize: '0.95em', marginTop: '0.7em' }}>National center</p>
            </div>
            <div className="glass" style={{ padding: '2em', textAlign: 'center' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1em', color: '#1e293b', marginBottom: '0.5em' }}>Police Emergency</h3>
              <p style={{ fontSize: '2em', fontWeight: 700, color: '#ef4444', margin: 0 }}>118</p>
              <p style={{ color: '#334155', fontSize: '0.95em', marginTop: '0.7em' }}>For urgent assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container" style={{ margin: '0 auto', padding: '4em 1em' }}>
        <div className="glass-dark" style={{ borderRadius: '2em', padding: '3em 1em', textAlign: 'center', color: '#fff', background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 100%)' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '2em' }}>System Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2em' }}>
            <div>
              <div style={{ fontSize: '2em', fontWeight: 700, marginBottom: '0.5em' }}>Real-time</div>
              <p style={{ color: '#dbeafe' }}>Help Requests</p>
            </div>
            <div>
              <div style={{ fontSize: '2em', fontWeight: 700, marginBottom: '0.5em' }}>Live</div>
              <p style={{ color: '#dbeafe' }}>Missing Persons DB</p>
            </div>
            <div>
              <div style={{ fontSize: '2em', fontWeight: 700, marginBottom: '0.5em' }}>Interactive</div>
              <p style={{ color: '#dbeafe' }}>Flood Maps</p>
            </div>
            <div>
              <div style={{ fontSize: '2em', fontWeight: 700, marginBottom: '0.5em' }}>24/7</div>
              <p style={{ color: '#dbeafe' }}>Support System</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#1e293b', color: '#fff', padding: '3em 0', marginTop: '3em' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: '#cbd5e1', fontSize: '1.1em', margin: 0 }}>
            © 2025 FloodSupport. Emergency Relief Management System.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.95em', marginTop: '1em' }}>
            Built for disaster relief and community safety
          </p>
        </div>
      </footer>
    </div>
  );
}
