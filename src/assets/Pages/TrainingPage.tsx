import { useState } from "react";
import { EXERCISE_CATEGORIES, EQUIPMENT  } from "../../reference";
import type { ChangeEvent, FormEvent, FC} from 'react';
import { createWorkout } from "../../api/workouts";
import WorkoutSummary from "../Components/Partials/WorkoutSummary";

const TrainingPage: FC = () => {

  const todayIso = new Date().toISOString().slice(0,10);
  const [summaryKey, setSummaryKey] = useState(0);
  const [summaryDate, setSummaryDate] = useState(todayIso)



  const [form, setForm] = useState({
    date: todayIso,
    name:'',
    exerciseType:'',
    sets:'',
    reps:'',
    equipment:'',
    weight:'',
  });
  const [error,setError] = useState<string | null>(null);

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
    setSummaryKey((k) => k + 1);
    setSummaryDate(payload.date); 

    // Resets form
    setForm({
      date: todayIso,
      name: '',
      exerciseType: '',
      sets: '',
      reps: '',
      equipment: '',
      weight: '',
    });
    setError(null);
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
              className="form-input"
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
              className="form-input"
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
              className="form-select"
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
              className="form-input"
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
              className="form-input"
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
              className="form-select"
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

          <div className="form-group-num">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              className="form-input"
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

          <button className="btn-green" type="submit">Logg Session!</button>
          
          {error && (
            <p className="form-error">
               {error}
             </p>
          )}

        </form>
      </div>
          <WorkoutSummary
          key={summaryKey}
          initialDate={summaryDate}/>
    </div>
  )
}

export default TrainingPage