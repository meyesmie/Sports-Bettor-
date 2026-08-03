'use client';
import { useRecentUsers } from '@/hooks/useRecentUsers';

export function RecentUsers() {
  const { data } = useRecentUsers();
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Recent Users</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Email</th>
            <th>Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user: any) => (
            <tr key={user.id} className="border-t dark:border-gray-700">
              <td className="py-2">{user.fullName || '—'}</td>
              <td>{user.email}</td>
              <td>{user.subscribed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
