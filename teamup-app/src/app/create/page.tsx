'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/lib/constants';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Tag,
  Image as ImageIcon,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export default function CreateActivityPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    date: '',
    time: '',
    max_participants: 10,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, setShowLoginModal, setLoginRedirectAction, userLocation, currentUser } = useAppStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setLoginRedirectAction(() => handleSubmit(e));
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try Supabase insert
      const { data: { session } } = await supabase.auth.getSession();

      if (session && currentUser) {
        const { error: insertError } = await supabase
          .from('activities')
          .insert({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            address: formData.address,
            date: formData.date,
            time: formData.time,
            max_participants: formData.max_participants,
            latitude: userLocation?.latitude || 0,
            longitude: userLocation?.longitude || 0,
            creator_id: currentUser.id,
          });

        if (insertError) {
          setError(insertError.message);
          setLoading(false);
          return;
        }
      }

      setSubmitted(true);
    } catch {
      setError('Failed to create activity. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-scale-in bg-gray-50">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={36} className="text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Activity Created!</h2>
        <p className="text-gray-500 text-center max-w-xs mb-6">
          Your activity is now live. People near you can discover and join it.
        </p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
          >
            Go Home
          </Link>
          <button
            onClick={() => { setSubmitted(false); setFormData({ title: '', description: '', category: '', address: '', date: '', time: '', max_participants: 10 }); }}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Create Activity</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <FileText size={15} />
              Activity Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Weekend Football Match"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <FileText size={15} />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell people what the activity is about, what to bring, skill level..."
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <Tag size={15} />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all bg-white appearance-none"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <MapPin size={15} />
              Location / Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="e.g. Cubbon Park, Bangalore"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Calendar size={15} />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Clock size={15} />
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
          </div>

          {/* Max Participants */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <Users size={15} />
              Max Participants
            </label>
            <input
              type="number"
              name="max_participants"
              value={formData.max_participants}
              onChange={handleChange}
              required
              min={2}
              max={100}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>

          {/* Submit */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-semibold text-base hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
          >
            {loading ? 'Creating…' : 'Create Activity'}
          </button>
        </form>
      </div>
    </div>
  );
}
