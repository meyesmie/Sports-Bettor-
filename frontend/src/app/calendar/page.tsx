import { Metadata } from 'next';
import { CalendarClient } from './CalendarClient';

export const metadata: Metadata = {
  title: 'Prediction Calendar – Sports Bettor',
};

export default function CalendarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Prediction Calendar</h1>
      <CalendarClient />
    </div>
  );
}
