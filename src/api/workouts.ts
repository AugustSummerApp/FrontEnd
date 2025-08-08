import { Workout } from '../types';

const API_BASE = process.env.REACT_APP_API_URL ?? 'http://localhost:5118/api';

export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch(`${API_BASE}/workouts`);
  if (!res.ok) throw new Error('Could not fetch workouts');
  return res.json();
}

export async function createWorkout(data: Omit<Workout, 'id'>): Promise<Workout> {
  const res = await fetch(`${API_BASE}/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('could not create workout');
  return res.json();
}
