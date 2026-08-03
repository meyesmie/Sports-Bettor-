import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Prediction, PaginatedResponse } from '@/types';

export const useSearch = (query: string, page = 1) => {
  return useQuery<PaginatedResponse<Prediction>>({
    queryKey: ['search', query, page],
    queryFn: async () => {
      const { data } = await axios.get('/search', { params: { q: query, page } });
      return data;
    },
    enabled: !!query,
  });
};
