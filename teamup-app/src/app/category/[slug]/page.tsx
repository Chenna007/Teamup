'use client';

import { use, useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ActivityCard from '@/components/ActivityCard';
import MapView from '@/components/MapView';
import { useAppStore } from '@/lib/store';
import { CATEGORIES } from '@/lib/constants';
import { ArrowLeft, MapPin, List, Map as MapIcon, SlidersHorizontal, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { filteredActivities, searchActivities, loadActivities, searchRadius, setSearchRadius } = useAppStore();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [distanceFilter, setDistanceFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string>('all');

  const category = CATEGORIES.find(c => c.slug === slug);

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    searchActivities('', slug);
  }, [slug]);

  const radiusOptions = ['1 km', '3 km', '5 km', '10 km'];

  // Apply additional filters
  let displayActivities = filteredActivities;
  if (dateFilter === 'today') {
    const today = new Date().toISOString().split('T')[0];
    displayActivities = displayActivities.filter(a => a.date === today);
  } else if (dateFilter === 'tomorrow') {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    const tmrwStr = tmrw.toISOString().split('T')[0];
    displayActivities = displayActivities.filter(a => a.date === tmrwStr);
  } else if (dateFilter === 'week') {
    const weekEnd = new Date();
    weekEnd.setDate(weekEnd.getDate() + 7);
    displayActivities = displayActivities.filter(a => new Date(a.date) <= weekEnd);
  }

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {category?.emoji} {category?.label || slug}
              </h1>
              <p className="text-sm text-gray-500">{displayActivities.length} activities found</p>
            </div>
          </div>
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Filters */}
        <div className="space-y-3 mb-4">
          {/* Distance filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 shrink-0">Distance:</span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {radiusOptions.map(r => (
                <button key={r} onClick={() => setSearchRadius(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                    searchRadius === r
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Date filter */}
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-500 shrink-0" />
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {[
                { value: 'all', label: 'Any date' },
                { value: 'today', label: 'Today' },
                { value: 'tomorrow', label: 'Tomorrow' },
                { value: 'week', label: 'This week' },
              ].map(opt => (
                <button key={opt.value} onClick={() => setDateFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                    dateFilter === opt.value
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {displayActivities.length} activit{displayActivities.length !== 1 ? 'ies' : 'y'}
            {category && <span className="font-medium text-emerald-600"> in {category.label}</span>}
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
            activities={displayActivities}
            className="h-[calc(100vh-320px)] md:h-[500px]"
            onActivityClick={(a) => { window.location.href = `/activity/${a.id}`; }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayActivities.map((activity) => (
              <div key={activity.id} className="stagger-item">
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        )}

        {displayActivities.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No activities found</h3>
            <p className="text-sm text-gray-500 mb-4">
              Try adjusting your filters or be the first to create one
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              Create Activity
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
