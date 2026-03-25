import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Users, TrendingUp, Globe } from 'lucide-react';
import { supabase } from '../api/supabase';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';

const CharityDetail = () => {
  const { id } = useParams();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultCharities = {
    '1': { id: '1', name: 'Golf for Good Foundation', description: 'Providing golf scholarships and equipment to underprivileged youth across India. Empowering the next generation through sport. Our mission is to create equal opportunities in golf regardless of economic background.', is_featured: true },
    '2': { id: '2', name: 'Green Earth Initiative', description: 'Environmental conservation and sustainable golf course management. Planting trees and preserving natural habitats around golf courses worldwide.', is_featured: true },
    '3': { id: '3', name: 'Sports for All', description: 'Making sports accessible to children with disabilities. Building adaptive sports programs nationwide and providing specialized equipment.', is_featured: false },
    '4': { id: '4', name: 'Rural Education Trust', description: 'Funding education programs in rural India. Building schools, training teachers, and providing resources to communities that need them most.', is_featured: false },
    '5': { id: '5', name: 'Health & Wellness Fund', description: 'Supporting mental health programs for athletes and providing healthcare access to underserved communities across the country.', is_featured: false },
    '6': { id: '6', name: 'Youth Sports Academy', description: 'Creating pathways for talented young athletes from economically weaker backgrounds to pursue professional sports careers.', is_featured: false },
  };

  useEffect(() => {
    loadCharity();
  }, [id]);

  const loadCharity = async () => {
    const { data } = await supabase
      .from('charities')
      .select('*')
      .eq('id', id)
      .single();

    setCharity(data || defaultCharities[id] || null);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
        <Navbar />
        <div className="pt-32 container-custom">
          <div className="glass-card p-12 loading-shimmer h-96" />
        </div>
      </div>
    );
  }

  if (!charity) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
        <Navbar />
        <div className="pt-32 container-custom text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'white' }}>Charity Not Found</h1>
          <Link to="/charities" className="text-sm" style={{ color: 'var(--color-emerald-400)' }}>← Back to Charities</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />

      <section className="pt-32 pb-8">
        <div className="container-custom">
          <Link to="/charities" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white"
            style={{ color: 'var(--color-navy-300)' }}>
            <ArrowLeft size={16} /> Back to Charities
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            <GlassCard className="p-10 md:p-14">
              {charity.is_featured && <span className="badge badge-emerald mb-6 inline-block">Featured Charity</span>}
              
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.15), rgba(245,166,35,0.1))' }}>
                  <Heart size={32} style={{ color: 'var(--color-emerald-400)' }} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                  {charity.name}
                </h1>
              </div>

              <p className="text-base mb-10" style={{ color: 'var(--color-navy-200)', lineHeight: 1.8 }}>
                {charity.description}
              </p>

              {/* Impact Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: Users, label: 'Supporters', value: '120+' },
                  { icon: TrendingUp, label: 'Total Raised', value: '₹2,50,000' },
                  { icon: Globe, label: 'Communities Served', value: '15+' },
                ].map(stat => (
                  <div key={stat.label} className="glass-card-light p-5 text-center rounded-xl">
                    <stat.icon size={20} className="mx-auto mb-2" style={{ color: 'var(--color-emerald-400)' }} />
                    <div className="text-xl font-bold" style={{ color: 'white' }}>{stat.value}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--color-navy-400)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
                    <span className="flex items-center gap-2"><Heart size={16} /> Support This Charity</span>
                  </motion.button>
                </Link>
                <Link to="/charities">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary">
                    View All Charities
                  </motion.button>
                </Link>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CharityDetail;
