# Teamup — Find Teammates & Activities Near You

A mobile-first web app that helps people discover and join activities, sports, music sessions, and more happening near them. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Mapbox**.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database & Auth:** Supabase (PostgreSQL + PostGIS)
- **Maps:** Mapbox GL JS
- **State Management:** Zustand
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
cd teamup-app
npm install
```

Copy the environment template and fill in your keys:

```bash
cp .env.example .env.local
```

Required environment variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL access token |

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. It works with mock data out of the box — add your API keys to enable maps and database features.

### Build for Production

```bash
npm run build
npm start
```

## Database Setup (Supabase)

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the schema in `supabase/schema.sql` via the Supabase SQL Editor
3. Enable Realtime on the `activities` and `notifications` tables
4. Copy your project URL and anon key into `.env.local`

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository
3. Set the **Root Directory** to `teamup-app`
4. Add your environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_MAPBOX_TOKEN`
5. Click **Deploy**

Vercel will automatically detect Next.js and configure the build settings.

## Project Structure

```
src/
├── app/           # Pages & API routes (App Router)
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utilities, types, store, constants
└── types/         # TypeScript declarations
supabase/
└── schema.sql     # Database schema with PostGIS & RLS
```

## License

MIT
