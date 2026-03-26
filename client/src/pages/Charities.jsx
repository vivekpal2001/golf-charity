import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-on-scroll');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const CARD = { background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.06)' };

export default function Charities() {
  useReveal();

  const partners = [
    { name: 'Red Cross India', focus: 'Emergency Medical Aid', joined: 'Since 2024', logo: '🏥', color: '#ef4444' },
    { name: 'Akshaya Patra', focus: 'Mid-Day Meals for Children', joined: 'Since 2024', logo: '🍽️', color: '#f59e0b' },
    { name: 'Wildlife SOS', focus: 'Animal Rescue & Rehab', joined: 'Since 2024', logo: '🦁', color: '#4ade80' },
    { name: 'CRY', focus: "Children's Rights & Education", joined: 'Since 2024', logo: '📚', color: '#8badd4' },
    { name: 'Smile Foundation', focus: 'Healthcare & Education', joined: 'Since 2024', logo: '😊', color: '#ff6b35' },
    { name: 'Give India', focus: 'Multi-cause Philanthropy', joined: 'Since 2024', logo: '🤲', color: '#a78bfa' },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem', background: 'var(--surface)', color: 'var(--on-surface)' }}>

        {/* Hero */}
        <section style={{ padding: '6rem 2rem 4rem' }}>
          <div className="editorial-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ gridColumn: 'span 7' }} className="charity-hero-text">
              <span className="animate-fade-up eyebrow" style={{ animationDelay: '0.1s', marginBottom: '1rem', display: 'inline-block' }}>Our Partners</span>
              <h1 className="animate-fade-up" style={{ animationDelay: '0.2s', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                Impact Beyond <br />the <span style={{ color: '#4ade80' }}>Fairway.</span>
              </h1>
              <p className="animate-fade-up" style={{ animationDelay: '0.3s', fontSize: '1.125rem', color: '#94a3b8', maxWidth: '32rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Every subscriber is a philanthropist. We partner exclusively with verified, high-impact organizations to ensure your generosity reaches those who need it most.
              </p>
              <div className="animate-fade-up" style={{ animationDelay: '0.4s', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { val: '₹5,00,000+', lab: 'Total Donated' },
                  { val: '15+', lab: 'Partner NGOs' },
                  { val: '100%', lab: 'Verified Impact' },
                ].map(s => (
                  <div key={s.lab}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ff6b35' }}>{s.val}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{s.lab}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ gridColumn: 'span 5' }} className="charity-hero-img">
              <div className="animate-fade-up" style={{ animationDelay: '0.5s', position: 'relative', height: '24rem', borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc0dHg2RklWuEUGkz7zzEv4LJnJFSMv7KBoh5IMRk531uEiTAsgfIWjlEB8QEpiWIfZ1MKVLasbCRjav5pDU3bzuRxgcwBHklIR9mFbhG8i26MwGWEQCHBnudLRKvQQEK5X4nV_4yfJOQSfhzvWZhSZnKiyuQ3T75CXZvFXO_GVP7R_c84RQSFXpiq1Dh7rfJztwKzMp_hNo3Ei7XEEGnZ9l8YULWL_G-3yI6C_mAwn-INCUF3R3ULvBON6gEKWgMMqCZ3TYQWh1MR" alt="Charity Impact" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,18,32,0.8), transparent)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Partner Grid */}
        <section style={{ padding: '4rem 2rem 6rem', background: 'var(--surface-container-low)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 className="reveal-on-scroll" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '4rem' }}>Our Verified Partners</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="partners-grid">
              {partners.map((p, i) => (
                <div key={i} className="reveal-on-scroll card-premium-hover" style={{ animationDelay: `${0.05 * i}s`, ...CARD, padding: '2rem', borderRadius: '1.5rem', borderLeft: `4px solid ${p.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>{p.logo}</div>
                    <div>
                      <h3 style={{ fontWeight: 700, color: '#fff' }}>{p.name}</h3>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.joined}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{p.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Marquee */}
        <section style={{ padding: '2rem 0', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', animation: 'marquee 30s linear infinite', whiteSpace: 'nowrap' }}>
            {['₹5L+ Donated', '15+ NGOs', '1200+ Members', 'Verified Impact', '100% Transparency', 'Zero Admin Fees', '₹5L+ Donated', '15+ NGOs', '1200+ Members', 'Verified Impact'].map((t, i) => (
              <span key={i} style={{ fontSize: '1rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.15em', marginRight: '4rem' }}>{t}</span>
            ))}
          </div>
          <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </section>

        {/* CTA */}
        <section style={{ padding: '6rem 2rem' }}>
          <div className="reveal-on-scroll" style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #2c694e, #1a4032)', borderRadius: '2rem', padding: '3rem', textAlign: 'center', border: '1px solid rgba(74,222,128,0.15)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#4ade80', marginBottom: '1rem' }}>favorite</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Begin Your Legacy</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>Choose your charity and start making an impact today.</p>
            <Link to="/signup"><button style={{ background: '#4ade80', color: '#0f172a', padding: '1rem 2.5rem', borderRadius: '9999px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Subscribe & Choose Charity</button></Link>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .charity-hero-text { grid-column: span 12 !important; }
          .charity-hero-img { grid-column: span 12 !important; }
          .partners-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
