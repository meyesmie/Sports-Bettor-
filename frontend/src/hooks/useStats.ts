import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

interface StatsData {
  winRate: number;
  totalTips: number;
  avgOdds: number;
}

export const useStats = () => {
  return useQuery<StatsData>({
    queryKey: ['publicStats'],
    queryFn: async () => {
      const { data } = await axios.get('/stats');
      return data;
    },
  });
};
