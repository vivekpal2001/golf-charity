const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, charityId, charityPercentage } = req.body;

    const metadata = { userId, charityPercentage: String(charityPercentage) };
    if (charityId) metadata.charityId = charityId;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.origin}/dashboard/subscription?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/dashboard/subscription`,
      metadata,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout session error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Verify a completed checkout session and save subscription to DB
// This is called by the frontend after Stripe redirects back
router.post('/verify-session', async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'Missing session_id' });

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const { userId, charityId, charityPercentage } = session.metadata;
    const subscriptionId = session.subscription;

    // Check if we already saved this subscription (idempotent)
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('stripe_subscription_id', subscriptionId)
      .limit(1);

    if (existing && existing.length > 0) {
      return res.json({ status: 'already_saved', subscriptionId });
    }

    // Get subscription details from Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
    const plan = stripeSubscription.items.data[0].price.recurring.interval === 'month' ? 'monthly' : 'yearly';
    const amount = plan === 'monthly' ? 500 : 5000;

    // Save to Supabase
    const { data, error } = await supabase.from('subscriptions').insert([{
      user_id: userId,
      plan,
      amount,
      status: 'active',
      stripe_subscription_id: subscriptionId,
      charity_id: charityId && charityId !== 'null' ? charityId : null,
      charity_percentage: parseInt(charityPercentage) || 10,
      current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
    }]).select().single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('✅ Subscription saved for user:', userId);
    res.json({ status: 'saved', subscription: data });
  } catch (err) {
    console.error('Verify session error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Cancel Subscription
router.post('/cancel-subscription', async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    if (!subscriptionId) return res.status(400).json({ error: 'Missing subscriptionId' });

    // Cancel in Stripe at period end
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update in Supabase
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('stripe_subscription_id', subscriptionId)
      .select()
      .single();

    if (error) throw error;

    res.json({ status: 'success', subscription: data });
  } catch (err) {
    console.error('Cancel subscription error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Stripe Webhook (for production use with Stripe CLI or deployed server)
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const { userId, charityId, charityPercentage } = session.metadata;
      const subscriptionId = session.subscription;

      const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
      const plan = stripeSubscription.items.data[0].price.recurring.interval === 'month' ? 'monthly' : 'yearly';
      const amount = plan === 'monthly' ? 500 : 5000;

      await supabase.from('subscriptions').insert([{
        user_id: userId,
        plan,
        amount,
        status: 'active',
        stripe_subscription_id: subscriptionId,
        charity_id: charityId && charityId !== 'null' ? charityId : null,
        charity_percentage: parseInt(charityPercentage) || 10,
        current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
      }]);
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      const status = subscription.status === 'active' ? 'active' : 'cancelled';
      await supabase
        .from('subscriptions')
        .update({ status, current_period_end: new Date(subscription.current_period_end * 1000).toISOString() })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
  }

  res.json({ received: true });
});

module.exports = router;
