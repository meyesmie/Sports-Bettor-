'use client';
import { useStats } from '@/hooks/useStats';

export function StatsWidget() {
  const { data } = useStats();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-3">Winning Tips</h3>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-2xl font-bold text-green-500">{data?.winRate || 0}%</p>
          <p className="text-xs">Win Rate</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-500">{data?.totalTips || 0}</p>
          <p className="text-xs">Total Tips</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-orange-500">{data?.avgOdds || 0}</p>
          <p className="text-xs">Avg Odds</p>
        </div>
      </div>
    </div>
  );
}
