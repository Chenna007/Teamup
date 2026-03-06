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

  const renderCreateButton = (isLink: boolean) => {
    const inner = (
      <>
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-md shadow-emerald-500/25">
          <PlusCircle size={20} className="text-white" />
        </div>
        <span className="text-[10px] font-medium text-emerald-400">Create</span>
      </>
    );

    const className = "flex flex-col items-center gap-0.5 px-2 transition-all duration-200";

    if (!isLink) {
      return (
        <button key="/create" onClick={() => setShowLoginModal(true)} className={className}>
          {inner}
        </button>
      );
    }

    return (
      <Link key="/create" href="/create" className={className}>
        {inner}
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-end justify-around px-4 pt-2 pb-1.5">
        {navItems.filter((item) => item.href !== '/notifications' || isAuthenticated).map((item) => {
          if (item.href === '/create') {
            return renderCreateButton(isAuthenticated);
          }

          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-all duration-200 relative ${
                isActive
                  ? 'text-emerald-400'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.href === '/notifications' && unreadCount > 0 && (
                <span className="absolute -top-0.5 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-1 ring-gray-950/50">
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
