'use client';
import { useState } from 'react';
import { usePredictions } from '@/hooks/usePredictions';
import { PredictionCard } from '@/components/predictions/PredictionCard';
import { Filters } from '@/components/filters/Filters';
import { Pagination } from '@/components/ui/Pagination';

export function PredictionsClient() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: '',
    league: '',
    country: '',
    type: '',
    isPremium: undefined as boolean | undefined,
    date: '',
  });

  const { data, isLoading } = usePredictions(filters);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <Filters filters={filters} onChange={handleFilterChange} />
      </aside>
      <div className="lg:col-span-3 space-y-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data?.predictions.map((pred) => (
              <PredictionCard key={pred.id} prediction={pred} />
            ))}
            <Pagination
              current={filters.page}
              total={data?.meta.totalPages || 1}
              onChange={(page) => setFilters((p) => ({ ...p, page }))}
            />
          </>
        )}
      </div>
    </div>
  );
}
