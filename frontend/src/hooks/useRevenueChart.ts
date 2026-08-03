import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

interface RevenueDataPoint {
  date: string;
  amount: number;
}

export const useRevenueChart = () => {
  return useQuery<RevenueDataPoint[]>({
    queryKey: ['adminRevenueChart'],
    queryFn: async () => {
      const { data } = await axios.get('/admin/revenue-chart');
      return data;
    },
  });
};
