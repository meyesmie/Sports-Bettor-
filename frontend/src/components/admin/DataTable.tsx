'use client';
import { Pagination } from '@/components/ui/Pagination';
import { motion, AnimatePresence } from 'framer-motion';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: { page: number; total: number; onChange: (page: number) => void };
  loading?: boolean;
}

export function DataTable<T extends { id: string }>({ data, columns, pagination, loading }: Props<T>) {
  if (loading) return <div>Loading...</div>;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700 text-left text-sm text-gray-600 dark:text-gray-300">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-3 font-medium">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-sm">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {pagination && (
        <div className="p-3 border-t">
          <Pagination
            current={pagination.page}
            total={pagination.total}
            onChange={pagination.onChange}
          />
        </div>
      )}
    </div>
  );
}
