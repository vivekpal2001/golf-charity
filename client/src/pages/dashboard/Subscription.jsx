import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AnimatedSection from '../../components/ui/AnimatedSection';
import SubscriptionCard from '../../components/dashboard/SubscriptionCard';
import useSubscription from '../../hooks/useSubscription';
import useAuth from '../../hooks/useAuth';

const Subscription = () => {
  const { user } = useAuth();
  const { subscription, loading, refresh } = useSubscription();
  const [searchParams, setSearchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(false);

  // After Stripe redirects back, verify the session and save to DB
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId || verifying) return;

    const verifySession = async () => {
      setVerifying(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/api/stripe/verify-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        const result = await response.json();
        console.log('✅ Verify result:', result);

        // Remove session_id from URL
        searchParams.delete('session_id');
        setSearchParams(searchParams, { replace: true });

        // Refresh subscription data
        await refresh();
      } catch (err) {
        console.error('Verify error:', err);
      } finally {
        setVerifying(false);
      }
    };

    verifySession();
  }, [searchParams]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-navy-950)' }}>
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container-custom max-w-2xl">
          <AnimatedSection className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
              My <span className="gradient-text">Subscription</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>
              Manage your subscription plan and payment details.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {verifying ? (
              <div className="glass-card p-6 md:p-8 text-center">
                <div className="loading-shimmer h-8 w-48 mx-auto rounded-lg mb-4" />
                <p className="text-sm" style={{ color: 'var(--color-emerald-400)' }}>
                  ✅ Payment received! Activating your subscription...
                </p>
              </div>
            ) : (
              <SubscriptionCard subscription={subscription} loading={loading} user={user} />
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>What&apos;s Included</h3>
              <div className="space-y-3">
                {[
                  'Enter up to 5 Stableford scores',
                  'Monthly prize draw participation',
                  'At least 10% goes to your chosen charity',
                  'Winner verification and payouts',
                  'Real-time draw results and notifications',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-navy-200)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-emerald-500)' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Subscription;
