import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Check, X, Eye, Image } from 'lucide-react';
import { supabase } from '../../api/supabase';
import { formatCurrency } from '../../utils/prizeCalc';
import GlassCard from '../ui/GlassCard';

const WinnerVerification = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWinners();
  }, []);

  const loadWinners = async () => {
    const { data } = await supabase
      .from('winners')
      .select('*, draws(month, numbers), users(email)')
      .order('created_at', { ascending: false });
    setWinners(data || []);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    const updates = { status };
    if (status === 'verified') updates.verified_at = new Date().toISOString();
    if (status === 'paid') updates.paid_at = new Date().toISOString();

    await supabase.from('winners').update(updates).eq('id', id);
    loadWinners();
  };

  const statusColors = {
    pending: 'badge-warning',
    verified: 'badge-success',
    paid: 'badge-emerald',
    rejected: 'badge-danger',
  };

  return (
    <GlassCard className="p-6" tilt={false}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.1)' }}>
          <Trophy size={20} style={{ color: 'var(--color-gold-400)' }} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Winner Verification</h2>
          <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Review and verify winners</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="loading-shimmer h-20 rounded-xl" />)}
        </div>
      ) : winners.length === 0 ? (
        <p className="text-center py-8 text-sm" style={{ color: 'var(--color-navy-400)' }}>No winners to verify yet.</p>
      ) : (
        <div className="space-y-4">
          {winners.map((winner, i) => (
            <motion.div key={winner.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm" style={{ color: 'white' }}>
                      {winner.users?.email || 'Unknown User'}
                    </span>
                    <span className={`badge ${statusColors[winner.status]}`}>{winner.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-navy-400)' }}>
                    <span>{winner.match_type}-match winner</span>
                    <span>Prize: {formatCurrency(winner.prize_amount)}</span>
                    <span>{winner.draws?.month}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {winner.proof_url && (
                    <a href={winner.proof_url} target="_blank" rel="noopener noreferrer">
                      <motion.button whileHover={{ scale: 1.1 }} className="p-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-navy-300)' }}>
                        <Image size={16} />
                      </motion.button>
                    </a>
                  )}

                  {winner.status === 'pending' && (
                    <>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => updateStatus(winner.id, 'verified')}
                        className="p-2 rounded-lg" style={{ background: 'rgba(46,213,115,0.1)', color: 'var(--color-success)' }}>
                        <Check size={16} />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => updateStatus(winner.id, 'rejected')}
                        className="p-2 rounded-lg" style={{ background: 'rgba(255,71,87,0.1)', color: 'var(--color-danger)' }}>
                        <X size={16} />
                      </motion.button>
                    </>
                  )}

                  {winner.status === 'verified' && (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => updateStatus(winner.id, 'paid')}
                      className="btn-primary text-xs py-1.5 px-3">
                      <span>Mark Paid</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default WinnerVerification;
