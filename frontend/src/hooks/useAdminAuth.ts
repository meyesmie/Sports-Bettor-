'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import type { Admin } from '@/types';

export function useAdminAuth() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshAdmin = useCallback(async () => {
    try {
      const { data } = await axios.get('/admin/me');
      setAdmin(data.admin);
    } catch {
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAdmin();
  }, [refreshAdmin]);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post('/admin/login', { email, password });
    setAdmin(data.admin);
    router.push('/admin/dashboard');
  };

  const logout = async () => {
    await axios.post('/admin/logout');
    setAdmin(null);
    router.push('/admin/login');
  };

  return { admin, isLoading, login, logout, refreshAdmin };
}
