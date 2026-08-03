import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getMatchDetails } from '@/lib/api';
import { MatchDetailClient } from './MatchDetailClient';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const match = await getMatchDetails(params.id).catch(() => null);
  if (!match) return { title: 'Match not found' };
  return {
    title: `${match.homeTeam.name} vs ${match.awayTeam.name} – Sports Bettor`,
    description: match.prediction?.analysis?.slice(0, 160),
  };
}

export default async function MatchPage({ params }: { params: { id: string } }) {
  const match = await getMatchDetails(params.id);
  if (!match) notFound();

  return <MatchDetailClient match={match} />;
}
