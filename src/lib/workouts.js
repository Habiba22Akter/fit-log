const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export async function getWorkouts(signal) {
  for (const url of API_URLS) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.any([
          signal,
          AbortSignal.timeout(10000),
        ]),
      });

      if (!response.ok) {
        throw new Error("Could not fetch workouts");
      }

      const result = await response.json();
      const workouts = Array.isArray(result) ? result : result.data;

      if (!Array.isArray(workouts)) {
        throw new Error("Invalid workout data");
      }

      return workouts;
    } catch (error) {
      if (signal.aborted) {
        throw error;
      }

      // প্রথম API কাজ না করলে alternative API ব্যবহার করবে।
    }
  }

  throw new Error("Could not load workouts. Please try again.");
}