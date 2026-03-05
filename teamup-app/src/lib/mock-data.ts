import { Activity, Coordinates, UserProfile } from './types';

// ─── 12 diverse international users ───────────────────────────────────────────

export const MOCK_USERS: Record<string, UserProfile> = {
  user1: {
    id: 'user1',
    email: 'marcus@example.com',
    full_name: 'Marcus Johnson',
    avatar_url: 'https://randomuser.me/api/portraits/men/23.jpg',
    bio: 'Sports enthusiast from Chicago. Love football, basketball, and staying active.',
    location: 'Near you',
    interests: ['sports', 'fitness', 'basketball'],
    created_at: '2025-01-15T10:00:00Z',
  },
  user2: {
    id: 'user2',
    email: 'sofia@example.com',
    full_name: 'Sofia Martinez',
    avatar_url: 'https://randomuser.me/api/portraits/women/9.jpg',
    bio: 'Musician and gamer from Barcelona. Guitar player by day, board game strategist by night.',
    location: 'Near you',
    interests: ['music', 'gaming', 'coffee'],
    created_at: '2025-02-20T10:00:00Z',
  },
  user3: {
    id: 'user3',
    email: 'yuki@example.com',
    full_name: 'Yuki Tanaka',
    avatar_url: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Yoga instructor and nature lover from Tokyo. Organizing community wellness events.',
    location: 'Near you',
    interests: ['yoga-wellness', 'hiking', 'travel'],
    created_at: '2025-03-10T10:00:00Z',
  },
  user4: {
    id: 'user4',
    email: 'emma@example.com',
    full_name: 'Emma Larsson',
    avatar_url: 'https://randomuser.me/api/portraits/women/21.jpg',
    bio: 'Serial entrepreneur from Stockholm. Love connecting with fellow founders over coffee.',
    location: 'Near you',
    interests: ['startups', 'book-clubs', 'coffee'],
    created_at: '2025-04-05T10:00:00Z',
  },
  user5: {
    id: 'user5',
    email: 'liam@example.com',
    full_name: "Liam O'Brien",
    avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Photographer and cyclist from Dublin. Capturing moments on and off the bike.',
    location: 'Near you',
    interests: ['creative', 'cycling', 'travel'],
    created_at: '2025-05-18T10:00:00Z',
  },
  user6: {
    id: 'user6',
    email: 'fatima@example.com',
    full_name: 'Fatima Al-Hassan',
    avatar_url: 'https://randomuser.me/api/portraits/women/29.jpg',
    bio: 'Filmmaker and cricket fan from Dubai. Love storytelling through the lens.',
    location: 'Near you',
    interests: ['filmmaking', 'cricket', 'creative'],
    created_at: '2025-06-10T10:00:00Z',
  },
  user7: {
    id: 'user7',
    email: 'lucas@example.com',
    full_name: 'Lucas Dubois',
    avatar_url: 'https://randomuser.me/api/portraits/men/7.jpg',
    bio: 'Artist and gamer from Paris. Sketching the world one city at a time.',
    location: 'Near you',
    interests: ['art-design', 'gaming', 'coffee'],
    created_at: '2025-07-22T10:00:00Z',
  },
  user8: {
    id: 'user8',
    email: 'amara@example.com',
    full_name: 'Amara Okafor',
    avatar_url: 'https://randomuser.me/api/portraits/women/47.jpg',
    bio: 'Avid reader and world traveler from Lagos. Running book clubs and planning adventures.',
    location: 'Near you',
    interests: ['book-clubs', 'travel', 'coffee'],
    created_at: '2025-08-30T10:00:00Z',
  },
  user9: {
    id: 'user9',
    email: 'chen@example.com',
    full_name: 'Chen Wei',
    avatar_url: 'https://randomuser.me/api/portraits/men/15.jpg',
    bio: 'Tech entrepreneur and fitness geek from Shanghai. Building apps and lifting weights.',
    location: 'Near you',
    interests: ['startups', 'fitness', 'gaming'],
    created_at: '2025-09-12T10:00:00Z',
  },
  user10: {
    id: 'user10',
    email: 'isabella@example.com',
    full_name: 'Isabella Santos',
    avatar_url: 'https://randomuser.me/api/portraits/women/79.jpg',
    bio: 'Dance instructor and coffee addict from São Paulo. Bringing energy to every room.',
    location: 'Near you',
    interests: ['fitness', 'music', 'coffee'],
    created_at: '2025-10-05T10:00:00Z',
  },
  user11: {
    id: 'user11',
    email: 'dmitri@example.com',
    full_name: 'Dmitri Volkov',
    avatar_url: 'https://randomuser.me/api/portraits/men/33.jpg',
    bio: 'Chess master and mountain climber from Moscow. Strategy on the board and on the trail.',
    location: 'Near you',
    interests: ['gaming', 'hiking', 'cycling'],
    created_at: '2025-11-20T10:00:00Z',
  },
  user12: {
    id: 'user12',
    email: 'aisha@example.com',
    full_name: 'Aisha Patel',
    avatar_url: 'https://randomuser.me/api/portraits/women/57.jpg',
    bio: 'UX designer and basketball enthusiast from London. Creating beautiful things on and off the court.',
    location: 'Near you',
    interests: ['art-design', 'basketball', 'creative'],
    created_at: '2025-12-01T10:00:00Z',
  },
};

// ─── Additional unique creators (user13–user64) — one per activity ────────────

const EXTRA_CREATORS: [string, 'm' | 'f', number][] = [
  ['Jay Kim', 'm', 2],
  ['Priya Sharma', 'f', 2],
  ['Andre Silva', 'm', 3],
  ['Zara Abdi', 'f', 3],
  ['Noah Fischer', 'm', 4],
  ['Mei Lin', 'f', 4],
  ['Ravi Gupta', 'm', 5],
  ['Nia Addo', 'f', 5],
  ['Jake Thompson', 'm', 6],
  ['Hanna Eriksson', 'f', 6],
  ['Takumi Sato', 'm', 8],
  ['Chloe Dupont', 'f', 7],
  ['Mateo García', 'm', 10],
  ['Leila Benali', 'f', 8],
  ['Kai Nakamura', 'm', 12],
  ['Anya Kowalski', 'f', 10],
  ['Dylan Cooper', 'm', 13],
  ['Zuri Mwangi', 'f', 11],
  ['Sami Kouri', 'm', 14],
  ['Lin Xiao', 'f', 12],
  ['Erik Andersen', 'm', 16],
  ['Rosa Fernandez', 'f', 13],
  ['Dante Romano', 'm', 17],
  ['Nadia Horvat', 'f', 14],
  ['Leo Nguyen', 'm', 18],
  ['Sakura Hayashi', 'f', 15],
  ['Arjun Reddy', 'm', 19],
  ['Isla Murray', 'f', 16],
  ['Tariq Amin', 'm', 20],
  ['Mia Karlsson', 'f', 17],
  ['Felix Braun', 'm', 22],
  ['Alina Pop', 'f', 18],
  ['Ryan Park', 'm', 23],
  ['Chiara Rossi', 'f', 19],
  ['Marco Costa', 'm', 24],
  ['Ayla Demir', 'f', 20],
  ['Hassan Ali', 'm', 25],
  ['Lena Wagner', 'f', 22],
  ['James Obi', 'm', 26],
  ['Nina Björk', 'f', 23],
  ['Kenji Yamamoto', 'm', 27],
  ['Eva Torres', 'f', 24],
  ['Omar Diallo', 'm', 28],
  ['Maya Jensen', 'f', 25],
  ['Tomás Rivera', 'm', 29],
  ['Sara Lindqvist', 'f', 26],
  ['Aiden Walsh', 'm', 30],
  ['Kira Novak', 'f', 27],
  ['Ethan Brooks', 'm', 31],
  ['Dina Farouk', 'f', 28],
  ['Nikolai Petrov', 'm', 34],
  ['Yara Saeed', 'f', 30],
];

