import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { addScore } from '../../utils/scoreLogic';
import { useAuth } from '../../context/AuthContext';
import { Target, Calendar, AlertCircle } from 'lucide-react';

const ScoreEntry = ({ onScoreAdded }) => {
  const { user } = useAuth();
  const [score, setScore] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const sliderRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const scoreNum = parseInt(score);
    if (scoreNum < 1 || scoreNum > 45) {
      setError('Score must be between 1 and 45');
      setLoading(false);
      return;
    }

    const { error: addError } = await addScore(user.id, scoreNum, date);

    if (addError) {
      setError(addError.message);
    } else {
      setSuccess(true);
      setScore('');
      setDate('');
      if (onScoreAdded) onScoreAdded();

      // Reset success after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }

    setLoading(false);
  };

  const scoreValue = parseInt(score) || 0;
  const scorePercent = (scoreValue / 45) * 100;

  return (
    <div ref={formRef} className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(0,212,170,0.1)' }}>
          <Target size={20} style={{ color: 'var(--color-emerald-400)' }} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Enter New Score</h2>
          <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Stableford format (1-45)</p>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mb-5 p-4 rounded-xl flex items-center gap-3 text-sm"
            style={{ background: 'rgba(255,71,87,0.1)', color: 'var(--color-danger)', border: '1px solid rgba(255,71,87,0.2)' }}>
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mb-5 p-4 rounded-xl text-sm"
            style={{ background: 'rgba(46,213,115,0.1)', color: 'var(--color-success)', border: '1px solid rgba(46,213,115,0.2)' }}>
            ✓ Score added successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>
            <Calendar size={14} /> Date
          </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>
            Score: <span className="gradient-text font-bold text-lg">{scoreValue || '—'}</span>
          </label>
          <input
            ref={sliderRef}
            type="range"
            min="1"
            max="45"
            value={score || 1}
            onChange={(e) => setScore(e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-emerald-500) ${scorePercent}%, rgba(255,255,255,0.08) ${scorePercent}%)`,
            }}
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-navy-500)' }}>
            <span>1</span>
            <span>15</span>
            <span>30</span>
            <span>45</span>
          </div>
          {/* Also allow numeric input */}
          <input type="number" min="1" max="45" value={score} onChange={(e) => setScore(e.target.value)}
            placeholder="Or type score..." className="input-field mt-3 text-center text-lg font-bold" />
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          type="submit" disabled={loading || !score || !date}
          className="btn-primary w-full py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
          <span>{loading ? 'Adding...' : 'Add Score'}</span>
        </motion.button>
      </form>

      <p className="text-xs mt-4" style={{ color: 'var(--color-navy-500)' }}>
        ⓘ You can keep up to 5 scores. Adding a 6th removes your oldest.
      </p>
    </div>
  );
};

export default ScoreEntry;
