'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Activity } from '@/lib/types';
import { DEFAULT_CENTER, MAP_STYLE } from '@/lib/constants';
import { useAppStore } from '@/lib/store';

interface MapViewProps {
  activities: Activity[];
  onActivityClick?: (activity: Activity) => void;
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function MapView({
  activities,
  onActivityClick,
  center,
  zoom = 12,
  className = '',
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const { userLocation, currentUser } = useAppStore();

  const mapCenter: [number, number] = center
    ? center
    : userLocation
    ? [userLocation.longitude, userLocation.latitude]
    : DEFAULT_CENTER;

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    if (!token || token === 'your_mapbox_token_here') {
      setMapError(true);
      return;
    }

    let cancelled = false;

    async function initMap() {
      const mapboxgl = (await import('mapbox-gl')).default;
      // @ts-expect-error CSS import for mapbox styles
      await import('mapbox-gl/dist/mapbox-gl.css');

      if (cancelled || !mapContainer.current) return;

      mapboxgl.accessToken = token!;
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAP_STYLE,
        center: mapCenter,
        zoom,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
        }),
        'top-right'
      );

      map.on('load', () => {
        if (!cancelled) {
          mapRef.current = map;
          setMapLoaded(true);
        }
      });
    }

    initMap();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [token]);

  const updateMarkers = useCallback(async () => {
    if (!mapRef.current || !mapLoaded) return;

    const mapboxgl = (await import('mapbox-gl')).default;

    // Clear existing
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    activities.forEach((activity) => {
      const el = document.createElement('div');
      el.className = 'mapbox-marker';
      
      const creatorInitial = activity.creator?.full_name?.charAt(0) || '?';
      const creatorAvatar = activity.creator?.avatar_url;
      const emoji = getCategoryEmoji(activity.category);
      const bgColor = getCategoryColor(activity.category);
      
      el.innerHTML = `
        <div style="position: relative; cursor: pointer;">
          <div style="
            width: 32px; height: 32px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            overflow: hidden;
            background: ${bgColor};
            display: flex; align-items: center; justify-content: center;
            transition: transform 0.2s;
          ">
            ${creatorAvatar
              ? `<img src="${escapeAttr(creatorAvatar)}" style="width:100%;height:100%;object-fit:cover;" alt="" />`
              : `<span style="color:white;font-weight:700;font-size:13px;">${escapeHtml(creatorInitial)}</span>`
            }
          </div>
          <div style="
            position: absolute;
            bottom: -3px; right: -3px;
            width: 16px; height: 16px;
            background: white;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 9px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            line-height: 1;
          ">${emoji}</div>
        </div>
      `;
      el.addEventListener('mouseenter', () => {
        const inner = el.querySelector('div > div') as HTMLElement;
        if (inner) inner.style.transform = 'scale(1.15)';
      });
      el.addEventListener('mouseleave', () => {
        const inner = el.querySelector('div > div') as HTMLElement;
        if (inner) inner.style.transform = 'scale(1)';
      });

      if (onActivityClick) {
        el.addEventListener('click', () => onActivityClick(activity));
      }

      const marker = new mapboxgl.Marker(el)
        .setLngLat([activity.longitude, activity.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
            <div style="padding: 10px; min-width: 180px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="
                  width: 28px; height: 28px; border-radius: 50%; overflow: hidden;
                  background: ${bgColor}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                ">
                  ${creatorAvatar
                    ? `<img src="${escapeAttr(creatorAvatar)}" style="width:100%;height:100%;object-fit:cover;" alt="" />`
                    : `<span style="color:white;font-weight:700;font-size:12px;">${escapeHtml(creatorInitial)}</span>`
                  }
                </div>
                <span style="font-size:11px;color:#888;">by ${escapeHtml(activity.creator?.full_name || 'Unknown')}</span>
              </div>
              <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px; color: #111;">${emoji} ${escapeHtml(activity.title)}</div>
              <div style="font-size: 12px; color: #666;">${escapeHtml(activity.address)}</div>
            </div>
          `)
        )
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [activities, mapLoaded, onActivityClick]);

  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  // Show current user's profile at their location
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !userLocation) return;

    const addUserMarker = async () => {
      const mapboxgl = (await import('mapbox-gl')).default;

      // Remove old user marker
      userMarkerRef.current?.remove();

      const el = document.createElement('div');
      el.className = 'user-location-marker';

      const avatar = currentUser.avatar_url;
      const initial = currentUser.full_name?.charAt(0) || '?';

      el.innerHTML = `
        <div style="position: relative; cursor: pointer;">
          <div style="
            width: 38px; height: 38px;
            border-radius: 50%;
            border: 2.5px solid #10b981;
            box-shadow: 0 0 0 2px rgba(16,185,129,0.25), 0 2px 8px rgba(0,0,0,0.25);
            overflow: hidden;
            background: #10b981;
            display: flex; align-items: center; justify-content: center;
          ">
            ${avatar
              ? `<img src="${escapeAttr(avatar)}" style="width:100%;height:100%;object-fit:cover;" alt="" />`
              : `<span style="color:white;font-weight:700;font-size:15px;">${escapeHtml(initial)}</span>`
            }
          </div>
          <div style="
            position: absolute;
            bottom: -5px; left: 50%; transform: translateX(-50%);
            background: #10b981;
            color: white;
            font-size: 8px;
            font-weight: 700;
            padding: 1px 6px;
            border-radius: 8px;
            white-space: nowrap;
            box-shadow: 0 1px 4px rgba(0,0,0,0.2);
            letter-spacing: 0.5px;
          ">YOU</div>
          <div style="
            position: absolute;
            top: -2px; right: -2px;
            width: 10px; height: 10px;
            background: #10b981;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 0 0 2px rgba(16,185,129,0.4);
            animation: pulse-dot 2s infinite;
          "></div>
        </div>
      `;

      // Add pulse animation if not already present
      if (!document.getElementById('user-marker-style')) {
        const style = document.createElement('style');
        style.id = 'user-marker-style';
        style.textContent = `
          @keyframes pulse-dot {
            0%, 100% { box-shadow: 0 0 0 2px rgba(16,185,129,0.4); }
            50% { box-shadow: 0 0 0 6px rgba(16,185,129,0.1); }
          }
        `;
        document.head.appendChild(style);
      }

      userMarkerRef.current = new mapboxgl.Marker(el)
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 30, closeButton: false }).setHTML(`
            <div style="padding: 10px; min-width: 160px; text-align: center;">
              <div style="
                width: 40px; height: 40px; border-radius: 50%; overflow: hidden;
                background: #10b981; display: flex; align-items: center; justify-content: center;
                margin: 0 auto 8px;
              ">
                ${avatar
                  ? `<img src="${escapeAttr(avatar)}" style="width:100%;height:100%;object-fit:cover;" alt="" />`
                  : `<span style="color:white;font-weight:700;font-size:16px;">${escapeHtml(initial)}</span>`
                }
              </div>
              <div style="font-weight:600;font-size:14px;color:#111;">${escapeHtml(currentUser.full_name)}</div>
              <div style="font-size:11px;color:#888;margin-top:2px;">Your location</div>
            </div>
          `)
        )
        .addTo(mapRef.current!);
    };

    addUserMarker();
  }, [mapLoaded, userLocation, currentUser]);

  // Re-center map when user location changes
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;
    mapRef.current.flyTo({
      center: [userLocation.longitude, userLocation.latitude],
      zoom: 13,
      duration: 1500,
    });
  }, [userLocation]);

  // Fallback when no Mapbox token
  if (mapError) {
    return (
      <div className={`relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Map Preview</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Add your Mapbox token in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env.local</code> to see the interactive map
          </p>
          {/* Fake map dots for visual effect */}
          <div className="mt-6 relative w-full max-w-xs h-32">
            {activities.slice(0, 5).map((a, i) => (
              <div
                key={a.id}
                className="absolute w-3 h-3 bg-emerald-500 rounded-full shadow-lg animate-pulse"
                style={{
                  left: `${20 + (i * 15) % 60}%`,
                  top: `${15 + (i * 20) % 70}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full" />
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  );
}

function getCategoryEmoji(slug: string): string {
  const map: Record<string, string> = {
    sports: '⚽', cricket: '🏏', badminton: '🏸', music: '🎸', creative: '📷',
    fitness: '🏃', gaming: '🎮', filmmaking: '🎬', 'art-design': '🎨',
    'book-clubs': '📚', startups: '💻', 'yoga-wellness': '🧘',
    cycling: '🚴', hiking: '🥾', coffee: '☕', travel: '🌍', basketball: '🏀',
  };
  return map[slug] || '📍';
}

function getCategoryColor(slug: string): string {
  const map: Record<string, string> = {
    sports: '#10b981', cricket: '#059669', badminton: '#06b6d4', music: '#8b5cf6', creative: '#ec4899',
    fitness: '#f59e0b', gaming: '#6366f1', filmmaking: '#ef4444', 'art-design': '#f472b6',
    'book-clubs': '#0ea5e9', startups: '#64748b', 'yoga-wellness': '#14b8a6',
    cycling: '#84cc16', hiking: '#a3e635', coffee: '#92400e', travel: '#0284c7', basketball: '#ea580c',
  };
  return map[slug] || '#10b981';
}

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
