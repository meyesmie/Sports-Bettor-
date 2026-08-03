// frontend/src/lib/api.ts
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function serverFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Server fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getPredictionsServer(params?: Record<string, string>) {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return serverFetch<any>(`/predictions${query}`);
}

export async function getMatchDetailsServer(id: string) {
  return serverFetch<any>(`/matches/${id}`);
}

export async function getPremiumPicksServer() {
  return serverFetch<any>('/premium-picks');
}

// Add more as needed...
