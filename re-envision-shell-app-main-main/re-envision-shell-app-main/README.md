# ReEnvision

A learning app for four AI courses — 32 units, 96 lessons — played as a world
map. Each unit is an island: three lesson stops and a boss fight at the castle.

## Run it

```bash
npm install
npm run dev
```

Then `npm run build` for a production bundle, `npm run preview` to serve it.

> Keep the checkout path short. Windows has a 260-character path limit and this
> repo is nested two folders deep, which is enough on its own to make esbuild's
> install step fail. `C:\dev\reenvision` is fine; a deep folder under
> `Downloads` is not.

## Backend

Supabase handles auth, XP sync, classes and leaderboards. Copy `.env.example`
to `.env` and fill in:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Both are publishable values — access is controlled by row-level security, not
by keeping them secret. With no `.env` the app still runs: progress and stats
stay on the device, and the sign-in screen says so.

## Layout

```
public/curriculum/   the 32 unit pages, self-contained HTML
public/sandy/        the mascot's 12 sprites
src/data/            curriculum, question bank, videos
src/lib/             progress, stats, supabase
src/screens/         home, unit map, lesson, boss, leaderboard, profile…
```
