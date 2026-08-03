import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCards } from '@/components/admin/StatsCards';
import { RevenueChart } from '@/components/admin/RevenueChart';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <RevenueChart />
          <RecentUsers />
        </div>
      </div>
    </AdminLayout>
  );
}
