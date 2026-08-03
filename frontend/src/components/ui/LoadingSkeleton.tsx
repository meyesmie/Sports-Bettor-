export function LoadingSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-24 rounded-xl" />
      ))}
    </div>
  );
}
