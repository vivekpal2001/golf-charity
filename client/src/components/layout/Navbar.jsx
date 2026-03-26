import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Charities', path: '/charities' },
  { label: 'Prizes', path: '/prizes' },
  { label: 'Winners', path: '/winners' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="glass-nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', maxWidth: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Brand */}
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff' }}>
        GolfCharity
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-desktop-links">
        {navLinks.map(link => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontWeight: 700, letterSpacing: '-0.01em', fontSize: '0.875rem',
                color: isActive ? '#ff6b35' : '#cbd5e1',
                borderBottom: isActive ? '2px solid #ff6b35' : '2px solid transparent',
                paddingBottom: '0.25rem',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => { if (!isActive) e.target.style.color = '#ff6b35'; }}
              onMouseLeave={e => { if (!isActive) e.target.style.color = '#cbd5e1'; }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Auth Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <Link
              to="/dashboard"
              style={{
                fontWeight: 700, fontSize: '0.875rem', color: '#ffb59d',
                transition: 'transform 0.3s ease',
              }}
            >
              Dashboard
            </Link>
            <button
              onClick={signOut}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: '0.875rem', color: '#cbd5e1',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                fontWeight: 700, fontSize: '0.875rem', color: '#cbd5e1',
                transition: 'transform 0.3s ease',
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                background: '#ff6b35', color: '#fff',
                padding: '0.5rem 1.5rem', borderRadius: '9999px',
                fontWeight: 700, fontSize: '0.875rem',
                boxShadow: '0 4px 12px rgba(255,107,53,0.3)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >
              Subscribe
            </Link>
          </>
        )}

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            color: '#fff', fontSize: '1.5rem',
          }}
          className="nav-mobile-toggle"
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#0f172a',
            padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
            boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                fontWeight: 700, fontSize: '1rem',
                color: location.pathname === link.path ? '#ff6b35' : '#cbd5e1',
                padding: '0.5rem 0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
