# FitLog — Workout Library

**Train with intent. Log every set.**

FitLog is a responsive workout library and planning application.
Users can explore workouts, view exercise instructions, create
today's training plan, and save exercises for later.

## Project Links

Live Website:https://fit-log-pi-nine.vercel.app/


## Technologies Used

| Technology | Purpose |
|------------|---------|
| Next.js 16 — App Router | Page routing and application structure |
| React 19 | Components and interactive user interfaces |
| JavaScript / JSX | Application logic and component markup |
| Tailwind CSS 4 | Utility-based styling |
| DaisyUI 5 | UI components including buttons, badges, tabs, stats, and toasts |
| Custom CSS | Custom design and responsive layouts |
| React Context API | Shared state for today's plan and saved workouts |
| Browser localStorage | Persisting plan, saved workouts, and completion status |
| Fetch API | Retrieving workout data from the FitLog API |

## Key Features

### 1. Workout Library
Browse workouts fetched from the FitLog API. Each card displays
an image, muscle-group tags, equipment, duration, calories, and rating.

### 2. Workout Details
View workout descriptions, equipment, difficulty, sets, reps,
duration, calories, rating, and step-by-step instructions.

### 3. Today's Plan and Saved Workouts
Add exercises to today's plan or save them for later.
Navbar counters show the number of workouts in each list.

### 4. Live Summary
The active My Plan tab displays its total exercises,
workout duration, and calories. Totals update when items
are added or removed.

### 5. Sorting
Sort Today's Plan and Saved workouts by Duration, Calories,
or Rating. All options sort from lowest to highest,
with Duration selected by default.

### 6. Completion and Removal
Mark planned workouts as done or remove workouts from either
list. Toast notifications provide feedback for these actions.

### 7. Persistent Data
Plan entries, completion status, and saved workouts remain
available after refreshing the page using localStorage.

### 8. Responsive Design
The interface adapts to desktop, tablet, and mobile screens.
Loading indicators and empty states provide clear feedback.

### 9. Five-Workout Limit
Today's Plan supports up to five workouts. Duplicate additions
are prevented, and the Add button is disabled when the plan is full.

## Routes

| Route | Page |
|-------|------|
| `/` | Home and workout library |
| `/workouts/[id]` | Individual workout details |
| `/my-plan?tab=today` | Today's Plan |
| `/my-plan?tab=saved` | Saved workouts |

Navbar Plan and Saved counters open their corresponding tabs.
The selected tab is preserved in the URL when the page is refreshed.

## 🌐 API Endpoints

### Primary API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

### Alternative API

- All workouts: `https://api.api-store.workers.dev/api/fitlog`
- Single workout: `https://api.api-store.workers.dev/api/fitlog/:id`

Replace `:id` with the workout ID.
The application attempts the alternative API if the primary request fails.

## Run Locally

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Create a production build

```bash
npm run build
```

### Start the production server

```bash
npm start
```

## Data Storage

The application stores plan and saved-workout data under the
localStorage key `fitlog-plan`.

Data persists within the same browser and website origin.
It is not synced between devices or browsers.

## Challenge Features

- Sort dropdown with Duration, Calories, and Rating options.
- Project README with description, technologies, and key features.
- Mark as Done button with a check symbol and toast notification.
- Remove button with toast notification.





<!-- …or create a new repository on the command line
echo "# fit-log" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Habiba22Akter/fit-log.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/Habiba22Akter/fit-log.git
git branch -M main
git push -u origin main -->