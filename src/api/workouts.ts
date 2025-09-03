import type { Workout } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5118/api';

export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch(`${API_BASE}/workouts`);
  if (!res.ok) throw new Error('Could not fetch workouts');
  const data: Workout[] = await res.json();
  return data;
}

export type WorkoutCreate = Omit<Workout, 'id'>;

export async function createWorkout(data: WorkoutCreate): Promise<Workout> {
  const res = await fetch(`${API_BASE}/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('could not create workout');
  return res.json();
}

export type WorkoutDaySummaryDto = {
  date: string;     
  prevDate: string;
  nextDate: string;
  totalWorkouts: number;
  workouts: Workout[];
};

export async function fetchWorkoutSummary(dateIso: string): Promise<WorkoutDaySummaryDto> {
  const url = `${API_BASE}/workouts/summary?date=${encodeURIComponent(dateIso)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });

  // if any errors are comming. 
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText} @ ${url}\n${body.slice(0,200)}`);
  }

  return res.json();
}

