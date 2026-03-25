import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Search, Users } from 'lucide-react';
import { supabase } from '../api/supabase';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';

const Charities = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCharities();
  }, []);

  const loadCharities = async () => {
    const { data } = await supabase
      .from('charities')
      .select('*')
      .order('is_featured', { ascending: false });
    setCharities(data || []);
    setLoading(false);
  };

  const filtered = charities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Default charities for display when DB is empty
  const defaultCharities = [
    { id: '1', name: 'Golf for Good Foundation', description: 'Providing golf scholarships and equipment to underprivileged youth across India. Empowering the next generation through sport.', is_featured: true, image_url: null },
    { id: '2', name: 'Green Earth Initiative', description: 'Environmental conservation and sustainable golf course management. Planting trees and preserving natural habitats.', is_featured: true, image_url: null },
    { id: '3', name: 'Sports for All', description: 'Making sports accessible to children with disabilities. Building adaptive sports programs nationwide.', is_featured: false, image_url: null },
    { id: '4', name: 'Rural Education Trust', description: 'Funding education programs in rural India. Building schools, training teachers, and providing resources.', is_featured: false, image_url: null },
    { id: '5', name: 'Health & Wellness Fund', description: 'Supporting mental health programs for athletes and providing healthcare access to underserved communities.', is_featured: false, image_url: null },
    { id: '6', name: 'Youth Sports Academy', description: 'Creating pathways for talented young athletes from economically weaker backgrounds to pursue professional sports.', is_featured: false, image_url: null },
  ];

  const displayCharities = filtered.length > 0 ? filtered : (search ? [] : defaultCharities);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.08), transparent 70%)', top: '0%', left: '20%' }} />
        </div>
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="badge badge-emerald mb-4 inline-block">
              <Heart size={12} className="inline mr-1" />
              Our Charities
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              Where Your <span className="gradient-text">Impact</span> Goes
            </h1>
            <p className="text-lg" style={{ color: 'var(--color-navy-300)', lineHeight: 1.7 }}>
              Every subscription supports real charities doing real work. Choose where your contribution makes the biggest difference.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search */}
      <section className="pb-8">
        <div className="container-custom max-w-2xl">
          <AnimatedSection>
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-navy-400)' }} />
              <input
                type="text"
                placeholder="Search charities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-12"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Charity Grid */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="glass-card p-8 h-64 loading-shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCharities.map((charity, i) => (
                <AnimatedSection key={charity.id} delay={i * 0.08} direction="up">
                  <Link to={`/charities/${charity.id}`}>
                    <GlassCard className="p-8 h-full flex flex-col">
                      {charity.is_featured && (
                        <span className="badge badge-emerald mb-4 self-start">Featured</span>
                      )}
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                        style={{ background: `linear-gradient(135deg, rgba(0,212,170,0.15), rgba(245,166,35,0.1))` }}>
                        <Heart size={24} style={{ color: 'var(--color-emerald-400)' }} />
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                        {charity.name}
                      </h3>
                      <p className="text-sm flex-1 mb-5" style={{ color: 'var(--color-navy-300)', lineHeight: 1.7 }}>
                        {charity.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-emerald-400)' }}>
                        Learn More <ArrowRight size={14} />
                      </div>
                    </GlassCard>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}

          {!loading && displayCharities.length === 0 && search && (
            <AnimatedSection className="text-center py-16">
              <p className="text-lg" style={{ color: 'var(--color-navy-400)' }}>No charities found matching "{search}"</p>
            </AnimatedSection>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Charities;
