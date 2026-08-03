export function PredictionTypeBadge({ type }: { type: string }) {
  const colorMap: Record<string, string> = {
    win: 'bg-green-100 text-green-800',
    draw: 'bg-yellow-100 text-yellow-800',
    away: 'bg-red-100 text-red-800',
    double_chance: 'bg-blue-100 text-blue-800',
    over1_5: 'bg-purple-100 text-purple-800',
    over2_5: 'bg-purple-100 text-purple-800',
    btts: 'bg-indigo-100 text-indigo-800',
  };
  const label = type.replace('_', ' ').toUpperCase();
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colorMap[type] || 'bg-gray-100'}`}>
      {label}
    </span>
  );
}
