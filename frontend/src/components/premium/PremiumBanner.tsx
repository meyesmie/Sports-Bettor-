'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

export function PremiumBanner() {
  const { user } = useAuth();
  if (user?.subscribed) return null; // No banner if already premium

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center"
    >
      <h2 className="text-2xl font-bold mb-2">Unlock Premium Tips</h2>
      <p className="mb-4">Get access to accumulators, bankers, and daily combos from just $1/week</p>
      <Link href="/premium" className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
        Go Premium
      </Link>
    </motion.div>
  );
}
