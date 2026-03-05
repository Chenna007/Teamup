import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import LocationProvider from '@/components/LocationProvider';
import LoginModal from '@/components/LoginModal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Teamup — Find Teammates & Activities Near You',
  description:
    'Discover sports, music, fitness, gaming, and more activities happening near you. Join or create events and meet like-minded people.',
  keywords: ['teammates', 'activities', 'sports', 'meetup', 'local events', 'community'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#10b981',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900 transition-colors duration-300`} suppressHydrationWarning>
        <LocationProvider>
          <Header />
          <LoginModal />
          <main className="min-h-screen pt-12 pb-20 md:pb-0">
            {children}
          </main>
          <BottomNav />
        </LocationProvider>
      </body>
    </html>
  );
}
