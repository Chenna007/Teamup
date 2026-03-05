-- ==========================================
-- TEAMUP DATABASE SCHEMA (Supabase / PostgreSQL)
-- ==========================================

-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============
-- PROFILES
-- ============
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by anyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- ============
-- ACTIVITIES
-- ============
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (
    ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography
  ) STORED,
  address TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 10,
  current_participants INTEGER NOT NULL DEFAULT 0,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Activities are viewable by anyone"
  ON activities FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create activities"
  ON activities FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own activities"
  ON activities FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Creators can delete own activities"
  ON activities FOR DELETE USING (auth.uid() = creator_id);

-- Index for geospatial proximity queries
CREATE INDEX idx_activities_location ON activities USING GIST (location);
CREATE INDEX idx_activities_category ON activities (category);
CREATE INDEX idx_activities_date ON activities (date);
CREATE INDEX idx_activities_creator ON activities (creator_id);

-- ============
-- INTERESTS (User expresses interest in an activity)
-- ============
CREATE TABLE interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(activity_id, user_id)
);

ALTER TABLE interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own interests"
  ON interests FOR SELECT USING (
    auth.uid() = user_id OR
    auth.uid() IN (SELECT creator_id FROM activities WHERE id = activity_id)
  );

CREATE POLICY "Authenticated users can express interest"
  ON interests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Activity creators can update interest status"
  ON interests FOR UPDATE USING (
    auth.uid() IN (SELECT creator_id FROM activities WHERE id = activity_id)
  );

-- ============
-- NOTIFICATIONS
-- ============
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('interest_received', 'interest_accepted', 'new_activity', 'activity_reminder')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE INDEX idx_notifications_user ON notifications (user_id, read, created_at DESC);

-- ============
-- FUNCTIONS
-- ============

-- Find nearby activities
CREATE OR REPLACE FUNCTION nearby_activities(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 25
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  category TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  address TEXT,
  date DATE,
  time TIME,
  max_participants INTEGER,
  current_participants INTEGER,
  creator_id UUID,
  image_url TEXT,
  created_at TIMESTAMPTZ,
  distance_km DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id, a.title, a.description, a.category,
    a.latitude, a.longitude, a.address,
    a.date, a.time, a.max_participants, a.current_participants,
    a.creator_id, a.image_url, a.created_at,
    ST_Distance(
      a.location,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
    ) / 1000 AS distance_km
  FROM activities a
  WHERE ST_DWithin(
    a.location,
    ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
    radius_km * 1000
  )
  AND a.date >= CURRENT_DATE
  ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql;

-- Auto-update updated_at on activities
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_activities_updated_at
  BEFORE UPDATE ON activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============
-- REALTIME
-- ============
-- Enable realtime on activities and notifications tables
ALTER PUBLICATION supabase_realtime ADD TABLE activities;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
