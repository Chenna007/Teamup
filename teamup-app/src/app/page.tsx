'use client';

import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ActivityCard from '@/components/ActivityCard';
import CategoryPills from '@/components/CategoryPills';
import MapView from '@/components/MapView';
import { useAppStore } from '@/lib/store';
import { CATEGORIES } from '@/lib/constants';
import { getCurrentLocation } from '@/lib/utils';
import { MapPin, Sparkles, TrendingUp, ArrowRight, ChevronDown, Send, Star, MessageCircle, Shield, Users, Globe, Heart, Zap, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function HomePage() {
  const {
    filteredActivities, loadActivities,
    hasExplored, setHasExplored, setUserLocation, setLocationError,
    searchRadius, setSearchRadius, userLocation, locationError,
  } = useAppStore();
  const router = useRouter();
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (hasExplored && filteredActivities.length === 0) loadActivities();
  }, [hasExplored]);

  const handleExplore = async () => {
    setLocationLoading(true);
    try {
      const coords = await getCurrentLocation();
      setUserLocation(coords);
    } catch {
      setLocationError('Location access denied. Showing default area.');
      loadActivities();
    }
    setLocationLoading(false);
    setHasExplored(true);
  };

  // Landing page — before user clicks "Explore"
  if (!hasExplored) {
    return (
      <div className="animate-fade-in">
        <LandingHero onExplore={handleExplore} loading={locationLoading} />
        <HowItWorksSection />
        <ActivityShowcase />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </div>
    );
  }

  // ─── Main Explore Interface ──────────────────────────────────────────────────
  const nearbyActivities = filteredActivities.slice(0, 6);
  const trendingActivities = [...filteredActivities]
    .sort((a, b) => b.current_participants - a.current_participants)
    .slice(0, 8);

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const happeningNow = filteredActivities.filter(a => {
    const [h] = a.time.split(':').map(Number);
    return h >= currentHour && h <= currentHour + 2;
  }).slice(0, 5);

  const radiusOptions = ['1 km', '3 km', '5 km', '10 km'];

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Search */}
      <section className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar />
          {/* Location indicator */}
          {(userLocation || locationError) && (
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
              <MapPin size={12} />
              {userLocation
                ? 'Showing activities near your location'
                : locationError}
            </div>
          )}
        </div>
      </section>

      {/* Map */}
      <section className="max-w-7xl mx-auto px-4 mt-4">
        <MapView
          activities={filteredActivities}
          className="h-[300px] md:h-[420px] shadow-lg"
          onActivityClick={(a) => { window.location.href = `/activity/${a.id}`; }}
        />
      </section>

      {/* 🔥 Happening Now */}
      {happeningNow.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h2 className="text-lg font-bold text-gray-900">&#x1F525; Happening Now Near You</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {happeningNow.map(activity => {
              const category = CATEGORIES.find(c => c.slug === activity.category);
              const [h, m] = activity.time.split(':').map(Number);
              const actMins = h * 60 + (m || 0);
              const nowMins = currentHour * 60 + currentMinute;
              const diff = actMins - nowMins;
              const timeLabel = diff <= 0 ? 'Starting now' : diff <= 60 ? `Starting in ${diff} min` : `Starting in ${Math.ceil(diff / 60)}h`;

              return (
                <Link key={activity.id} href={`/activity/${activity.id}`}
                  className="min-w-[280px] shrink-0 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-4 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{category?.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-orange-600 transition-colors">
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
                          <Clock size={11} /> {timeLabel}
                        </span>
                        {activity.distance !== undefined && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={11} />
                            {activity.distance < 1 ? `${Math.round(activity.distance * 1000)}m` : `${activity.distance.toFixed(1)}km`}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        {activity.current_participants}/{activity.max_participants} joined
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Radius Filter */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 shrink-0">Distance:</span>
          <div className="flex gap-2">
            {radiusOptions.map(r => (
              <button key={r} onClick={() => setSearchRadius(r)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  searchRadius === r
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Browse Categories</h2>
          <span className="text-sm text-gray-500">{filteredActivities.length} activities</span>
        </div>
        <CategoryPills onSelect={(cat) => {
          if (cat) router.push(`/category/${cat}`);
          else router.push('/search');
        }} />
      </section>

      {/* Nearby Activities */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Nearby Activities</h2>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearbyActivities.map((activity) => (
            <div key={activity.id} className="stagger-item">
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
        {nearbyActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No activities found nearby</p>
            <Link
              href="/create"
              className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Be the first to create one <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </section>

      {/* Trending Section */}
      {trendingActivities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-10 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900">Trending Now</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {trendingActivities.map((activity) => (
              <div key={activity.id} className="min-w-[280px] max-w-[300px] shrink-0">
                <ActivityCard activity={activity} compact />
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   Landing Hero — shown before location permission
   ═══════════════════════════════════════════════════════════════════════════════ */

function LandingHero({ onExplore, loading }: { onExplore: () => void; loading: boolean }) {
  return (
    <section className="relative min-h-screen -mt-12 flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-video.mp4"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium mb-6">
          <Sparkles size={14} />
          Discover what&apos;s happening around you
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
          Find teammates and
          <br />
          <span className="text-emerald-200">activities near you</span>
        </h1>

        <p className="text-emerald-100 text-base md:text-lg max-w-lg mx-auto mb-8">
          Sports, music, creators, fitness and more happening around you.
        </p>

        <button
          onClick={onExplore}
          disabled={loading}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-emerald-700 rounded-2xl font-semibold text-base hover:bg-emerald-50 active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-70"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              Getting your location...
            </>
          ) : (
            <>
              <MapPin size={20} />
              Explore activities near you
            </>
          )}
        </button>

        {/* Search hint suggestions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {['football near me', 'music jam', 'running group', 'startup meetup'].map(q => (
            <span key={q} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-xs">
              {q}
            </span>
          ))}
        </div>

        {/* Activity type previews */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
          {[
            { emoji: '⚽', label: 'Football match' },
            { emoji: '🎸', label: 'Music jam' },
            { emoji: '🏃', label: 'Running group' },
            { emoji: '📷', label: 'Photography walk' },
          ].map(p => (
            <div key={p.label} className="flex items-center gap-2 px-4 py-2.5 bg-white/15 backdrop-blur-sm rounded-xl text-white text-sm font-medium">
              <span className="text-lg">{p.emoji}</span>
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   How Teamup Works — 3 steps
   ═══════════════════════════════════════════════════════════════════════════════ */

function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Discover activities near you',
      desc: 'Open Teamup and instantly see activities around you on an interactive map. Your location powers real-time discovery — no searches needed.',
      icon: MapPin,
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50',
    },
    {
      num: '02',
      title: 'Explore and connect',
      desc: 'View activity details, see who created it, check the time and location. Message the organizer and decide if it is right for you.',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
    },
    {
      num: '03',
      title: 'Join or create activities',
      desc: 'Join any activity with one tap or create your own to invite people nearby. It takes less than 30 seconds to go live.',
      icon: Zap,
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20 mb-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full text-emerald-700 text-xs font-medium mb-3">
          <Sparkles size={13} />
          Simple and fast
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Find your people in three simple steps
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
          Teamup makes it effortless to discover activities, connect with real people, and build your community.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="relative group">
              <div className="bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className={`w-14 h-14 ${step.bg} rounded-2xl flex items-center justify-center mb-5`}>
                  <Icon size={24} className={`bg-gradient-to-r ${step.color} bg-clip-text`} style={{ color: step.color.includes('emerald') ? '#10b981' : step.color.includes('blue') ? '#3b82f6' : '#f59e0b' }} />
                </div>
                <div className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">Step {step.num}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   Activity Showcase — category examples
   ═══════════════════════════════════════════════════════════════════════════════ */

const SHOWCASE_ITEMS = [
  { emoji: '⚽', title: 'Find sports teammates', desc: 'Join pickup games, leagues, and tournaments happening near you every day.' },
  { emoji: '🏏', title: 'Cricket players', desc: 'Find local cricket matches and practice sessions in your neighbourhood.' },
  { emoji: '🎸', title: 'Meet musicians', desc: 'Jam sessions, band practices, and open mics — connect with fellow musicians.' },
  { emoji: '📷', title: 'Join creative communities', desc: 'Photography walks, workshops, and creative meetups with passionate creators.' },
  { emoji: '🏃', title: 'Start fitness groups', desc: 'Running clubs, HIIT sessions, and group workouts to keep you motivated.' },
  { emoji: '🎮', title: 'Find gaming partners', desc: 'LAN parties, tournaments, and casual gaming sessions with local players.' },
  { emoji: '🎬', title: 'Meet filmmakers & creators', desc: 'Collaborate on short films, content creation, and storytelling projects.' },
  { emoji: '🎨', title: 'Connect with artists', desc: 'Art sessions, gallery visits, and creative workshops with fellow designers.' },
  { emoji: '📚', title: 'Join book clubs', desc: 'Monthly reads, literary discussions, and learning groups for curious minds.' },
  { emoji: '💻', title: 'Find startup teammates', desc: 'Hackathons, brainstorming sessions, and co-founder matching events.' },
  { emoji: '🧘', title: 'Join yoga & wellness', desc: 'Morning yoga, meditation circles, and wellness workshops in your area.' },
  { emoji: '🚴', title: 'Find cycling partners', desc: 'Weekend rides, commute buddies, and cycling events near you.' },
  { emoji: '🥾', title: 'Explore hiking groups', desc: 'Trail adventures, nature walks, and trekking communities to explore.' },
  { emoji: '☕', title: 'Coffee chats', desc: 'Meet for conversations — networking, mentoring, or just a great chat.' },
  { emoji: '🌍', title: 'Connect with travelers', desc: 'Travel meetups, language exchange, and cultural experiences with explorers.' },
  { emoji: '🏀', title: 'Local basketball games', desc: 'Pickup games, 3v3 tournaments, and courts buzzing with action near you.' },
];

function ActivityShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 mb-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full text-purple-700 text-xs font-medium mb-3">
          <Heart size={13} />
          Something for everyone
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Discover activities you love
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
          From sports and music to startups and wellness — find your people in any category.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {SHOWCASE_ITEMS.map((item) => (
          <Link
            key={item.title}
            href={`/search?category=${encodeURIComponent(item.title.split(' ').pop() || '')}`}
            className="group bg-white rounded-2xl border border-gray-100 p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="text-2xl md:text-3xl mb-2">{item.emoji}</div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed hidden md:block">{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   Reviews — auto-scrolling testimonials with real people
   ═══════════════════════════════════════════════════════════════════════════════ */

const REVIEWS = [
  { name: 'Priya Sharma', avatar: 'https://randomuser.me/api/portraits/women/63.jpg', rating: 5, text: 'Found a cricket team within my first week in Bangalore. Now we play every Sunday morning — like a family!', location: 'Bangalore' },
  { name: 'Marcus Reed', avatar: 'https://randomuser.me/api/portraits/men/81.jpg', rating: 5, text: 'Best app for pickup basketball. I play 3 times a week now with people I met here.', location: 'Chicago' },
  { name: 'Ananya Reddy', avatar: 'https://randomuser.me/api/portraits/women/71.jpg', rating: 5, text: 'I moved to Hyderabad for work and knew nobody. Teamup helped me build my entire social circle in weeks.', location: 'Hyderabad' },
  { name: 'Rohan Mehta', avatar: 'https://randomuser.me/api/portraits/men/86.jpg', rating: 5, text: 'Great for finding coding meetups and hackathons. The map feature makes discovering events effortless.', location: 'Mumbai' },
  { name: 'Sofia Lindgren', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5, text: 'Moved to Stockholm solo and Teamup helped me find a hiking group my very first weekend.', location: 'Stockholm' },
  { name: 'Vikram Singh', avatar: 'https://randomuser.me/api/portraits/men/92.jpg', rating: 5, text: 'Cricket matches every weekend. This app literally brought my whole neighbourhood together.', location: 'Delhi' },
  { name: 'Chloe Martin', avatar: 'https://randomuser.me/api/portraits/women/25.jpg', rating: 5, text: 'As an introvert, this was the perfect low-pressure way to meet people with shared interests.', location: 'Paris' },
  { name: 'Arjun Nair', avatar: 'https://randomuser.me/api/portraits/men/94.jpg', rating: 4, text: 'The yoga and wellness events are fantastic. Found my regular morning meditation group here in Kochi.', location: 'Kochi' },
  { name: 'Kavitha Iyer', avatar: 'https://randomuser.me/api/portraits/women/57.jpg', rating: 5, text: 'Joined a book club through Teamup and we now meet every month at a café. Love this community!', location: 'Chennai' },
  { name: 'Daisuke Ito', avatar: 'https://randomuser.me/api/portraits/men/69.jpg', rating: 4, text: 'Found gaming partners in my area within hours. The real-time notifications are a game changer.', location: 'Tokyo' },
  { name: 'Neha Gupta', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', rating: 5, text: 'Started a women-only cycling group and it grew to 30 members in two months. Teamup made it happen.', location: 'Pune' },
  { name: 'Elena Moretti', avatar: 'https://randomuser.me/api/portraits/women/19.jpg', rating: 5, text: 'Joined a pottery class through Teamup and now I teach one! The community is incredibly supportive.', location: 'Milan' },
  { name: 'Siddharth Joshi', avatar: 'https://randomuser.me/api/portraits/men/73.jpg', rating: 5, text: 'Found my co-founder at a startup meetup on Teamup. Best decision I ever made joining this platform.', location: 'Jaipur' },
  { name: 'Anika Chen', avatar: 'https://randomuser.me/api/portraits/women/82.jpg', rating: 5, text: 'Found a hiking group my first week in a new city. Made 4 close friends within a month!', location: 'San Francisco' },
  { name: 'Rahul Deshmukh', avatar: 'https://randomuser.me/api/portraits/men/77.jpg', rating: 5, text: 'As a filmmaker, finding crew was always tough. Teamup connected me with talented people nearby.', location: 'Kolkata' },
  { name: 'Yusuf Osman', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', rating: 5, text: 'Discovered a football community I never knew existed in my area. Playing every evening now!', location: 'Dubai' },
];

function ReviewsSection() {
  return (
    <section className="mt-16 mb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full text-emerald-700 text-xs font-medium mb-3">
          <Heart size={13} />
          Loved by thousands
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">What Our Community Says</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Real stories from real people who found their crew on Teamup
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="reviews-scroll mb-4">
        <div className="reviews-track">
          {[...REVIEWS.slice(0, 8), ...REVIEWS.slice(0, 8)].map((r, i) => (
            <ReviewCard key={`a-${i}`} review={r} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="reviews-scroll-reverse">
        <div className="reviews-track-reverse">
          {[...REVIEWS.slice(8), ...REVIEWS.slice(8)].map((r, i) => (
            <ReviewCard key={`b-${i}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="w-[320px] shrink-0 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <img src={review.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-sm text-gray-900">{review.name}</div>
          <div className="text-xs text-gray-400">{review.location}</div>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   FAQ / Q&A
   ═══════════════════════════════════════════════════════════════════════════════ */

const FAQS = [
  { q: 'Is Teamup free to use?', a: 'Yes! Teamup is completely free. Create an account, browse activities, join events, and create your own — all at no cost.' },
  { q: 'How do I find activities near me?', a: 'Teamup uses your location (with your permission) to show activities happening nearby. You can also search by category, keyword, or browse the interactive map.' },
  { q: 'Can I create my own activity?', a: 'Absolutely! Tap the + button in the navigation to create an activity. Add a title, description, category, date, time, and max participants — your event goes live instantly.' },
  { q: 'Is it safe to meet strangers?', a: 'Safety is our priority. All users have profiles with reviews. We recommend meeting in public places and bringing a friend to your first event. You can also report any concerns.' },
  { q: 'What types of activities can I find?', a: 'Everything from sports, music, and fitness to book clubs, startups, yoga, hiking, gaming, and more. We have 16+ categories covering all kinds of interests.' },
  { q: 'Can I use Teamup in my city?', a: 'Teamup works everywhere! Activities are created by local users, so the more people in your area, the more events you\'ll find. Be the first to start in your neighborhood!' },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-4 mt-16 mb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full text-blue-700 text-xs font-medium mb-3">
          <MessageCircle size={13} />
          Got questions?
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-500 text-sm">Everything you need to know about Teamup</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
              <ChevronDown
                size={18}
                className={`text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   Contact / Report Issues Form
   ═══════════════════════════════════════════════════════════════════════════════ */

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 mb-16">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Left side */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-white/80 text-xs font-medium mb-4 w-fit">
              <Shield size={13} />
              We&apos;re here to help
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Facing any issues?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Whether it&apos;s a bug, a suggestion, or you need help with something — we&apos;d love to hear from you. Our team typically responds within 24 hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Users size={18} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Community Support</div>
                  <div className="text-gray-500 text-xs">Join our Discord for instant help</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Globe size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Available Worldwide</div>
                  <div className="text-gray-500 text-xs">Support in 12+ languages</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side — Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1.5 block">Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1.5 block">Your Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                rows={4}
                placeholder="Describe the issue or share your feedback..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25"
            >
              {submitted ? (
                'Message Sent! ✓'
              ) : (
                <>Send Message <Send size={15} /></>
              )}
            </button>
            {submitted && (
              <p className="text-emerald-400 text-xs text-center animate-fade-in">
                Thanks! We&apos;ll get back to you within 24 hours.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
