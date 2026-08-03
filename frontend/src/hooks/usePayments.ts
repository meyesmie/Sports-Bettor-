import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Payment, PaginatedResponse } from '@/types';

export const usePayments = (page = 1, limit = 20) => {
  return useQuery<PaginatedResponse<Payment>>({
    queryKey: ['adminPayments', page, limit],
    queryFn: async () => {
      const { data } = await axios.get('/admin/payments', { params: { page, limit } });
      return data;
    },
  });
};
