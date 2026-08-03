import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ token, newPassword }: { token: string; newPassword: string }) => {
      const { data } = await axios.post('/auth/reset-password', { token, newPassword });
      return data;
    },
  });
};
