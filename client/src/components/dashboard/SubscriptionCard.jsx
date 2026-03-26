import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { createCheckoutSession } from '../../api/stripe';

const SubscriptionCard = ({ subscription, loading, user }) => {
  const [processingPlan, setProcessingPlan] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const handleSubscribe = async (plan) => {
    setProcessingPlan(plan);
    const priceId = plan === 'monthly' ? 'price_1TEocPEGq4q5nGfGD5DhZ1Gp' : 'price_1TEocvEGq4q5nGfGhpNZKGzs';
    try {
      await createCheckoutSession(priceId, user.id, null, 10);
    } catch (err) {
      console.error('Checkout error:', err);
      setProcessingPlan(null);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription? You will lose access at the end of your billing cycle.')) return;
    
    setCancelling(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/stripe/cancel-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subscription.stripe_subscription_id })
      });
      if (res.ok) {
        window.location.reload(); // Quick refresh to show cancelled state
      }
    } catch (err) {
      console.error('Cancel error:', err);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Subscription</h2>
        <div className="loading-shimmer h-40 rounded-xl" />
      </div>
    );
  }

  const statusConfig = {
    active: { icon: CheckCircle, badge: 'badge-success', label: 'Active' },
    cancelled: { icon: XCircle, badge: 'badge-danger', label: 'Cancelled' },
    expired: { icon: Clock, badge: 'badge-warning', label: 'Expired' },
  };

  if (subscription) {
    const status = statusConfig[subscription.status] || statusConfig.active;
    const StatusIcon = status.icon;

    return (
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,212,170,0.1)' }}>
              <CreditCard size={20} style={{ color: 'var(--color-emerald-400)' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Subscription</h2>
              <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Your current plan</p>
            </div>
          </div>
          <span className={`badge ${status.badge}`}>
            <StatusIcon size={12} className="mr-1" />
            {status.label}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-sm" style={{ color: 'var(--color-navy-300)' }}>Plan</span>
            <span className="font-semibold capitalize" style={{ color: 'white' }}>{subscription.plan}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-sm" style={{ color: 'var(--color-navy-300)' }}>Amount</span>
            <span className="font-semibold gradient-text">₹{subscription.amount}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <span className="text-sm" style={{ color: 'var(--color-navy-300)' }}>Charity Donation</span>
            <span className="font-semibold" style={{ color: 'var(--color-emerald-400)' }}>{subscription.charity_percentage}%</span>
          </div>
          {subscription.current_period_end && (
            <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span className="text-sm" style={{ color: 'var(--color-navy-300)' }}>Renews On</span>
              <span className="text-sm" style={{ color: 'white' }}>
                {new Date(subscription.current_period_end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          )}
        </div>

        {subscription.status === 'active' && (
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="w-full py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-400"
              style={{ border: '1px solid rgba(239, 68, 68, 0.2)', color: 'rgba(239, 68, 68, 0.8)' }}
            >
              {cancelling ? <Loader2 size={16} className="animate-spin" /> : 'Cancel Subscription'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // No subscription — show plan options
  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,165,2,0.1)' }}>
          <CreditCard size={20} style={{ color: 'var(--color-gold-400)' }} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Subscribe Now</h2>
          <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Choose a plan to start playing</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-5 rounded-xl transition-all"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h3 className="font-bold" style={{ color: 'white' }}>Monthly</h3>
              <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Cancel anytime</p>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-6">
              <span className="text-xl font-bold gradient-text">₹500<span className="text-xs" style={{ color: 'var(--color-navy-400)' }}>/mo</span></span>
              <button 
                onClick={() => handleSubscribe('monthly')}
                disabled={processingPlan !== null}
                className="btn-primary py-2 px-6 text-sm flex items-center justify-center min-w-[120px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {processingPlan === 'monthly' ? <Loader2 size={16} className="animate-spin" /> : 'Select'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl transition-all"
          style={{ background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.15)' }}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold" style={{ color: 'white' }}>Yearly</h3>
                <span className="badge badge-success text-[10px] py-0.5">Save ₹1,000</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-navy-400)' }}>Best value</p>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-6">
              <span className="text-xl font-bold gradient-text">₹5,000<span className="text-xs" style={{ color: 'var(--color-navy-400)' }}>/yr</span></span>
              <button 
                onClick={() => handleSubscribe('yearly')}
                disabled={processingPlan !== null}
                className="btn-primary py-2 px-6 text-sm flex items-center justify-center min-w-[120px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {processingPlan === 'yearly' ? <Loader2 size={16} className="animate-spin" /> : 'Select'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
