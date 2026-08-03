'use client';
import { useAdminStats } from '@/hooks/useAdminStats';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export function AdminStats() {
  const { data, isLoading } = useAdminStats();
  if (isLoading) return <LoadingSkeleton count={4} />;
  if (!data) return null;

  const cards = [
    { label: 'Total Users', value: data.totalUsers },
    { label: 'Premium Users', value: data.premiumUsers },
    { label: "Today's Matches", value: data.todayMatches },
    { label: 'Revenue', value: `$${data.revenue}` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">{c.label}</p>
          <p className="text-2xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
