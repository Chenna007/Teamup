'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import ActivityCard from '@/components/ActivityCard';
import CategoryPills from '@/components/CategoryPills';
import MapView from '@/components/MapView';
import { useAppStore } from '@/lib/store';
import { CATEGORIES } from '@/lib/constants';
import { SlidersHorizontal, MapPin, List, Map as MapIcon } from 'lucide-react';
import { useState } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || undefined;
  const { filteredActivities, searchActivities, loadActivities, searchRadius, setSearchRadius } = useAppStore();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const radiusOptions = ['1 km', '3 km', '5 km', '10 km'];

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    if (category) {
      // Show ALL activities in the selected category
      searchActivities('', category);
    } else if (q) {
      searchActivities(q);
    } else {
      searchActivities('');
    }
  }, [q, category]);

  const handleCategorySelect = (cat: string | undefined) => {
    if (cat) {
      router.push(`/search?category=${cat}`);
    } else {
      router.push('/search');
    }
  };

  const categoryLabel = category
    ? CATEGORIES.find((c) => c.slug === category)?.label
    : undefined;

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Category Pills - compact mode */}
        <div className="mb-4">
          <CategoryPills compact onSelect={handleCategorySelect} />
        </div>

        {/* Radius Filter */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-gray-600 shrink-0">Distance:</span>
          <div className="flex gap-2">
            {radiusOptions.map(r => (
              <button key={r} onClick={() => setSearchRadius(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  searchRadius === r
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'} found
            {categoryLabel && (
              <span className="font-medium text-emerald-600"> in {categoryLabel}</span>
            )}
            {q && !category && <span> for &ldquo;{q}&rdquo;</span>}
          </p>
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              <MapIcon size={16} />
            </button>
          </div>
        </div>

        {viewMode === 'map' ? (
          <MapView
            activities={filteredActivities}
            className="h-[calc(100vh-280px)] md:h-[500px]"
            onActivityClick={(a) => {
              window.location.href = `/activity/${a.id}`;
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="stagger-item">
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        )}

        {filteredActivities.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No results found</h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search or browse categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
