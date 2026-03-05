'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { getCurrentLocation } from '@/lib/utils';

export default function LocationProvider({ children }: { children: React.ReactNode }) {
  const { setUserLocation, setLocationError, userLocation, loadActivities, hasExplored } = useAppStore();

  useEffect(() => {
    if (!hasExplored || userLocation) return;

    getCurrentLocation()
      .then((coords) => {
        setUserLocation(coords);
      })
      .catch(() => {
        setLocationError('Location access denied. Showing default area.');
        loadActivities();
      });
  }, [hasExplored]);

  return <>{children}</>;
}
