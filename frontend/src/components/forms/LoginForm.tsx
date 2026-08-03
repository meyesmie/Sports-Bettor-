'use client';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Input label="Email" type="email" value={email} onChange={setEmail} required />
      <Input label="Password" type="password" value={password} onChange={setPassword} required className="mt-4" />
      <Button type="submit" loading={isLoading} className="w-full mt-6">Login</Button>
      <div className="mt-4 text-sm text-center space-y-1">
        <Link href="/auth/register" className="text-blue-600">Create account</Link><br />
        <Link href="/auth/forgot-password" className="text-blue-600">Forgot password?</Link>
      </div>
    </form>
  );
}
