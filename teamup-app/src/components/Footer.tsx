'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';

function GlobeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

type FooterItem = { label: string; desc: string; href?: string };

const footerSections: Record<string, FooterItem[]> = {
  Product: [
    { label: 'How it works', desc: 'Teamup uses map-based discovery and smart search to help you find activities happening right around you. Open the app, explore the map, and join — it is that simple.' },
    { label: 'Browse activities', href: '/search', desc: 'Explore activities based on your location, preferred category, and schedule. Filter by time, distance, and availability to find the perfect match.' },
    { label: 'Create activity', href: '/create', desc: 'Launch your own activity in under 30 seconds. Set the title, time, location, and category — then invite people nearby to join you.' },
    { label: 'Notifications', href: '/notifications', desc: 'Get real-time alerts when new activities pop up near you, when someone joins your event, or when you receive a message from a fellow user.' },
    { label: 'Mobile app', desc: 'Teamup is built mobile-first. Optimised for quick, on-the-go discovery with a touch-friendly interface designed for real-world speed.' },
  ],
  Community: [
    { label: 'Community guidelines', desc: 'Teamup is built on respect, inclusivity, and positive collaboration. We expect every member to treat others with kindness and foster a welcoming environment.' },
    { label: 'Safety tips', desc: 'Always meet in public places for your first activity. Share your plans with someone you trust and report anything that feels off. Your safety comes first.' },
    { label: 'Success stories', desc: 'From cricket teams and startup co-founders to cycling groups and book clubs — real people are building real connections every day on Teamup.' },
    { label: 'Blog', desc: 'The Teamup blog shares product updates, community stories, feature deep-dives, and tips for making the most of your local activity scene.' },
    { label: 'Events', desc: 'Discover curated local meetups and community events highlighted by the Teamup team. From city-wide sports days to creative workshops.' },
  ],
  Support: [
    { label: 'Help center', desc: 'Find answers to common questions about creating activities, managing your profile, using the map, notifications, and connecting with other users.' },
    { label: 'Contact us', desc: 'Reach the Teamup support team via email or in-app messaging. We typically respond within 24 hours and are happy to help.' },
    { label: 'Report an issue', desc: 'Found a bug or encountered inappropriate behavior? Use our reporting tool to let us know. Every report is reviewed by a real person.' },
    { label: 'Accessibility', desc: 'Teamup is committed to making activity discovery accessible to everyone. We follow WCAG guidelines and continuously improve the experience.' },
    { label: 'Feedback', desc: 'Your ideas shape the product. Share suggestions, feature requests, or anything that would make Teamup better for you and your community.' },
  ],
  Company: [
    { label: 'About', desc: 'Teamup exists to help people connect through real-world activities. We believe the best communities are built face-to-face, one activity at a time.' },
    { label: 'Careers', desc: 'We are growing fast and looking for talented engineers, designers, and community builders who want to reshape how people connect locally.' },
    { label: 'Press', desc: 'For media inquiries, interviews, and press resources, reach out to our communications team. We love sharing the Teamup story.' },
    { label: 'Investors', desc: 'Teamup is building a global activity network connecting millions. We welcome conversations with investors who share our vision.' },
    { label: 'Partners', desc: 'Venues, communities, sports clubs, and organisations can partner with Teamup to reach active, engaged local audiences.' },
  ],
};

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/teamuphq/', desc: 'Community highlights, activities, and real stories from users.', svg: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { label: 'X (Twitter)', href: '#', desc: 'Product updates, build-in-public progress, and announcements.', svg: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61586915052827', desc: 'Discover activities and connect with people nearby.', svg: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: 'LinkedIn', href: '#', desc: 'Company updates, partnerships, and industry insights.', svg: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Top section with links + descriptions */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerSections).map(([title, items]) => (
            <div key={title}>
              {/* Section title — expandable on mobile */}
              <button
                className="w-full flex items-center justify-between md:cursor-default mb-4"
                onClick={() => setExpandedSection(expandedSection === title ? null : title)}
              >
                <h3 className="text-white text-sm font-semibold">{title}</h3>
                <span className="md:hidden text-gray-500">
                  {expandedSection === title ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              <ul className={`space-y-1 ${expandedSection === title ? 'block' : 'hidden md:block'}`}>
                {items.map((item) => {
                  const key = `${title}-${item.label}`;
                  const isExpanded = expandedItem === key;
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="block text-sm py-1.5 hover:text-white transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          className="w-full text-left text-sm py-1.5 hover:text-white transition-colors duration-200 group"
                          onClick={() => setExpandedItem(isExpanded ? null : key)}
                        >
                          <span className="flex items-center gap-1">
                            {item.label}
                            <ChevronDown size={11} className={`opacity-0 group-hover:opacity-100 transition-all duration-200 ${isExpanded ? 'rotate-180 opacity-100' : ''}`} />
                          </span>
                        </button>
                      )}
                      {isExpanded && item.desc && (
                        <p className="text-xs text-gray-500 leading-relaxed pb-2 pl-0 animate-fade-in">
                          {item.desc}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Row */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="text-white text-sm font-semibold mb-4">Follow Teamup</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <span className="text-gray-500 group-hover:text-white transition-colors mt-0.5">{social.svg}</span>
                <div>
                  <div className="text-sm text-gray-300 group-hover:text-white font-medium transition-colors">{social.label}</div>
                  <div className="text-xs text-gray-600 leading-relaxed mt-0.5">{social.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left — brand + copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <MapPin size={13} className="text-white" />
              </div>
              <span className="text-white font-semibold">Teamup</span>
            </Link>
            <span className="hidden sm:inline text-gray-700">·</span>
            <span>© 2026 Teamup, Inc.</span>
          </div>

          {/* Middle — legal links */}
          <div className="flex items-center gap-3 text-sm">
            <button className="hover:text-white transition-colors group relative" onClick={() => setExpandedItem(expandedItem === 'privacy' ? null : 'privacy')}>
              Privacy
            </button>
            <span className="text-gray-700">·</span>
            <button className="hover:text-white transition-colors" onClick={() => setExpandedItem(expandedItem === 'terms' ? null : 'terms')}>
              Terms
            </button>
          </div>
        </div>

        {/* Expandable legal text */}
        {expandedItem === 'privacy' && (
          <div className="mt-4 p-4 bg-white/5 rounded-xl animate-fade-in">
            <h4 className="text-white text-sm font-medium mb-2">Privacy</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Teamup protects your data and location privacy. We use your location only to discover nearby activities and never share it with third parties. Your personal information is encrypted and stored securely. You can manage your privacy settings at any time from your profile.
            </p>
          </div>
        )}
        {expandedItem === 'terms' && (
          <div className="mt-4 p-4 bg-white/5 rounded-xl animate-fade-in">
            <h4 className="text-white text-sm font-medium mb-2">Terms of Service</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              By using Teamup, you agree to be respectful to all community members, create accurate activity listings, and follow our community guidelines. Teamup reserves the right to remove any content that violates these terms or compromises user safety.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
