'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-40 md:w-60 pl-3 pr-10 py-1 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
      />
      <button type="submit" className="absolute right-2 top-1.5 text-gray-400">🔍</button>
    </form>
  );
}
