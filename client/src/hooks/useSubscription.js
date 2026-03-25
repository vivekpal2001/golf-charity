import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';
import { useAuth } from '../context/AuthContext';

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, charities(*)')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error) {
      setSubscription(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSubscription();
  }, [user]);

  const isActive = subscription?.status === 'active' &&
    new Date(subscription?.current_period_end) > new Date();

  return { subscription, loading, isActive, refresh: loadSubscription };
};

export default useSubscription;
