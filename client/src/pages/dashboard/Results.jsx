import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Trophy, Heart, Users } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AnimatedSection from '../../components/ui/AnimatedSection';
import GlassCard from '../../components/ui/GlassCard';
import { supabase } from '../../api/supabase';

const Results = () => {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDraws();
  }, []);

  const loadDraws = async () => {
    // Only fetch draws that have been published by the admin
    const { data, error } = await supabase
      .from('draws')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (!error) setDraws(data || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-4xl">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              Past <span className="gradient-text">Results</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>
              Total transparency. View the historic draws, winning numbers, and financial distributions.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card h-48 loading-shimmer" />
              ))}
            </div>
          ) : draws.length === 0 ? (
            <AnimatedSection>
              <GlassCard className="text-center py-16">
                <Database size={48} className="mx-auto mb-4 opacity-50" style={{ color: 'var(--color-navy-400)' }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: 'white' }}>No Published Draws Yet</h3>
                <p style={{ color: 'var(--color-navy-300)' }}>
                  Check back here after the admin publishes the first monthly draw results!
                </p>
              </GlassCard>
            </AnimatedSection>
          ) : (
            <div className="space-y-8">
              {draws.map((draw, i) => {
                const totalPrizePool = draw.prize_pool_total || 0;
                // Since 90% goes to prizes and totalPrizePool reflects that 90%, 
                // the charity amount was roughly 10% of total revenue.
                // Prize pool = revenue * 0.9. Charity = revenue * 0.1
                // Therefore, Charity = Prize Pool / 9
                const estimatedCharity = totalPrizePool / 9;

                return (
                  <AnimatedSection key={draw.id} delay={i * 0.1}>
                    <GlassCard className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                            {draw.month} Draw
                          </h2>
                          <p className="text-sm" style={{ color: 'var(--color-emerald-400)' }}>
                            Published on: {new Date(draw.published_at || draw.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Winning Numbers */}
                        <div className="flex items-center gap-2">
                          {draw.numbers.map((num, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ scale: 0, rotateY: 180 }}
                              animate={{ scale: 1, rotateY: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                              style={{ 
                                background: 'linear-gradient(135deg, var(--color-gold-400), var(--color-gold-600))',
                                border: '2px solid rgba(255,255,255,0.2)'
                              }}
                            >
                              {num}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Financial Spliits */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy size={16} style={{ color: 'var(--color-gold-400)' }} />
                            <span className="text-xs" style={{ color: 'var(--color-navy-300)' }}>Total Prize Pool</span>
                          </div>
                          <span className="text-xl font-bold text-white">₹{totalPrizePool.toFixed(2)}</span>
                        </div>

                        <div className="p-4 rounded-xl" style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.1)' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Heart size={16} style={{ color: 'var(--color-emerald-400)' }} />
                            <span className="text-xs" style={{ color: 'var(--color-emerald-400)' }}>Charity Raised</span>
                          </div>
                          <span className="text-xl font-bold text-white">~₹{estimatedCharity.toFixed(2)}</span>
                        </div>

                        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy size={16} style={{ color: 'var(--color-gold-400)' }} />
                            <span className="text-xs" style={{ color: 'var(--color-navy-300)' }}>Jackpot Rollover</span>
                          </div>
                          <span className="text-xl font-bold text-white">₹{(draw.jackpot_rollover || 0).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Prize Tiers */}
                      <div className="pt-6 mt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 className="text-sm font-semibold text-white mb-4">Prize Pool Distribution</h4>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center text-sm">
                            <span style={{ color: 'var(--color-navy-300)' }}>5 Matches (40%)</span>
                            <span className="text-white font-medium">₹{(draw.prize_5_match || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span style={{ color: 'var(--color-navy-300)' }}>4 Matches (35%)</span>
                            <span className="text-white font-medium">₹{(draw.prize_4_match || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span style={{ color: 'var(--color-navy-300)' }}>3 Matches (25%)</span>
                            <span className="text-white font-medium">₹{(draw.prize_3_match || 0).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Results;
