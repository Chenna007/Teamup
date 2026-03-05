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
  const { notifications, isAuthenticated } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] md:hidden transition-colors">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.filter((item) => item.href !== '/notifications' || isAuthenticated).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-emerald-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.href === '/create' ? (
                <div className="w-11 h-11 -mt-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                  <Icon size={22} className="text-white" />
                </div>
              ) : (
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              )}
              <span className={`text-[10px] font-medium ${item.href === '/create' ? '-mt-0.5' : ''}`}>
                {item.label}
              </span>
              {item.href === '/notifications' && unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
