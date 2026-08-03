import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { UserProfile } from '@/types';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axios.get('/auth/profile');
      return data;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (updatedData: Partial<UserProfile>) => {
      const { data } = await axios.patch('/auth/profile', updatedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return { profile, isLoading, updateProfile };
};
