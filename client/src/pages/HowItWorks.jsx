import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserPlus, CreditCard, Target, Trophy, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );

      // Animate step dots
      gsap.utils.toArray('.step-dot').forEach((dot) => {
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: dot,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: UserPlus,
      step: '01',
      title: 'Sign Up & Subscribe',
      desc: 'Create your account and choose a monthly (₹500) or yearly (₹5,000) plan. Select a charity you want to support.',
      details: ['Quick email registration', 'Choose your preferred plan', 'Pick a charity close to your heart'],
    },
    {
      icon: Target,
      step: '02',
      title: 'Enter Your Scores',
      desc: 'After each round, submit your Stableford score (1-45). You can keep up to 5 active scores — adding a 6th removes the oldest.',
      details: ['Scores range from 1-45', 'Maximum 5 active scores', 'Oldest auto-removed when adding 6th'],
    },
    {
      icon: Trophy,
      step: '03',
      title: 'Monthly Draw',
      desc: '5 winning numbers are drawn each month. If your scores match 3, 4, or all 5 numbers, you win from a prize pool funded by subscriptions.',
      details: ['5 random numbers drawn (1-45)', '3+ matches wins a prize', 'Prize pool: 40% / 35% / 25% split'],
    },
    {
      icon: CreditCard,
      step: '04',
      title: 'Win & Get Paid',
      desc: 'Winners are verified, then paid out. If nobody matches all 5, the jackpot rolls over — getting bigger every month.',
      details: ['Transparent verification process', 'Quick payouts after verification', '5-match jackpot rolls over'],
    },
    {
      icon: Heart,
      step: '05',
      title: 'Charity Impact',
      desc: 'At least 10% of every subscription goes directly to your chosen charity. You can increase this percentage anytime.',
      details: ['Minimum 10% to charity', 'You choose where it goes', 'Track your impact in real-time'],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.08), transparent 70%)', top: '5%', right: '10%' }} />
        </div>
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="badge badge-emerald mb-4 inline-block">Step by Step</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              How <span className="gradient-text">GolfCharity</span> Works
            </h1>
            <p className="text-lg" style={{ color: 'var(--color-navy-300)', lineHeight: 1.7 }}>
              From signup to winning prizes and supporting charities — here&apos;s everything you need to know in 5 simple steps.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="section-padding relative">
        <div className="container-custom max-w-4xl relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: 'rgba(0,212,170,0.1)' }}>
            <div className="timeline-line absolute top-0 left-0 w-full h-full origin-top" style={{ background: 'var(--color-emerald-500)' }} />
          </div>

          <div className="space-y-20">
            {steps.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className="flex-1">
                    <GlassCard className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold" style={{ color: 'var(--color-emerald-500)' }}>STEP {step.step}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)' }}>
                          <step.icon size={24} style={{ color: 'var(--color-emerald-400)' }} />
                        </div>
                        <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>{step.title}</h3>
                      </div>
                      <p className="mb-5 text-sm" style={{ color: 'var(--color-navy-300)', lineHeight: 1.7 }}>{step.desc}</p>
                      <ul className="space-y-2">
                        {step.details.map(detail => (
                          <li key={detail} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-navy-200)' }}>
                            <CheckCircle size={14} style={{ color: 'var(--color-emerald-500)' }} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </div>

                  {/* Dot */}
                  <div className="step-dot hidden md:flex w-4 h-4 rounded-full flex-shrink-0"
                    style={{ background: 'var(--color-emerald-500)', boxShadow: '0 0 20px rgba(0,212,170,0.4)' }} />

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              Simple Enough? <span className="gradient-text">Let&apos;s Go.</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--color-navy-300)' }}>Join today and start making every round count.</p>
            <Link to="/signup">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary text-base py-4 px-10">
                <span className="flex items-center gap-2">Start Playing <ArrowRight size={18} /></span>
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
