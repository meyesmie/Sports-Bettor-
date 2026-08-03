'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForgotPassword } from '@/hooks/useForgotPassword';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const { mutate, isLoading, isSuccess } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  if (isSuccess) return <p className="text-green-600">Check your email for reset link.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <Input label="Email" type="email" value={email} onChange={setEmail} required />
      <Button type="submit" loading={isLoading} className="w-full mt-4">Send Reset Link</Button>
    </form>
  );
}
