'use client';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { register, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <Input label="Full Name" value={name} onChange={setName} />
      <Input label="Email" type="email" value={email} onChange={setEmail} required className="mt-4" />
      <Input label="Password" type="password" value={password} onChange={setPassword} required className="mt-4" />
      <Button type="submit" loading={isLoading} className="w-full mt-6">Register</Button>
    </form>
  );
}
