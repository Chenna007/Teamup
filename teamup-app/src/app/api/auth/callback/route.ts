import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const origin = request.nextUrl.origin;

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect back to homepage after auth
  return NextResponse.redirect(`${origin}/`);
}
