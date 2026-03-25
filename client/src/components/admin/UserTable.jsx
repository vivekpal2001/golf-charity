import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Calendar, Crown } from 'lucide-react';
import { supabase } from '../../api/supabase';
import GlassCard from '../ui/GlassCard';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await supabase
      .from('users')
      .select('*, subscriptions(plan, status, amount)')
      .order('created_at', { ascending: false });
    setUsers(data || []);
    setLoading(false);
  };

  const filtered = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await supabase.from('users').update({ role: newRole }).eq('id', userId);
    loadUsers();
  };

  return (
    <GlassCard className="p-6" tilt={false}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)' }}>
            <Users size={20} style={{ color: 'var(--color-emerald-400)' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Users</h2>
            <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>{users.length} total</p>
          </div>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-navy-400)' }} />
          <input type="text" placeholder="Search by email..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm w-64" />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => <div key={i} className="loading-shimmer h-14 rounded-xl" />)}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Email', 'Role', 'Plan', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-navy-400)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => {
                const sub = user.subscriptions?.[0];
                return (
                  <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Mail size={14} style={{ color: 'var(--color-navy-400)' }} />
                        <span className="text-sm" style={{ color: 'var(--color-navy-200)' }}>{user.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${user.role === 'admin' ? 'badge-warning' : 'badge-emerald'}`}>
                        {user.role === 'admin' && <Crown size={10} className="mr-1" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm capitalize" style={{ color: 'var(--color-navy-200)' }}>
                        {sub?.plan || '—'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {sub ? (
                        <span className={`badge ${sub.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                          {sub.status}
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: 'var(--color-navy-500)' }}>No sub</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs" style={{ color: 'var(--color-navy-400)' }}>
                        {new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => toggleRole(user.id, user.role)}
                        className="text-xs px-3 py-1 rounded-lg transition-colors"
                        style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--color-navy-300)' }}>
                        Toggle Role
                      </motion.button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center py-8 text-sm" style={{ color: 'var(--color-navy-400)' }}>No users found.</p>
          )}
        </div>
      )}
    </GlassCard>
  );
};

export default UserTable;
