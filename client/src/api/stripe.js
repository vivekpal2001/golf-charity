import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createCheckoutSession = async (priceId, userId, charityId, charityPercentage) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const response = await fetch(`${apiUrl}/api/stripe/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, userId, charityId, charityPercentage }),
  });

  const { url, error } = await response.json();
  
  if (error) {
    console.error('Checkout error:', error);
    throw new Error(error);
  }

  if (url) {
    window.location.href = url;
  }
};

export const getStripe = () => stripePromise;

export default stripePromise;
