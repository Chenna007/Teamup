'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { searchActivities, setIsSearchOpen, isSearchOpen } = useAppStore();
  const router = useRouter();

  const filteredCategories = query
    ? CATEGORIES.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      )
    : CATEGORIES;

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (q: string, category?: string) => {
    searchActivities(q, category);
    setShowSuggestions(false);
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}${category ? `&category=${category}` : ''}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl focus-within:shadow-xl focus-within:border-emerald-200">
          <div className="pl-4 text-gray-400">
            <Search size={20} />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search activities... e.g. football near me"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="flex-1 px-3 py-4 text-base text-gray-900 placeholder-gray-400 bg-transparent outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                searchActivities('');
              }}
              className="p-2 mr-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-4 bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[60vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {!query && (
            <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50">
              Browse Categories
            </div>
          )}
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setQuery(cat.label);
                handleSearch(cat.label, cat.slug);
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-emerald-50 transition-colors text-left group"
            >
              <span className="text-xl w-8 text-center">{cat.emoji}</span>
              <span className="text-gray-700 group-hover:text-emerald-700 font-medium">
                {cat.label}
              </span>
              <MapPin size={14} className="ml-auto text-gray-300 group-hover:text-emerald-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
