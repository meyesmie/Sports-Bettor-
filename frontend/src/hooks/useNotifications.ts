import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Notification } from '@/types';

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await axios.get('/notifications');
      return data;
    },
  });
};
