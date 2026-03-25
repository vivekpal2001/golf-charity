import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Heart, Trophy } from 'lucide-react';
import { supabase } from '../../api/supabase';
import { formatCurrency } from '../../utils/prizeCalc';
import GlassCard from '../ui/GlassCard';

const Reports = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    totalCharity: 0,
    totalPrizesAwarded: 0,
    totalDraws: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [users, subscriptions, draws, winners] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('subscriptions').select('amount, charity_percentage, status'),
      supabase.from('draws').select('*', { count: 'exact', head: true }),
      supabase.from('winners').select('prize_amount, status'),
    ]);

    const activeSubs = (subscriptions.data || []).filter(s => s.status === 'active');
    const totalRevenue = activeSubs.reduce((sum, s) => sum + (s.amount || 0), 0);
    const avgCharityPercent = activeSubs.length > 0
      ? activeSubs.reduce((sum, s) => sum + (s.charity_percentage || 10), 0) / activeSubs.length
      : 10;
    const totalPrizes = (winners.data || [])
      .filter(w => w.status === 'paid')
      .reduce((sum, w) => sum + (w.prize_amount || 0), 0);

    setStats({
      totalUsers: users.count || 0,
      activeSubscriptions: activeSubs.length,
      totalRevenue,
      totalCharity: Math.round(totalRevenue * (avgCharityPercent / 100)),
      totalPrizesAwarded: totalPrizes,
      totalDraws: draws.count || 0,
    });

    setLoading(false);
  };

  const reportCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'emerald' },
    { label: 'Active Subscriptions', value: stats.activeSubscriptions, icon: TrendingUp, color: 'emerald' },
    { label: 'Monthly Revenue', value: formatCurrency(stats.totalRevenue), icon: BarChart3, color: 'gold' },
    { label: 'Charity Donations', value: formatCurrency(stats.totalCharity), icon: Heart, color: 'emerald' },
    { label: 'Prizes Awarded', value: formatCurrency(stats.totalPrizesAwarded), icon: Trophy, color: 'gold' },
    { label: 'Total Draws', value: stats.totalDraws, icon: BarChart3, color: 'emerald' },
  ];

  return (
    <div className="space-y-6">
      <GlassCard className="p-6" tilt={false}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)' }}>
            <BarChart3 size={20} style={{ color: 'var(--color-emerald-400)' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Reports & Analytics</h2>
            <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Platform overview</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => <div key={i} className="loading-shimmer h-24 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportCards.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}>
                <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <card.icon size={18}
                      style={{ color: card.color === 'gold' ? 'var(--color-gold-400)' : 'var(--color-emerald-400)' }} />
                    <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-navy-400)' }}>{card.label}</span>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>
                    {card.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Revenue Breakdown */}
      <GlassCard className="p-6" tilt={false}>
        <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Revenue Distribution</h3>
        <div className="space-y-4">
          {[
            { label: 'Prize Pool (90%)', percent: 90, color: 'var(--color-emerald-500)' },
            { label: 'Charity (10% min)', percent: 10, color: 'var(--color-gold-400)' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: 'var(--color-navy-200)' }}>{item.label}</span>
                <span style={{ color: item.color }}>{item.percent}%</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${item.percent}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: item.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <h4 className="text-sm font-bold mb-3" style={{ color: 'white' }}>Prize Pool Split</h4>
          <div className="space-y-3">
            {[
              { label: '5-Match (Jackpot)', percent: 40, color: 'var(--color-gold-400)' },
              { label: '4-Match', percent: 35, color: 'var(--color-emerald-400)' },
              { label: '3-Match', percent: 25, color: 'var(--color-emerald-600)' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--color-navy-300)' }}>{item.label}</span>
                  <span style={{ color: item.color }}>{item.percent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Reports;
