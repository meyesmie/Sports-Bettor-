import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';

interface InitiatePaymentParams {
  amount: number;
  method: 'paypal' | 'paystack' | 'skrill';
  plan: 'weekly' | 'monthly';
}

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: async (params: InitiatePaymentParams) => {
      const { data } = await axios.post('/payments/initiate', params);
      return data; // { redirectUrl?, reference? }
    },
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: async (reference: string) => {
      const { data } = await axios.post('/payments/verify', { reference });
      return data;
    },
  });
};
