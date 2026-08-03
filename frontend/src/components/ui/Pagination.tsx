'use client';
import { Button } from './Button';

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ current, total, onChange }: Props) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" disabled={current === 1} onClick={() => onChange(current - 1)}>Prev</Button>
      <span className="text-sm">{current} / {total}</span>
      <Button variant="ghost" size="sm" disabled={current === total} onClick={() => onChange(current + 1)}>Next</Button>
    </div>
  );
}
