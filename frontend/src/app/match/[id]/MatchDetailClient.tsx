'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PremiumBadge } from '@/components/ui/PremiumBadge';
import { CountdownTimer } from '@/components/ui/CountdownTimer';

export function MatchDetailClient({ match }: { match: any }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500">{match.country.name} • {match.league.name}</span>
          {match.prediction.isPremium && <PremiumBadge />}
        </div>
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <Image src={match.homeTeam.logo} alt={match.homeTeam.name} width={80} height={80} />
            <h2 className="text-xl font-bold mt-2">{match.homeTeam.name}</h2>
          </div>
          <div className="text-2xl font-bold">VS</div>
          <div className="text-center">
            <Image src={match.awayTeam.logo} alt={match.awayTeam.name} width={80} height={80} />
            <h2 className="text-xl font-bold mt-2">{match.awayTeam.name}</h2>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mb-6">
          {new Date(match.matchDate).toLocaleDateString()} • {match.kickoffTime}
        </div>
        <CountdownTimer targetDate={match.matchDate} />
        <div className="mt-8 space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h3 className="font-semibold text-lg">Prediction: {match.prediction.prediction}</h3>
            <p>Odds: {match.prediction.odds}</p>
            <p>Confidence: {match.prediction.confidence}%</p>
          </div>
          <div>
            <h4 className="font-semibold">Analysis</h4>
            <p>{match.prediction.analysis}</p>
          </div>
          <div>
            <h4 className="font-semibold">Betting Advice</h4>
            <p>{match.prediction.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
