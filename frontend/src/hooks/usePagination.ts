import { useState, useMemo } from 'react';

export function usePagination(totalItems: number, defaultLimit = 20) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);
  const totalPages = Math.ceil(totalItems / limit);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const goToPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

  return { page, limit, totalPages, nextPage, prevPage, goToPage, setLimit };
}
