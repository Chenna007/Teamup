'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';
import { Activity } from '@/lib/types';

/**
 * Hook to subscribe to real-time activity updates via Supabase Realtime.
 * When a new activity is inserted, it's automatically added to the store.
 */
export function useRealtimeActivities() {
  const { activities, setActivities, setFilteredActivities, userLocation } = useAppStore();

  useEffect(() => {
    // Only subscribe if Supabase is configured
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url || url === 'your_supabase_url_here') return;

    const channel = supabase
      .channel('activities-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activities' },
        (payload) => {
          const newActivity = payload.new as Activity;
          const updated = [newActivity, ...activities];
          setActivities(updated);
          setFilteredActivities(updated);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'activities' },
        (payload) => {
          const updatedActivity = payload.new as Activity;
          const updated = activities.map((a) =>
            a.id === updatedActivity.id ? { ...a, ...updatedActivity } : a
          );
          setActivities(updated);
          setFilteredActivities(updated);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'activities' },
        (payload) => {
          const deletedId = (payload.old as { id: string }).id;
          const updated = activities.filter((a) => a.id !== deletedId);
          setActivities(updated);
          setFilteredActivities(updated);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activities.length]);
}

/**
 * Hook to subscribe to real-time notification updates.
 */
export function useRealtimeNotifications() {
  const { notifications, setNotifications } = useAppStore();

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url || url === 'your_supabase_url_here') return;

    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          const newNotif = payload.new as typeof notifications[0];
          setNotifications([newNotif, ...notifications]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [notifications.length]);
}
