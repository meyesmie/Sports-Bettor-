import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Prediction, PaginatedResponse } from '@/types';

export const useCalendarPredictions = (date: string) => {
  return useQuery<PaginatedResponse<Prediction>>({
    queryKey: ['calendarPredictions', date],
    queryFn: async () => {
      const { data } = await axios.get('/predictions', { params: { date, limit: 50 } });
      return data;
    },
    enabled: !!date,
  });
};
