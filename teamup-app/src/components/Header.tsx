'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bell, PlusCircle, User, MapPin } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function Header() {
  const pathname = usePathname();
  const { notifications, currentUser, isAuthenticated, setShowLoginModal } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10 shadow-lg shadow-black/10'
          : 'bg-black/20 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className="text-lg font-semibold tracking-tight text-white/90">
            Teamup
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {[
            { href: '/', label: 'Explore' },
            { href: '/search', label: 'Search' },
            { href: '/create', label: 'Create' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                pathname === item.href
                  ? 'bg-white/[0.12] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-1">
          {isAuthenticated && (
            <Link
              href="/notifications"
              className="relative p-2 rounded-full text-white/60 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-black/30">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full text-white/70 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
            >
              {currentUser?.avatar_url ? (
                <Image src={currentUser.avatar_url} alt="" width={28} height={28} className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20" />
              ) : (
                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">
                  <User size={14} className="text-white/70" />
                </div>
              )}
              <span className="text-[13px] font-medium">Profile</span>
            </Link>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-1.5 bg-white/[0.12] text-white border border-white/[0.15] rounded-full text-[13px] font-medium hover:bg-white/[0.2] active:scale-[0.97] transition-all duration-200"
            >
              Sign in
            </button>
          )}
        </div>

        {/* Mobile: create button */}
        <div className="md:hidden flex items-center gap-1">
          <Link
            href="/create"
            className="p-2 rounded-full text-white/70 hover:bg-white/[0.08] hover:text-white transition-all"
          >
            <PlusCircle size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
}
