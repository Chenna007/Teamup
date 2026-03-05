'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, PlusCircle, Bell, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Map', icon: Compass },
  { href: '/create', label: 'Create', icon: PlusCircle },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { notifications, isAuthenticated, setShowLoginModal } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl backdrop-saturate-150 border-t border-white/10 pb-[env(safe-area-inset-bottom)] md:hidden transition-all">
      <div className="flex items-center justify-around px-2 py-1.5">
        {navItems.filter((item) => item.href !== '/notifications' || isAuthenticated).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.href === '/create' && !isAuthenticated) {
            return (
              <button
                key={item.href}
                onClick={() => setShowLoginModal(true)}
                className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative text-white/50 hover:text-white/80"
              >
                <div className="w-11 h-11 -mt-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-2 ring-black/20">
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-[10px] font-medium -mt-0.5">Create</span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-emerald-400'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {item.href === '/create' ? (
                <div className="w-11 h-11 -mt-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-2 ring-black/20">
                  <Icon size={22} className="text-white" />
                </div>
              ) : (
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              )}
              <span className={`text-[10px] font-medium ${item.href === '/create' ? '-mt-0.5' : ''}`}>
                {item.label}
              </span>
              {item.href === '/notifications' && unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-1 ring-black/30">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
