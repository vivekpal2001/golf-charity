import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Heart, Mail, ExternalLink } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { label: 'How It Works', path: '/how-it-works' },
      { label: 'Charities', path: '/charities' },
      { label: 'Pricing', path: '/signup' },
    ],
    Account: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'My Scores', path: '/dashboard/scores' },
      { label: 'Winnings', path: '/dashboard/winnings' },
    ],
    Legal: [
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
      { label: 'Cookie Policy', path: '#' },
    ],
  };

  return (
    <footer
      className="relative"
      style={{
        borderTop: '1px solid rgba(0, 212, 170, 0.1)',
        background: 'linear-gradient(to bottom, var(--color-navy-950), #060a14)',
      }}
    >
      <div className="container-custom py-16">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Trophy size={24} style={{ color: 'var(--color-emerald-500)' }} />
                <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="gradient-text">Golf</span>
                  <span style={{ color: 'white' }}>Charity</span>
                </span>
              </Link>
              <p className="text-sm mb-6" style={{ color: 'var(--color-navy-300)', lineHeight: 1.7 }}>
                Play golf. Win prizes. Change lives. A platform where every round counts towards making a difference.
              </p>
              <div className="flex items-center gap-2">
                <Heart size={14} style={{ color: 'var(--color-emerald-500)' }} />
                <span className="text-xs" style={{ color: 'var(--color-navy-400)' }}>
                  Empowering charities through golf
                </span>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4
                  className="text-sm font-semibold mb-4 uppercase tracking-wider"
                  style={{ color: 'var(--color-emerald-400)' }}
                >
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm transition-colors duration-300 hover:text-white"
                        style={{ color: 'var(--color-navy-300)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>
            © {currentYear} GolfCharity. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <motion.a
              href="mailto:hello@golfcharity.com"
              whileHover={{ scale: 1.1, color: '#00d4aa' }}
              className="transition-colors"
              style={{ color: 'var(--color-navy-400)' }}
            >
              <Mail size={18} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, color: '#00d4aa' }}
              className="transition-colors"
              style={{ color: 'var(--color-navy-400)' }}
            >
              <ExternalLink size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
