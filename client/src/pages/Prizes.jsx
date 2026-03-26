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

function useCountUp() {
  useEffect(() => {
    const els = document.querySelectorAll('.count-up');
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = parseInt(entry.target.dataset.target);
        const finalText = entry.target.dataset.final;
        const start = performance.now();
        const duration = 2000;
        const animate = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = p * (2 - p);
          entry.target.textContent = Math.floor(ease * target).toLocaleString('en-IN');
          if (p < 1) requestAnimationFrame(animate);
          else entry.target.textContent = finalText;
        };
        requestAnimationFrame(animate);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const CARD = { background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.06)' };

export default function Prizes() {
  useReveal();
  useCountUp();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem', background: 'var(--surface)', color: 'var(--on-surface)' }}>

        {/* Hero */}
        <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
          <span className="animate-fade-up eyebrow" style={{ animationDelay: '0.1s', marginBottom: '1rem', display: 'inline-block' }}>Reward System</span>
          <h1 className="animate-fade-up" style={{ animationDelay: '0.2s', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Play. Match. <span style={{ color: '#ff6b35' }}>Win.</span></h1>
          <p className="animate-fade-up" style={{ animationDelay: '0.3s', fontSize: '1.125rem', color: '#94a3b8', maxWidth: '36rem', margin: '0 auto 3rem' }}>Our community-funded prize pool grows with every subscriber. The more people play, the bigger everyone can win.</p>
          <div className="animate-fade-up" style={{ animationDelay: '0.4s', ...CARD, display: 'inline-flex', gap: '3rem', padding: '2rem 3rem', borderRadius: '1.5rem', backdropFilter: 'blur(16px)' }}>
            <div>
              <div className="count-up" data-target="50000" data-final="₹50,000+" style={{ fontSize: '2rem', fontWeight: 900, color: '#ff6b35' }}>0</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Current Pool</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '3rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#4ade80' }}>3 Tiers</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Win Levels</div>
            </div>
          </div>
        </section>

        {/* Prize Tiers */}
        <section style={{ padding: '4rem 2rem 6rem', background: 'var(--surface-container-low)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 className="reveal-on-scroll" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '4rem' }}>Reward Tiers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="tiers-grid">
              {[
                { tier: '5 Match', pct: '40%', est: '₹20,000', color: '#ff6b35', desc: 'Match all 5 of your scores to the drawn numbers. Grand prize tier.', icon: 'workspace_premium' },
                { tier: '4 Match', pct: '35%', est: '₹17,500', color: '#8badd4', desc: 'Match any 4 scores. Shared equally among all 4-match winners.', icon: 'stars' },
                { tier: '3 Match', pct: '25%', est: '₹12,500', color: '#4ade80', desc: 'Match any 3 scores. Most frequent winning tier.', icon: 'emoji_events' },
              ].map((t, i) => (
                <div key={i} className="reveal-on-scroll card-premium-hover" style={{ animationDelay: `${0.1 + i * 0.15}s`, ...CARD, padding: '2.5rem', borderRadius: '2rem', borderTop: `4px solid ${t.color}`, textAlign: 'center' }}>
                  <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: `${t.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: t.color }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>{t.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{t.tier}</h3>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: t.color, marginBottom: '0.25rem' }}>{t.pct}</div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1.5rem' }}>of prize pool</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{t.desc}</p>
                  <div style={{ padding: '1rem', borderRadius: '0.75rem', background: `${t.color}10`, color: t.color, fontWeight: 700, fontSize: '1.25rem' }}>Est. {t.est}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fair Play */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="reveal-on-scroll" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Fair & Transparent</h2>
            <p className="reveal-on-scroll" style={{ color: '#94a3b8', fontSize: '1.125rem', marginBottom: '4rem' }}>We believe transparency fosters trust. Here's how every rupee is allocated.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }} className="fair-grid">
              {[
                { pct: '70%', label: 'Prize Pool', color: '#ff6b35' },
                { pct: '10%+', label: 'Charity Fund', color: '#4ade80' },
                { pct: '15%', label: 'Operations', color: '#8badd4' },
                { pct: '5%', label: 'Reserve Fund', color: '#fbbf24' },
              ].map((f, i) => (
                <div key={i} className="reveal-on-scroll" style={{ animationDelay: `${0.1 * i}s` }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: f.color, marginBottom: '0.5rem' }}>{f.pct}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '4rem 2rem' }}>
          <div className="reveal-on-scroll" style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #ff6b35, #ab3500)', borderRadius: '2rem', padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Ready to Win?</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Subscribe today and your scores become lottery numbers.</p>
            <Link to="/signup"><button style={{ background: '#fff', color: '#ff6b35', padding: '1rem 2.5rem', borderRadius: '9999px', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1.125rem' }}>Start Playing</button></Link>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .tiers-grid, .fair-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
