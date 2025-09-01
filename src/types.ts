export interface Workout {
  id: number;
  date: string;           
  name: string;
  exerciseType: string;
  sets: number;           
  reps: number;           
  weight: number;        
  equipment: string;
}

export type WorkoutCreate = Omit<Workout, 'id'>;