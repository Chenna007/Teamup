import { NextRequest, NextResponse } from 'next/server';
import { getMockActivitiesWithCreators, setMockUserLocation } from '@/lib/mock-data';
import { calculateDistance } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const category = searchParams.get('category');
  const q = searchParams.get('q');
  const sort = searchParams.get('sort') || 'distance';

  // Center mock data around user if location provided
  if (lat && lng) {
    setMockUserLocation({ latitude: parseFloat(lat), longitude: parseFloat(lng) });
  }

  let activities = getMockActivitiesWithCreators();

  // Add distance if user location provided
  if (lat && lng) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    activities = activities.map((a) => ({
      ...a,
      distance: calculateDistance(userLat, userLng, a.latitude, a.longitude),
    }));
  }

  // Filter by category
  if (category) {
    activities = activities.filter((a) => a.category === category);
  }

  // Search
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

  // Sort
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
