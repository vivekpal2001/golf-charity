import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Calendar, Trash2, Star, Target } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const ScoreList = ({ scores = [], loading = false }) => {
  if (loading) {
    return (
      <div className="glass-card p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Your Scores</h2>
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="glass-card-light p-4 rounded-xl loading-shimmer h-16" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)' }}>
            <Hash size={20} style={{ color: 'var(--color-emerald-400)' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Your Scores</h2>
            <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>These are your lottery numbers</p>
          </div>
        </div>
        <span className="badge badge-emerald">{scores.length} / 5</span>
      </div>

      {scores.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            <Target size={32} style={{ color: 'var(--color-navy-500)' }} />
          </div>
          <p className="text-sm" style={{ color: 'var(--color-navy-400)' }}>No scores yet. Add your first score!</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {scores.map((scoreData, index) => (
              <motion.div
                key={scoreData.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: index === 0 ? 'rgba(0,212,170,0.06)' : 'rgba(255,255,255,0.02)',
                    border: index === 0 ? '1px solid rgba(0,212,170,0.15)' : '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl"
                      style={{
                        background: index === 0
                          ? 'linear-gradient(135deg, rgba(0,212,170,0.2), rgba(0,212,170,0.05))'
                          : 'rgba(255,255,255,0.04)',
                        color: index === 0 ? 'var(--color-emerald-400)' : 'white',
                        fontFamily: 'var(--font-heading)',
                      }}>
                      {scoreData.score}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold" style={{ color: 'white' }}>
                          Score #{scores.length - index}
                        </span>
                        {index === 0 && (
                          <span className="badge badge-success text-[10px] py-0.5 px-2">Latest</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--color-navy-400)' }}>
                        <Calendar size={11} />
                        {new Date(scoreData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Score visualizer */}
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(scoreData.score / 45) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(to right, var(--color-emerald-500), var(--color-emerald-400))' }}
                      />
                    </div>
                    <span className="text-xs font-mono" style={{ color: 'var(--color-navy-400)' }}>
                      {Math.round((scoreData.score / 45) * 100)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Score progress bar */}
      <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--color-navy-400)' }}>
          <span>Score slots used</span>
          <span>{scores.length} of 5</span>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(scores.length / 5) * 100}%` }}
            className="h-full rounded-full"
            style={{ background: scores.length >= 5 ? 'var(--color-gold-500)' : 'var(--color-emerald-500)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreList;
