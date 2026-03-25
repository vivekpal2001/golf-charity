import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Menu, X, Trophy, Heart, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../api/supabase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/charities', label: 'Charities' },
  ];

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10, 15, 28, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 212, 170, 0.1)' : '1px solid transparent',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Trophy size={28} style={{ color: 'var(--color-emerald-500)' }} />
          </motion.div>
          <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="gradient-text">Golf</span>
            <span style={{ color: 'white' }}>Charity</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative text-sm font-medium transition-colors duration-300"
              style={{
                color: location.pathname === link.path ? 'var(--color-emerald-400)' : 'var(--color-navy-200)',
              }}
            >
              <motion.span whileHover={{ color: '#00e8bc' }}>
                {link.label}
              </motion.span>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ background: 'var(--color-emerald-500)' }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      background: 'rgba(245, 166, 35, 0.15)',
                      color: 'var(--color-gold-400)',
                      border: '1px solid rgba(245, 166, 35, 0.3)',
                    }}
                  >
                    <Shield size={16} />
                    Admin
                  </motion.button>
                </Link>
              )}
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  <User size={16} />
                  Dashboard
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm py-2 px-4 rounded-lg transition-colors"
                style={{ color: 'var(--color-navy-300)' }}
              >
                <LogOut size={16} />
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  style={{ color: 'var(--color-navy-200)' }}
                >
                  Log In
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-sm py-2 px-5"
                >
                  <span>Get Started</span>
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: 'white' }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{
              background: 'rgba(10, 15, 28, 0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
              >
                <Link
                  to={link.path}
                  className="text-2xl font-bold"
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: location.pathname === link.path ? 'var(--color-emerald-400)' : 'white',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div custom={navLinks.length} initial="hidden" animate="visible" variants={linkVariants}>
              {user ? (
                <div className="flex flex-col items-center gap-4">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="btn-primary px-8">
                    <span>Dashboard</span>
                  </Link>
                  <button onClick={() => { handleSignOut(); setIsOpen(false); }} style={{ color: 'var(--color-navy-300)' }}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="btn-primary px-8">
                    <span>Get Started</span>
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} style={{ color: 'var(--color-navy-300)' }}>
                    Log In
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
