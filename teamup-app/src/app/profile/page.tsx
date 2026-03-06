'use client';

import { useState, useRef } from 'react';
import { getMockActivities } from '@/lib/mock-data';
import { CATEGORIES } from '@/lib/constants';
import { useAppStore } from '@/lib/store';
import { updateProfile } from '@/lib/supabase';
import ActivityCard from '@/components/ActivityCard';
import {
  User,
  MapPin,
  Mail,
  Edit3,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  X,
  Check,
  Camera,
  Bell,
  Map,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { currentUser, updateCurrentUser, theme, setTheme, searchRadius, setSearchRadius, isAuthenticated, setShowLoginModal } = useAppStore();
  const [activeTab, setActiveTab] = useState<'activities' | 'interested'>('activities');
  const [isEditing, setIsEditing] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: currentUser?.full_name || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
    interests: currentUser ? [...currentUser.interests] : [],
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show login prompt if not authenticated
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <User size={24} className="text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Sign in to view your profile</h2>
        <p className="text-sm text-gray-500 mb-4">Your activities, preferences, and more</p>
        <button
          onClick={() => setShowLoginModal(true)}
          className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  const myActivities = getMockActivities()
    .filter((a) => a.creator_id === currentUser.id)
    .map((a) => ({ ...a, creator: currentUser }));

  const startEditing = () => {
    setEditForm({
      full_name: currentUser.full_name,
      email: currentUser.email,
      bio: currentUser.bio || '',
      location: currentUser.location || '',
      interests: [...currentUser.interests],
    });
    setAvatarPreview(null);
    setIsEditing(true);
  };

  const saveProfile = async () => {
    const updates = {
      full_name: editForm.full_name,
      email: editForm.email,
      bio: editForm.bio || null,
      location: editForm.location || null,
      interests: editForm.interests,
      ...(avatarPreview ? { avatar_url: avatarPreview } : {}),
    };

    updateCurrentUser(updates);

    // Persist to Supabase
    if (currentUser) {
      await updateProfile(currentUser.id, updates);
    }

    setAvatarPreview(null);
    setIsEditing(false);
  };

  const toggleInterest = (slug: string) => {
    setEditForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(slug)
        ? prev.interests.filter((i) => i !== slug)
        : [...prev.interests, slug],
    }));
  };

  const handleAvatarPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm mb-6">
          <div className="h-28 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 relative">
            {!isEditing ? (
              <button
                onClick={startEditing}
                className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors"
              >
                <Edit3 size={16} />
              </button>
            ) : (
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors"
                >
                  <X size={16} />
                </button>
                <button
                  onClick={saveProfile}
                  className="p-2 bg-white/30 backdrop-blur-sm rounded-xl text-white hover:bg-white/40 transition-colors"
                >
                  <Check size={16} />
                </button>
              </div>
            )}
          </div>
          <div className="px-6 pb-6">
            <div className="-mt-12 flex items-end gap-4 mb-4">
              <div className="relative w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-emerald-700 bg-emerald-100">
                {(avatarPreview || currentUser.avatar_url) ? (
                  <img src={avatarPreview || currentUser.avatar_url!} alt={currentUser.full_name} className="w-full h-full rounded-xl object-cover" />
                ) : (
                  currentUser.full_name.charAt(0)
                )}
                {isEditing && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarPick}
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-emerald-600 transition-colors"
                    >
                      <Camera size={14} className="text-white" />
                    </div>
                  </>
                )}
              </div>
            </div>

            {isEditing ? (
              /* ── Edit Mode ── */
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={(e) => setEditForm((p) => ({ ...p, full_name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm((p) => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. Dubai, UAE"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm((p) => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    placeholder="Tell people about yourself..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const selected = editForm.interests.includes(cat.slug);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleInterest(cat.slug)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selected
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {cat.emoji} {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={saveProfile}
                  className="w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-lg shadow-emerald-200"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              /* ── View Mode ── */
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentUser.full_name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  {currentUser.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {currentUser.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Mail size={13} /> {currentUser.email}
                  </span>
                </div>

                {currentUser.bio && (
                  <p className="text-gray-600 text-sm mb-4">{currentUser.bio}</p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{myActivities.length}</p>
                    <p className="text-xs text-gray-400">Created</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">
                      {myActivities.reduce((s, a) => s + a.current_participants, 0)}
                    </p>
                    <p className="text-xs text-gray-400">Participants</p>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-amber-400 fill-amber-400" />
                      <p className="text-xl font-bold text-gray-900">4.9</p>
                    </div>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                </div>

                {/* Interests */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentUser.interests.map((interest) => {
                    const cat = CATEGORIES.find((c) => c.slug === interest);
                    return (
                      <span
                        key={interest}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium"
                      >
                        {cat?.emoji} {cat?.label || interest}
                      </span>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        {!isEditing && (
          <>
            <div className="flex gap-1 mb-6 bg-gray-100 rounded-2xl p-1">
              {(['activities', 'interested'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'activities' ? 'My Activities' : 'Interested In'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'activities' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myActivities.map((a) => (
                  <ActivityCard key={a.id} activity={a} />
                ))}
                {myActivities.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-400 mb-2">No activities created yet</p>
                    <Link
                      href="/create"
                      className="text-emerald-600 font-medium text-sm"
                    >
                      Create your first activity
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'interested' && (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  Activities you&apos;ve shown interest in will appear here
                </p>
              </div>
            )}

            {/* Settings Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <h3 className="px-5 pt-5 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Settings
              </h3>
              <button
                onClick={startEditing}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                <Edit3 size={18} />
                <span className="flex-1 text-sm font-medium text-left">Edit Profile</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                <Settings size={18} />
                <span className="flex-1 text-sm font-medium text-left">Preferences</span>
                <ChevronRight size={16} className={`text-gray-300 transition-transform ${showPreferences ? 'rotate-90' : ''}`} />
              </button>

              {/* Preferences Panel */}
              {showPreferences && (
                <div className="px-5 pb-4 space-y-4 border-t border-gray-50 dark:border-gray-700 pt-4 animate-slide-up">
                  {/* Theme Toggle */}
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Appearance</label>
                    <div className="flex gap-2">
                      {(['light', 'dark'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                            theme === t
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {t === 'light' ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                          )}
                          {t === 'light' ? 'Light' : 'Dark'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notifications Preference */}
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Notifications</label>
                    <div className="space-y-2">
                      {[
                        { label: 'Push notifications', icon: Bell, defaultOn: true },
                        { label: 'Nearby activity alerts', icon: MapPin, defaultOn: true },
                        { label: 'Show on map', icon: Map, defaultOn: true },
                      ].map((pref) => (
                        <PreferenceToggle key={pref.label} label={pref.label} icon={pref.icon} defaultOn={pref.defaultOn} />
                      ))}
                    </div>
                  </div>

                  {/* Distance Preference */}
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Search radius</label>
                    <div className="flex gap-2">
                      {['1 km', '5 km', '10 km', '25 km'].map((d) => (
                        <button
                          key={d}
                          onClick={() => setSearchRadius(d)}
                          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                            searchRadius === d
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to sign out?')) {
                    window.location.href = '/';
                  }
                }}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-red-500"
              >
                <LogOut size={18} />
                <span className="flex-1 text-sm font-medium text-left">Sign Out</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* Reusable toggle switch */
function PreferenceToggle({ label, icon: Icon, defaultOn }: { label: string; icon: React.ComponentType<{ size?: number }>; defaultOn: boolean }) {
  const [enabled, setEnabled] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2.5">
        <Icon size={16} />
        <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-10 h-6 rounded-full transition-colors ${enabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}
      >
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-4' : ''}`} />
      </button>
    </div>
  );
}
