'use client';
import { usePredictions } from '@/hooks/usePredictions';
import { PredictionCard } from './PredictionCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface Props {
  filter?: 'today' | 'tomorrow' | 'premium';
  limit?: number;
  matchId?: string;
}

export function PredictionList({ filter, limit, matchId }: Props) {
  const { data, isLoading, error } = usePredictions({ filter, limit, matchId });

  if (isLoading) return <LoadingSkeleton count={3} />;
  if (error) return <ErrorMessage message="Failed to load predictions" />;
  if (!data?.predictions?.length) return <EmptyState message="No predictions available" />;

  return (
    <div className="space-y-4">
      {data.predictions.map((pred) => (
        <PredictionCard key={pred.id} prediction={pred} />
      ))}
    </div>
  );
}
