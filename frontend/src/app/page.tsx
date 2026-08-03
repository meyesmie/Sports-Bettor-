import { PredictionList } from '@/components/predictions/PredictionList';
import { CalendarWidget } from '@/components/calendar/CalendarWidget';
import { PremiumBanner } from '@/components/premium/PremiumBanner';
import { api } from '@/lib/api';

export default async function HomePage() {
  const predictions = await api.getPredictions({ date: 'today', limit: 10 });
  const upcoming = await api.getUpcomingMatches();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <PremiumBanner />
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Today's Predictions</h2>
          <PredictionList predictions={predictions} />
        </div>
        <aside>
          <CalendarWidget />
          {/* Statistics Widget */}
        </aside>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Upcoming Matches</h2>
        {/* Match cards with countdown */}
      </section>
    </main>
  );
}
