import { NextRequest, NextResponse } from 'next/server';
import { getMockActivitiesWithCreators, setMockUserLocation } from '@/lib/mock-data';
import { calculateDistance } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const category = searchParams.get('category');
  const q = searchParams.get('q');
  const sort = searchParams.get('sort') || 'distance';

  // Try Supabase first
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && url !== 'your_supabase_url_here') {
      let query_builder;

      if (lat && lng) {
        const { data, error } = await supabase.rpc('nearby_activities', {
          user_lat: parseFloat(lat),
          user_lng: parseFloat(lng),
          radius_km: 50,
        });

        if (!error && data && data.length > 0) {
          let activities = data.map((a: Record<string, unknown>) => ({
            ...a,
            date: String(a.date),
            time: String(a.time),
            distance: a.distance_km,
          }));

          if (category) activities = activities.filter((a: { category: string }) => a.category === category);
          if (q) {
            const query = (q as string).toLowerCase();
            activities = activities.filter(
              (a: { title: string; description: string; category: string; address: string }) =>
                a.title.toLowerCase().includes(query) ||
                a.description.toLowerCase().includes(query) ||
                a.category.toLowerCase().includes(query) ||
                a.address.toLowerCase().includes(query)
            );
          }

          return NextResponse.json({ activities, total: activities.length });
        }
      } else {
        query_builder = supabase
          .from('activities')
          .select('*, creator:profiles(*)')
          .gte('date', new Date().toISOString().split('T')[0])
          .order('created_at', { ascending: false })
          .limit(100);

        if (category) query_builder = query_builder.eq('category', category);

        const { data, error } = await query_builder;

        if (!error && data && data.length > 0) {
          let activities = data;
          if (q) {
            const query = (q as string).toLowerCase();
            activities = activities.filter(
              (a: { title: string; description: string; category: string; address: string }) =>
                a.title.toLowerCase().includes(query) ||
                a.description.toLowerCase().includes(query) ||
                a.category.toLowerCase().includes(query) ||
                a.address.toLowerCase().includes(query)
            );
          }
          return NextResponse.json({ activities, total: activities.length });
        }
      }
    }
  } catch {
    // Fall through to mock data
  }

  // Fallback: mock data
  if (lat && lng) {
    setMockUserLocation({ latitude: parseFloat(lat), longitude: parseFloat(lng) });
  }

  let activities = getMockActivitiesWithCreators();

  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    activities = activities.map((a) => ({
      ...a,
      distance: calculateDistance(userLat, userLng, a.latitude, a.longitude),
    }));
  }

  if (category) {
    activities = activities.filter((a) => a.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    activities = activities.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query) ||
        a.address.toLowerCase().includes(query)
    );
  }

  switch (sort) {
    case 'distance':
      activities.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
      break;
    case 'date':
      activities.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case 'popular':
      activities.sort((a, b) => b.current_participants - a.current_participants);
      break;
  }

  return NextResponse.json({ activities, total: activities.length });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Get the current user from the auth header
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, category, address, date, time, max_participants, latitude, longitude, image_url } = body;

  if (!title || !description || !category || !address || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('activities')
    .insert({
      title,
      description,
      category,
      address,
      date,
      time,
      max_participants: max_participants || 10,
      latitude: latitude || 0,
      longitude: longitude || 0,
      image_url: image_url || null,
      creator_id: user.id,
    })
    .select('*, creator:profiles(*)')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ activity: data }, { status: 201 });
}
