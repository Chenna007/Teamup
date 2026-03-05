import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', label: 'Find sports teammates', emoji: '⚽', slug: 'sports', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop&auto=format' },
  { id: '2', label: 'Cricket Players', emoji: '🏏', slug: 'cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop&auto=format' },
  { id: '3', label: 'Meet musicians', emoji: '🎸', slug: 'music', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop&auto=format' },
  { id: '4', label: 'Join creative communities', emoji: '📷', slug: 'creative', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop&auto=format' },
  { id: '5', label: 'Start fitness groups', emoji: '🏃', slug: 'fitness', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&auto=format' },
  { id: '6', label: 'Find gaming partners', emoji: '🎮', slug: 'gaming', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop&auto=format' },
  { id: '7', label: 'Meet filmmakers & creators', emoji: '🎬', slug: 'filmmaking', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop&auto=format' },
  { id: '8', label: 'Connect with artists & designers', emoji: '🎨', slug: 'art-design', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop&auto=format' },
  { id: '9', label: 'Join book clubs & learning groups', emoji: '📚', slug: 'book-clubs', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format' },
  { id: '10', label: 'Find startup teammates', emoji: '💻', slug: 'startups', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop&auto=format' },
  { id: '11', label: 'Join yoga & wellness groups', emoji: '🧘', slug: 'yoga-wellness', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format' },
  { id: '12', label: 'Find cycling partners', emoji: '🚴', slug: 'cycling', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop&auto=format' },
  { id: '13', label: 'Explore hiking groups', emoji: '🥾', slug: 'hiking', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&auto=format' },
  { id: '14', label: 'Meet people for coffee chats', emoji: '☕', slug: 'coffee', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format' },
  { id: '15', label: 'Connect with travelers', emoji: '🌍', slug: 'travel', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&auto=format' },
  { id: '16', label: 'Join local basketball games', emoji: '🏀', slug: 'basketball', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop&auto=format' },
];

// Fallback center — only used until browser geolocation responds
export const DEFAULT_CENTER: [number, number] = [55.2708, 25.2048]; // Dubai default

export const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
