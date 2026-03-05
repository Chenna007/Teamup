export type Category = {
  id: string;
  label: string;
  emoji: string;
  slug: string;
  image: string;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  interests: string[];
  created_at: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  date: string;
  time: string;
  max_participants: number;
  current_participants: number;
  creator_id: string;
  creator?: UserProfile;
  image_url: string | null;
  created_at: string;
  distance?: number;
};

export type Interest = {
  id: string;
  activity_id: string;
  user_id: string;
  message: string | null;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  user?: UserProfile;
};

export type Notification = {
  id: string;
  user_id: string;
  type: 'interest_received' | 'interest_accepted' | 'new_activity' | 'activity_reminder';
  title: string;
  message: string;
  read: boolean;
  activity_id: string | null;
  created_at: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};
