'use client';
import { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex border-b gap-4 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`pb-2 text-sm font-medium ${i === active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
}
