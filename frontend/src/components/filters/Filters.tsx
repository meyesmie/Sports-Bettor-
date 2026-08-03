'use client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface FilterValues {
  search: string;
  league: string;
  country: string;
  type: string;
  date: string;
  isPremium?: boolean;
}

interface Props {
  filters: FilterValues;
  onChange: (filters: Partial<FilterValues>) => void;
}

export function Filters({ filters, onChange }: Props) {
  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h3 className="font-semibold">Filters</h3>
      <Input
        placeholder="Search team or league..."
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
      />
      {/* More selects for league, country, type, date, premium toggle */}
      <Button variant="outline" onClick={() => onChange({ search: '', league: '', country: '', type: '', date: '', isPremium: undefined })}>
        Reset
      </Button>
    </div>
  );
}
