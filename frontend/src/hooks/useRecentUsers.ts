import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { User } from '@/types';

export const useRecentUsers = () => {
  return useQuery<User[]>({
    queryKey: ['adminRecentUsers'],
    queryFn: async () => {
      const { data } = await axios.get('/admin/recent-users');
      return data;
    },
  });
};
