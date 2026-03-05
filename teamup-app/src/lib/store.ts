import { create } from 'zustand';
import { Activity, Coordinates, Notification, UserProfile } from './types';
import { getMockActivitiesWithCreators, setMockUserLocation, MOCK_USERS } from './mock-data';
import { calculateDistance } from './utils';

interface AppState {
  // Location
  userLocation: Coordinates | null;
  setUserLocation: (loc: Coordinates) => void;
  locationError: string | null;
  setLocationError: (err: string | null) => void;

  // Current User
  currentUser: UserProfile;
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
  showLoginModal: boolean;
  setShowLoginModal: (v: boolean) => void;
  loginRedirectAction: (() => void) | null;
  setLoginRedirectAction: (action: (() => void) | null) => void;
  login: () => void;
  logout: () => void;

  // Notifications
  notifications: Notification[];
  setNotifications: (n: Notification[]) => void;
  unreadCount: number;

  // Actions
  loadActivities: () => void;
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

  currentUser: { ...MOCK_USERS['user1'] },
  updateCurrentUser: (updates) => {
    set((state) => ({ currentUser: { ...state.currentUser, ...updates } }));
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
  logout: () => set({ isAuthenticated: false }),

  notifications: [
    {
      id: '1',
      user_id: 'current',
      type: 'interest_received',
      title: 'New teammate request',
      message: 'Sofia wants to join your Weekend Football Match',
      read: false,
      activity_id: '1',
      created_at: '2026-03-05T08:00:00Z',
    },
    {
      id: '2',
      user_id: 'current',
      type: 'new_activity',
      title: 'New activity nearby',
      message: 'Acoustic Jam Session was just posted near you',
      read: false,
      activity_id: '2',
      created_at: '2026-03-05T06:00:00Z',
    },
    {
      id: '3',
      user_id: 'current',
      type: 'activity_reminder',
      title: 'Activity tomorrow',
      message: 'Morning Yoga in the Park is happening tomorrow',
      read: true,
      activity_id: '3',
      created_at: '2026-03-04T20:00:00Z',
    },
  ],
  setNotifications: (n) => set({ notifications: n }),
  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length;
  },

  loadActivities: () => {
    const loc = get().userLocation;

    // Update mock data's center point so activities scatter around user
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
