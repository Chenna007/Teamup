# Teamup — Development Plan

## Overview
Teamup is a mobile-first, real-time web app that helps people find teammates and activities near them based on location. Built with Next.js, TypeScript, TailwindCSS, Supabase, and Mapbox.

---

## Project Structure

```
teamup-app/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout with Header, BottomNav, LocationProvider
│   │   ├── page.tsx              # Landing page (hero, map, search, nearby activities)
│   │   ├── globals.css           # Global styles & animations
│   │   ├── search/page.tsx       # Search results with list/map toggle
│   │   ├── activity/[id]/page.tsx # Activity details page
│   │   ├── create/page.tsx       # Create new activity form
│   │   ├── creator/[id]/page.tsx # Creator profile page
│   │   ├── profile/page.tsx      # Current user profile
│   │   ├── notifications/page.tsx # Notifications center
│   │   └── api/                  # API routes
│   │       ├── activities/route.ts       # GET activities (search, filter, sort)
│   │       ├── activities/[id]/route.ts  # GET single activity
│   │       └── interests/route.ts        # POST express interest
│   ├── components/               # Reusable UI components
│   │   ├── Header.tsx            # Desktop/mobile header with nav
│   │   ├── BottomNav.tsx         # Mobile bottom navigation bar
│   │   ├── SearchBar.tsx         # Search with category suggestions
│   │   ├── MapView.tsx           # Mapbox interactive map
│   │   ├── ActivityCard.tsx      # Activity list item card
│   │   ├── CategoryPills.tsx     # Horizontal scrollable category filter
│   │   ├── InterestedButton.tsx  # "I'm Interested" CTA with modal
│   │   └── LocationProvider.tsx  # Geolocation detection wrapper
│   ├── hooks/
│   │   └── useRealtime.ts       # Supabase realtime subscriptions
│   └── lib/
│       ├── types.ts              # TypeScript type definitions
│       ├── constants.ts          # Categories, map defaults
│       ├── supabase.ts           # Supabase client initialization
│       ├── store.ts              # Zustand global state management
│       ├── utils.ts              # Formatters, distance calc, geolocation
│       └── mock-data.ts          # Mock activities & users for development
├── supabase/
│   └── schema.sql               # Complete database schema with RLS policies
├── .env.local                    # Environment variables (tokens)
├── package.json
└── tsconfig.json
```

---

## Database Schema

### Tables
1. **profiles** — User accounts (linked to Supabase Auth)
2. **activities** — Events/activities with geospatial location (PostGIS)
3. **interests** — User interest expressions (join requests)
4. **notifications** — Push notification records

### Key Features
- PostGIS `GEOGRAPHY` column for proximity queries
- `nearby_activities()` SQL function for efficient radius search
- Row Level Security (RLS) policies for all tables
- Realtime enabled on `activities` and `notifications`
- Auto-updating `updated_at` timestamps via triggers

---

## Step-by-Step Development Plan

### Phase 1: Foundation ✅ (Current)
- [x] Initialize Next.js + TypeScript + TailwindCSS
- [x] Set up folder structure
- [x] Define types and constants
- [x] Create Zustand store for state management
- [x] Build mock data for development
- [x] Create utility functions (distance, formatting)

### Phase 2: Core UI ✅ (Current)
- [x] Build root layout with Header + BottomNav
- [x] Build SearchBar with category suggestions
- [x] Build ActivityCard component
- [x] Build MapView component (Mapbox integration)
- [x] Build CategoryPills filter
- [x] Build InterestedButton with modal
- [x] Build LocationProvider for geolocation
- [x] Global CSS animations

### Phase 3: Pages ✅ (Current)
- [x] Landing page (hero + map + search + nearby + trending)
- [x] Search results page (list/map toggle)
- [x] Activity details page
- [x] Create activity page
- [x] Creator profile page
- [x] User profile page
- [x] Notifications page

### Phase 4: Backend ✅ (Current)
- [x] API route: GET /api/activities (search, filter, sort)
- [x] API route: GET /api/activities/[id]
- [x] API route: POST /api/interests
- [x] Database schema SQL
- [x] Realtime hooks

### Phase 5: Supabase Integration (Next)
- [ ] Create Supabase project and run schema.sql
- [ ] Set up Supabase Auth (email + social login)
- [ ] Replace mock data with Supabase queries
- [ ] Implement create activity with actual DB insert
- [ ] Implement interest submission with DB insert
- [ ] Add realtime subscriptions for new activities
- [ ] Add realtime notifications

### Phase 6: Map & Location Polish
- [ ] Add Mapbox geocoding for address autocomplete in create form
- [ ] Reverse geocode user location for display
- [ ] Add map clustering for many activities
- [ ] Add "recenter on me" button
- [ ] Implement distance-based sorting with PostGIS

### Phase 7: Authentication & User Management
- [ ] Login/signup pages with Supabase Auth
- [ ] Protected routes (create, profile, notifications)
- [ ] Profile editing with avatar upload
- [ ] Session management

### Phase 8: Real-time & Notifications
- [ ] Browser push notifications
- [ ] Real-time activity feed on landing page
- [ ] Real-time participant count updates
- [ ] Email notifications via Supabase Edge Functions

### Phase 9: Polish & Deploy
- [ ] Loading skeletons for all pages
- [ ] Error boundaries
- [ ] SEO optimization (dynamic metadata)
- [ ] Image optimization for activity photos
- [ ] PWA support (service worker, manifest)
- [ ] Deploy to Vercel
- [ ] Connect custom domain

---

## How to Run

```bash
cd teamup-app

# Add your keys to .env.local:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# NEXT_PUBLIC_MAPBOX_TOKEN=...

npm run dev
```

Visit `http://localhost:3000`

The app works immediately with mock data. Add your Mapbox token to see the interactive map; add Supabase credentials to enable database and realtime features.
