'use client';

import { CATEGORIES } from '@/lib/constants';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';

interface CategoryPillsProps {
  compact?: boolean;
  onSelect?: (category: string | undefined) => void;
}

export default function CategoryPills({ compact = false, onSelect }: CategoryPillsProps) {
  const { selectedCategory, searchActivities, searchQuery, activities } =
    useAppStore();

  // Count activities per category from full data
  const categoryCounts: Record<string, number> = {};
  activities.forEach((a) => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  });

  const handleSelect = (slug: string | undefined) => {
    if (onSelect) {
      onSelect(slug);
    } else {
      searchActivities(searchQuery, slug);
    }
  };

  return (
    <div>
      {/* Quick-filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4">
        <button
          onClick={() => handleSelect(undefined)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !selectedCategory
              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All ({activities.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              selectedCategory === cat.slug
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.emoji} {cat.label} ({categoryCounts[cat.slug] || 0})
          </button>
        ))}
      </div>

      {/* Visual category image tiles - hidden in compact mode */}
      {!compact && (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mt-4">
        {CATEGORIES.map((cat) => {
          const count = categoryCounts[cat.slug] || 0;
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(isActive ? undefined : cat.slug)}
              className={`group relative overflow-hidden rounded-xl aspect-[4/3] transition-all duration-300 ${
                isActive
                  ? 'ring-2 ring-emerald-500 ring-offset-2 scale-[0.98]'
                  : 'hover:scale-[1.02] hover:shadow-lg'
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <span className="text-2xl mb-0.5">{cat.emoji}</span>
                <span className="text-white font-semibold text-sm leading-tight text-left">
                  {cat.label}
                </span>
                <span className="text-white/80 text-xs mt-0.5 text-left">
                  {count} {count === 1 ? 'activity' : 'activities'}
                </span>
              </div>
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      )}
    </div>
  );
}
