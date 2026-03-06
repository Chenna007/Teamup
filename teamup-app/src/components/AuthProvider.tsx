'use client';

import { useEffect } from 'react';
import { supabase, getProfile, upsertProfile } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    setIsAuthenticated,
    setCurrentUser,
    setShowLoginModal,
    loginRedirectAction,
    setLoginRedirectAction,
  } = useAppStore();

  useEffect(() => {
    // Check existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleUser(session.user);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await handleUser(session.user);
          setShowLoginModal(false);

          // Execute deferred redirect action
          const action = useAppStore.getState().loginRedirectAction;
          if (action) {
            action();
            setLoginRedirectAction(null);
          }
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUser(user: { id: string; email?: string; user_metadata?: Record<string, unknown> }) {
    // Upsert profile so it exists in the DB
    const fullName =
      (user.user_metadata?.full_name as string) ||
      (user.user_metadata?.name as string) ||
      user.email?.split('@')[0] ||
      'User';
    const avatarUrl = (user.user_metadata?.avatar_url as string) || null;

    await upsertProfile({
      id: user.id,
      email: user.email || '',
      full_name: fullName,
      avatar_url: avatarUrl,
    });

    // Fetch the full profile
    const { data: profile } = await getProfile(user.id);

    if (profile) {
      setCurrentUser({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        location: profile.location,
        interests: profile.interests || [],
        created_at: profile.created_at,
      });
    }

    setIsAuthenticated(true);
  }

  return <>{children}</>;
}
