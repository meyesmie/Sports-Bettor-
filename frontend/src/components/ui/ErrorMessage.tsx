export function ErrorMessage({ message = 'Something went wrong' }: { message?: string }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
      {message}
    </div>
  );
}
