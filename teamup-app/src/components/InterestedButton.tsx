'use client';

import { useState } from 'react';
import { Heart, MessageCircle, X, Send, Check } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

interface InterestedButtonProps {
  activityId: string;
  activityTitle: string;
}

export default function InterestedButton({ activityId, activityTitle }: InterestedButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setShowLoginModal, setLoginRedirectAction } = useAppStore();

  const handleClick = () => {
    if (!isAuthenticated) {
      setLoginRedirectAction(() => setIsOpen(true));
      setShowLoginModal(true);
      return;
    }
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await fetch('/api/interests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ activity_id: activityId, message }),
        });
      }
    } catch {
      // Still show success for UX; next time they can retry
    }
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => setIsOpen(false), 2000);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 px-6 py-3.5 bg-emerald-50 text-emerald-700 rounded-2xl font-medium">
        <Check size={20} />
        Request Sent!
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 text-white rounded-2xl font-medium hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-200"
      >
        <Heart size={20} />
        I&apos;m Interested
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-md mx-4 mb-4 md:mb-0 bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Show Interest
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Let the organizer of <span className="font-medium text-gray-700">{activityTitle}</span> know you&apos;d like to join!
              </p>

              <div className="relative mb-4">
                <MessageCircle size={18} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add an optional message... (e.g. 'I play midfielder!')"
                  rows={3}
                  maxLength={500}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 text-white rounded-2xl font-medium hover:bg-emerald-600 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <Send size={18} />
                {loading ? 'Sending…' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
