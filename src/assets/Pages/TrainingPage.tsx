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

  const handleSubmit = async(e: FormEvent) => {

    e.preventDefault();
    try {
        const payload  = {
              date: form.date,
              name: form.name,
              exerciseType: form.exerciseType,
              sets: form.sets,
              reps: form.reps,
              equipment: form.equipment,
              weight: Number(form.weight),
        };
        await createWorkout(payload);
        setForm({date:'', name:'', exerciseType:'', sets:'', reps:'', equipment:'', weight:'' });
        loadWorkouts();
    } catch(err) {
        console.error(err);
    }
  };

  return (
    <div className="Traningpagemain">TrainingPage
      <div className="Workoutformgroup">
        <form className="Workoutform" onSubmit={handleSubmit}>

          <div>
            <input             
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required />
            <label htmlFor=""></label>
          </div>

          <div>
            <input             
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required 
              />
            <label htmlFor="">Session Name</label>
          </div>

          <button type="submit">
            Logg Session!
          </button>

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