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

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "null"
      );

      if (stored) {
        setPlan(
          Array.isArray(stored.plan)
            ? stored.plan.filter((item) => item?.id != null)
            : []
        );

        setSaved(
          Array.isArray(stored.saved)
            ? stored.saved.filter((item) => item?.id != null)
            : []
        );
      }
    } catch {
      // Invalid stored data হলে খালি list ব্যবহার করবে।
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved })
      );
    } catch {
      // Storage unavailable হলেও buttons কাজ করবে।
    }
  }, [plan, saved, ready]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  function addToPlan(workout) {
    if (!ready) return;

    if (plan.some((item) => String(item.id) === String(workout.id))) {
      setMessage("Already in today's plan.");
      return;
    }

    if (plan.length >= 5) {
      setMessage("Today's plan can contain up to five lifts.");
      return;
    }

    setPlan((previous) => [...previous, workout]);
    setMessage("Added to today's plan.");
  }

  function saveWorkout(workout) {
    if (!ready) return;

    if (saved.some((item) => String(item.id) === String(workout.id))) {
      setMessage("Already saved.");
      return;
    }

    setSaved((previous) => [...previous, workout]);
    setMessage("Saved for later.");
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        ready,
        addToPlan,
        saveWorkout,
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
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}