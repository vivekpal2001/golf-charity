import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: '#060a12',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '4rem 2rem 2rem',
      color: '#94a3b8',
      fontFamily: 'var(--font-family)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }} className="footer-grid">
        {/* Brand */}
        <div>
          <Link to="/" style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', display: 'block', marginBottom: '1rem' }}>GolfCharity</Link>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>Play Golf. Win Prizes. Change Lives. Turning every round into a story of impact.</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {['𝕏', 'in', 'ig'].map((s, i) => (
              <a key={i} href="#" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.target.style.background = '#ff6b35'; e.target.style.color = '#fff'; }}
                onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.color = '#94a3b8'; }}
              >{s}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#ff6b35', fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Platform</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'How It Works', path: '/how-it-works' },
              { label: 'Prizes', path: '/prizes' },
              { label: 'Charities', path: '/charities' },
              { label: 'Winners', path: '/winners' },
            ].map(l => (
              <Link key={l.path} to={l.path} style={{ color: '#94a3b8', fontSize: '0.875rem', transition: 'color 0.3s ease' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ color: '#ff6b35', fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/about' },
              { label: 'Privacy Policy', path: '#' },
              { label: 'Terms of Service', path: '#' },
            ].map(l => (
              <Link key={l.label} to={l.path} style={{ color: '#94a3b8', fontSize: '0.875rem', transition: 'color 0.3s ease' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ color: '#ff6b35', fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Stay Updated</h4>
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.7 }}>Get monthly impact reports and draw results.</p>
          <form style={{ display: 'flex', gap: '0.5rem' }} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email" style={{ flex: 1, padding: '0.625rem 1rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '0.875rem', outline: 'none' }} />
            <button type="submit" style={{ background: '#ff6b35', color: '#fff', padding: '0.625rem 1.25rem', borderRadius: '9999px', border: 'none', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>Join</button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ maxWidth: '1280px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '0.75rem' }}>© 2026 GolfCharity — Play With Purpose. All rights reserved.</span>
        <span style={{ fontSize: '0.75rem' }}>Made with ❤️ for golf & giving</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
