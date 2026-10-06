const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function requestWorkouts(path, signal) {
  let notFound = false;

  for (const base of API_URLS) {
    try {
      const response = await fetch(`${base}${path}`, {
        cache: "no-store",
        signal: AbortSignal.any([
          signal,
          AbortSignal.timeout(10000),
        ]),
      });

      if (response.status === 404) {
        notFound = true;
        continue;
      }

      if (!response.ok) {
        throw new Error("API request failed");
      }

      return await response.json();
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }

  const error = new Error(
    path && notFound
      ? "Workout not found."
      : "Could not load workouts. Please try again."
  );

  error.status = path && notFound ? 404 : 503;
  throw error;
}

export async function getWorkouts(signal) {
  const result = await requestWorkouts("", signal);
  const workouts = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(workouts)) {
    throw new Error("Invalid workout data");
  }

  return workouts;
}

export async function getWorkout(id, signal) {
  const result = await requestWorkouts(
    `/${encodeURIComponent(id)}`,
    signal
  );

  const data = result.data ?? result;
  const workout = Array.isArray(data)
    ? data.find((item) => String(item.id) === String(id))
    : data;

  if (!workout || String(workout.id) !== String(id)) {
    const error = new Error("Workout not found.");
    error.status = 404;
    throw error;
  }

  return workout;
}