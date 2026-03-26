import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Shield, Loader2, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AnimatedSection from '../../components/ui/AnimatedSection';
import GlassCard from '../../components/ui/GlassCard';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../api/supabase';

const Settings = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  useEffect(() => {
    // Populate form if metadata exists
    if (user?.user_metadata) {
      setFormData({
        firstName: user.user_metadata.first_name || '',
        lastName: user.user_metadata.last_name || '',
        phone: user.user_metadata.phone || ''
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      // Update Supabase Auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone
        }
      });

      if (authError) throw authError;

      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-3xl">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              Personal <span className="gradient-text">Settings</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>
              Manage your personal information and account preferences.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <GlassCard className="p-6 md:p-8">
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Email (Read Only) */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>
                    Email Address <span className="text-xs" style={{ color: 'var(--color-navy-400)' }}>(Cannot be changed)</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-navy-400)' }} />
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full pl-12 pr-4 py-3 rounded-xl text-sm transition-all"
                      style={{ 
                        background: 'rgba(255,255,255,0.02)', 
                        border: '1px solid rgba(255,255,255,0.04)',
                        color: 'var(--color-navy-400)',
                        cursor: 'not-allowed'
                      }}
                    />
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>First Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-emerald-500)' }} />
                      <input
                        type="text"
                        placeholder="Tiger"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>Last Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-emerald-500)' }} />
                      <input
                        type="text"
                        placeholder="Woods"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-navy-200)' }}>Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-emerald-500)' }} />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="input-field pl-12"
                    />
                  </div>
                </div>

                <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Role Display */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.1)' }}>
                      <Shield size={14} style={{ color: 'var(--color-emerald-400)' }} />
                      <span className="text-xs font-semibold uppercase" style={{ color: 'var(--color-emerald-400)', letterSpacing: '0.05em' }}>
                        Account Role: {profile?.role || 'User'}
                      </span>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {successMsg && (
                        <span className="text-sm flex items-center gap-1" style={{ color: 'var(--color-emerald-400)' }}>
                          <CheckCircle size={14} /> {successMsg}
                        </span>
                      )}
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="btn-primary w-full sm:w-auto min-w-[140px]"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {loading ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}
                        </span>
                      </button>
                    </div>
                    
                  </div>
                </div>

              </form>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
