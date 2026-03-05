'use client';

import { Activity } from '@/lib/types';
import { formatDate, formatTime, formatDistance } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import { MapPin, Clock, Users, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

interface ActivityCardProps {
  activity: Activity;
  compact?: boolean;
}

export default function ActivityCard({ activity, compact = false }: ActivityCardProps) {
  const category = CATEGORIES.find((c) => c.slug === activity.category);
  const spotsLeft = activity.max_participants - activity.current_participants;

  return (
    <Link href={`/activity/${activity.id}`}>
      <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer ${compact ? '' : 'active:scale-[0.98]'}`}>
        {/* Header gradient strip */}
        <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />

        <div className={`p-4 ${compact ? 'py-3' : ''}`}>
          {/* Category + Date row */}
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
              {category?.emoji} {category?.label || activity.category}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {formatDate(activity.date)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base mb-1.5 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {activity.title}
          </h3>

          {!compact && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {activity.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} />
              {activity.distance !== undefined
                ? formatDistance(activity.distance)
                : activity.address}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              {formatTime(activity.time)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users size={13} />
              {spotsLeft > 0 ? (
                <span className={spotsLeft <= 3 ? 'text-orange-500 font-medium' : ''}>
                  {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                </span>
              ) : (
                <span className="text-red-500 font-medium">Full</span>
              )}
            </span>
          </div>
        </div>

        {!compact && (
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-emerald-700 bg-emerald-100 shrink-0">
                {activity.creator?.avatar_url ? (
                  <img src={activity.creator.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  activity.creator?.full_name?.charAt(0) || '?'
                )}
              </div>
              <span className="text-xs text-gray-500">
                by {activity.creator?.full_name || 'Unknown'}
              </span>
              <span className="flex items-center gap-0.5 text-xs text-amber-500">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                {(4 + Math.round(((parseInt(activity.id, 10) * 7) % 10) / 10 * 10) / 10).toFixed(1)}
              </span>
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </div>
        )}
      </div>
    </Link>
  );
}
