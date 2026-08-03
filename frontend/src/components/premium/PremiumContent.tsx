'use client';
import { usePremiumPicks } from '@/hooks/usePremiumPicks';
import { PremiumPickCard } from './PremiumPickCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export function PremiumContent() {
  const { data, isLoading } = usePremiumPicks();

  if (isLoading) return <LoadingSkeleton count={4} />;
  if (!data?.length) return <p>No premium picks available yet.</p>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Premium Picks</h1>
      <div className="space-y-6">
        {data.map((pick) => (
          <PremiumPickCard key={pick.id} pick={pick} />
        ))}
      </div>
    </div>
  );
}