EXTRA_CREATORS.forEach(([name, gender, portrait], i) => {
  const id = `user${i + 13}`;
  MOCK_USERS[id] = {
    id,
    email: `${name.split(' ')[0].toLowerCase()}@example.com`,
    full_name: name,
    avatar_url: `https://randomuser.me/api/portraits/${gender === 'm' ? 'men' : 'women'}/${portrait}.jpg`,
    bio: `Loves meeting new people and sharing experiences.`,
    location: 'Near you',
    interests: [],
    created_at: new Date(2025, i % 12, (i % 28) + 1).toISOString(),
  };
});

// ─── Activity templates – 10 per category, 160 total ──────────────────────────
// Coordinates are omitted — generated dynamically around the user's position.

type ActivityTemplate = Omit<Activity, 'latitude' | 'longitude'>;

const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  // ──────────── SPORTS (1-10) ────────────
  { id: '1', title: 'Weekend Football Match', description: 'Friendly 7-a-side football on turf. All skill levels welcome — just bring boots and water!', category: 'sports', address: 'Local Sports Ground', date: '2026-03-07', time: '07:00', max_participants: 14, current_participants: 9, creator_id: 'user1', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '2', title: 'Tennis Doubles Mixer', description: 'Looking for partners to rotate doubles games. Intermediate level preferred. Rackets available to borrow.', category: 'sports', address: 'Community Tennis Courts', date: '2026-03-08', time: '09:00', max_participants: 8, current_participants: 5, creator_id: 'user1', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '3', title: 'Badminton Smash Hour', description: 'Indoor badminton sessions every Saturday. Mixed doubles and singles. Shuttlecocks provided.', category: 'sports', address: 'Indoor Sports Hall', date: '2026-03-07', time: '10:00', max_participants: 12, current_participants: 7, creator_id: 'user9', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '4', title: 'Volleyball Beach Pickup', description: 'Casual beach volleyball — 4v4 format. No experience needed, just a fun attitude.', category: 'sports', address: 'Beachfront Court', date: '2026-03-09', time: '16:00', max_participants: 8, current_participants: 3, creator_id: 'user10', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '5', title: 'Table Tennis Tournament', description: 'Singles elimination tournament at the rec center. All levels. Prizes for top 3!', category: 'sports', address: 'Recreation Center', date: '2026-03-08', time: '14:00', max_participants: 16, current_participants: 10, creator_id: 'user11', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '6', title: 'Running Club — 5K Mornings', description: 'We run a chill 5K every weekday at dawn. Pace groups from 5 to 7 min/km. Show up and go!', category: 'sports', address: 'Waterfront Promenade', date: '2026-03-06', time: '05:30', max_participants: 30, current_participants: 18, creator_id: 'user1', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '7', title: 'Open Water Swimming', description: 'Supervised open-water swim for experienced swimmers. Safety kayakers present. 1.5km route.', category: 'sports', address: 'Lake Marina', date: '2026-03-09', time: '06:00', max_participants: 15, current_participants: 8, creator_id: 'user9', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '8', title: 'Touch Rugby Pickup', description: 'Non-contact rugby for mixed teams of all ages. Great cardio and good people!', category: 'sports', address: 'Rugby Field', date: '2026-03-07', time: '17:00', max_participants: 20, current_participants: 12, creator_id: 'user12', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '9', title: 'Boxing Fitness Meetup', description: 'Partner up for pad work and heavy bag drills. Gloves and wraps available at the gym.', category: 'sports', address: 'Knockout Gym', date: '2026-03-08', time: '18:00', max_participants: 10, current_participants: 6, creator_id: 'user10', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '10', title: 'Martial Arts Open Mat', description: 'Open sparring and drills — BJJ, Muay Thai, and wrestling. Respectful rolling only.', category: 'sports', address: 'Combat Sports Academy', date: '2026-03-09', time: '19:00', max_participants: 16, current_participants: 9, creator_id: 'user11', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── CRICKET (11-20) ────────────
  { id: '11', title: 'T20 Blast Weekend', description: 'Fast-paced T20 format match. Two teams of 11. White ball, colored kits encouraged!', category: 'cricket', address: 'Cricket Ground Nearby', date: '2026-03-08', time: '08:00', max_participants: 22, current_participants: 16, creator_id: 'user6', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '12', title: 'Cricket Net Practice', description: 'Bowlers and batsmen welcome for structured net sessions. Pads and helmets provided.', category: 'cricket', address: 'Practice Nets Facility', date: '2026-03-06', time: '07:00', max_participants: 14, current_participants: 8, creator_id: 'user6', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '13', title: 'Gully Cricket Evenings', description: 'Street-style tape-ball cricket. No gear needed, just show up and bat or bowl!', category: 'cricket', address: 'Neighborhood Park', date: '2026-03-07', time: '17:00', max_participants: 16, current_participants: 11, creator_id: 'user1', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '14', title: 'Indoor Cricket League', description: 'Join our 6-a-side indoor league. Fast games, soft ball, great fun. Teams forming now!', category: 'cricket', address: 'Indoor Cricket Arena', date: '2026-03-10', time: '19:00', max_participants: 12, current_participants: 6, creator_id: 'user12', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '15', title: 'Cricket Coaching Camp', description: 'Professional coaching for all ages. Focus on technique, fielding, and match strategy.', category: 'cricket', address: 'Sports Academy', date: '2026-03-09', time: '09:00', max_participants: 20, current_participants: 13, creator_id: 'user9', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '16', title: 'Floodlight Night Cricket', description: 'Play under the lights! T10 format, fast cricket. Music and BBQ after the game.', category: 'cricket', address: 'Floodlit Cricket Oval', date: '2026-03-08', time: '19:30', max_participants: 22, current_participants: 18, creator_id: 'user6', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '17', title: "Women's Cricket Social", description: 'All-women cricket for newbies and experienced players. Safe, supportive, competitive.', category: 'cricket', address: 'City Cricket Ground', date: '2026-03-07', time: '08:00', max_participants: 22, current_participants: 14, creator_id: 'user10', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '18', title: 'Beach Cricket Classic', description: 'Barefoot cricket on sand! Tape ball, quick overs, max fun. Bring sunscreen.', category: 'cricket', address: 'Sandy Beach Park', date: '2026-03-09', time: '15:00', max_participants: 16, current_participants: 10, creator_id: 'user1', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '19', title: 'Cricket Trivia & Watch Party', description: 'Watch the big match on the big screen and test your cricket knowledge in our quiz!', category: 'cricket', address: 'Sports Bar Downtown', date: '2026-03-07', time: '20:00', max_participants: 30, current_participants: 15, creator_id: 'user8', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '20', title: 'Junior Cricket Training', description: 'Fun cricket sessions for kids aged 8-16. Learn batting, bowling, and fielding basics.', category: 'cricket', address: 'School Sports Field', date: '2026-03-08', time: '10:00', max_participants: 20, current_participants: 12, creator_id: 'user12', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── MUSIC (21-30) ────────────
  { id: '21', title: 'Acoustic Jam Session', description: 'Guitarists, vocalists, and acoustic musicians for a chill jam. Bring your instrument!', category: 'music', address: 'Nearby Coffee Shop', date: '2026-03-06', time: '18:00', max_participants: 8, current_participants: 4, creator_id: 'user2', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '22', title: 'Band Rehearsal Space Share', description: 'We have a rehearsal room booked and need a bassist + drummer. Rock/indie style.', category: 'music', address: 'Music Studio Complex', date: '2026-03-07', time: '19:00', max_participants: 5, current_participants: 3, creator_id: 'user2', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '23', title: 'Karaoke Night Out', description: 'Belt out your favorite songs with a fun crew. Private rooms booked, drinks available.', category: 'music', address: 'Karaoke Lounge', date: '2026-03-08', time: '20:00', max_participants: 12, current_participants: 7, creator_id: 'user10', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '24', title: 'Open Mic Friday', description: 'Sign up to perform original songs, covers, comedy, or spoken word. 10-min slots.', category: 'music', address: 'The Velvet Lounge', date: '2026-03-06', time: '20:00', max_participants: 20, current_participants: 11, creator_id: 'user8', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '25', title: 'DJ Skills Workshop', description: 'Learn beatmatching, mixing, and basic scratching on CDJs. All gear provided.', category: 'music', address: 'Sound Lab Studio', date: '2026-03-09', time: '14:00', max_participants: 8, current_participants: 5, creator_id: 'user2', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '26', title: 'Drumming Circle in the Park', description: 'Bring any percussion instrument — djembe, bongo, shaker — and join the rhythm.', category: 'music', address: 'City Park Amphitheater', date: '2026-03-07', time: '16:00', max_participants: 25, current_participants: 10, creator_id: 'user10', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '27', title: 'Piano Players Meetup', description: 'Pianists of all levels meet to share pieces, jam, and learn from each other. Grand piano available.', category: 'music', address: 'Community Arts Center', date: '2026-03-08', time: '15:00', max_participants: 10, current_participants: 4, creator_id: 'user7', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '28', title: 'Community Choir Rehearsal', description: 'No auditions needed! We sing pop, gospel, and world music. Warm-up at 6, full rehearsal at 6:30.', category: 'music', address: 'Church Hall', date: '2026-03-06', time: '18:00', max_participants: 40, current_participants: 22, creator_id: 'user8', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '29', title: 'Music Production Meetup', description: 'Share beats, get feedback, collaborate on tracks. Bring your laptop with your DAW.', category: 'music', address: 'Tech Hub Co-working', date: '2026-03-09', time: '13:00', max_participants: 10, current_participants: 6, creator_id: 'user9', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '30', title: 'Classical Ensemble Practice', description: 'String and wind players for chamber music. Currently rehearsing Dvořák and Schubert.', category: 'music', address: 'Conservatory Practice Room', date: '2026-03-10', time: '11:00', max_participants: 8, current_participants: 5, creator_id: 'user7', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── CREATIVE (31-40) ────────────
  { id: '31', title: 'Photography Walk — Street Edition', description: 'Explore vibrant streets with fellow photographers. Markets, architecture, and street life.', category: 'creative', address: 'Downtown Market Area', date: '2026-03-09', time: '16:00', max_participants: 10, current_participants: 5, creator_id: 'user5', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '32', title: 'Creative Writing Workshop', description: 'Freewriting prompts, peer feedback, and storytelling exercises. All genres welcome.', category: 'creative', address: 'Public Library', date: '2026-03-08', time: '10:00', max_participants: 15, current_participants: 8, creator_id: 'user4', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '33', title: 'Pottery & Ceramics Class', description: 'Get your hands dirty! Beginner wheel-throwing session. All materials and firing included.', category: 'creative', address: 'Clay House Studio', date: '2026-03-07', time: '11:00', max_participants: 8, current_participants: 6, creator_id: 'user7', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '34', title: 'DIY Crafts Afternoon', description: 'Make candles, macramé, and resin art. All supplies provided. Take your creations home!', category: 'creative', address: 'Maker Space', date: '2026-03-08', time: '14:00', max_participants: 12, current_participants: 5, creator_id: 'user12', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '35', title: 'Content Creators Meetup', description: 'YouTubers, TikTokers, and bloggers — share tips, collab ideas, and behind-the-scenes stories.', category: 'creative', address: 'Co-working Lounge', date: '2026-03-06', time: '17:00', max_participants: 20, current_participants: 9, creator_id: 'user6', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '36', title: 'Podcast Recording Session', description: 'Round-table podcast discussion on city life and culture. Need 3 more voices!', category: 'creative', address: 'Sound Studio Colab', date: '2026-03-09', time: '15:00', max_participants: 6, current_participants: 3, creator_id: 'user8', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '37', title: 'Graphic Design Jam', description: 'Design a poster, logo, or artwork in a collaborative 3-hour sprint. Themes announced on the day.', category: 'creative', address: 'Design Hub', date: '2026-03-07', time: '10:00', max_participants: 15, current_participants: 7, creator_id: 'user12', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '38', title: 'Fashion Sketch & Sew', description: 'Bring ideas, fabric swatches, or just curiosity. We sketch designs and talk fashion.', category: 'creative', address: 'Textile Workshop', date: '2026-03-10', time: '13:00', max_participants: 10, current_participants: 4, creator_id: 'user10', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '39', title: 'Jewelry Making Basics', description: 'Learn wire wrapping and beading techniques. Make a ring and bracelet to keep.', category: 'creative', address: 'Artisan Atelier', date: '2026-03-08', time: '11:00', max_participants: 8, current_participants: 5, creator_id: 'user5', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '40', title: 'Calligraphy for Beginners', description: 'Introduction to brush and nib calligraphy. Kits provided. Leave with your own artwork.', category: 'creative', address: 'Art & Soul Gallery', date: '2026-03-09', time: '10:00', max_participants: 12, current_participants: 8, creator_id: 'user7', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── FITNESS (41-50) ────────────
  { id: '41', title: 'HIIT Bootcamp in the Park', description: 'High-intensity interval training for all levels. 45-min session with warm-up and cool-down.', category: 'fitness', address: 'Central Park Grounds', date: '2026-03-07', time: '06:00', max_participants: 20, current_participants: 11, creator_id: 'user1', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '42', title: 'CrossFit WOD Party', description: 'We tackle the Workout of the Day together. Scaled options for all levels. Bring your game face!', category: 'fitness', address: 'CrossFit Box Gym', date: '2026-03-08', time: '07:00', max_participants: 15, current_participants: 10, creator_id: 'user9', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '43', title: 'Morning Run Club', description: 'Steady-pace 8K through the neighborhood. All paces welcome — nobody gets left behind.', category: 'fitness', address: 'Park Entrance Gate', date: '2026-03-06', time: '05:45', max_participants: 25, current_participants: 14, creator_id: 'user1', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '44', title: 'Strength Training Partners', description: 'Looking for gym buddies for push/pull/legs split. Spotting each other, staying safe.', category: 'fitness', address: 'Iron Works Gym', date: '2026-03-07', time: '17:00', max_participants: 6, current_participants: 3, creator_id: 'user9', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '45', title: 'Pilates Flow Session', description: 'Mat Pilates focusing on core strength and flexibility. Instructor-led, mats provided.', category: 'fitness', address: 'Wellness Studio', date: '2026-03-08', time: '09:00', max_participants: 15, current_participants: 9, creator_id: 'user3', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '46', title: 'Zumba Dance Fitness', description: 'Dance your way to fitness with Latin rhythms! No dance experience needed, just energy.', category: 'fitness', address: 'Community Hall', date: '2026-03-06', time: '18:30', max_participants: 30, current_participants: 20, creator_id: 'user10', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '47', title: 'Calisthenics in the Park', description: 'Bodyweight skills — muscle-ups, handstands, planche progressions. All levels.', category: 'fitness', address: 'Outdoor Calisthenics Park', date: '2026-03-09', time: '08:00', max_participants: 12, current_participants: 7, creator_id: 'user11', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '48', title: 'Kickboxing Cardio Class', description: 'High-energy kickboxing combos set to music. Burn calories and learn self-defense!', category: 'fitness', address: 'Knockout Gym', date: '2026-03-07', time: '19:00', max_participants: 20, current_participants: 13, creator_id: 'user1', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '49', title: 'Spin Class Social', description: 'Ride together on stationary bikes with pumping music. Cool down with smoothies after.', category: 'fitness', address: 'Cycle Studio', date: '2026-03-08', time: '06:30', max_participants: 20, current_participants: 16, creator_id: 'user10', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '50', title: 'Weekend Obstacle Bootcamp', description: 'Tyre flips, rope climbs, bear crawls — a full obstacle course workout outdoors.', category: 'fitness', address: 'Adventure Fitness Park', date: '2026-03-09', time: '07:00', max_participants: 15, current_participants: 8, creator_id: 'user9', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── GAMING (51-60) ────────────
  { id: '51', title: 'Board Game Night', description: 'Catan, Ticket to Ride, Codenames, and more. Snacks provided, fun guaranteed!', category: 'gaming', address: 'Board Game Cafe', date: '2026-03-07', time: '19:00', max_participants: 12, current_participants: 6, creator_id: 'user2', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '52', title: 'LAN Party — FPS Edition', description: 'Bring your rig for CS2, Valorant, and more. Ethernet provided. BYOB.', category: 'gaming', address: 'Gaming Lounge', date: '2026-03-08', time: '18:00', max_participants: 20, current_participants: 14, creator_id: 'user11', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '53', title: 'Esports Tournament — FIFA', description: 'Bracket-style FIFA tournament on PS5. Entry fee goes to prize pool. 1v1 format.', category: 'gaming', address: 'Esports Arena', date: '2026-03-09', time: '14:00', max_participants: 16, current_participants: 10, creator_id: 'user9', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '54', title: 'Chess in the Park', description: 'Bring a board or use ours. Casual games, blitz rounds, and friendly banter.', category: 'gaming', address: 'Central Park Chess Tables', date: '2026-03-06', time: '15:00', max_participants: 20, current_participants: 8, creator_id: 'user11', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '55', title: 'D&D Campaign Night', description: 'Starting a new Dungeons & Dragons campaign. Need 4 players + DM. Session 0 this week.', category: 'gaming', address: 'Tabletop Gaming Store', date: '2026-03-07', time: '18:00', max_participants: 6, current_participants: 2, creator_id: 'user7', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '56', title: 'VR Gaming Experience Night', description: 'Try the latest VR games — Beat Saber, Half-Life Alyx, and more. Headsets provided.', category: 'gaming', address: 'VR Zone Arcade', date: '2026-03-08', time: '20:00', max_participants: 10, current_participants: 6, creator_id: 'user9', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '57', title: 'Poker & Card Games Night', description: 'Texas Hold \'em, Rummy, and UNO. Chips provided. Friendly stakes only.', category: 'gaming', address: 'The Game Room Bar', date: '2026-03-06', time: '20:00', max_participants: 10, current_participants: 5, creator_id: 'user2', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '58', title: 'Retro Gaming Hangout', description: 'SNES, N64, PS1 — the classics on CRT TVs. Bring your nostalgia and competitive spirit.', category: 'gaming', address: 'Retro Arcade Bar', date: '2026-03-09', time: '17:00', max_participants: 15, current_participants: 9, creator_id: 'user11', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '59', title: 'Game Dev Meetup', description: 'Indie game developers meet to showcase projects, playtest, and share tips on Unity & Godot.', category: 'gaming', address: 'Tech Hub', date: '2026-03-10', time: '14:00', max_participants: 20, current_participants: 11, creator_id: 'user9', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '60', title: 'Pub Quiz & Trivia Night', description: 'Teams of 4-6 compete in pop culture, science, history, and sports trivia. Prizes!', category: 'gaming', address: 'The Quiz Master Pub', date: '2026-03-07', time: '19:30', max_participants: 30, current_participants: 18, creator_id: 'user8', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── FILMMAKING (61-70) ────────────
  { id: '61', title: 'Short Film Shooting Crew', description: 'Recruiting actors, camera operators, and sound engineers for a 10-minute short film.', category: 'filmmaking', address: 'Community Arts Center', date: '2026-03-09', time: '10:00', max_participants: 12, current_participants: 4, creator_id: 'user6', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '62', title: 'Documentary Film Club', description: 'Watch a documentary and discuss it over wine. This week: "Free Solo".', category: 'filmmaking', address: 'Cultural Cinema', date: '2026-03-06', time: '19:00', max_participants: 20, current_participants: 12, creator_id: 'user8', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '63', title: 'Screenwriting Workshop', description: 'Learn three-act structure, dialogue writing, and get feedback on your script pages.', category: 'filmmaking', address: 'Writers Space Loft', date: '2026-03-08', time: '11:00', max_participants: 12, current_participants: 7, creator_id: 'user6', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '64', title: 'Film Review Roundtable', description: 'Watch the latest release and critique it — cinematography, story, acting, score.', category: 'filmmaking', address: 'Indie Cinema Lounge', date: '2026-03-07', time: '20:00', max_participants: 15, current_participants: 8, creator_id: 'user7', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '65', title: 'Stop-Motion Animation Workshop', description: 'Create a 30-second stop-motion clip using clay figures. All materials provided.', category: 'filmmaking', address: 'Animation Studio', date: '2026-03-09', time: '14:00', max_participants: 8, current_participants: 3, creator_id: 'user12', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '66', title: 'Video Editing Masterclass', description: 'Learn DaVinci Resolve or Premiere Pro basics. Bring your laptop and a project to edit.', category: 'filmmaking', address: 'Tech Hub Co-working', date: '2026-03-08', time: '13:00', max_participants: 10, current_participants: 6, creator_id: 'user9', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '67', title: 'Cinematography Walk', description: 'Practice shot composition, lighting, and camera movement on a city walk. DSLR or phone.', category: 'filmmaking', address: 'Historic District', date: '2026-03-07', time: '16:00', max_participants: 10, current_participants: 5, creator_id: 'user5', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '68', title: 'Acting Workshop for Film', description: 'Scene work and cold reads for aspiring film actors. Camera work included for self-tapes.', category: 'filmmaking', address: 'Drama Academy', date: '2026-03-10', time: '10:00', max_participants: 12, current_participants: 7, creator_id: 'user6', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '69', title: 'Short Film Festival Screening', description: 'Submit your short (under 15 min) and watch others. Audience vote + panel feedback.', category: 'filmmaking', address: 'Rooftop Cinema', date: '2026-03-09', time: '19:00', max_participants: 40, current_participants: 22, creator_id: 'user8', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '70', title: 'Music Video Production Team', description: 'Need director, dancer, and editor for a 3-minute music video shoot. Concept ready.', category: 'filmmaking', address: 'Urban Rooftop Location', date: '2026-03-08', time: '16:00', max_participants: 8, current_participants: 3, creator_id: 'user2', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── ART & DESIGN (71-80) ────────────
  { id: '71', title: 'Urban Sketching Meetup', description: 'Grab your sketchbook and draw city landmarks. All mediums welcome — pencil, watercolor, digital.', category: 'art-design', address: 'Waterfront Promenade', date: '2026-03-08', time: '15:00', max_participants: 15, current_participants: 7, creator_id: 'user7', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '72', title: 'Oil Painting Social', description: 'Bring your easel or use ours. We paint landscapes in a relaxed studio setting.', category: 'art-design', address: 'Art Studio Collective', date: '2026-03-07', time: '14:00', max_participants: 10, current_participants: 6, creator_id: 'user7', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '73', title: 'Sculpture & 3D Art Workshop', description: 'Work with clay, wire, and found objects to create sculptures. All materials included.', category: 'art-design', address: 'Maker Space Studio', date: '2026-03-09', time: '11:00', max_participants: 8, current_participants: 4, creator_id: 'user12', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '74', title: 'Digital Art & Illustration Jam', description: 'iPad and tablet artists meet to draw, share tips, and critique work. Theme: "Futuristic City".', category: 'art-design', address: 'Design Lab', date: '2026-03-08', time: '13:00', max_participants: 12, current_participants: 8, creator_id: 'user12', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '75', title: 'Community Mural Project', description: 'Help design and paint a mural on the community center wall. All painting levels welcome!', category: 'art-design', address: 'Community Center Wall', date: '2026-03-09', time: '09:00', max_participants: 20, current_participants: 11, creator_id: 'user7', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '76', title: 'Watercolor for Beginners', description: 'Step-by-step watercolor painting guided by an instructor. Paint a sunset scene to take home.', category: 'art-design', address: 'Art & Soul Gallery', date: '2026-03-07', time: '10:00', max_participants: 12, current_participants: 9, creator_id: 'user5', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '77', title: 'Portrait Drawing Circle', description: 'Take turns as model and artist. Focus on proportions, shading, and expression.', category: 'art-design', address: 'Life Drawing Studio', date: '2026-03-10', time: '18:00', max_participants: 10, current_participants: 5, creator_id: 'user12', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '78', title: 'Collage Art Night', description: 'Magazine clippings, fabric, photos — create mixed-media collages. Materials provided.', category: 'art-design', address: 'Creative Commons Space', date: '2026-03-06', time: '19:00', max_participants: 12, current_participants: 6, creator_id: 'user10', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '79', title: 'Typography & Lettering Workshop', description: 'From serifs to scripts — learn hand lettering and type design. Pens and paper provided.', category: 'art-design', address: 'Design Hub', date: '2026-03-08', time: '11:00', max_participants: 10, current_participants: 7, creator_id: 'user7', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '80', title: 'Linocut Print Making', description: 'Carve a design into lino and print it on paper and fabric. Tools and ink provided.', category: 'art-design', address: 'Printmakers Guild', date: '2026-03-09', time: '10:00', max_participants: 8, current_participants: 5, creator_id: 'user5', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── BOOK CLUBS (81-90) ────────────
  { id: '81', title: 'Book Club: Sci-Fi Month', description: 'This month: "Project Hail Mary" by Andy Weir. Coffee and pastries included.', category: 'book-clubs', address: 'Local Bookstore', date: '2026-03-10', time: '17:00', max_participants: 15, current_participants: 8, creator_id: 'user8', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '82', title: 'Mystery & Thriller Readers', description: 'Discussing "The Silent Patient". Spoilers allowed! Bring your theories.', category: 'book-clubs', address: 'Library Meeting Room', date: '2026-03-08', time: '18:00', max_participants: 12, current_participants: 7, creator_id: 'user4', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '83', title: 'Non-Fiction Book Circle', description: 'This month: "Thinking, Fast and Slow" by Daniel Kahneman. Bring your highlights!', category: 'book-clubs', address: 'Coffee & Pages Cafe', date: '2026-03-07', time: '10:00', max_participants: 10, current_participants: 6, creator_id: 'user4', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '84', title: 'Poetry Open Reading', description: 'Read your own poems or favorites by other poets. Supportive and intimate setting.', category: 'book-clubs', address: 'Indie Bookshop Lounge', date: '2026-03-06', time: '19:00', max_participants: 15, current_participants: 6, creator_id: 'user8', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '85', title: 'Philosophy Discussion Group', description: 'This session: "What is justice?" Based on readings from Rawls and Sandel.', category: 'book-clubs', address: 'University Lounge', date: '2026-03-09', time: '16:00', max_participants: 12, current_participants: 8, creator_id: 'user11', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '86', title: 'Biography Buffs Monthly', description: 'Discussing "Steve Jobs" by Walter Isaacson. Lessons from extraordinary lives.', category: 'book-clubs', address: 'Community Center', date: '2026-03-08', time: '15:00', max_participants: 12, current_participants: 7, creator_id: 'user9', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '87', title: 'Fantasy Book Club', description: 'Currently reading "The Name of the Wind". Cosplay optional but encouraged!', category: 'book-clubs', address: 'Fantasy & Games Shop', date: '2026-03-07', time: '17:00', max_participants: 15, current_participants: 10, creator_id: 'user2', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '88', title: 'Self-Help & Growth Reads', description: 'Discussing "Atomic Habits" and sharing personal growth wins. Positive vibes only.', category: 'book-clubs', address: 'Wellness Center', date: '2026-03-10', time: '10:00', max_participants: 10, current_participants: 5, creator_id: 'user3', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '89', title: 'Classic Literature Circle', description: 'Monthly classic — this time: "1984" by George Orwell. Timely and timeless.', category: 'book-clubs', address: 'Old Town Library', date: '2026-03-09', time: '14:00', max_participants: 12, current_participants: 8, creator_id: 'user8', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '90', title: "Writers' Circle — Peer Feedback", description: 'Bring 5 pages of your work-in-progress. Constructive feedback only. All genres.', category: 'book-clubs', address: 'Public Library', date: '2026-03-07', time: '11:00', max_participants: 8, current_participants: 5, creator_id: 'user4', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── STARTUPS (91-100) ────────────
  { id: '91', title: 'Startup Brainstorm & Coffee', description: 'Entrepreneurs meetup — share ideas, find co-founders, and get feedback.', category: 'startups', address: 'Co-working Space', date: '2026-03-08', time: '10:00', max_participants: 15, current_participants: 7, creator_id: 'user4', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '92', title: 'Pitch Practice Night', description: 'Rehearse your 3-minute pitch in front of a friendly audience. Get real feedback.', category: 'startups', address: 'Startup Hub', date: '2026-03-07', time: '18:00', max_participants: 12, current_participants: 8, creator_id: 'user9', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '93', title: 'Founders Networking Mixer', description: 'Meet other founders, investors, and mentors in a casual setting. Drinks provided.', category: 'startups', address: 'Rooftop Bar & Lounge', date: '2026-03-09', time: '19:00', max_participants: 40, current_participants: 22, creator_id: 'user4', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '94', title: 'Weekend Hackathon', description: '48-hour hackathon. Build something from scratch. Teams of 3-5. Food and drinks provided.', category: 'startups', address: 'Innovation Center', date: '2026-03-08', time: '09:00', max_participants: 30, current_participants: 18, creator_id: 'user9', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '95', title: 'Product Design Sprint', description: 'Walk through a Google Ventures-style design sprint in a single afternoon.', category: 'startups', address: 'Design Thinking Lab', date: '2026-03-10', time: '13:00', max_participants: 10, current_participants: 5, creator_id: 'user12', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '96', title: 'Marketing for Startups 101', description: 'Growth hacking, SEO basics, and social media strategies for early-stage startups.', category: 'startups', address: 'Co-working Classroom', date: '2026-03-07', time: '14:00', max_participants: 20, current_participants: 12, creator_id: 'user4', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '97', title: 'Fundraising Fireside Chat', description: 'An angel investor shares tips on pitch decks, term sheets, and getting your first check.', category: 'startups', address: 'Venture Lounge', date: '2026-03-08', time: '17:00', max_participants: 25, current_participants: 15, creator_id: 'user9', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '98', title: 'MVP Testing Lab', description: 'Bring your prototype and get real-user testing done. 5-minute tests, instant feedback.', category: 'startups', address: 'UX Research Lab', date: '2026-03-09', time: '11:00', max_participants: 10, current_participants: 4, creator_id: 'user12', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '99', title: 'Tech Talks: AI & ML Edition', description: 'Lightning talks on AI/ML applications in startups. 10 min each. Q&A follows.', category: 'startups', address: 'Tech Campus Auditorium', date: '2026-03-06', time: '18:30', max_participants: 50, current_participants: 30, creator_id: 'user9', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '100', title: 'Mentor Meet & Greet', description: 'Connect 1-on-1 with experienced founders and industry mentors. 15-min speed sessions.', category: 'startups', address: 'Entrepreneur Club', date: '2026-03-10', time: '10:00', max_participants: 20, current_participants: 14, creator_id: 'user4', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── YOGA & WELLNESS (101-110) ────────────
  { id: '101', title: 'Morning Yoga in the Park', description: 'Start your day with a refreshing yoga session. Suitable for beginners. Bring your mat.', category: 'yoga-wellness', address: 'City Park', date: '2026-03-06', time: '06:30', max_participants: 20, current_participants: 12, creator_id: 'user3', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '102', title: 'Guided Meditation Circle', description: 'A 45-minute guided meditation focusing on mindfulness and breath. Cushions provided.', category: 'yoga-wellness', address: 'Zen Garden Hall', date: '2026-03-07', time: '07:00', max_participants: 15, current_participants: 9, creator_id: 'user3', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '103', title: 'Sound Bath & Healing', description: 'Lie back and let Tibetan singing bowls wash over you. Deep relaxation guaranteed.', category: 'yoga-wellness', address: 'Holistic Healing Studio', date: '2026-03-08', time: '18:00', max_participants: 12, current_participants: 8, creator_id: 'user10', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '104', title: 'Breathwork for Energy', description: 'Wim Hof and holotropic breathing techniques. Feel energized and clear-headed.', category: 'yoga-wellness', address: 'Wellness Loft', date: '2026-03-06', time: '08:00', max_participants: 15, current_participants: 6, creator_id: 'user3', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '105', title: 'Tai Chi in the Garden', description: 'Slow, flowing movements for balance, flexibility, and inner calm. All ages welcome.', category: 'yoga-wellness', address: 'Botanical Garden', date: '2026-03-09', time: '07:30', max_participants: 20, current_participants: 10, creator_id: 'user11', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '106', title: 'Weekend Wellness Retreat', description: 'Full-day retreat with yoga, meditation, nature walks, and healthy meals.', category: 'yoga-wellness', address: 'Countryside Resort', date: '2026-03-08', time: '08:00', max_participants: 25, current_participants: 18, creator_id: 'user3', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '107', title: 'Mindfulness for Busy People', description: 'Quick techniques to integrate mindfulness into a hectic schedule. Lunchtime session.', category: 'yoga-wellness', address: 'Office Wellness Room', date: '2026-03-07', time: '12:30', max_participants: 15, current_participants: 7, creator_id: 'user4', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '108', title: 'Power Yoga Flow', description: 'Intense vinyasa-style workout. Strong poses, fast transitions, great music. Not for beginners.', category: 'yoga-wellness', address: 'Hot Yoga Studio', date: '2026-03-09', time: '17:00', max_participants: 18, current_participants: 13, creator_id: 'user10', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '109', title: 'Yoga Nidra — Deep Rest', description: 'The "yogic sleep" — lie down and be guided into deep relaxation. Blankets provided.', category: 'yoga-wellness', address: 'Serenity Space', date: '2026-03-06', time: '20:00', max_participants: 15, current_participants: 10, creator_id: 'user3', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '110', title: 'Acro Yoga Intro', description: 'Partner-based yoga with flight and acrobatics. Spotters provided. Lots of laughs!', category: 'yoga-wellness', address: 'Beach Yoga Deck', date: '2026-03-08', time: '16:00', max_participants: 16, current_participants: 8, creator_id: 'user10', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── CYCLING (111-120) ────────────
  { id: '111', title: 'Evening Cycling Group Ride', description: '25km evening ride around the area. Moderate pace, road bikes recommended. Helmets mandatory!', category: 'cycling', address: 'Sports Store Meetup Point', date: '2026-03-07', time: '17:30', max_participants: 15, current_participants: 10, creator_id: 'user5', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '112', title: 'Mountain Bike Trail Day', description: 'Off-road ride through local trails. Intermediate difficulty. Full-face helmet suggested.', category: 'cycling', address: 'Trail Head Parking', date: '2026-03-09', time: '08:00', max_participants: 10, current_participants: 6, creator_id: 'user11', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '113', title: 'Night Ride — City Lights', description: 'Ride through the city after dark. Front and rear lights mandatory. 15km route.', category: 'cycling', address: 'Clock Tower Square', date: '2026-03-06', time: '20:00', max_participants: 15, current_participants: 9, creator_id: 'user5', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '114', title: 'Century Ride Training', description: 'Long-distance training ride — 80km at steady pace. Support vehicle follows.', category: 'cycling', address: 'Highway Rest Stop', date: '2026-03-08', time: '05:30', max_participants: 12, current_participants: 7, creator_id: 'user11', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '115', title: 'Bikepacking Weekend Trip', description: 'Overnight bikepacking adventure. Camping gear needed. Route and camp spots shared in the group.', category: 'cycling', address: 'Adventure Sports Shop', date: '2026-03-08', time: '07:00', max_participants: 8, current_participants: 4, creator_id: 'user5', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '116', title: 'BMX Skills Session', description: 'Learn jumps, manuals, and tricks at the BMX park. Beginners and intermediates welcome.', category: 'cycling', address: 'BMX Skate Park', date: '2026-03-07', time: '15:00', max_participants: 12, current_participants: 5, creator_id: 'user1', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '117', title: 'Cycle Touring Talk & Plan', description: 'Planning a multi-day cycle tour. Meet to discuss routes, gear, and logistics.', category: 'cycling', address: 'Bike Cafe', date: '2026-03-09', time: '11:00', max_participants: 10, current_participants: 6, creator_id: 'user8', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '118', title: 'Indoor Cycling Challenge', description: 'Zwift racing on smart trainers. Competitive and fun. Bike and trainer provided.', category: 'cycling', address: 'Cycle Studio', date: '2026-03-06', time: '18:00', max_participants: 15, current_participants: 11, creator_id: 'user9', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '119', title: 'Gravel Ride — Backroads Explorer', description: 'Mixed terrain ride on gravel and dirt roads. 40km. Gravel or hybrid bike preferred.', category: 'cycling', address: 'Countryside Meetup', date: '2026-03-08', time: '06:30', max_participants: 12, current_participants: 8, creator_id: 'user11', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '120', title: 'Bike Commuter Coffee Stop', description: 'Daily bike commuters meet for morning coffee before heading to work. Share routes and tips.', category: 'cycling', address: 'Espresso & Spokes Cafe', date: '2026-03-07', time: '07:30', max_participants: 15, current_participants: 9, creator_id: 'user5', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── HIKING (121-130) ────────────
  { id: '121', title: 'Sunrise Hike', description: 'Early morning hike to catch the sunrise. Carpool from city center. Moderate difficulty.', category: 'hiking', address: 'Hiking Trail Nearby', date: '2026-03-09', time: '04:30', max_participants: 8, current_participants: 5, creator_id: 'user3', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '122', title: 'Night Trek & Stargazing', description: 'Hike up after sunset and stargaze from the summit. Headlamps required.', category: 'hiking', address: 'Hill Station Base', date: '2026-03-07', time: '18:00', max_participants: 12, current_participants: 7, creator_id: 'user11', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '123', title: 'Waterfall Hike Adventure', description: 'Scenic trail ending at a stunning waterfall. Swimming optional! 3-hour round trip.', category: 'hiking', address: 'Nature Reserve Entrance', date: '2026-03-08', time: '07:00', max_participants: 15, current_participants: 10, creator_id: 'user3', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '124', title: 'Bird Watching Nature Walk', description: 'Slow-paced walk with binoculars. Learn to identify local bird species. Guide provided.', category: 'hiking', address: 'Wetlands Reserve', date: '2026-03-06', time: '06:00', max_participants: 10, current_participants: 4, creator_id: 'user8', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '125', title: 'Trail Running Group', description: 'Fast-paced trail run — 10km with elevation. Bring trail shoes and hydration.', category: 'hiking', address: 'Forest Trail Head', date: '2026-03-09', time: '06:00', max_participants: 10, current_participants: 6, creator_id: 'user1', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '126', title: 'Mountain Summit Challenge', description: 'Full-day hike to the highest local peak. Challenging terrain. Fitness required.', category: 'hiking', address: 'Mountain Base Camp', date: '2026-03-08', time: '05:00', max_participants: 8, current_participants: 5, creator_id: 'user11', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '127', title: 'Nature Photography Walk', description: 'Leisurely walk focused on macro and landscape photography. Any camera welcome.', category: 'hiking', address: 'Botanical Trail', date: '2026-03-07', time: '08:00', max_participants: 12, current_participants: 7, creator_id: 'user5', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '128', title: 'Forest Bathing Experience', description: 'Japanese-inspired Shinrin-yoku — slow, mindful immersion in nature. No rush.', category: 'hiking', address: 'Old Growth Forest', date: '2026-03-09', time: '09:00', max_participants: 10, current_participants: 6, creator_id: 'user3', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '129', title: 'Canyon Exploration Hike', description: 'Navigate narrow canyons and rock formations. Helmets and gloves recommended.', category: 'hiking', address: 'Canyon Trailhead', date: '2026-03-08', time: '07:30', max_participants: 8, current_participants: 4, creator_id: 'user11', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '130', title: 'Coastal Path Walk', description: 'Scenic walk along cliffs with ocean views. Easy to moderate. Dogs welcome!', category: 'hiking', address: 'Coastal Path Start', date: '2026-03-07', time: '10:00', max_participants: 15, current_participants: 9, creator_id: 'user8', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── COFFEE (131-140) ────────────
  { id: '131', title: 'Sunday Coffee & Conversations', description: 'Relaxed meetup for making new friends. No agenda — great coffee, good vibes.', category: 'coffee', address: 'Artisan Coffee Roasters', date: '2026-03-08', time: '11:00', max_participants: 10, current_participants: 3, creator_id: 'user4', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '132', title: 'Barista Workshop', description: 'Learn to pull the perfect espresso, steam milk, and pour latte art. Beans provided.', category: 'coffee', address: 'Brew Academy', date: '2026-03-07', time: '10:00', max_participants: 8, current_participants: 6, creator_id: 'user10', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '133', title: 'Single Origin Tasting', description: 'Cupping session with beans from Ethiopia, Colombia, and Sumatra. Learn flavor profiles.', category: 'coffee', address: 'Specialty Coffee Lab', date: '2026-03-09', time: '14:00', max_participants: 10, current_participants: 7, creator_id: 'user4', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '134', title: 'Latte Art Throwdown', description: 'Compete in latte art! Judges score on creativity and technique. Fun prizes.', category: 'coffee', address: 'The Coffee Collective', date: '2026-03-08', time: '15:00', max_participants: 12, current_participants: 8, creator_id: 'user10', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '135', title: 'Coffee Roasting Demo', description: 'See green beans transform into roasted perfection. Sample the batch and take some home.', category: 'coffee', address: 'Micro Roasters HQ', date: '2026-03-06', time: '11:00', max_participants: 10, current_participants: 5, creator_id: 'user7', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '136', title: 'Brunch & Coffee Social', description: 'Weekend brunch meetup. Order what you like — we split the table, not the bill.', category: 'coffee', address: 'The Brunch House', date: '2026-03-08', time: '10:30', max_participants: 12, current_participants: 6, creator_id: 'user2', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '137', title: 'Tea Tasting Ceremony', description: 'Explore oolong, matcha, and pu-erh in a traditional tasting. Mindful sipping.', category: 'coffee', address: 'Tea House & Garden', date: '2026-03-07', time: '16:00', max_participants: 8, current_participants: 4, creator_id: 'user3', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '138', title: 'Coffee & Code', description: 'Developers meet at a cafe to code, debug, and caffeinate. All stacks welcome.', category: 'coffee', address: 'Digital Nomad Cafe', date: '2026-03-09', time: '10:00', max_participants: 15, current_participants: 9, creator_id: 'user9', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '139', title: 'Coffee & Sketch', description: 'Draw, paint, or doodle over your favorite brew. Casual, creative, caffeinated.', category: 'coffee', address: 'Artist Corner Cafe', date: '2026-03-06', time: '14:00', max_participants: 10, current_participants: 5, creator_id: 'user7', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '140', title: 'Cafe Crawl — Best in Town', description: 'Hit 4 top-rated cafes in 3 hours. Rate each on espresso, vibe, and snacks.', category: 'coffee', address: 'Starting: Central Station Cafe', date: '2026-03-08', time: '09:00', max_participants: 10, current_participants: 7, creator_id: 'user2', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── TRAVEL (141-150) ────────────
  { id: '141', title: 'Travel Stories & Trip Planning', description: 'Share travel stories and plan group trips! Monthly meetup with tips and photos.', category: 'travel', address: 'The Globe Lounge', date: '2026-03-10', time: '18:30', max_participants: 20, current_participants: 9, creator_id: 'user8', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '142', title: 'Backpacker Meetup Night', description: 'Budget travel tips, hostel stories, and route planning. Solo travelers welcome!', category: 'travel', address: 'Hostel Common Room', date: '2026-03-07', time: '19:00', max_participants: 20, current_participants: 11, creator_id: 'user8', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '143', title: 'Weekend Road Trip Crew', description: 'Driving to the coast this weekend. Need 3 more for the car. Gas split evenly.', category: 'travel', address: 'Downtown Pickup Point', date: '2026-03-08', time: '06:00', max_participants: 5, current_participants: 2, creator_id: 'user5', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '144', title: 'Cultural Exchange Evening', description: 'Share your culture through food, music, or stories. A global potluck of experiences.', category: 'travel', address: 'Community Hall', date: '2026-03-06', time: '18:00', max_participants: 30, current_participants: 16, creator_id: 'user6', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '145', title: 'Food Tour — Local Eats', description: 'Walk and eat the best street food in the city. 5 stops, 2 hours, pure deliciousness.', category: 'travel', address: 'Food Market Entrance', date: '2026-03-09', time: '12:00', max_participants: 12, current_participants: 8, creator_id: 'user10', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '146', title: 'Weekend Desert Camping', description: 'Camp under the stars in the desert. BBQ, bonfires, and sunrise included.', category: 'travel', address: 'Desert Camp Meetup', date: '2026-03-08', time: '14:00', max_participants: 15, current_participants: 9, creator_id: 'user6', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '147', title: 'Language Exchange Cafe', description: 'Practice languages over coffee! Arabic, Spanish, French, Japanese, and more.', category: 'travel', address: 'Polyglot Cafe', date: '2026-03-07', time: '17:00', max_participants: 20, current_participants: 12, creator_id: 'user3', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '148', title: 'Passport Party — Visa Tips', description: 'Share visa hacks and travel docs tips. Especially for digital nomads and frequent flyers.', category: 'travel', address: 'Nomad Co-working', date: '2026-03-10', time: '15:00', max_participants: 15, current_participants: 7, creator_id: 'user4', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '149', title: 'Travel Photography Workshop', description: 'Learn to take stunning travel photos. Golden hour shoot included. Phone or camera.', category: 'travel', address: 'Scenic Viewpoint', date: '2026-03-09', time: '16:30', max_participants: 12, current_participants: 6, creator_id: 'user5', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '150', title: 'Hidden Gems City Walk', description: 'Explore secret spots, street art, and local favorites most tourists never see.', category: 'travel', address: 'Old Town Gate', date: '2026-03-06', time: '10:00', max_participants: 15, current_participants: 10, creator_id: 'user8', image_url: null, created_at: '2026-03-04T19:00:00Z' },

  // ──────────── BASKETBALL (151-160) ────────────
  { id: '151', title: 'Pickup Basketball 3v3', description: 'Casual 3-on-3 pickup game. All skill levels welcome. First come, first play!', category: 'basketball', address: 'Outdoor Basketball Court', date: '2026-03-07', time: '18:00', max_participants: 12, current_participants: 6, creator_id: 'user12', image_url: null, created_at: '2026-03-04T10:00:00Z' },
  { id: '152', title: 'Full Court 5v5', description: 'Competitive full-court basketball. Call your own fouls. Winners stay on.', category: 'basketball', address: 'Indoor Basketball Arena', date: '2026-03-08', time: '19:00', max_participants: 14, current_participants: 10, creator_id: 'user1', image_url: null, created_at: '2026-03-04T11:00:00Z' },
  { id: '153', title: 'Shooting Drills & Skills', description: 'Practice free throws, three-pointers, and layups. Rebounding partners needed.', category: 'basketball', address: 'School Gym', date: '2026-03-06', time: '16:00', max_participants: 10, current_participants: 4, creator_id: 'user12', image_url: null, created_at: '2026-03-04T12:00:00Z' },
  { id: '154', title: 'Basketball Clinic for Beginners', description: 'Learn dribbling, passing, and basic plays. Coach-led session open to all ages.', category: 'basketball', address: 'Community Rec Center', date: '2026-03-09', time: '10:00', max_participants: 20, current_participants: 11, creator_id: 'user1', image_url: null, created_at: '2026-03-04T13:00:00Z' },
  { id: '155', title: 'Streetball Under the Lights', description: 'Evening streetball with music and crowd. Show off your handles and dunks!', category: 'basketball', address: 'Outdoor Court — West Side', date: '2026-03-07', time: '20:00', max_participants: 16, current_participants: 12, creator_id: 'user12', image_url: null, created_at: '2026-03-04T14:00:00Z' },
  { id: '156', title: 'One-on-One Challenge', description: 'Test your skills 1v1. King of the court format — winner stays. All welcome.', category: 'basketball', address: 'Neighborhood Court', date: '2026-03-08', time: '17:00', max_participants: 10, current_participants: 5, creator_id: 'user1', image_url: null, created_at: '2026-03-04T15:00:00Z' },
  { id: '157', title: "Women's Basketball Run", description: 'All-women pickup game. Welcoming and competitive. Beginners encouraged!', category: 'basketball', address: 'University Gym', date: '2026-03-09', time: '18:00', max_participants: 14, current_participants: 8, creator_id: 'user12', image_url: null, created_at: '2026-03-04T16:00:00Z' },
  { id: '158', title: 'Wheelchair Basketball Open Day', description: 'Try wheelchair basketball! Chairs provided. Incredible athletes, incredible sport.', category: 'basketball', address: 'Adaptive Sports Center', date: '2026-03-10', time: '14:00', max_participants: 16, current_participants: 7, creator_id: 'user1', image_url: null, created_at: '2026-03-04T17:00:00Z' },
  { id: '159', title: 'All-Star Exhibition Game', description: 'Best local players face off in a showcase game. Come play or come watch!', category: 'basketball', address: 'City Basketball Stadium', date: '2026-03-08', time: '20:00', max_participants: 20, current_participants: 16, creator_id: 'user12', image_url: null, created_at: '2026-03-04T18:00:00Z' },
  { id: '160', title: 'Slam Dunk & Skills Contest', description: 'Dunk contest, three-point shootout, and skills challenge. Prizes for winners!', category: 'basketball', address: 'Indoor Court — Sports Complex', date: '2026-03-09', time: '15:00', max_participants: 20, current_participants: 13, creator_id: 'user1', image_url: null, created_at: '2026-03-04T19:00:00Z' },
];

// ─── Activities per category (user-specified counts) ──────────────────────────

const ACTIVITIES_PER_CATEGORY: Record<string, number> = {
  'sports': 7,
  'cricket': 4,
  'music': 3,
  'creative': 2,
  'fitness': 5,
  'gaming': 2,
  'filmmaking': 2,
  'art-design': 5,
  'book-clubs': 3,
  'startups': 4,
  'yoga-wellness': 6,
  'cycling': 4,
  'hiking': 3,
  'coffee': 4,
  'travel': 3,
  'basketball': 7,
};

// Filter templates to only include the specified count per category
// Each filtered activity gets a unique creator — no person appears twice
const FILTERED_TEMPLATES = (() => {
  const counts: Record<string, number> = {};
  let creatorIdx = 0;
  return ACTIVITY_TEMPLATES
    .filter((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
      return counts[t.category] <= (ACTIVITIES_PER_CATEGORY[t.category] ?? 10);
    })
    .map((t) => ({ ...t, creator_id: `user${++creatorIdx}` }));
})();

// ─── Dynamic coordinate generation ────────────────────────────────────────────

// Golden-angle spiral distributes activities evenly around the user without clustering
function generateOffset(index: number): [number, number] {
  const goldenAngle = 2.399963; // radians
  const angle = index * goldenAngle;
  // radius grows from ~0.003 to ~0.030 degrees (≈ 0.3 km to 3.3 km)
  const radius = 0.003 + (index / FILTERED_TEMPLATES.length) * 0.027;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

// Default center if location not available (Dubai)
const DEFAULT_LAT = 25.2048;
const DEFAULT_LNG = 55.2708;

let cachedLocation: Coordinates | null = null;
let cachedActivities: Activity[] | null = null;

function buildActivities(lat: number, lng: number): Activity[] {
  return FILTERED_TEMPLATES.map((template, i) => {
    const [dLat, dLng] = generateOffset(i);
    return { ...template, latitude: lat + dLat, longitude: lng + dLng };
  });
}

export function setMockUserLocation(coords: Coordinates) {
  if (
    cachedLocation &&
    cachedLocation.latitude === coords.latitude &&
    cachedLocation.longitude === coords.longitude
  ) {
    return;
  }
  cachedLocation = coords;
  cachedActivities = null;
}

export function getMockActivities(): Activity[] {
  const lat = cachedLocation?.latitude ?? DEFAULT_LAT;
  const lng = cachedLocation?.longitude ?? DEFAULT_LNG;
  if (!cachedActivities) {
    cachedActivities = buildActivities(lat, lng);
  }
  return cachedActivities;
}

export function getMockActivitiesWithCreators(): Activity[] {
  return getMockActivities().map((activity) => ({
    ...activity,
    creator: MOCK_USERS[activity.creator_id],
  }));
}

export function getMockActivityById(id: string): Activity | undefined {
  const activity = getMockActivities().find((a) => a.id === id);
  if (activity) {
    return { ...activity, creator: MOCK_USERS[activity.creator_id] };
  }
  return undefined;
}
