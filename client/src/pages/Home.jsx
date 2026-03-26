import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/* ─── Intersection Observer Hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-on-scroll');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Count-Up Hook ─── */
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

const CARD = { background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.06)' };
const CARD_NAVY = { background: 'rgba(14, 22, 40, 0.8)', border: '1px solid rgba(255,255,255,0.08)' };

export default function Home() {
  useReveal();
  useCountUp();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '6rem', overflowX: 'hidden', background: 'var(--surface)', color: 'var(--on-surface)' }}>

        {/* ═══ HERO ═══ */}
        <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '0 2rem 0 4rem', overflow: 'hidden' }}>
          <div className="editorial-grid" style={{ width: '100%' }}>
            <div style={{ gridColumn: 'span 6', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="hero-text-col">
              <span className="animate-fade-up eyebrow" style={{ animationDelay: '0.1s', display: 'inline-block', padding: '0.25rem 1rem', borderRadius: '9999px', background: 'rgba(255,107,53,0.15)', color: '#ff6b35', width: 'fit-content', marginBottom: '1.5rem' }}>
                The Philanthropic Architect
              </span>
              <h1 className="animate-fade-up" style={{ animationDelay: '0.2s', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '1.5rem' }}>
                Play Golf.<br />Win Prizes.<br /><span style={{ color: '#ff6b35' }}>Change Lives.</span>
              </h1>
              <p className="animate-fade-up" style={{ animationDelay: '0.3s', fontSize: '1.125rem', color: '#94a3b8', maxWidth: '32rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Every subscription supports the charity of your choice. Enter your scores monthly, and you could win cash prizes while making a real difference.
              </p>
              <div className="animate-fade-up" style={{ animationDelay: '0.4s', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/signup">
                  <button className="pulse-halo" style={{ background: 'linear-gradient(135deg, #ff6b35, #ab3500)', color: '#fff', padding: '1rem 2rem', borderRadius: '9999px', fontWeight: 700, fontSize: '1.125rem', border: 'none', cursor: 'pointer', boxShadow: '0 12px 32px rgba(255,107,53,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.3s ease' }}>
                    Subscribe Now — ₹500/mo <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </Link>
                <Link to="/how-it-works">
                  <button style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', padding: '1rem 2rem', borderRadius: '9999px', fontWeight: 700, fontSize: '1.125rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                    See How It Works
                  </button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hero-img-col animate-float" style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', width: '55%', height: '80%' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%)', filter: 'blur(60px)' }} />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZiCdvAbrwVYQynLXqxDIy0UAMWSLAy6_cJKrjwzVAoHFe8zXkPgSisflfble6SLuhLl-76vWVeqadIEm6oZJdaqVbeSgFe1Lo22SaxGKKG0aY8iXOyZvwyEV06fgfgaieine0r7iA2N8TDXaASLKitsD--deaaTVYBoHQrzNG1f2rpFhoVE4IDMaTg6ah4JiZPG_fwHqZCzwIGpNqXcnuHKLyH6NUA2QXZ5KuPUKIjTdduEB9kU2XGqgq7igwX9PJkJqz7okMp1YX"
                  alt="Premium golf ball" className="asymmetric-shape" style={{ width: '100%', height: '100%', objectFit: 'cover', boxShadow: '0 24px 64px rgba(0,0,0,0.4)', filter: 'grayscale(0.2) brightness(0.9)' }} />
                {/* Floating Impact Card */}
                <div className="animate-fade-up" style={{ animationDelay: '0.6s', position: 'absolute', bottom: '3rem', left: '-3rem', ...CARD, backdropFilter: 'blur(20px)', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', maxWidth: '18rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
                      <span className="material-symbols-outlined">volunteer_activism</span>
                    </div>
                    <span style={{ fontWeight: 700, color: '#fff' }}>Latest Impact</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }}>"My last round helped fund 50 meals for children via Akshaya Patra."</p>
                  <div style={{ marginTop: '1rem', height: '0.5rem', width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '75%', background: '#4ade80', borderRadius: '9999px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section style={{ background: 'rgba(255,107,53,0.08)', borderTop: '1px solid rgba(255,107,53,0.15)', borderBottom: '1px solid rgba(255,107,53,0.15)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }} className="stats-grid">
            {[
              { target: 500000, final: '₹5,00,000+', label: 'Donated' },
              { target: 1200, final: '1,200+', label: 'Active Members' },
              { target: 15, final: '15+', label: 'Partner Charities' },
              { target: 20000, final: '₹20,000', label: 'Biggest Prize' },
            ].map((s, i) => (
              <div key={i}>
                <div className="count-up" data-target={s.target} data-final={s.final} style={{ color: '#ff6b35', fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.25rem' }}>0</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow reveal-on-scroll" style={{ marginBottom: '1rem', display: 'block' }}>Process</span>
            <h2 className="reveal-on-scroll" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Three Simple Steps to Play and Give</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', maxWidth: '1100px', margin: '0 auto', position: 'relative' }} className="steps-grid">
            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', background: 'rgba(255,255,255,0.06)', transform: 'translateY(-50%)' }} className="steps-line" />
            {[
              { icon: 'subscriptions', title: '1. Subscribe', desc: 'Choose your plan. Every month, ₹500 unlocks your entry and supports your chosen cause.', bg: '#ff6b35' },
              { icon: 'edit_square', title: '2. Enter Scores', desc: 'Play your rounds as usual. Submit your Stableford scores (1-45) directly through our portal.', bg: '#8badd4' },
              { icon: 'emoji_events', title: '3. Win & Impact', desc: 'Match 3, 4, or 5 numbers with the monthly draw. Cash prizes for you, impact for the world.', bg: '#4ade80' },
            ].map((s, i) => (
              <div key={i} className="reveal-on-scroll card-premium-hover" style={{ animationDelay: `${0.1 + i * 0.1}s`, position: 'relative', ...CARD, padding: '2.5rem', borderRadius: '2.5rem', zIndex: 10 }}>
                <div className="icon-parallax premium-transition" style={{ width: '4rem', height: '4rem', borderRadius: '1rem', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>{s.icon}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ WHY JOIN ═══ */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface-container-low)' }}>
          <div className="editorial-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="reveal-on-scroll" style={{ gridColumn: 'span 5' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '2rem' }}>More Than Just a Game.</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2rem' }}>We've built a platform that bridges the gap between your passion for golf and your desire to give back.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: 'verified', title: 'Effortless Giving', desc: 'Automated donations so you can focus on your swing.' },
                  { icon: 'transcribe', title: 'Fair & Transparent', desc: 'Real-time ledger of every rupee donated and won.' },
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ padding: '0.5rem', background: 'rgba(255,107,53,0.15)', borderRadius: '0.5rem', color: '#ff6b35' }}>
                      <span className="material-symbols-outlined">{f.icon}</span>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: '#fff' }}>{f.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-cards-col" style={{ gridColumn: 'span 7', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="reveal-on-scroll card-premium-hover" style={{ animationDelay: '0.2s', ...CARD, padding: '2rem', borderRadius: '1.5rem', marginTop: '3rem' }}>
                <span className="material-symbols-outlined icon-parallax premium-transition" style={{ fontSize: '2.5rem', color: '#ff6b35', marginBottom: '1rem', display: 'inline-block' }}>groups</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Active Community</h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Join 1,200+ golfers making an impact across India.</p>
              </div>
              <div className="reveal-on-scroll card-premium-hover" style={{ animationDelay: '0.4s', background: 'linear-gradient(135deg, #1e3a5f, #0f2647)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid rgba(139,173,212,0.2)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}>
                <span className="material-symbols-outlined icon-parallax premium-transition" style={{ fontSize: '2.5rem', color: '#ffb59d', marginBottom: '1rem', display: 'inline-block' }}>calendar_today</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Flexible Plans</h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Cancel anytime or switch charities as your focus evolves.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PRIZE POOL ═══ */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="reveal-on-scroll" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ maxWidth: '40rem' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Real Prizes. Real Impact.</h2>
                <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>Our prize pool scales with our community. The more we play, the more we give—and the more you win.</p>
              </div>
              <div style={{ ...CARD, padding: '1.5rem', borderRadius: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Monthly Pool Estimate</span>
                <div className="count-up" data-target="50000" data-final="₹50,000" style={{ fontSize: '2rem', fontWeight: 900, color: '#ff6b35' }}>0</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="prizes-grid">
              {[
                { pct: '40%', color: '#ff6b35', title: '5-Match Tier', desc: 'Match all 5 numbers from your monthly scores. The ultimate grand prize.', est: '₹20,000' },
                { pct: '35%', color: '#8badd4', title: '4-Match Tier', desc: 'Match any 4 scores. Distributed among all qualifying winners.', est: '₹17,500' },
                { pct: '25%', color: '#4ade80', title: '3-Match Tier', desc: 'Match any 3 scores. Our most frequent winning tier.', est: '₹12,500' },
              ].map((p, i) => (
                <div key={i} className="reveal-on-scroll card-premium-hover" style={{ animationDelay: `${0.1 + i * 0.1}s`, ...CARD, padding: '2rem', borderRadius: '2rem', borderTop: `4px solid ${p.color}` }}>
                  <div className="icon-parallax premium-transition" style={{ fontSize: '3rem', fontWeight: 900, color: p.color, marginBottom: '1rem', display: 'inline-block' }}>{p.pct}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1.5rem' }}>{p.desc}</p>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, padding: '1rem', borderRadius: '0.75rem', textAlign: 'center', background: `${p.color}15`, color: p.color }}>Est. {p.est}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CHARITY IMPACT ═══ */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface-container-low)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <div className="reveal-on-scroll" style={{ marginBottom: '5rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.5rem', color: '#fff' }}>Your Subscription Changes Lives</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.125rem', maxWidth: '36rem' }}>Directly funding critical missions across the country. 100% of your charity portion reaches the destination.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="charity-grid">
              {[
                { name: 'Red Cross India', desc: 'Providing emergency medical support and disaster relief across the subcontinent.', donated: 120000, final: '₹1.2L+', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc0dHg2RklWuEUGkz7zzEv4LJnJFSMv7KBoh5IMRk531uEiTAsgfIWjlEB8QEpiWIfZ1MKVLasbCRjav5pDU3bzuRxgcwBHklIR9mFbhG8i26MwGWEQCHBnudLRKvQQEK5X4nV_4yfJOQSfhzvWZhSZnKiyuQ3T75CXZvFXO_GVP7R_c84RQSFXpiq1Dh7rfJztwKzMp_hNo3Ei7XEEGnZ9l8YULWL_G-3yI6C_mAwn-INCUF3R3ULvBON6gEKWgMMqCZ3TYQWh1MR' },
                { name: 'Akshaya Patra', desc: 'Eliminating classroom hunger by implementing the Mid-Day Meal Scheme.', donated: 240000, final: '₹2.4L+', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVRwpsxhMKPDMLiL7cSGkmfJ27ikizzcK0M4B7k1Z7xY2ylX7lO1iNJeZr7R1r_LMTq7ylhsWHpIvZudl3n9sorym_jvbsMpfHpJAzbD2g06sDeUAtUDESQIBUcTS0CO-tUg_0O50Y6qrvCU_gpnHTm4OtCvTvl7s_r1EB4WBI4zZv4yxScug-ZSoAXFjHkCRHR9gBV3JgJ0TsatWCXqv-UluleewgU2-FC9OForZ0rQlkWZQD0f9q-CjFgGvZBKNYWvUj8ngBcjGC' },
                { name: 'Wildlife SOS', desc: "Rescuing and rehabilitating wildlife in distress across India's forests.", donated: 85000, final: '₹85K+', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIvfdZYRe1l0sA_jfuEqpQRn2TZB_BUIV2xwTyeOXe-PVuVhdZWbDjGpDQ6yw2kFPnA8cq_jeeFrGbwXU21yoICcvInsfjJLUKdpt8TexEJgpE7YIGnuhKjdL0cYYrG-26vkt_R8PY_5dVIfFaeRaioQYxx0AhAuBUulxp1dP5Zp2mFAiZA2NTQGuXtgNuWrwnIaNorh-VZKgO791akuWOG4HnRj54vJXPFqjejHEm-KVMAjKhbht6JlIBp0x5lzDpBJcAPpRv-daW' },
              ].map((c, i) => (
                <div key={i} className="reveal-on-scroll" style={{ animationDelay: `${0.1 + i * 0.1}s`, cursor: 'pointer' }}>
                  <div className="card-premium-hover" style={{ position: 'relative', height: '24rem', overflow: 'hidden', borderRadius: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}>
                    <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,18,32,0.95), transparent)' }} />
                    <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                      <div className="count-up" data-target={c.donated} data-final={c.final} style={{ color: '#ff6b35', fontWeight: 900, fontSize: '2rem', marginBottom: '0.25rem' }}>0</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>Total Donated</div>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>{c.name}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Simple, Transparent Pricing</h2>
              <p style={{ color: '#94a3b8' }}>No hidden fees. Just golf, prizes, and purpose.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="pricing-grid">
              {/* Monthly */}
              <div className="reveal-on-scroll card-premium-hover" style={{ animationDelay: '0.1s', ...CARD, padding: '3rem', borderRadius: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Monthly</h3>
                <div style={{ marginBottom: '2rem' }}><span style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>₹500</span><span style={{ color: '#94a3b8' }}>/month</span></div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {['Monthly Draw Entry', 'Support 1 Charity', 'Digital Impact Dashboard'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8' }}>
                      <span className="material-symbols-outlined" style={{ color: '#4ade80' }}>check_circle</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup"><button style={{ width: '100%', padding: '1rem', borderRadius: '9999px', border: '2px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                >Select Monthly</button></Link>
              </div>
              {/* Yearly */}
              <div className="reveal-on-scroll card-premium-hover" style={{ animationDelay: '0.3s', background: 'linear-gradient(135deg, #1e3a5f, #0f2647)', padding: '3rem', borderRadius: '3rem', boxShadow: '0 24px 64px rgba(0,0,0,0.4)', color: '#fff', transform: 'scale(1.05)', position: 'relative', overflow: 'hidden', border: '1px solid rgba(139,173,212,0.2)' }}>
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#ff6b35', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Most Popular</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Yearly</h3>
                <div style={{ marginBottom: '2rem' }}><span style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#ffb59d' }}>₹5,000</span><span style={{ color: '#94a3b8' }}>/year</span></div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {['2 Months Free', 'Enhanced Prize Multiplier', 'Annual Impact Report'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8' }}>
                      <span className="material-symbols-outlined" style={{ color: '#ffb59d' }}>check_circle</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup"><button className="pulse-halo" style={{ width: '100%', padding: '1rem', borderRadius: '9999px', background: '#ff6b35', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,107,53,0.4)', transition: 'transform 0.3s ease' }}>Subscribe Yearly</button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section style={{ padding: '6rem 2rem', background: 'var(--surface-container-low)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 className="reveal-on-scroll" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '4rem' }}>What Our Members Say</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="testimonials-grid">
              {[
                { quote: '"Joining Play With Purpose has given my weekend rounds a whole new meaning. Knowing a portion of my subscription goes to CRY makes every birdie feel better."', name: 'Arjun Mehta', loc: 'Bangalore | Supporting CRY', accent: false },
                { quote: '"Won the 4-match tier last month! It was a great surprise, but the real win is seeing the monthly impact reports from Wildlife SOS. Pure class."', name: 'Sanya Iyer', loc: 'Mumbai | Supporting Wildlife SOS', accent: true },
                { quote: '"The platform is incredibly transparent. I was skeptical about \'golf charities\' before, but this is clearly about real people and real impact."', name: 'Rohan Das', loc: 'Delhi | Supporting Akshaya Patra', accent: false },
              ].map((t, i) => (
                <div key={i} className="reveal-on-scroll card-premium-hover" style={{
                  animationDelay: `${0.1 + i * 0.1}s`,
                  background: t.accent ? 'linear-gradient(135deg, #1e3a5f, #0f2647)' : 'rgba(30,41,59,0.6)',
                  border: t.accent ? '1px solid rgba(139,173,212,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  padding: '2rem', borderRadius: '2rem', fontStyle: 'italic',
                  color: '#94a3b8',
                  boxShadow: t.accent ? '0 12px 32px rgba(0,0,0,0.3)' : 'none',
                }}>
                  <div className="icon-parallax premium-transition" style={{ marginBottom: '1.5rem', color: '#ff6b35' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                  </div>
                  <p style={{ marginBottom: '2rem', lineHeight: 1.7 }}>{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                    <div>
                      <h4 style={{ fontWeight: 700, fontStyle: 'normal', color: '#fff' }}>{t.name}</h4>
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.7, fontStyle: 'normal' }}>{t.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section style={{ padding: '6rem 2rem', marginBottom: '0' }}>
          <div className="reveal-on-scroll" style={{ maxWidth: '1280px', margin: '0 auto', background: 'linear-gradient(135deg, #ff6b35, #ab3500)', borderRadius: '3rem', padding: 'clamp(3rem, 6vw, 6rem)', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '24rem', height: '24rem', background: '#fff', opacity: 0.05, filter: 'blur(60px)', transform: 'translate(50%, -50%)' }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 className="animate-fade-up" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.1, color: '#fff' }}>Ready to Play With Purpose?</h2>
              <p className="animate-fade-up" style={{ animationDelay: '0.2s', fontSize: '1.25rem', maxWidth: '40rem', margin: '0 auto 3rem', fontWeight: 500, opacity: 0.9 }}>Join a movement that turns your leisure into a lifeline for thousands. Start today for just ₹500.</p>
              <Link to="/signup">
                <button className="pulse-halo animate-fade-up" style={{ animationDelay: '0.4s', background: '#fff', color: '#ff6b35', padding: '1.25rem 3rem', borderRadius: '9999px', fontWeight: 700, fontSize: '1.25rem', border: 'none', cursor: 'pointer', boxShadow: '0 12px 32px rgba(0,0,0,0.3)', marginBottom: '4rem', transition: 'transform 0.3s ease' }}>Get Started Now</button>
              </Link>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(1.5rem, 3vw, 4rem)', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                {[
                  { icon: 'security', label: 'Secure Payments' },
                  { icon: 'update', label: 'Cancel Anytime' },
                  { icon: 'favorite', label: 'Direct Charity Funding' },
                ].map((b, i) => (
                  <div key={i} className="premium-transition" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    <span className="material-symbols-outlined">{b.icon}</span>
                    <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .hero-text-col { grid-column: span 12 !important; }
          .hero-img-col { display: none; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .steps-line { display: none !important; }
          .why-cards-col { grid-column: span 12 !important; }
          .prizes-grid, .charity-grid, .testimonials-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .editorial-grid > div:first-child { grid-column: span 12 !important; }
        }
      `}</style>
    </>
  );
}
