'use client';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { PayPalProvider } from './PayPalProvider';
import { AuthProvider } from '@/hooks/useAuth'; // Auth provider from hooks

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <PayPalProvider>{children}</PayPalProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
