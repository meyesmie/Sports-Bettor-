import { Metadata } from 'next';
import { Suspense } from 'react';
import { PredictionsClient } from './PredictionsClient';

export const metadata: Metadata = {
  title: 'Football Predictions – Sports Bettor',
  description: 'Browse all football match predictions by date, league, and type.',
};

export default function PredictionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Predictions</h1>
      <Suspense fallback={<div>Loading filters...</div>}>
        <PredictionsClient />
      </Suspense>
    </div>
  );
}
