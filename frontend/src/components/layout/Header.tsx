'use client';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from '@/components/filters/SearchBar';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Sports Bettor
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/predictions" className="hover:text-blue-600">Predictions</Link>
          <Link href="/premium" className="hover:text-blue-600">Premium</Link>
          <Link href="/calendar" className="hover:text-blue-600">Calendar</Link>
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/profile" className="text-sm">{user.email}</Link>
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Link href="/auth/login"><Button size="sm">Login</Button></Link>
          )}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
