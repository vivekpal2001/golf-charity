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

export default function Winners() {
  useReveal();

  const lastDraw = [12, 27, 33, 8, 41];
  const champions = [
    { name: 'Arjun M.', prizes: '₹20,000', tier: '5 Match', month: 'Feb 2026', color: '#ff6b35' },
    { name: 'Priya K.', prizes: '₹8,750', tier: '4 Match', month: 'Feb 2026', color: '#8badd4' },
    { name: 'Rohit S.', prizes: '₹4,167', tier: '3 Match', month: 'Feb 2026', color: '#4ade80' },
    { name: 'Deepak V.', prizes: '₹8,750', tier: '4 Match', month: 'Jan 2026', color: '#8badd4' },
    { name: 'Sneha R.', prizes: '₹4,167', tier: '3 Match', month: 'Jan 2026', color: '#4ade80' },
    { name: 'Karan P.', prizes: '₹20,000', tier: '5 Match', month: 'Dec 2025', color: '#ff6b35' },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem', background: 'var(--surface)', color: 'var(--on-surface)' }}>

        {/* Hero */}
        <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
          <span className="animate-fade-up eyebrow" style={{ animationDelay: '0.1s', marginBottom: '1rem', display: 'inline-block' }}>Results</span>
          <h1 className="animate-fade-up" style={{ animationDelay: '0.2s', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Hall of <span style={{ color: '#fbbf24' }}>Fame.</span></h1>
          <p className="animate-fade-up" style={{ animationDelay: '0.3s', fontSize: '1.125rem', color: '#94a3b8', maxWidth: '36rem', margin: '0 auto' }}>Real people. Real prizes. View last month's results and our growing list of champions.</p>
        </section>

        {/* Last Draw */}
        <section style={{ padding: '4rem 2rem', background: 'var(--surface-container-low)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="reveal-on-scroll" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '2rem' }}>February 2026 — Winning Numbers</h2>
            <div className="reveal-on-scroll" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              {lastDraw.map((n, i) => (
                <div key={i} className="animate-fade-up" style={{
                  animationDelay: `${0.2 + i * 0.15}s`,
                  width: '5rem', height: '5rem', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff6b35, #ab3500)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '1.75rem', fontWeight: 900,
                  boxShadow: '0 8px 24px rgba(255,107,53,0.4)',
                }}>
                  {n}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="draw-stats">
              {[
                { label: 'Total Prize Pool', val: '₹50,000', color: '#ff6b35' },
                { label: 'Total Winners', val: '12', color: '#4ade80' },
                { label: 'Charity Split', val: '₹5,000', color: '#8badd4' },
              ].map((s, i) => (
                <div key={i} className="reveal-on-scroll" style={{ animationDelay: `${0.1 * i}s`, ...CARD, padding: '1.5rem', borderRadius: '1rem' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Champions */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 className="reveal-on-scroll" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '4rem' }}>Past Champions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="champs-grid">
              {champions.map((c, i) => (
                <div key={i} className="reveal-on-scroll card-premium-hover" style={{ animationDelay: `${0.05 * i}s`, ...CARD, padding: '2rem', borderRadius: '1.5rem', borderTop: `3px solid ${c.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '1.25rem' }}>{c.name}</h3>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{c.month}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', background: `${c.color}20`, color: c.color }}>{c.tier}</span>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: c.color }}>{c.prizes}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '4rem 2rem' }}>
          <div className="reveal-on-scroll" style={{ maxWidth: '900px', margin: '0 auto', ...CARD, borderRadius: '2rem', padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Your Name Could Be Here</h3>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Subscribe today and enter the next monthly draw.</p>
            <Link to="/signup"><button style={{ background: '#ff6b35', color: '#fff', padding: '1rem 2.5rem', borderRadius: '9999px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Start Playing</button></Link>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .draw-stats, .champs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
