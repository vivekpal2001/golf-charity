import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { 
  LayoutDashboard, Target, CreditCard, Heart, Trophy, 
  Menu, X, ChevronRight, User, Bell, Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useSubscription from '../hooks/useSubscription';
import useScores from '../hooks/useScores';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';
import ScoreEntry from '../components/dashboard/ScoreEntry';
import ScoreList from '../components/dashboard/ScoreList';
import SubscriptionCard from '../components/dashboard/SubscriptionCard';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { subscription, loading: subLoading, isActive } = useSubscription();
  const { scores, loading: scoresLoading, refresh: refreshScores } = useScores();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dashRef = useRef(null);

  useEffect(() => {
    if (dashRef.current) {
      gsap.fromTo('.dash-card', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/scores', label: 'My Scores', icon: Target },
    { path: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
    { path: '/dashboard/charity', label: 'My Charity', icon: Heart },
    { path: '/dashboard/winnings', label: 'Winnings', icon: Trophy },
    { path: '/dashboard/results', label: 'Past Results', icon: Database },
  ];

  const location = useLocation();

  return (
    <div ref={dashRef} className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <AnimatedSection className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                  Welcome back{profile?.email ? `, ${profile.email.split('@')[0]}` : ''}
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>
                  {isActive ? 'Your subscription is active. Keep entering scores!' : 'Subscribe to start entering scores and win prizes.'}
                </p>
              </div>
              <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ color: 'white' }}>
                <Menu size={24} />
              </button>
            </div>
          </AnimatedSection>

          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <div className="hidden md:block w-56 flex-shrink-0">
              <div className="glass-card p-3 sticky top-28">
                <nav className="space-y-1">
                  {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link key={item.path} to={item.path}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                          style={{
                            background: isActive ? 'rgba(0,212,170,0.1)' : 'transparent',
                            color: isActive ? 'var(--color-emerald-400)' : 'var(--color-navy-300)',
                          }}
                        >
                          <item.icon size={16} />
                          {item.label}
                        </motion.div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  className="fixed inset-0 z-50 md:hidden"
                >
                  <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                  <div className="relative w-64 h-full p-6" style={{ background: 'var(--color-navy-900)' }}>
                    <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4" style={{ color: 'white' }}>
                      <X size={20} />
                    </button>
                    <nav className="mt-12 space-y-2">
                      {navItems.map(item => (
                        <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}>
                          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium"
                            style={{
                              background: location.pathname === item.path ? 'rgba(0,212,170,0.1)' : 'transparent',
                              color: location.pathname === item.path ? 'var(--color-emerald-400)' : 'var(--color-navy-300)',
                            }}>
                            <item.icon size={16} />
                            {item.label}
                          </div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="dash-card">
                  <GlassCard className="p-5" tilt={false}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)' }}>
                        <Target size={18} style={{ color: 'var(--color-emerald-400)' }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>
                          {scoresLoading ? '—' : scores.length}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Active Scores</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
                <div className="dash-card">
                  <GlassCard className="p-5" tilt={false}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.1)' }}>
                        <CreditCard size={18} style={{ color: 'var(--color-gold-400)' }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>
                          {subLoading ? '—' : (subscription ? `₹${subscription.amount}` : 'None')}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--color-navy-400)' }}>
                          {subscription ? `${subscription.plan} plan` : 'No subscription'}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
                <div className="dash-card">
                  <GlassCard className="p-5" tilt={false}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(46,213,115,0.1)' }}>
                        <Heart size={18} style={{ color: 'var(--color-success)' }} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>
                          {subscription ? `${subscription.charity_percentage}%` : '—'}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--color-navy-400)' }}>To Charity</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="dash-card">
                  <ScoreEntry onScoreAdded={refreshScores} />
                </div>
                <div className="dash-card">
                  <ScoreList scores={scores} loading={scoresLoading} />
                </div>
                <div className="dash-card lg:col-span-2">
                  <SubscriptionCard subscription={subscription} loading={subLoading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
