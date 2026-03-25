import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Mail, Lock, UserPlus, Eye, EyeOff, Trophy } from 'lucide-react';
import { signUp } from '../api/supabase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { error: authError } = await signUp(email, password);

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.08), transparent 70%)', top: '5%', left: '10%' }} />
        <div className="absolute w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.05), transparent 70%)', bottom: '5%', right: '10%' }} />
      </div>

      <div ref={formRef} className="w-full max-w-md mx-4 relative z-10 mt-20">
        <div className="glass-card p-8 md:p-10">
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(46,213,115,0.15)' }}
              >
                <Trophy size={32} style={{ color: 'var(--color-success)' }} />
              </motion.div>
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Account Created!</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--color-navy-300)' }}>
                Check your email to verify your account, then sign in to get started.
              </p>
              <Link to="/login">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary px-8">
                  <span>Go to Login</span>
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(0,212,170,0.1)' }}
                >
                  <UserPlus size={28} style={{ color: 'var(--color-emerald-400)' }} />
                </motion.div>
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Join GolfCharity</h1>
                <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>Start playing with purpose</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl text-sm"
                  style={{ background: 'rgba(255,71,87,0.1)', color: 'var(--color-danger)', border: '1px solid rgba(255,71,87,0.2)' }}
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-navy-400)' }} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" required className="input-field pl-11" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-navy-400)' }} />
                    <input type={showPassword ? 'text' : 'password'} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters" required className="input-field pl-11 pr-11" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-navy-400)' }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>Confirm Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-navy-400)' }} />
                    <input type="password" value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password" required className="input-field pl-11" />
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                  <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                </motion.button>
              </form>

              <p className="text-center text-sm mt-6" style={{ color: 'var(--color-navy-300)' }}>
                Already have an account?{' '}
                <Link to="/login" className="font-medium" style={{ color: 'var(--color-emerald-400)' }}>Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
