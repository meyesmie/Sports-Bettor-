'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Prediction } from '@/types';
import { PremiumBadge } from '@/components/ui/PremiumBadge';
import { PredictionTypeBadge } from './PredictionTypeBadge';

interface Props {
  prediction: Prediction & { match: any };
}

export function PredictionCard({ prediction }: Props) {
  const { match, type, prediction: predText, odds, confidence, isPremium } = prediction;
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">{match.country.name} • {match.league.name}</span>
        {isPremium && <PremiumBadge />}
      </div>
      <div className="flex items-center gap-4 mb-3">
        <Image src={match.homeTeam.logo} alt={match.homeTeam.name} width={32} height={32} />
        <span className="font-semibold">{match.homeTeam.name}</span>
        <span className="text-gray-400">vs</span>
        <span className="font-semibold">{match.awayTeam.name}</span>
        <Image src={match.awayTeam.logo} alt={match.awayTeam.name} width={32} height={32} />
      </div>
      <div className="flex items-center gap-3 text-sm">
        <PredictionTypeBadge type={type} />
        <span className="font-bold text-blue-600">{predText}</span>
        <span className="text-gray-500">Odds: {odds}</span>
        <span className="text-gray-500">Conf: {confidence}%</span>
      </div>
      <Link href={`/match/${match.id}`} className="text-blue-500 text-sm mt-2 block">
        View details →
      </Link>
    </motion.div>
  );
}
