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

export default function About() {
  useReveal();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem', background: 'var(--surface)', color: 'var(--on-surface)' }}>

        {/* Hero */}
        <section style={{ padding: '6rem 2rem 4rem' }}>
          <div className="editorial-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ gridColumn: 'span 7' }} className="about-hero-text">
              <span className="animate-fade-up eyebrow" style={{ animationDelay: '0.1s', marginBottom: '1rem', display: 'inline-block' }}>Our Story</span>
              <h1 className="animate-fade-up" style={{ animationDelay: '0.2s', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                Where Passion<br />Meets <span style={{ color: '#ff6b35' }}>Purpose.</span>
              </h1>
              <p className="animate-fade-up" style={{ animationDelay: '0.3s', fontSize: '1.125rem', color: '#94a3b8', maxWidth: '36rem', lineHeight: 1.7 }}>
                Play With Purpose was born from a simple question: What if every round of golf could make the world a better place? We're turning that question into a movement.
              </p>
            </div>
            <div style={{ gridColumn: 'span 5' }} className="about-hero-img">
              <div className="animate-fade-up" style={{ animationDelay: '0.5s', ...CARD, padding: '2rem', borderRadius: '2rem', backdropFilter: 'blur(16px)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#ff6b35', marginBottom: '1rem', display: 'block' }}>auto_awesome</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Our Mission</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                  To create a sustainable ecosystem where sport and philanthropy intersect, enabling everyday golfers to become agents of change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface-container-low)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="reveal-on-scroll" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '2rem' }}>Why We Started</h2>
            <div className="reveal-on-scroll" style={{ ...CARD, padding: '3rem', borderRadius: '2rem', position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'rgba(255,107,53,0.15)', position: 'absolute', top: '1.5rem', right: '1.5rem' }}>format_quote</span>
              <p style={{ fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic' }}>
                "I noticed that golfers donate generously, but separately from their sport. What if we could weave giving into the fabric of the game itself? That's when Play With Purpose was born."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,107,53,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b35' }}>
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: '#fff' }}>Founding Team</h4>
                  <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Play With Purpose, est. 2024</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Pillars */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 className="reveal-on-scroll" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '4rem' }}>Our Pillars</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="pillars-grid">
              {[
                { icon: 'security', title: 'Trust & Transparency', desc: 'Every rupee is trackable. Real-time ledger, verified charities, and auditable draws.', color: '#ff6b35' },
                { icon: 'groups', title: 'Community First', desc: 'We grow together. Member-funded prize pools and collective impact reporting.', color: '#8badd4' },
                { icon: 'eco', title: 'Sustainable Impact', desc: 'Not a one-off donation. A consistent, month-over-month funding engine for charities.', color: '#4ade80' },
              ].map((p, i) => (
                <div key={i} className="reveal-on-scroll card-premium-hover" style={{ animationDelay: `${0.1 + i * 0.15}s`, ...CARD, padding: '2.5rem', borderRadius: '2rem', textAlign: 'center' }}>
                  <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: p.color }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>{p.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{p.title}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface-container-low)' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="reveal-on-scroll" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '4rem' }}>Our Evolution</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(255,255,255,0.08)' }}>
              {[
                { year: '2024', title: 'Concept Born', desc: 'Initial idea to merge golf scoring with charitable giving.', color: '#ff6b35' },
                { year: '2025 Q1', title: 'Platform Launch', desc: 'First 50 subscribers. Three charity partners onboarded.', color: '#8badd4' },
                { year: '2025 Q3', title: 'Scale Milestone', desc: '500+ active members. ₹2.5L donated to verified charities.', color: '#4ade80' },
                { year: '2026', title: 'National Expansion', desc: '1200+ members across India. 15+ partner charities. ₹5L+ donated.', color: '#fbbf24' },
              ].map((t, i) => (
                <div key={i} className="reveal-on-scroll" style={{ animationDelay: `${0.1 * i}s`, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2.6rem', top: '0.25rem', width: '1rem', height: '1rem', borderRadius: '50%', background: t.color, border: '3px solid var(--surface-container-low)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: t.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.year}</span>
                  <h4 style={{ fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{t.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '6rem 2rem' }}>
          <div className="reveal-on-scroll" style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #ff6b35, #ab3500)', borderRadius: '2rem', padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Join the Movement</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Be part of a community that turns every swing into a story of impact.</p>
            <Link to="/signup"><button style={{ background: '#fff', color: '#ff6b35', padding: '1rem 2.5rem', borderRadius: '9999px', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1.125rem' }}>Get Started Today</button></Link>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .about-hero-text { grid-column: span 12 !important; }
          .about-hero-img { grid-column: span 12 !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
