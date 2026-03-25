import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../api/supabase';
import GlassCard from '../ui/GlassCard';

const CharityManager = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', is_featured: false });

  useEffect(() => {
    loadCharities();
  }, []);

  const loadCharities = async () => {
    const { data } = await supabase.from('charities').select('*').order('created_at', { ascending: false });
    setCharities(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;

    if (editing) {
      await supabase.from('charities').update(form).eq('id', editing);
    } else {
      await supabase.from('charities').insert([form]);
    }

    setForm({ name: '', description: '', is_featured: false });
    setEditing(null);
    setShowForm(false);
    loadCharities();
  };

  const handleEdit = (charity) => {
    setForm({ name: charity.name, description: charity.description || '', is_featured: charity.is_featured });
    setEditing(charity.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this charity?')) {
      await supabase.from('charities').delete().eq('id', id);
      loadCharities();
    }
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <GlassCard className="p-6" tilt={false}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)' }}>
              <Heart size={20} style={{ color: 'var(--color-emerald-400)' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Charities</h2>
              <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>{charities.length} charities</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', description: '', is_featured: false }); }}
            className="btn-primary text-sm py-2 px-4">
            <span className="flex items-center gap-2">{showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add</>}</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <div className="space-y-4 p-4 rounded-xl mb-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <input type="text" placeholder="Charity name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input-field" />
                <textarea placeholder="Description" value={form.description} rows={3}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="input-field resize-none" />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--color-navy-200)' }}>
                    <input type="checkbox" checked={form.is_featured}
                      onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded" />
                    Featured Charity
                  </label>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={handleSave} className="btn-primary text-sm py-2 px-6">
                    <span className="flex items-center gap-2"><Save size={14} /> {editing ? 'Update' : 'Save'}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Charity List */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="loading-shimmer h-16 rounded-xl" />)}
          </div>
        ) : charities.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: 'var(--color-navy-400)' }}>No charities added yet.</p>
        ) : (
          <div className="space-y-3">
            {charities.map(charity => (
              <div key={charity.id} className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex items-center gap-3">
                  <Heart size={16} style={{ color: 'var(--color-emerald-400)' }} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm" style={{ color: 'white' }}>{charity.name}</span>
                      {charity.is_featured && <span className="badge badge-emerald text-[10px]">Featured</span>}
                    </div>
                    {charity.description && (
                      <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-navy-400)' }}>{charity.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleEdit(charity)}
                    className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--color-navy-300)' }}>
                    <Edit size={14} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(charity.id)}
                    className="p-2 rounded-lg" style={{ background: 'rgba(255,71,87,0.1)', color: 'var(--color-danger)' }}>
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default CharityManager;
