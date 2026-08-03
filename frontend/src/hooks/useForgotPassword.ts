import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await axios.post('/auth/forgot-password', { email });
      return data;
    },
  });
};
