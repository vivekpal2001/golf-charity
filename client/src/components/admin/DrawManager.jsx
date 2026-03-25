import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Dice5, Play, RefreshCw, Eye, Trophy } from 'lucide-react';
import { supabase } from '../../api/supabase';
import { generateDrawNumbers, findWinners } from '../../utils/drawLogic';
import { calculatePrizePool, formatCurrency } from '../../utils/prizeCalc';
import { getAllActiveUserScores } from '../../utils/scoreLogic';
import GlassCard from '../ui/GlassCard';

const DrawManager = () => {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [revealIndex, setRevealIndex] = useState(-1);
  const numbersRef = useRef([]);

  useEffect(() => {
    loadDraws();
  }, []);

  const loadDraws = async () => {
    const { data } = await supabase
      .from('draws')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    setDraws(data || []);
    setLoading(false);
  };

  const runDraw = async () => {
    setRunning(true);
    setDrawnNumbers([]);
    setWinners([]);
    setRevealIndex(-1);

    // Generate numbers
    const numbers = generateDrawNumbers();

    // Animate number reveal one by one
    for (let i = 0; i < numbers.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setDrawnNumbers(prev => [...prev, numbers[i]]);
      setRevealIndex(i);
    }

    // Find winners
    const { data: allScores } = await getAllActiveUserScores();
    const foundWinners = allScores ? findWinners(numbers, allScores) : [];
    setWinners(foundWinners);

    // Get active subscriber count for prize pool
    const { count } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const prizes = calculatePrizePool(count || 0, 500);
    const now = new Date();
    const month = now.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

    // Save draw to database
    const { data: drawData } = await supabase
      .from('draws')
      .insert([{
        month,
        numbers,
        prize_pool_total: prizes.total,
        prize_5_match: prizes.fiveMatch,
        prize_4_match: prizes.fourMatch,
        prize_3_match: prizes.threeMatch,
        status: 'pending',
      }])
      .select()
      .single();

    // Save winners
    if (drawData && foundWinners.length > 0) {
      const winnerRecords = foundWinners.map(w => ({
        draw_id: drawData.id,
        user_id: w.userId,
        match_type: w.matchType,
        prize_amount: w.matchType === '5' ? prizes.fiveMatch / foundWinners.filter(fw => fw.matchType === '5').length :
                      w.matchType === '4' ? prizes.fourMatch / foundWinners.filter(fw => fw.matchType === '4').length :
                      prizes.threeMatch / foundWinners.filter(fw => fw.matchType === '3').length,
      }));
      await supabase.from('winners').insert(winnerRecords);
    }

    setRunning(false);
    loadDraws();
  };

  const publishDraw = async (drawId) => {
    await supabase
      .from('draws')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', drawId);
    loadDraws();
  };

  return (
    <div className="space-y-6">
      {/* Run Draw */}
      <GlassCard className="p-6 md:p-8" tilt={false}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)' }}>
              <Dice5 size={20} style={{ color: 'var(--color-emerald-400)' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Monthly Draw</h2>
              <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Generate winning numbers</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={runDraw} disabled={running} className="btn-primary disabled:opacity-50">
            <span className="flex items-center gap-2">
              {running ? <><RefreshCw size={16} className="animate-spin" /> Drawing...</> : <><Play size={16} /> Run Draw</>}
            </span>
          </motion.button>
        </div>

        {/* Number Reveal */}
        {drawnNumbers.length > 0 && (
          <div className="mb-6">
            <p className="text-sm mb-4" style={{ color: 'var(--color-navy-300)' }}>Drawn Numbers:</p>
            <div className="flex gap-3 justify-center">
              {[0,1,2,3,4].map(i => (
                <motion.div key={i}
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={i <= revealIndex ? { scale: 1, rotateY: 0 } : { scale: 0.8, rotateY: 180 }}
                  transition={{ type: 'spring', stiffness: 200, delay: i <= revealIndex ? 0 : 0 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold"
                  ref={el => numbersRef.current[i] = el}
                  style={{
                    background: i <= revealIndex
                      ? 'linear-gradient(135deg, var(--color-emerald-500), var(--color-emerald-600))'
                      : 'rgba(255,255,255,0.05)',
                    color: i <= revealIndex ? 'var(--color-navy-950)' : 'var(--color-navy-600)',
                    fontFamily: 'var(--font-heading)',
                    boxShadow: i <= revealIndex ? '0 8px 25px rgba(0,212,170,0.3)' : 'none',
                  }}>
                  {drawnNumbers[i] || '?'}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Winners */}
        {winners.length > 0 && (
          <div className="p-4 rounded-xl" style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.1)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={18} style={{ color: 'var(--color-gold-400)' }} />
              <span className="font-bold" style={{ color: 'var(--color-gold-400)' }}>{winners.length} Winner(s) Found!</span>
            </div>
            <div className="space-y-2">
              {winners.map((w, i) => (
                <div key={i} className="flex justify-between text-sm p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span style={{ color: 'var(--color-navy-200)' }}>User: {w.userId.slice(0, 8)}...</span>
                  <span className="badge badge-emerald">{w.matchType}-match</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {drawnNumbers.length === 5 && winners.length === 0 && (
          <p className="text-sm text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--color-navy-400)' }}>
            No winners this draw. Jackpot rolls over!
          </p>
        )}
      </GlassCard>

      {/* Draw History */}
      <GlassCard className="p-6" tilt={false}>
        <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Draw History</h3>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="loading-shimmer h-16 rounded-xl" />)}
          </div>
        ) : draws.length === 0 ? (
          <p className="text-sm text-center py-8" style={{ color: 'var(--color-navy-400)' }}>No draws yet. Run your first draw above!</p>
        ) : (
          <div className="space-y-3">
            {draws.map(draw => (
              <div key={draw.id} className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'white' }}>{draw.month}</div>
                  <div className="flex gap-1.5 mt-1">
                    {draw.numbers?.map((n, i) => (
                      <span key={i} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(0,212,170,0.1)', color: 'var(--color-emerald-400)' }}>{n}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Pool: {formatCurrency(draw.prize_pool_total)}</span>
                  {draw.status === 'pending' ? (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => publishDraw(draw.id)}
                      className="btn-secondary text-xs py-1.5 px-3">
                      <Eye size={12} className="mr-1" /> Publish
                    </motion.button>
                  ) : (
                    <span className="badge badge-success">Published</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default DrawManager;
