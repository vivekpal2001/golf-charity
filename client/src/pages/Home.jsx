import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Trophy, Heart, Users, Zap, Target, TrendingUp, Shield, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.fromTo('.hero-title-line', 
        { y: 100, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.5 }
      );
      gsap.fromTo('.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
      );
      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.3 }
      );

      // Floating orbs
      gsap.to('.orb-1', { y: -30, x: 20, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.orb-2', { y: 20, x: -30, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.orb-3', { y: -20, x: 15, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // Counter animation
      countersRef.current.forEach((counter) => {
        if (!counter) return;
        const target = parseInt(counter.dataset.target);
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = Math.floor(obj.val).toLocaleString('en-IN');
              },
            });
          },
        });
      });

      // Parallax on hero orbs
      gsap.to('.hero-bg-gradient', {
        yPercent: 30,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Target, title: 'Enter Your Scores', desc: 'Submit your best 5 Stableford scores and keep them updated after every round.' },
    { icon: Trophy, title: 'Monthly Prize Draws', desc: 'Your scores are your lottery numbers. Match the draw numbers and win big prizes.' },
    { icon: Heart, title: 'Support Charities', desc: 'Choose your charity. At least 10% of every subscription goes directly to causes you care about.' },
    { icon: TrendingUp, title: 'Jackpot Rollover', desc: 'No 5-match winner? The jackpot rolls over and grows bigger every month.' },
    { icon: Shield, title: 'Verified Winners', desc: 'Transparent verification process ensures every winner and every rupee is accounted for.' },
    { icon: Zap, title: 'Instant Updates', desc: 'Real-time draw results, score tracking, and live charity impact dashboards.' },
  ];

  const stats = [
    { value: 500000, suffix: '+', label: 'Donated to Charity', prefix: '₹' },
    { value: 1200, suffix: '+', label: 'Active Members' },
    { value: 24, suffix: '', label: 'Charities Supported' },
    { value: 85, suffix: '%', label: 'Goes to Prizes & Charity' },
  ];

  return (
    <div ref={heroRef} className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="hero-bg-gradient absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.12), transparent 70%)', top: '10%', right: '5%' }} />
          <div className="orb-2 absolute w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08), transparent 70%)', bottom: '15%', left: '10%' }} />
          <div className="orb-3 absolute w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.06), transparent 70%)', top: '50%', left: '50%' }} />
        </div>

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="overflow-hidden mb-2">
              <h1 className="hero-title-line text-5xl md:text-7xl lg:text-8xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                Play Golf.
              </h1>
            </div>
            <div className="overflow-hidden mb-2">
              <h1 className="hero-title-line text-5xl md:text-7xl lg:text-8xl font-bold gradient-text">
                Win Prizes.
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1 className="hero-title-line text-5xl md:text-7xl lg:text-8xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                Change Lives.
              </h1>
            </div>

            <p className="hero-subtitle text-lg md:text-xl max-w-2xl mb-10" style={{ color: 'var(--color-navy-200)', lineHeight: 1.7 }}>
              A subscription-based platform where your golf scores become your lottery numbers. 
              Every month, we draw winners and donate to charities you choose. 
              It&apos;s golf with purpose.
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-base py-4 px-8"
                >
                  <span className="flex items-center gap-2">
                    Start Playing <ArrowRight size={18} />
                  </span>
                </motion.button>
              </Link>
              <Link to="/how-it-works">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-base py-4 px-8"
                >
                  How It Works
                </motion.button>
              </Link>
            </div>

            {/* Mini Stats inline */}
            <div className="hero-cta flex items-center gap-6 mt-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-success)' }} />
                <span className="text-sm" style={{ color: 'var(--color-navy-300)' }}>1,200+ Active Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={14} style={{ color: 'var(--color-emerald-500)' }} />
                <span className="text-sm" style={{ color: 'var(--color-navy-300)' }}>₹5L+ Donated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: 'var(--color-navy-500)' }}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-emerald-500)' }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── Stats Section ── */}
      <section ref={statsRef} className="section-padding" style={{ background: 'linear-gradient(to bottom, var(--color-navy-950), var(--color-navy-900))' }}>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} direction="up">
                <GlassCard className="stat-card p-6 text-center" tilt={false}>
                  <div className="stat-value">
                    <span>{stat.prefix || ''}</span>
                    <span ref={el => countersRef.current[i] = el} data-target={stat.value}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="stat-label mt-2">{stat.label}</div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="badge badge-emerald mb-4 inline-block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              Golf Meets <span className="gradient-text">Purpose</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-navy-300)' }}>
              A simple concept with massive impact. Your scores, your charities, your prizes.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1} direction="up">
                <GlassCard className="p-8 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(0, 212, 170, 0.1)' }}>
                    <feature.icon size={24} style={{ color: 'var(--color-emerald-400)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-navy-300)' }}>
                    {feature.desc}
                  </p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, var(--color-navy-950), var(--color-navy-900))' }}>
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="badge badge-emerald mb-4 inline-block">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-navy-300)' }}>
              Choose a plan. Play golf. Win prizes. Support charities.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Monthly Plan */}
            <AnimatedSection delay={0} direction="left">
              <GlassCard className="p-8 relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Monthly</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--color-navy-300)' }}>Perfect for trying it out</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold gradient-text">₹500</span>
                  <span className="text-sm" style={{ color: 'var(--color-navy-400)' }}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['5 score entries', 'Monthly prize draws', 'Charity support (10%+)', 'Winner verification'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-navy-200)' }}>
                      <Star size={14} style={{ color: 'var(--color-emerald-500)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-secondary w-full">
                    Get Started
                  </motion.button>
                </Link>
              </GlassCard>
            </AnimatedSection>

            {/* Yearly Plan */}
            <AnimatedSection delay={0.15} direction="right">
              <GlassCard className="p-8 relative overflow-hidden" style={{ border: '1px solid rgba(0,212,170,0.3)' }}>
                <div className="absolute top-4 right-4">
                  <span className="badge badge-success">Save ₹1,000</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Yearly</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--color-navy-300)' }}>Best value for committed golfers</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold gradient-text">₹5,000</span>
                  <span className="text-sm" style={{ color: 'var(--color-navy-400)' }}>/year</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Everything in Monthly', '₹1,000 savings', 'Priority support', 'Early draw results'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-navy-200)' }}>
                      <Star size={14} style={{ color: 'var(--color-emerald-500)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary w-full">
                    <span>Get Started</span>
                  </motion.button>
                </Link>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(245,166,35,0.05))',
                border: '1px solid rgba(0,212,170,0.15)',
              }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                Ready to Make Every <span className="gradient-text">Round Count</span>?
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--color-navy-300)' }}>
                Join thousands of golfers who play with purpose. Your next round could change someone&apos;s life.
              </p>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-base py-4 px-10"
                >
                  <span className="flex items-center gap-2">Start Your Journey <ArrowRight size={18} /></span>
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
