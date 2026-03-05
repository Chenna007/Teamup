'use client';

import { use } from 'react';
import { MOCK_USERS, getMockActivities } from '@/lib/mock-data';
import { CATEGORIES } from '@/lib/constants';
import ActivityCard from '@/components/ActivityCard';
import { ArrowLeft, MapPin, Calendar, Star } from 'lucide-react';
import Link from 'next/link';

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = MOCK_USERS[id];

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">User not found</h2>
        <Link href="/" className="text-emerald-600 font-medium text-sm">Go Home</Link>
      </div>
    );
  }

  const userActivities = getMockActivities()
    .filter((a) => a.creator_id === id)
    .map((a) => ({ ...a, creator: user }));

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Creator Profile</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm mb-6">
          {/* Cover gradient */}
          <div className="h-24 bg-gradient-to-r from-emerald-400 to-teal-500" />
          <div className="px-6 pb-6">
            <div className="-mt-10 flex items-end gap-4 mb-4">
              <div className="w-20 h-20 bg-white rounded-2xl border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-2xl font-bold text-emerald-700 bg-emerald-100">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                ) : (
                  user.full_name.charAt(0)
                )}
              </div>
              <div className="pb-1">
                <h2 className="text-xl font-bold text-gray-900">{user.full_name}</h2>
                {user.location && (
                  <p className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={13} /> {user.location}
                  </p>
                )}
              </div>
            </div>

            {user.bio && (
              <p className="text-gray-600 text-sm mb-4">{user.bio}</p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="font-bold text-gray-900">{userActivities.length}</p>
                <p className="text-gray-400 text-xs">Activities</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900">
                  {userActivities.reduce((sum, a) => sum + a.current_participants, 0)}
                </p>
                <p className="text-gray-400 text-xs">Participants</p>
              </div>
              <div className="flex items-center gap-1 text-center">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <p className="font-bold text-gray-900">4.8</p>
                <p className="text-gray-400 text-xs">(12)</p>
              </div>
            </div>

            {/* Interests */}
            {user.interests.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {user.interests.map((interest) => {
                  const cat = CATEGORIES.find((c) => c.slug === interest);
                  return (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
                    >
                      {cat?.emoji} {cat?.label || interest}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Activities */}
        <h3 className="font-semibold text-gray-900 mb-3">Activities by {user.full_name.split(' ')[0]}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {userActivities.length === 0 && (
          <p className="text-gray-400 text-center py-8">No activities yet</p>
        )}
      </div>
    </div>
  );
}
