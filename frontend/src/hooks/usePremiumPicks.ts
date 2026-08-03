import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { PremiumPick } from '@/types';

export const usePremiumPicks = () => {
  return useQuery<PremiumPick[]>({
    queryKey: ['premiumPicks'],
    queryFn: async () => {
      const { data } = await axios.get('/premium-picks');
      return data;
    },
    enabled: false, // only when user is subscribed, can be enabled conditionally
  });
};
