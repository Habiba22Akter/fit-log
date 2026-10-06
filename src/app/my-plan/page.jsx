"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

/* Workout card shared by Today's Plan and Saved */
function PlanWorkoutCard({
  workout,
  isToday,
  onDone,
  onRemove,
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const detailsUrl = `/workouts/${workout.id}`;

  const equipment = Array.isArray(workout.equipment)
    ? workout.equipment.join(", ")
    : workout.equipment;

  return (
    <article className="card fit-plan-card">
      <Link
        href={detailsUrl}
        className="fit-plan-card-media"
        aria-label={`View ${workout.name}`}
      >
        {workout.image && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={workout.image}
            alt={workout.name}
            className="fit-plan-card-image"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="fit-plan-image-fallback">
            Image unavailable
          </span>
        )}
      </Link>

      <div className="fit-plan-card-content">
        <h2 className="fit-plan-card-title">
          <Link href={detailsUrl}>{workout.name}</Link>
        </h2>

        <p className="fit-plan-card-equipment">
          {equipment}
        </p>

        <div className="fit-plan-card-stats">
          <span>
            <Image
              src="/assets/icons/clock.png"
              width={14}
              height={14}
              alt=""
              className="fit-plan-stat-icon"
            />
            {workout.duration} min
          </span>

          <span>
            <Image
              src="/assets/icons/trending-topic.png"
              width={14}
              height={14}
              alt=""
              className="fit-plan-stat-icon"
            />
            {workout.caloriesBurned} kcal
          </span>

          <span>
            <Image
              src="/assets/icons/star-solid-full.svg"
              width={14}
              height={14}
              alt=""
              className="fit-plan-stat-icon"
            />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="fit-plan-card-actions">
        <Link
          href={detailsUrl}
          className="btn fit-plan-details-btn"
        >
          View Details
        </Link>

        {isToday && (
          <button
            type="button"
            className="btn fit-plan-done-btn"
            disabled={Boolean(workout.done)}
            onClick={onDone}
          >
            <span aria-hidden="true">✓</span>
            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          className="btn btn-ghost fit-plan-remove-btn"
          onClick={onRemove}
          aria-label={`Remove ${workout.name} from ${
            isToday ? "today's plan" : "saved"
          }`}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </article>
  );
}

export default function MyPlanPage() {
  const {
    plan,
    saved,
    ready,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("duration");

  const isToday = activeTab === "today";

  /* Summary always uses Today's Plan */
  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + (Number(workout.duration) || 0),
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + (Number(workout.caloriesBurned) || 0),
    0,
  );

  /* Select and sort the active tab's workouts */
  const currentItems = isToday ? plan : saved;

  const sortedItems = [...currentItems].sort((a, b) => {
    if (sortBy === "calories") {
      return (
        (Number(b.caloriesBurned) || 0) -
        (Number(a.caloriesBurned) || 0)
      );
    }

    if (sortBy === "rating") {
      return (
        (Number(b.rating) || 0) -
        (Number(a.rating) || 0)
      );
    }

    return (
      (Number(a.duration) || 0) -
      (Number(b.duration) || 0)
    );
  });

  return (
    <section className="fit-plan-page">
      <header className="fit-plan-heading">
        <h1>MY PLAN</h1>

        <p>
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      {/* Metrics */}
      <div
        className="stats fit-plan-summary"
        aria-label="Today's Plan summary"
      >
        <div className="stat fit-plan-stat">
          <div className="stat-title">Exercises</div>
          <div className="stat-value fit-plan-exercises">
            {ready ? plan.length : 0}
          </div>
        </div>

        <div className="stat fit-plan-stat">
          <div className="stat-title">Minutes</div>
          <div className="stat-value">
            {ready ? totalMinutes : 0}
          </div>
        </div>

        <div className="stat fit-plan-stat">
          <div className="stat-title">Calories</div>
          <div className="stat-value">
            {ready ? totalCalories : 0}
          </div>
        </div>
      </div>

      {/* Tabs and sorting */}
      <div className="fit-plan-toolbar">
        <div
          className="tabs fit-plan-tabs"
          role="tablist"
          aria-label="Workout lists"
        >
          <button
            id="today-tab"
            type="button"
            role="tab"
            aria-selected={isToday}
            aria-controls="plan-panel"
            className={`tab fit-plan-tab ${
              isToday ? "fit-plan-tab-active" : ""
            }`}
            onClick={() => setActiveTab("today")}
          >
            Today&apos;s Plan
          </button>

          <button
            id="saved-tab"
            type="button"
            role="tab"
            aria-selected={!isToday}
            aria-controls="plan-panel"
            className={`tab fit-plan-tab ${
              !isToday ? "fit-plan-tab-active" : ""
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        <div className="fit-plan-sort">
          <label htmlFor="plan-sort">Sort By</label>

          <select
            id="plan-sort"
            className="select fit-plan-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Loading, empty state or workout list */}
      <div
        id="plan-panel"
        role="tabpanel"
        aria-labelledby={isToday ? "today-tab" : "saved-tab"}
        aria-busy={!ready}
      >
        {!ready ? (
          <div className="fit-plan-loading" role="status">
            <span
              className="loading loading-spinner loading-lg"
              aria-hidden="true"
            />
            <p>Loading workouts…</p>
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="fit-plan-empty">
            <h2>NOTHING HERE YET</h2>

            <p>
              Browse the library and add a lift to get today moving.
            </p>

            <Link href="/" className="btn fit-plan-empty-btn">
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="fit-plan-card-list">
            {sortedItems.map((workout) => (
              <PlanWorkoutCard
                key={`${activeTab}-${workout.id}`}
                workout={workout}
                isToday={isToday}
                onDone={() => markAsDone(workout.id)}
                onRemove={() => {
                  if (isToday) {
                    removeFromPlan(workout.id);
                  } else {
                    removeFromSaved(workout.id);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}