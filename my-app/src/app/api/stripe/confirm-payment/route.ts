import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID manquant' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent.charges'],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    if (!paymentIntent) {
      return NextResponse.json({ error: 'PaymentIntent introuvable' }, { status: 400 });
    }

    const receiptUrl = (paymentIntent as any)?.charges?.data?.[0]?.receipt_url ?? '';

    const paymentData = {
      stripeId: paymentIntent.id,
      amount: paymentIntent.amount_received,
      status: paymentIntent.status === 'succeeded' ? 'paid' : 'unpaid',
      method: paymentIntent.payment_method_types[0] || '',
      receiptUrl,
      user: `/api/users/${session.metadata?.userId}`,
      createdAt: new Date().toISOString().split('T')[0],
    };

    console.log('[PAYMENT DATA ENVOYÉ]', paymentData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[BACKEND PAYMENT ERROR]', errorData);
      throw new Error('Erreur backend lors de la sauvegarde du paiement');
    }

    return NextResponse.json({ message: 'Paiement enregistré avec succès' });

  } catch (error) {
    console.error('[CONFIRM PAYMENT ERROR]', error);
    return NextResponse.json({ error: 'Erreur lors de la confirmation du paiement' }, { status: 500 });
  }
}
