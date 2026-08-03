'use client';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { PaystackButton } from '@/components/payment/PaystackButton';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';

interface Props {
  plan: 'weekly' | 'monthly';
  amount: number;
}

export function PaymentButton({ plan, amount }: Props) {
  const { user } = useAuth();
  const [method, setMethod] = useState<'paypal' | 'paystack' | 'skrill'>('paypal');

  if (!user) return <p>Please login to subscribe.</p>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <button onClick={() => setMethod('paypal')} className={method === 'paypal' ? 'font-bold' : ''}>PayPal</button>
        <button onClick={() => setMethod('paystack')} className={method === 'paystack' ? 'font-bold' : ''}>Paystack</button>
        <button onClick={() => setMethod('skrill')} className={method === 'skrill' ? 'font-bold' : ''}>Skrill</button>
      </div>
      {method === 'paypal' && (
        <PayPalButtons
          createOrder={(data, actions) => {
            return fetch('/api/payments/paypal/create', {
              method: 'POST',
              body: JSON.stringify({ amount, plan }),
            }).then(res => res.json()).then(data => data.id);
          }}
          onApprove={(data) => {
            return fetch('/api/payments/paypal/capture', {
              method: 'POST',
              body: JSON.stringify({ orderId: data.orderID }),
            }).then(() => window.location.reload());
          }}
        />
      )}
      {method === 'paystack' && (
        <PaystackButton amount={amount} email={user.email} plan={plan} />
      )}
      {method === 'skrill' && (
        <button
          onClick={() => window.location.href = `/api/payments/skrill/pay?amount=${amount}&plan=${plan}`}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Pay with Skrill
        </button>
      )}
    </div>
  );
}
