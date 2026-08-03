'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { usePredictions } from '@/hooks/usePredictions';
import { PredictionList } from '@/components/predictions/PredictionList';

export function CalendarClient() {
  const [date, setDate] = useState(new Date());
  const dateStr = date.toISOString().split('T')[0];

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-8">
      <Calendar onChange={(value: any) => setDate(value)} value={date} />
      <div>
        <h2 className="text-2xl font-bold mb-4">Predictions for {dateStr}</h2>
        <PredictionList filter="date" date={dateStr} />
      </div>
    </div>
  );
}
