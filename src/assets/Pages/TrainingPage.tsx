import { useState, useEffect } from "react";
import { EXERCISE_CATEGORIES, EQUIPMENT  } from "../../reference";
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
  const [error,setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await fetchWorkouts();
      setWorkouts(data);
    } catch (err) {
      console.error(err);
       setError("Could not get workouts");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setForm (f => ({...f,[name]: value}));
    if (error) setError(null);
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

  const errors: string[] = [];
  if (!date) errors.push("You must pick a date")
  if (!name) errors.push("Please name your workout")
  if (!exerciseType) errors.push("Please choose an exercise")
  if (!equipment) errors.push("Please choose an equipment")
  if (!Number.isFinite(sets) || sets < 1 || sets > 30) errors.push("Sets must be between 1–30.");
  if (!Number.isFinite(reps) || reps < 1 || reps > 30) errors.push("Reps must be between 1–30.");
  if (!Number.isFinite(weight) || weight < 0) errors.push("Please enter excersie weight");

  if (errors.length > 0) {
  setError(errors.join(" "));
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
    setError(null);
    await loadWorkouts();
  } catch (err) {
    console.error(err);
    setError("Could not logg workout, something went wrong")
  }
  };

  return (
    <div className="Traningpagemain">TrainingPage
      <div className="Workoutformgroup">
        <form noValidate className="Workoutform" onSubmit={handleSubmit}>

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
            <label htmlFor="exerciseType">Exercise Type</label>
            <select
              id="exerciseType"
              name="exerciseType"
              value={form.exerciseType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>--|--</option>
              {EXERCISE_CATEGORIES.map(cat => (
                <optgroup key={cat.id} label={cat.title}>
                  {cat.items.map(ex => (
                    <option key={ex.id} value={ex.label}>
                      {ex.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="form-group-num">
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

          <div className="form-group-num">
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

          <div className="form-group">
            <label htmlFor="equipment">Equipment</label>
            <select
              id="equipment"
              name="equipment"
              value={form.equipment}
              onChange={handleChange}
              required
            >
              <option value="">--|--</option>
              {EQUIPMENT.map(eq => (
                <option key={eq.id} value={eq.label}>
                  {eq.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
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
          
          {error && (
            <p className="form-error">
               {error}
             </p>
          )}

        </form>
      </div>
      <div className="workout-sum">
        <h1>Here is a summary of your workouts </h1>
        <ul className="workout-sum-list">
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