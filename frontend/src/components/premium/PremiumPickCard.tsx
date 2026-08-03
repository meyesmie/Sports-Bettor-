'use client';
import { motion } from 'framer-motion';
import { PremiumPick } from '@/types';

export function PremiumPickCard({ pick }: { pick: PremiumPick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border-l-4 border-blue-500"
    >
      <h3 className="text-xl font-bold mb-2">{pick.title}</h3>
      <p className="text-sm text-gray-500 capitalize mb-3">{pick.type.replace('_', ' ')} • Risk: {pick.riskLevel}</p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold">Odds:</span> {pick.odds}
        </div>
        <div>
          <span className="font-semibold">Stake Advice:</span> {pick.stakeAdvice || 'Medium'}
        </div>
      </div>
      {pick.instructions && (
        <p className="mt-3 text-gray-600 dark:text-gray-300">{pick.instructions}</p>
      )}
      {/* Selections list rendered here */}
    </motion.div>
  );
}
