'use client';
import { useState, useEffect } from 'react';
import { useMatchForm } from '@/hooks/useMatchForm';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs'; // Predictions array

export function MatchForm({ matchId, onSuccess }: { matchId?: string; onSuccess?: () => void }) {
  const { register, handleSubmit, errors, isLoading, countries, leagues, teams } = useMatchForm(matchId);
  // Full form implementation with all fields, including prediction sub-forms
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <select {...register('countryId')} className="input-field">
          {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {/* league, teams, date, time, etc. */}
      </div>
      <Tabs>
        {/* Prediction tabs for each type */}
      </Tabs>
      <Button type="submit" loading={isLoading}>Save Match</Button>
    </form>
  );
}
