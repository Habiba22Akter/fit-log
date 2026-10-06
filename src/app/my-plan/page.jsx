"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const { plan, saved, ready } = usePlan();

  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("duration");

  const totalMinutes = plan.reduce(
    (total, workout) => total + (Number(workout.duration) || 0),
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + (Number(workout.caloriesBurned) || 0),
    0,
  );

  const currentItems = activeTab === "today" ? plan : saved;

  const sortedItems = [...currentItems].sort((a, b) => {
    if (sortBy === "calories") {
      return Number(b.caloriesBurned) - Number(a.caloriesBurned);
    }

    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating);
    }

    return Number(a.duration) - Number(b.duration);
  });

  return (
    <section className="fit-plan-page">
      <header className="fit-plan-heading">
        <h1>MY PLAN</h1>

        <p>
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      {/* Metrics always show Today's Plan totals */}
      <div className="stats fit-plan-summary" aria-label="Plan summary">
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
            aria-selected={activeTab === "today"}
            aria-controls="plan-panel"
            className={`tab fit-plan-tab ${
              activeTab === "today" ? "fit-plan-tab-active" : ""
            }`}
            onClick={() => setActiveTab("today")}
          >
            Today&apos;s Plan
          </button>

          <button
            id="saved-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "saved"}
            aria-controls="plan-panel"
            className={`tab fit-plan-tab ${
              activeTab === "saved" ? "fit-plan-tab-active" : ""
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

      <div
        id="plan-panel"
        role="tabpanel"
        aria-labelledby={
          activeTab === "today" ? "today-tab" : "saved-tab"
        }
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
          <div className="fit-plan-basic-list">
            {sortedItems.map((workout) => (
              <div className="fit-plan-basic-row" key={workout.id}>
                <h2>{workout.name}</h2>

                <Link
                  href={`/workouts/${workout.id}`}
                  className="btn fit-plan-view-btn"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}