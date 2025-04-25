'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Center, Loader, Stack, Text, Title } from '@mantine/core';
import { loadStripe } from '@stripe/stripe-js';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setError('Session ID manquant.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/stripe/confirm-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la confirmation du paiement');
        }

        const paymentData = await response.json();

        const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}payments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData),
        });

        if (!saveResponse.ok) {
          throw new Error('Erreur lors de l’enregistrement du paiement');
        }

        setLoading(false);
      } catch (err: any) {
        console.error('[SUCCESS ERROR]', err);
        setError(err.message || 'Erreur inconnue.');
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Stack align="center">
          <Title order={2}>Erreur</Title>
          <Text>{error}</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Center h="100vh">
      <Stack align="center">
        <Title order={2}>Merci pour votre réservation !</Title>
        <Text>Votre paiement a été confirmé.</Text>
      </Stack>
    </Center>
  );
}
