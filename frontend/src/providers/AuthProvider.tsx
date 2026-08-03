'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      const { data } = await axios.get('/auth/profile');
      setUser(data.user);
    } catch { setUser(null); }
  };

  useEffect(() => { refreshUser(); }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post('/auth/login', { email, password });
    setUser(data.user);
    router.push('/');
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
