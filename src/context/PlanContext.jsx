"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PlanContext = createContext(null);
const STORAGE_KEY = "fitlog-plan";

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  /* Load previously stored workouts */
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "null",
      );

      if (stored) {
        setPlan(
          Array.isArray(stored.plan)
            ? stored.plan.filter((item) => item?.id != null)
            : [],
        );

        setSaved(
          Array.isArray(stored.saved)
            ? stored.saved.filter((item) => item?.id != null)
            : [],
        );
      }
    } catch {
      // Invalid stored data হলে খালি list থাকবে।
    }

    setReady(true);
  }, []);

  /* Save changes after initial loading */
  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved }),
      );
    } catch {
      // Storage unavailable হলেও app চলবে।
    }
  }, [plan, saved, ready]);

  /* Automatically dismiss toast */
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  /* Add to Today's Plan */
  function addToPlan(workout) {
    if (!ready || workout?.id == null) return;

    const alreadyAdded = plan.some(
      (item) => String(item.id) === String(workout.id),
    );

    if (alreadyAdded) {
      setMessage("Already in today's plan.");
      return;
    }

    if (plan.length >= 5) {
      setMessage("Today's plan can contain up to five lifts.");
      return;
    }

    setPlan((previous) => {
      // Prevent duplicate entries and enforce the cap.
      if (
        previous.length >= 5 ||
        previous.some(
          (item) => String(item.id) === String(workout.id),
        )
      ) {
        return previous;
      }

      return [...previous, { ...workout, done: false }];
    });

    setMessage("Added to today's plan.");
  }

  /* Save for later */
  function saveWorkout(workout) {
    if (!ready || workout?.id == null) return;

    const alreadySaved = saved.some(
      (item) => String(item.id) === String(workout.id),
    );

    if (alreadySaved) {
      setMessage("Already saved.");
      return;
    }

    setSaved((previous) => {
      if (
        previous.some(
          (item) => String(item.id) === String(workout.id),
        )
      ) {
        return previous;
      }

      return [...previous, workout];
    });

    setMessage("Saved for later.");
  }

  /* Mark a planned workout as done */
  function markAsDone(id) {
    if (!ready) return;

    const workout = plan.find(
      (item) => String(item.id) === String(id),
    );

    if (!workout || workout.done) return;

    setPlan((previous) =>
      previous.map((item) =>
        String(item.id) === String(id)
          ? { ...item, done: true }
          : item,
      ),
    );

    setMessage("Workout marked as done.");
  }

  /* Remove from Today's Plan */
  function removeFromPlan(id) {
    if (!ready) return;

    const exists = plan.some(
      (item) => String(item.id) === String(id),
    );

    if (!exists) return;

    setPlan((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id),
      ),
    );

    setMessage("Workout removed from today's plan.");
  }

  /* Remove from Saved */
  function removeFromSaved(id) {
    if (!ready) return;

    const exists = saved.some(
      (item) => String(item.id) === String(id),
    );

    if (!exists) return;

    setSaved((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id),
      ),
    );

    setMessage("Workout removed from saved.");
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        ready,
        addToPlan,
        saveWorkout,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}

      {message && (
        <div className="toast toast-end fit-toast">
          <div
            className="alert fit-toast-message"
            role="status"
            aria-live="polite"
          >
            <span>{message}</span>

            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setMessage("")}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider",
    );
  }

  return context;
}