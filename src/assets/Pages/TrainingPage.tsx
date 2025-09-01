import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent, FC} from 'react';
import type { Workout } from "../../types";
import { fetchWorkouts, createWorkout } from "../../api/workouts";

const TrainingPage: FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [form, setForm] = useState({
    date:'',
    name:'',
    exerciseType:'',
    sets:'',
    reps:'',
    equipment:'',
    weight:'',
  });
  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await fetchWorkouts();
      setWorkouts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setForm (f => ({...f,[name]: value}));
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Basic validation
  const date = form.date;
  const name = form.name.trim();
  const exerciseType = form.exerciseType.trim();
  const equipment = form.equipment.trim();
  const sets = Number(form.sets);
  const reps = Number(form.reps);
  const weight = Number(form.weight);

  if (!date || !name || !exerciseType || !equipment) {
    console.error('You must enter all fields');
    return;
  }
  if (!Number.isFinite(sets) || sets < 1 || sets > 30) {
    console.error('Sets must be between 1-30');
    return;
  }
  if (!Number.isFinite(reps) || reps < 1 || reps > 30) {
    console.error('Reps must be between 1-30');
    return;
  }
  if (!Number.isFinite(weight) || weight < 0) {
    console.error('Weight must be a number');
    return;
  }

  const payload = { date, name, exerciseType, sets, reps, equipment, weight };

  try {
    await createWorkout(payload);
    // Resets form
    setForm({
      date: new Date().toISOString().slice(0, 10),
      name: '',
      exerciseType: '',
      sets: '',
      reps: '',
      equipment: '',
      weight: '',
    });
    await loadWorkouts();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="Traningpagemain">TrainingPage
      <div className="Workoutformgroup">
        <form className="Workoutform" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date">Datum</label>
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="name">Session Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="exerciseType">Exercise Type</label>
            <input
              id="exerciseType"
              type="text"
              name="exerciseType"
              value={form.exerciseType}
              onChange={handleChange}
              list="exercise-options" 
              autoComplete="off"
              required
            />
            <datalist id="exercise-options">
              <option value="Bench Press" />
              <option value="Squat" />
              <option value="Deadlift" />
              <option value="Overhead Press" />
              <option value="Row" />
            </datalist>
          </div>

          <div>
            <label htmlFor="sets">Sets</label>
            <input
              id="sets"
              type="number"
              name="sets"
              value={form.sets}
              onChange={handleChange}
              min={1}
              max={30}
              step={1}
              inputMode="numeric"
              required
            />
          </div>

          <div>
            <label htmlFor="reps">Reps</label>
            <input
              id="reps"
              type="number"
              name="reps"
              value={form.reps}
              onChange={handleChange}
              min={1}
              max={30}
              step={1}
              inputMode="numeric"
              required
            />
          </div>

          <div>
            <label htmlFor="equipment">Equipment</label>
            <input
              id="equipment"
              type="text"
              name="equipment"
              value={form.equipment}
              onChange={handleChange}
              list="equipment-options"
              autoComplete="off"
              required
            />
            <datalist id="equipment-options">
              <option value="Barbell" />
              <option value="Dumbbells" />
              <option value="Machine" />
              <option value="Kettlebell" />
              <option value="Bodyweight" />
            </datalist>
          </div>

          <div>
            <label htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              min={0}
              step={0.1}          
              inputMode="decimal"
              required
            />
          </div>

          <button type="submit">Logg Session!</button>
        </form>
      </div>
      <div className="workout-sum">
        <h1>Here is a summary of your workouts </h1>
        <ul>
          {workouts.map(w => (
            <li key={w.id}>
              {new Date(w.date).toLocaleDateString()} – {w.name} – {w.exerciseType}:
              {w.sets}×{w.reps} @ {w.weight}kg ({w.equipment})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TrainingPage