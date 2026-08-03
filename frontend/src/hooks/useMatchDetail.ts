import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { MatchDetail } from '@/types';

export const useMatchDetail = (id: string) => {
  return useQuery<MatchDetail>({
    queryKey: ['match', id],
    queryFn: async () => {
      const { data } = await axios.get(`/matches/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
