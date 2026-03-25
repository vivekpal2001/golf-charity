import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Upload, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { supabase } from '../../api/supabase';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/prizeCalc';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AnimatedSection from '../../components/ui/AnimatedSection';
import GlassCard from '../../components/ui/GlassCard';

const Winnings = () => {
  const { user } = useAuth();
  const [winnings, setWinnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWinnings();
  }, []);

  const loadWinnings = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('winners')
      .select('*, draws(month, numbers)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setWinnings(data || []);
    setLoading(false);
  };

  const handleUploadProof = async (winningId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const fileName = `proofs/${user.id}/${winningId}_${Date.now()}.${file.name.split('.').pop()}`;
      const { data: uploadData, error } = await supabase.storage
        .from('proofs')
        .upload(fileName, file);

      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('proofs').getPublicUrl(fileName);
        
        await supabase
          .from('winners')
          .update({ proof_url: publicUrl })
          .eq('id', winningId);

        loadWinnings();
      }
    };
    input.click();
  };

  const statusConfig = {
    pending: { icon: Clock, badge: 'badge-warning', label: 'Pending' },
    verified: { icon: CheckCircle, badge: 'badge-success', label: 'Verified' },
    paid: { icon: DollarSign, badge: 'badge-emerald', label: 'Paid' },
    rejected: { icon: XCircle, badge: 'badge-danger', label: 'Rejected' },
  };

  const totalWon = winnings
    .filter(w => w.status === 'paid' || w.status === 'verified')
    .reduce((sum, w) => sum + (w.prize_amount || 0), 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-4xl">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              My <span className="gradient-text">Winnings</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>
              Track your prizes and manage verification.
            </p>
          </AnimatedSection>

          {/* Total Won */}
          <AnimatedSection delay={0.1} className="mb-8">
            <GlassCard className="p-8 text-center" tilt={false}>
              <Trophy size={32} className="mx-auto mb-3" style={{ color: 'var(--color-gold-400)' }} />
              <div className="text-4xl font-bold gradient-text mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {formatCurrency(totalWon)}
              </div>
              <p className="text-sm" style={{ color: 'var(--color-navy-400)' }}>Total Winnings</p>
            </GlassCard>
          </AnimatedSection>

          {/* Winnings List */}
          <AnimatedSection delay={0.2}>
            {loading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => <div key={i} className="glass-card p-6 loading-shimmer h-24" />)}
              </div>
            ) : winnings.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <Trophy size={48} className="mx-auto mb-4" style={{ color: 'var(--color-navy-500)' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: 'white' }}>No Winnings Yet</h3>
                <p className="text-sm" style={{ color: 'var(--color-navy-400)' }}>Keep entering scores — the next draw could be yours!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {winnings.map((win, i) => {
                    const status = statusConfig[win.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    return (
                      <motion.div
                        key={win.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <GlassCard className="p-6" tilt={false}>
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.15), rgba(245,166,35,0.05))' }}>
                                <Trophy size={22} style={{ color: 'var(--color-gold-400)' }} />
                              </div>
                              <div>
                                <div className="font-bold" style={{ color: 'white' }}>
                                  {win.match_type}-Match Winner
                                </div>
                                <div className="text-xs" style={{ color: 'var(--color-navy-400)' }}>
                                  {win.draws?.month || 'Unknown Draw'} • {formatCurrency(win.prize_amount)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`badge ${status.badge}`}>
                                <StatusIcon size={12} className="mr-1" />
                                {status.label}
                              </span>
                              {win.status === 'pending' && !win.proof_url && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleUploadProof(win.id)}
                                  className="btn-secondary text-xs py-1.5 px-3"
                                >
                                  <Upload size={12} className="mr-1" />
                                  Upload Proof
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Winnings;
