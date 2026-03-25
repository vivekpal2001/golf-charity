import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AnimatedSection from '../../components/ui/AnimatedSection';
import ScoreEntry from '../../components/dashboard/ScoreEntry';
import ScoreList from '../../components/dashboard/ScoreList';
import useScores from '../../hooks/useScores';

const Scores = () => {
  const { scores, loading, refresh } = useScores();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-4xl">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              My <span className="gradient-text">Scores</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>
              Your Stableford scores are your lottery numbers for the monthly draw.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <ScoreEntry onScoreAdded={refresh} />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ScoreList scores={scores} loading={loading} />
            </AnimatedSection>
          </div>

          {/* How scoring works */}
          <AnimatedSection delay={0.3} className="mt-8">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>How Scoring Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: '5-Score System', desc: 'You can keep up to 5 active scores at any time.' },
                  { title: 'FIFO Replacement', desc: 'Adding a 6th score automatically removes your oldest score.' },
                  { title: 'Lottery Numbers', desc: 'Your scores (1-45) are compared against the monthly draw numbers.' },
                ].map(item => (
                  <div key={item.title} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--color-emerald-400)' }}>{item.title}</h4>
                    <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Scores;
