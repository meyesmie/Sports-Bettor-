import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Match, PaginatedResponse } from '@/types';

export const useMatches = (page = 1, limit = 20, filters?: any) => {
  return useQuery<PaginatedResponse<Match>>({
    queryKey: ['adminMatches', page, limit, filters],
    queryFn: async () => {
      const { data } = await axios.get('/admin/matches', { params: { page, limit, ...filters } });
      return data;
    },
  });
};
