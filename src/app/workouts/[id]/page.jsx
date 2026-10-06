"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getWorkout } from "@/lib/workouts";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailsPage() {
  const { id } = useParams();

  const {
    plan,
    saved,
    ready,
    addToPlan,
    saveWorkout,
  } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [missing, setMissing] = useState(false);
  const [retry, setRetry] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkout() {
      setLoading(true);
      setError("");
      setMissing(false);
      setImageFailed(false);
      setWorkout(null);

      try {
        const data = await getWorkout(id, controller.signal);

        if (!controller.signal.aborted) {
          setWorkout(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
          setMissing(error.status === 404);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWorkout();

    return () => controller.abort();
  }, [id, retry]);

  if (loading) {
    return (
      <div className="fit-detail-status" role="status">
        <span className="loading loading-spinner loading-lg" />
        <p>Loading workout…</p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="fit-detail-status" role="alert">
        <h1>
          {missing ? "WORKOUT NOT FOUND" : "COULD NOT LOAD WORKOUT"}
        </h1>

        <p>{error}</p>

        {missing ? (
          <Link href="/" className="btn fit-browse-btn">
            GO TO WORKOUTS
          </Link>
        ) : (
          <button
            type="button"
            className="btn fit-browse-btn"
            onClick={() => setRetry((value) => value + 1)}
          >
            TRY AGAIN
          </button>
        )}
      </div>
    );
  }

  const alreadyPlanned = plan.some(
    (item) => String(item.id) === String(workout.id)
  );

  const alreadySaved = saved.some(
    (item) => String(item.id) === String(workout.id)
  );

  const planFull = plan.length >= 5;

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <section className="fit-details">
      <div className="fit-detail-media">
        {imageFailed ? (
          <p>Image unavailable</p>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={workout.image}
              alt={workout.name}
              className="fit-detail-image"
              onError={() => setImageFailed(true)}
            />
          </>
        )}
      </div>

      <div className="fit-detail-content">
        <h1 className="fit-detail-title">{workout.name}</h1>

        <p className="fit-detail-description">
          {workout.description}
        </p>

        <div className="fit-detail-tags">
          {(workout.muscleGroups ?? []).map((group) => (
            <span key={group} className="badge fit-detail-tag">
              {group}
            </span>
          ))}
        </div>

        <div className="fit-spec-panel">
          <table className="table fit-spec-table">
            <caption className="sr-only">
              Workout specifications
            </caption>

            <tbody>
              {specs.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fit-instructions">
          <h2>INSTRUCTIONS</h2>

          <ol>
            {(workout.instructions ?? []).map((step, index) => (
              <li key={`${index}-${step}`}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="fit-details-actions">
  <button
    type="button"
    className="btn fit-add-btn"
    disabled={!ready || alreadyPlanned || planFull}
    onClick={() => addToPlan(workout)}
  >
    <Image
      src="/assets/icons/calendar.png"
      width={18}
      height={18}
      alt=""
      className="fit-action-icon"
    />

    {alreadyPlanned
      ? "Added to plan"
      : planFull
        ? "Plan full (5/5)"
        : "Add to today's plan"}
  </button>

  <button
    type="button"
    className="btn btn-outline fit-save-btn"
    disabled={!ready || alreadySaved}
    onClick={() => saveWorkout(workout)}
  >
    <Image
      src="/assets/icons/bookmark-white.png"
      width={16}
      height={18}
      alt=""
      className="fit-action-icon fit-bookmark-icon"
    />

    {alreadySaved ? "Saved" : "Save for later"}
  </button>
</div>
      </div>
    </section>
  );
}