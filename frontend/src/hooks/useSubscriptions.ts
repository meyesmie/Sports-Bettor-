import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Subscription, PaginatedResponse } from '@/types';

export const useSubscriptions = (page = 1, limit = 20) => {
  return useQuery<PaginatedResponse<Subscription>>({
    queryKey: ['adminSubscriptions', page, limit],
    queryFn: async () => {
      const { data } = await axios.get('/admin/subscriptions', { params: { page, limit } });
      return data;
    },
  });
};
