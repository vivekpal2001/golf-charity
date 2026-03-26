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

export default function HowItWorks() {
  useReveal();

  const steps = [
    { num: '01', icon: 'subscriptions', title: 'Subscribe & Choose Your Charity', desc: 'Choose a monthly (₹500) or yearly (₹5,000) plan. Select one of our verified partner charities to receive a portion of your subscription.', details: ['Secure Stripe payments', 'At least 10% goes directly to charity', 'Change your charity anytime'] },
    { num: '02', icon: 'edit_square', title: 'Play & Enter Your Scores', desc: 'Play golf as you normally would, at any course. Enter up to 5 Stableford scores (1-45) through your personal dashboard portal.', details: ['FIFO: 6th score replaces the oldest', 'Your scores = your lottery numbers', 'Enter scores anytime during the month'] },
    { num: '03', icon: 'emoji_events', title: 'Monthly Draw & Win', desc: 'At the end of each month, 5 numbers are drawn. Match 3, 4, or all 5 of your scores to win real cash prizes.', details: ['5-match: 40% of the pool', '4-match: 35% of the pool', '3-match: 25% of the pool'] },
  ];

  const faqs = [
    { q: 'How are winning numbers drawn?', a: 'We use a cryptographically secure random number generator from 1-45. The draw happens on the 1st of each month and results are immediately available on the Winners page.' },
    { q: 'What happens with my charity donation?', a: 'A minimum of 10% of your subscription is sent directly to your chosen charity at the end of each billing cycle. You get a verified receipt.' },
    { q: 'Can I change my scores after submission?', a: 'You can always add new scores. The system keeps 5 active scores; the 6th entry replaces the oldest one (FIFO).' },
    { q: 'What are Stableford scores?', a: 'Stableford is a scoring system in golf that awards points based on hole results. Scores typically range from 1-45. You enter your total round score.' },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem', background: 'var(--surface)', color: 'var(--on-surface)' }}>

        {/* Hero */}
        <section style={{ padding: '6rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 80px)' }} />
          <div className="editorial-grid" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <div style={{ gridColumn: 'span 6' }} className="hiw-hero-text">
              <span className="animate-fade-up eyebrow" style={{ animationDelay: '0.1s', background: '#ff6b35', color: '#fff', display: 'inline-block', marginBottom: '1.5rem' }}>How It Works</span>
              <h1 className="animate-fade-up" style={{ animationDelay: '0.2s', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: '1.5rem' }}>Your Game.<br /><span style={{ color: '#ff6b35' }}>Their Future.</span></h1>
              <p className="animate-fade-up" style={{ animationDelay: '0.3s', fontSize: '1.125rem', color: '#94a3b8', maxWidth: '32rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                We've engineered a platform where every stroke on the green translates to real-world impact. Simple mechanics, premium rewards, and a lasting legacy.
              </p>
              <div className="animate-fade-up" style={{ animationDelay: '0.4s', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/signup"><button style={{ background: '#ff6b35', color: '#fff', padding: '0.875rem 2rem', borderRadius: '9999px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,107,53,0.3)' }}>Get Started</button></Link>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#8badd4', fontWeight: 700 }}>
                  <span className="material-symbols-outlined" style={{ border: '2px solid #8badd4', borderRadius: '50%', padding: '0.25rem' }}>play_arrow</span> Watch Process
                </button>
              </div>
            </div>
            <div style={{ gridColumn: 'span 6', display: 'flex', justifyContent: 'flex-end' }} className="hiw-hero-card">
              <div className="animate-fade-up" style={{ animationDelay: '0.5s', ...CARD, padding: '2rem', borderRadius: '1.5rem', maxWidth: '22rem', backdropFilter: 'blur(16px)', transform: 'rotate(2deg)' }}>
                <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'block' }}>Next Draw</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#8badd4', marginBottom: '0.5rem' }}>PREMIUM</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Monthly prize pool scales based on community participation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface-container-low)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {steps.map((s, i) => (
              <div key={i} className="reveal-on-scroll card-premium-hover" style={{ animationDelay: `${0.1 + i * 0.15}s`, ...CARD, padding: '3rem', borderRadius: '2.5rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className2="step-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '4rem', height: '4rem', borderRadius: '1rem', background: 'rgba(255,107,53,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b35' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>{s.icon}</span>
                    </div>
                    <span style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.06)' }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {s.details.map((d, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                      <span className="material-symbols-outlined" style={{ color: '#4ade80' }}>check_circle</span>
                      <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="reveal-on-scroll" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((f, i) => (
                <details key={i} className="reveal-on-scroll" style={{ animationDelay: `${0.05 * i}s`, ...CARD, padding: '1.5rem 2rem', borderRadius: '1rem', cursor: 'pointer' }}>
                  <summary style={{ fontWeight: 700, color: '#fff', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {f.q}
                    <span className="material-symbols-outlined" style={{ color: '#ff6b35' }}>expand_more</span>
                  </summary>
                  <p style={{ marginTop: '1rem', color: '#94a3b8', lineHeight: 1.7 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '4rem 2rem' }}>
          <div className="reveal-on-scroll" style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, #1e3a5f, #0f2647)', borderRadius: '2rem', padding: '3rem', textAlign: 'center', border: '1px solid rgba(139,173,212,0.2)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#ffb59d', marginBottom: '1rem' }}>support_agent</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Still Have Questions?</h3>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Our team is here to help you get started on your journey to play with purpose.</p>
            <Link to="/about"><button style={{ background: '#ff6b35', color: '#fff', padding: '0.875rem 2rem', borderRadius: '9999px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Contact Support</button></Link>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .hiw-hero-text { grid-column: span 12 !important; }
          .hiw-hero-card { grid-column: span 12 !important; justify-content: center !important; }
          .step-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
