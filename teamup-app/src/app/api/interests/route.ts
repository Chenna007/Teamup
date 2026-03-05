import { NextRequest, NextResponse } from 'next/server';

// POST /api/interests — express interest in an activity
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { activity_id, message } = body;

  if (!activity_id) {
    return NextResponse.json({ error: 'activity_id is required' }, { status: 400 });
  }

  // In production, insert into Supabase:
  // const { data, error } = await supabase.from('interests').insert({
  //   activity_id,
  //   user_id: currentUser.id,
  //   message,
  // });

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
