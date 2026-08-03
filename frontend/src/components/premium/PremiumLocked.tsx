'use client';
import { motion } from 'framer-motion';
import { PaymentButton } from '@/components/payment/PaymentButton';

const plans = [
  { name: 'Weekly', price: 1, period: 'week' },
  { name: 'Monthly', price: 4, period: 'month' },
];

export function PremiumLocked() {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-4xl font-bold mb-8">Unlock Premium Predictions</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <motion.div whileHover={{ scale: 1.05 }} key={plan.name} className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold">${plan.price}/{plan.period}</h2>
            <ul className="mt-4 space-y-2">
              <li>✓ All premium picks</li>
              <li>✓ Accumulators & combos</li>
            </ul>
            <PaymentButton plan={plan} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
