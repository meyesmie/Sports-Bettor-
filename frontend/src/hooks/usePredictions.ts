import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Prediction, PaginatedResponse } from '@/types';

interface UsePredictionsParams {
  page?: number;
  limit?: number;
  filter?: 'today' | 'tomorrow' | 'premium' | 'date';
  date?: string;
  league?: string;
  country?: string;
  type?: string;
  search?: string;
  matchId?: string;
}

export const usePredictions = (params: UsePredictionsParams = {}) => {
  return useQuery<PaginatedResponse<Prediction>>({
    queryKey: ['predictions', params],
    queryFn: async () => {
      const { data } = await axios.get('/predictions', { params });
      return data;
    },
  });
};
