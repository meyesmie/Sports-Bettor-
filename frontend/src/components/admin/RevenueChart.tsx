'use client';
import { useRevenueChart } from '@/hooks/useRevenueChart';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function RevenueChart() {
  const { data } = useRevenueChart();
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Revenue (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
