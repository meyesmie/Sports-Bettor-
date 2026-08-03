'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';

export function CalendarWidget() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value: any) => {
    setDate(value);
    const formatted = value.toISOString().split('T')[0];
    router.push(`/predictions?date=${formatted}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-3">Select Date</h3>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="react-calendar-custom"
      />
    </div>
  );
}
