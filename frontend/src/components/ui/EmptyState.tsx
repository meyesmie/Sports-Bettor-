export function EmptyState({ message = 'No data found' }: { message?: string }) {
  return (
    <div className="text-center py-12 text-gray-400">
      <p className="text-lg">{message}</p>
    </div>
  );
}
