import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { matchSchema } from '@/lib/validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import type { Match, CreateMatchInput } from '@/types';
import { useCountries, useLeagues, useTeams } from './useAdminData'; // hypothetical

export const useMatchForm = (matchId?: string) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { data: countries } = useCountries();
  const { data: leagues } = useLeagues();
  const { data: teams } = useTeams();

  const form = useForm<CreateMatchInput>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      countryId: '',
      leagueId: '',
      homeTeamId: '',
      awayTeamId: '',
      matchDate: '',
      kickoffTime: '',
      predictions: [],
    },
  });

  useEffect(() => {
    if (matchId) {
      // Fetch match details and populate form
      (async () => {
        const { data } = await axios.get(`/admin/matches/${matchId}`);
        form.reset({
          countryId: data.countryId,
          leagueId: data.leagueId,
          homeTeamId: data.homeTeamId,
          awayTeamId: data.awayTeamId,
          matchDate: data.matchDate,
          kickoffTime: data.kickoffTime,
          predictions: data.predictions || [],
        });
      })();
    }
  }, [matchId, form]);

  const mutation = useMutation({
    mutationFn: async (values: CreateMatchInput) => {
      if (matchId) {
        return axios.put(`/admin/matches/${matchId}`, values);
      }
      return axios.post('/admin/matches', values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMatches'] });
      form.reset();
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    ...form,
    handleSubmit,
    isLoading: mutation.isPending,
    countries: countries || [],
    leagues: leagues || [],
    teams: teams || [],
  };
};
