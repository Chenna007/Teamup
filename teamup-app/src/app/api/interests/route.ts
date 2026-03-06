import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/interests — express interest in an activity
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { activity_id, message } = body;

  if (!activity_id) {
    return NextResponse.json({ error: 'activity_id is required' }, { status: 400 });
  }

  // Try Supabase insert
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (!authError && user) {
        const { data, error } = await supabase
          .from('interests')
          .insert({
            activity_id,
            user_id: user.id,
            message: message || null,
          })
          .select()
          .single();

        if (!error && data) {
          // Also create a notification for the activity creator
          const { data: activity } = await supabase
            .from('activities')
            .select('creator_id, title')
            .eq('id', activity_id)
            .single();

          if (activity) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('id', user.id)
              .single();

            await supabase.from('notifications').insert({
              user_id: activity.creator_id,
              type: 'interest_received',
              title: 'New teammate request',
              message: `${profile?.full_name || 'Someone'} wants to join your ${activity.title}`,
              activity_id,
            });
          }

          return NextResponse.json({ interest: data }, { status: 201 });
        }

        if (error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
      }
    }
  } catch {
    // Fall through to mock response
  }

  // Fallback: mock response
  const interest = {
    id: crypto.randomUUID(),
    activity_id,
    user_id: 'current_user',
    message: message || null,
    status: 'pending' as const,
    created_at: new Date().toISOString(),
  };

  return NextResponse.json({ interest }, { status: 201 });
}
