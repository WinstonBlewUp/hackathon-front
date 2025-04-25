'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@mantine/core';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface StripeCheckoutButtonProps {
  roomId: number;
  roomName: string;
  amount: number;
  userId: number;
}

export function StripeCheckoutButton({ roomId, roomName, amount, userId }: StripeCheckoutButtonProps) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId, roomName, amount, userId }),
    });

    const session = await response.json();
    if (!response.ok) {
      console.error('Erreur lors de la création de la session Stripe', session.error);
      return;
    }

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <Button onClick={handleCheckout}>
      Réserver cette chambre
    </Button>
  );
}
