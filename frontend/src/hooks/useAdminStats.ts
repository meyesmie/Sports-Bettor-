import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { DashboardStats } from '@/types';

export const useAdminStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const { data } = await axios.get('/admin/stats');
      return data;
    },
  });
};
