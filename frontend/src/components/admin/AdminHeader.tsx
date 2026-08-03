import { useAdminAuth } from '@/hooks/useAdminAuth';

export function AdminHeader() {
  const { admin } = useAdminAuth();
  return (
    <header className="bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Admin Panel</h2>
      <span className="text-sm">{admin?.email}</span>
    </header>
  );
}
