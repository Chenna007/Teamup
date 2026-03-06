import { NextRequest, NextResponse } from 'next/server';
import { getMockActivityById } from '@/lib/mock-data';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try Supabase first
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && url !== 'your_supabase_url_here') {
      const { data, error } = await supabase
        .from('activities')
        .select('*, creator:profiles(*)')
        .eq('id', id)
        .single();

      if (!error && data) {
        return NextResponse.json({ activity: data });
      }
    }
  } catch {
    // Fall through to mock data
  }

  // Fallback: mock data
  const activity = getMockActivityById(id);

  if (!activity) {
    return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
  }

  return NextResponse.json({ activity });
}
