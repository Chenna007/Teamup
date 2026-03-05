'use client';

import { useAppStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { Bell, Check, Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

const typeIcons: Record<string, typeof Bell> = {
  interest_received: Heart,
  interest_accepted: Check,
  new_activity: MapPin,
  activity_reminder: Calendar,
};

const typeColors: Record<string, string> = {
  interest_received: 'bg-pink-100 text-pink-600',
  interest_accepted: 'bg-emerald-100 text-emerald-600',
  new_activity: 'bg-blue-100 text-blue-600',
  activity_reminder: 'bg-amber-100 text-amber-600',
};

export default function NotificationsPage() {
  const { notifications, setNotifications } = useAppStore();

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-emerald-600" />
            <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">All caught up!</h3>
            <p className="text-sm text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notif) => {
              const Icon = typeIcons[notif.type] || Bell;
              const colorClass = typeColors[notif.type] || 'bg-gray-100 text-gray-600';

              return (
                <div
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`flex items-start gap-3 p-4 rounded-2xl transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-white hover:bg-gray-50'
                      : 'bg-emerald-50/50 hover:bg-emerald-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${notif.read ? 'text-gray-700' : 'text-gray-900 font-semibold'}`}>
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(notif.created_at)}
                    </p>
                  </div>
                  {notif.activity_id && (
                    <Link
                      href={`/activity/${notif.activity_id}`}
                      className="shrink-0 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:border-emerald-200 hover:text-emerald-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
