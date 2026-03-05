'use client';

import { use, useState } from 'react';
import { getMockActivityById } from '@/lib/mock-data';
import { formatDate, formatTime } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import { useAppStore } from '@/lib/store';
import InterestedButton from '@/components/InterestedButton';
import MapView from '@/components/MapView';
import ShareModal from '@/components/ShareModal';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  Share2,
  Flag,
  MessageCircle,
  UserPlus,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function ActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const activity = getMockActivityById(id);
  const { isAuthenticated, setShowLoginModal, setLoginRedirectAction } = useAppStore();
  const [showShareModal, setShowShareModal] = useState(false);
  const [joined, setJoined] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      setLoginRedirectAction(action);
      setShowLoginModal(true);
      return;
    }
    action();
  };

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MapPin size={24} className="text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Activity not found</h2>
        <p className="text-sm text-gray-500 mb-4">This activity may have been removed</p>
        <Link
          href="/"
          className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.slug === activity.category);
  const spotsLeft = activity.max_participants - activity.current_participants;
  const fillPercent = (activity.current_participants / activity.max_participants) * 100;

  const handleJoin = () => {
    requireAuth(() => setJoined(true));
  };

  const handleMessage = () => {
    requireAuth(() => setMessageSent(true));
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Top bar */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
              <Flag size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Category Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-3">
          {category?.emoji} {category?.label}
        </span>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {activity.title}
        </h1>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={15} className="text-emerald-500" />
            {formatDate(activity.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={15} className="text-emerald-500" />
            {formatTime(activity.time)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} className="text-emerald-500" />
            {activity.address}
          </span>
        </div>

        {/* Map */}
        <div className="mb-6">
          <MapView
            activities={[activity]}
            center={[activity.longitude, activity.latitude]}
            zoom={14}
            className="h-[200px] md:h-[280px]"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">About this activity</h2>
          <p className="text-gray-600 leading-relaxed">{activity.description}</p>
        </div>

        {/* Participants */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-emerald-600" />
              <span className="font-semibold text-gray-900">Participants</span>
            </div>
            <span className="text-sm text-gray-500">
              {activity.current_participants}/{activity.max_participants}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
          {/* Urgency indicator */}
          {spotsLeft > 0 && spotsLeft <= 3 ? (
            <div className="flex items-center gap-1.5 mt-2">
              <Zap size={14} className="text-orange-500" />
              <span className="text-sm font-semibold text-orange-600">
                Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left!
              </span>
            </div>
          ) : spotsLeft > 0 ? (
            <p className="text-xs text-gray-400">
              {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining &mdash; Need {spotsLeft} more player{spotsLeft !== 1 ? 's' : ''}
            </p>
          ) : (
            <p className="text-xs text-red-500 font-medium">This activity is full</p>
          )}
        </div>

        {/* Creator */}
        {activity.creator && (
          <Link href={`/creator/${activity.creator.id}`}>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 hover:border-emerald-200 transition-colors group cursor-pointer">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                Organized by
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-lg font-bold text-emerald-700 bg-emerald-100 shrink-0">
                  {activity.creator.avatar_url ? (
                    <img src={activity.creator.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    activity.creator.full_name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {activity.creator.full_name}
                  </p>
                  <p className="text-sm text-gray-500">{activity.creator.bio?.slice(0, 60)}...</p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          {/* Join Activity */}
          {spotsLeft > 0 && !joined && (
            <button
              onClick={handleJoin}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-lg shadow-emerald-200"
            >
              <UserPlus size={20} />
              Join Activity
            </button>
          )}
          {joined && (
            <div className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-50 text-emerald-700 rounded-2xl font-semibold">
              &#x2714; You&apos;ve joined this activity!
            </div>
          )}

          {/* I'm Interested + Message row */}
          <div className="grid grid-cols-2 gap-3">
            <InterestedButton activityId={activity.id} activityTitle={activity.title} />
            {!messageSent ? (
              <button
                onClick={handleMessage}
                className="flex items-center justify-center gap-2 px-4 py-3.5 border border-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                <MessageCircle size={18} />
                Message
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 px-4 py-3.5 bg-blue-50 text-blue-700 rounded-2xl font-medium">
                &#x2714; Message Sent
              </div>
            )}
          </div>

          {/* Invite Friends */}
          <button
            onClick={() => setShowShareModal(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 active:scale-[0.98] transition-all shadow-lg shadow-purple-200"
          >
            <Share2 size={18} />
            Invite Friends
          </button>
        </div>

        {/* Sticky CTA */}
        <div className="sticky bottom-20 md:bottom-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="font-semibold text-gray-900">{formatDate(activity.date)} &middot; {formatTime(activity.time)}</p>
            <p className="text-sm text-gray-500">
              {spotsLeft > 0 ? (
                spotsLeft <= 3 ? (
                  <span className="text-orange-600 font-medium">&#9889; Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left</span>
                ) : (
                  <>{spotsLeft} spots left</>
                )
              ) : (
                <span className="text-red-500">Full</span>
              )}
            </p>
          </div>
          {!joined && spotsLeft > 0 ? (
            <button
              onClick={handleJoin}
              className="px-6 py-3 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-lg shadow-emerald-200"
            >
              Join Activity
            </button>
          ) : joined ? (
            <span className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-semibold">Joined &#x2714;</span>
          ) : (
            <InterestedButton activityId={activity.id} activityTitle={activity.title} />
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        activityId={activity.id}
        activityTitle={activity.title}
        spotsLeft={spotsLeft}
      />
    </div>
  );
}
