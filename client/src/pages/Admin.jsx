import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  LayoutDashboard, Users, Dice5, Heart, Trophy,
  BarChart3, Plus
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';
import DrawManager from '../components/admin/DrawManager';
import UserTable from '../components/admin/UserTable';
import WinnerVerification from '../components/admin/WinnerVerification';
import CharityManager from '../components/admin/CharityManager';
import Reports from '../components/admin/Reports';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const adminRef = useRef(null);

  useEffect(() => {
    if (adminRef.current) {
      gsap.fromTo('.admin-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'draws', label: 'Draws', icon: Dice5 },
    { id: 'charities', label: 'Charities', icon: Heart },
    { id: 'winners', label: 'Winners', icon: Trophy },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const overviewStats = [
    { label: 'Total Users', value: '1,248', icon: Users, color: 'emerald' },
    { label: 'Active Subscriptions', value: '980', icon: LayoutDashboard, color: 'emerald' },
    { label: 'Total Donated', value: '₹5,20,000', icon: Heart, color: 'gold' },
    { label: 'Pending Verifications', value: '7', icon: Trophy, color: 'warning' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users': return <UserTable />;
      case 'draws': return <DrawManager />;
      case 'charities': return <CharityManager />;
      case 'winners': return <WinnerVerification />;
      case 'reports': return <Reports />;
      default: return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewStats.map((stat, i) => (
              <div key={stat.label} className="admin-card">
                <GlassCard className="p-5" tilt={false}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: stat.color === 'gold' ? 'rgba(245,166,35,0.1)' : stat.color === 'warning' ? 'rgba(255,165,2,0.1)' : 'rgba(0,212,170,0.1)' }}>
                      <stat.icon size={18}
                        style={{ color: stat.color === 'gold' ? 'var(--color-gold-400)' : stat.color === 'warning' ? 'var(--color-warning)' : 'var(--color-emerald-400)' }} />
                    </div>
                    <div>
                      <div className="text-xl font-bold" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
                      <div className="text-xs" style={{ color: 'var(--color-navy-400)' }}>{stat.label}</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="admin-card">
            <GlassCard className="p-6" tilt={false}>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Run Monthly Draw', action: () => setActiveTab('draws'), icon: Dice5 },
                  { label: 'Verify Winners', action: () => setActiveTab('winners'), icon: Trophy },
                  { label: 'Add Charity', action: () => setActiveTab('charities'), icon: Plus },
                ].map(action => (
                  <motion.button key={action.label} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={action.action}
                    className="flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <action.icon size={18} style={{ color: 'var(--color-emerald-400)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-navy-200)' }}>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      );
    }
  };

  return (
    <div ref={adminRef} className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container-custom">
          <AnimatedSection className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <span className="badge badge-warning">Admin</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              Admin <span className="gradient-text">Panel</span>
            </h1>
          </AnimatedSection>

          {/* Tab Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {tabs.map(tab => (
                <motion.button key={tab.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: activeTab === tab.id ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.03)',
                    color: activeTab === tab.id ? 'var(--color-emerald-400)' : 'var(--color-navy-300)',
                    border: activeTab === tab.id ? '1px solid rgba(0,212,170,0.3)' : '1px solid rgba(255,255,255,0.05)',
                  }}>
                  <tab.icon size={16} />
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
