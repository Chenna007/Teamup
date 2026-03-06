import { create } from 'zustand';
import { Activity, Coordinates, Notification, UserProfile } from './types';
import { getMockActivitiesWithCreators, setMockUserLocation, MOCK_USERS } from './mock-data';
import { calculateDistance } from './utils';
import { supabase } from './supabase';

interface AppState {
  // Location
  userLocation: Coordinates | null;
  setUserLocation: (loc: Coordinates) => void;
  locationError: string | null;
  setLocationError: (err: string | null) => void;

  // Current User
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;

  // Activities
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  filteredActivities: Activity[];
  setFilteredActivities: (activities: Activity[]) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;

  // UI
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedActivityId: string | null;
  setSelectedActivityId: (id: string | null) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  searchRadius: string;
  setSearchRadius: (r: string) => void;

  // Landing flow
  hasExplored: boolean;
  setHasExplored: (v: boolean) => void;

  // Auth
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (v: boolean) => void;
  loginRedirectAction: (() => void) | null;
  setLoginRedirectAction: (action: (() => void) | null) => void;
  login: () => void;
  logout: () => Promise<void>;

  // Notifications
  notifications: Notification[];
  setNotifications: (n: Notification[]) => void;
  unreadCount: number;

  // Actions
  loadActivities: () => Promise<void>;
  searchActivities: (query: string, category?: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  userLocation: null,
  setUserLocation: (loc) => {
    set({ userLocation: loc });
    get().loadActivities();
  },
  locationError: null,
  setLocationError: (err) => set({ locationError: err }),

  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  updateCurrentUser: (updates) => {
    set((state) => {
      if (!state.currentUser) return state;
      return { currentUser: { ...state.currentUser, ...updates } };
    });
  },

  activities: [],
  setActivities: (activities) => set({ activities }),
  filteredActivities: [],
  setFilteredActivities: (activities) => set({ filteredActivities: activities }),

  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedCategory: null,
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  isSearchOpen: false,
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),
  selectedActivityId: null,
  setSelectedActivityId: (id) => set({ selectedActivityId: id }),
  theme: 'light',
  setTheme: (t) => {
    set({ theme: t });
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', t === 'dark');
    }
  },
  searchRadius: '10 km',
  setSearchRadius: (r) => set({ searchRadius: r }),

  // Landing flow
  hasExplored: false,
  setHasExplored: (v) => set({ hasExplored: v }),

  // Auth
  isAuthenticated: false,
  setIsAuthenticated: (v) => set({ isAuthenticated: v }),
  showLoginModal: false,
  setShowLoginModal: (v) => set({ showLoginModal: v }),
  loginRedirectAction: null,
  setLoginRedirectAction: (action) => set({ loginRedirectAction: action }),
  login: () => {
    set({ isAuthenticated: true, showLoginModal: false });
    const action = get().loginRedirectAction;
    if (action) {
      action();
      set({ loginRedirectAction: null });
    }
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ isAuthenticated: false, currentUser: null });
  },

  notifications: [],
  setNotifications: (n) => set({ notifications: n }),
  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length;
  },

  loadActivities: async () => {
    const loc = get().userLocation;

    // Try loading from Supabase first
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && url !== 'your_supabase_url_here') {
        if (loc) {
          // Use the nearby_activities RPC function
          const { data, error } = await supabase.rpc('nearby_activities', {
            user_lat: loc.latitude,
            user_lng: loc.longitude,
            radius_km: 50,
          });

          if (!error && data && data.length > 0) {
            // Fetch creator profiles for each activity
            const creatorIds = [...new Set(data.map((a: { creator_id: string }) => a.creator_id))];
            const { data: profiles } = await supabase
              .from('profiles')
              .select('*')
              .in('id', creatorIds);

            const profileMap = new Map(
              (profiles || []).map((p: UserProfile) => [p.id, p])
            );

            const activities: Activity[] = data.map((a: Activity & { distance_km?: number }) => ({
              ...a,
              date: String(a.date),
              time: String(a.time),
              distance: a.distance_km,
              creator: profileMap.get(a.creator_id) || undefined,
            }));

            set({ activities, filteredActivities: activities });
            return;
          }
        } else {
          // No location — fetch all activities
          const { data, error } = await supabase
            .from('activities')
            .select('*, creator:profiles(*)')
            .gte('date', new Date().toISOString().split('T')[0])
            .order('created_at', { ascending: false })
            .limit(100);

          if (!error && data && data.length > 0) {
            const activities: Activity[] = data.map((a: Record<string, unknown>) => ({
              ...a,
              date: String(a.date),
              time: String(a.time),
            })) as Activity[];
            set({ activities, filteredActivities: activities });
            return;
          }
        }
      }
    } catch {
      // Fall through to mock data
    }

    // Fallback: use mock data
    if (loc) {
      setMockUserLocation(loc);
    }

    let activities = getMockActivitiesWithCreators();

    if (loc) {
      activities = activities.map((a) => ({
        ...a,
        distance: calculateDistance(loc.latitude, loc.longitude, a.latitude, a.longitude),
      }));
      activities.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
    }

    set({ activities, filteredActivities: activities });
  },

  searchActivities: (query, category) => {
    const { activities } = get();
    const q = query.toLowerCase().trim();

    let filtered = activities;

    if (category) {
      filtered = filtered.filter((a) => a.category === category);
    }

    if (q) {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.address.toLowerCase().includes(q)
      );
    }

    set({ filteredActivities: filtered, searchQuery: query, selectedCategory: category ?? null });
  },
}));
