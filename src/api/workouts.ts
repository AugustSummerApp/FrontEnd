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
