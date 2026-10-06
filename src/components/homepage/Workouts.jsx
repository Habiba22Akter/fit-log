"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWorkouts } from "@/lib/workouts";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      setLoading(true);
      setError("");

      try {
        const data = await getWorkouts(controller.signal);

        if (!controller.signal.aborted) {
          setWorkouts(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => controller.abort();
  }, [retry]);

  return (
    <section
      id="library"
      className="fit-library"
      aria-labelledby="library-heading"
    >
      <div className="fit-library-heading">
        <h2 id="library-heading">THE LIBRARY</h2>
        <p>Twelve lifts covering every major muscle group.</p>
      </div>

      {loading ? (
        <div className="fit-library-status" role="status">
          <span className="loading loading-spinner loading-lg" />
          <p>Loading workouts…</p>
        </div>
      ) : error ? (
        <div className="fit-library-status" role="alert">
          <p>{error}</p>

          <button
            type="button"
            className="btn fit-browse-btn"
            onClick={() => setRetry((value) => value + 1)}
          >
            TRY AGAIN
          </button>
        </div>
      ) : workouts.length === 0 ? (
        <div className="fit-library-status">
          <p>No workouts available.</p>
        </div>
      ) : (
        <div className="fit-workout-grid">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className="card fit-workout-card"
            >
              <figure className="fit-workout-media">
                {/* Workout image API থেকে আসে */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={workout.image}
                  alt={workout.name}
                  loading="lazy"
                  className="fit-workout-image"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <span className="fit-image-placeholder">
                  {workout.name}
                </span>
              </figure>

              <div className="card-body fit-workout-body">
                <div className="fit-workout-tags">
                  {(workout.muscleGroups ?? []).map((group) => (
                    <span
                      key={group}
                      className="badge fit-workout-tag"
                    >
                      {group}
                    </span>
                  ))}
                </div>

                <h3 className="fit-workout-title">
                  {workout.name}
                </h3>

                <p className="fit-workout-equipment">
                  {workout.equipment}
                </p>

                <div className="fit-workout-stats">
                  <span>
                    <Image
                      src="/assets/icons/clock.png"
                      width={15}
                      height={15}
                      alt=""
                      className="fit-stat-icon"
                    />

                    {workout.duration} min
                  </span>

                  <span>
                    <Image
                      src="/assets/icons/trending-topic.png"
                      width={15}
                      height={15}
                      alt=""
                      className="fit-stat-icon"
                    />

                    {workout.caloriesBurned} kcal
                  </span>

                  <span>
                    <Image
                      src="/assets/icons/star-solid-full.svg"
                      width={15}
                      height={15}
                      alt=""
                      className="fit-stat-icon"
                    />

                    {workout.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}