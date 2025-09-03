import { useEffect, useMemo, useState } from "react";
import { fetchWorkoutSummary } from "../../../api/workouts";
import type { Workout } from "../../../types";
import type { WorkoutDaySummaryDto } from "../../../api/workouts";

const toIsoDate = (d: Date) => d.toISOString().slice(0, 10);

type Props = {
  /** Startdate ISO. Defult date is today*/
  initialDate?: string;
  /** callback on date change */
  onDateChange?: (dateIso: string) => void;
  /** Blocks navigation to non existing days */
  lockFuture?: boolean;
};

const WorkoutSummary: React.FC<Props> = ({ initialDate, onDateChange, lockFuture = true }) => {
  const [cursor, setCursor] = useState<string>(initialDate ?? toIsoDate(new Date()));
  const [summary, setSummary] = useState<WorkoutDaySummaryDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const todayIso = useMemo(() => toIsoDate(new Date()), []);
  const nextDisabled = lockFuture && summary ? summary.nextDate > todayIso : false;

  useEffect(() => {
    let aborted = false;
    setLoading(true);
    setErr(null);

    fetchWorkoutSummary(cursor)
      .then(dto => { if (!aborted) setSummary(dto); })
      .catch(e => { if (!aborted) {console.error(e); setErr("Cound not get summary"); setSummary(null); }})
      .finally(() => { if (!aborted) setLoading(false); });

    return () => { aborted = true; };
  }, [cursor]);

  useEffect(() => { if (onDateChange && summary) onDateChange(summary.date); }, [summary, onDateChange]);

  const goPrev = () => summary && setCursor(summary.prevDate);
  const goNext = () => summary && setCursor(summary.nextDate);

  return (
    <div className="workout-sum">
      <div className="workout-sum-header">
        <h1>Here is a summary of your workouts</h1>
        <div className="workout-sum-nav">
          <button onClick={goPrev} aria-label="Previous Date">←</button>
          <input
            type="date"
            value={summary?.date ?? cursor}
            onChange={e => setCursor(e.target.value)}
            aria-label="Pick Date"
          />
          <button onClick={goNext} aria-label="Next Date" disabled={nextDisabled}>→</button>
        </div>
      </div>

      {loading && <p>Laddar…</p>}
      {err && <p className="error">{err}</p>}

      {!loading && !err && (
        <>
          <p className="workout-sum-meta">
            Datum: {summary?.date ?? cursor} • Antal pass: {summary?.totalWorkouts ?? 0}
          </p>
          <ul className="workout-sum-list">
            {summary?.workouts?.length
              ? summary.workouts.map((w: Workout) => (
                  <li key={w.id}>
                    {new Date(w.date).toLocaleDateString()} – {w.name} – {w.exerciseType}: {w.sets}×{w.reps} @ {w.weight}kg ({w.equipment})
                  </li>
                ))
              : <li>Inga workouts denna dag.</li>}
          </ul>
        </>
      )}
    </div>
  );
};

export default WorkoutSummary;
