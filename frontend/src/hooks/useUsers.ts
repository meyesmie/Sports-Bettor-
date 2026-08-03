import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { User, PaginatedResponse } from '@/types';

export const useUsers = (page = 1, limit = 20, search = '') => {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ['adminUsers', page, limit, search],
    queryFn: async () => {
      const { data } = await axios.get('/admin/users', { params: { page, limit, search } });
      return data;
    },
  });
};
