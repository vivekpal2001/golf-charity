import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { supabase } from '../../api/supabase';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AnimatedSection from '../../components/ui/AnimatedSection';
import GlassCard from '../../components/ui/GlassCard';

const Charity = () => {
  const { user } = useAuth();
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [percentage, setPercentage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const defaultCharities = [
    { id: '1', name: 'Golf for Good Foundation', description: 'Golf scholarships for underprivileged youth.' },
    { id: '2', name: 'Green Earth Initiative', description: 'Environmental conservation programs.' },
    { id: '3', name: 'Sports for All', description: 'Adaptive sports for children with disabilities.' },
    { id: '4', name: 'Rural Education Trust', description: 'Schools and education in rural India.' },
    { id: '5', name: 'Health & Wellness Fund', description: 'Mental health and healthcare access.' },
    { id: '6', name: 'Youth Sports Academy', description: 'Pathways for talented underprivileged athletes.' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: charityData } = await supabase.from('charities').select('*');
    setCharities(charityData?.length > 0 ? charityData : defaultCharities);

    if (user) {
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('charity_id, charity_percentage')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      
      if (sub) {
        setSelectedCharity(sub.charity_id);
        setPercentage(sub.charity_percentage || 10);
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!selectedCharity) return;
    setSaving(true);

    await supabase
      .from('subscriptions')
      .update({ charity_id: selectedCharity, charity_percentage: percentage })
      .eq('user_id', user.id)
      .eq('status', 'active');

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-4xl">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              My <span className="gradient-text">Charity</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>
              Choose where your contribution goes and set your donation percentage.
            </p>
          </AnimatedSection>

          {/* Percentage Slider */}
          <AnimatedSection delay={0.1} className="mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Donation Percentage</h3>
                <span className="text-2xl font-bold gradient-text">{percentage}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={percentage}
                onChange={(e) => setPercentage(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-emerald-500) ${((percentage - 10) / 90) * 100}%, rgba(255,255,255,0.08) ${((percentage - 10) / 90) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--color-navy-500)' }}>
                <span>10% (minimum)</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Charity Grid */}
          <AnimatedSection delay={0.2}>
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Select a Charity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {charities.map(charity => (
                <motion.div key={charity.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <div
                    className="glass-card p-5 cursor-pointer transition-all"
                    onClick={() => setSelectedCharity(charity.id)}
                    style={{
                      borderColor: selectedCharity === charity.id ? 'rgba(0,212,170,0.4)' : undefined,
                      background: selectedCharity === charity.id ? 'rgba(0,212,170,0.06)' : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(0,212,170,0.1)' }}>
                          <Heart size={18} style={{ color: 'var(--color-emerald-400)' }} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm" style={{ color: 'white' }}>{charity.name}</h4>
                          <p className="text-xs mt-1" style={{ color: 'var(--color-navy-400)' }}>{charity.description}</p>
                        </div>
                      </div>
                      {selectedCharity === charity.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check size={20} style={{ color: 'var(--color-emerald-400)' }} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Save Button */}
          <AnimatedSection delay={0.3} className="mt-8">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                disabled={!selectedCharity || saving}
                className="btn-primary disabled:opacity-40"
              >
                <span>{saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Charity Preferences'}</span>
              </motion.button>
              {saved && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm" style={{ color: 'var(--color-success)' }}>
                  Your preferences have been updated
                </motion.span>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Charity;
