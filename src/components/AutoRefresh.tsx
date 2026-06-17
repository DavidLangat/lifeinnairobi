'use client';

import { useEffect, useRef } from 'react';

export default function AutoRefresh() {
  const currentVersion = useRef<string | null>(null);

  useEffect(() => {
    // Function to check the latest version
    const checkVersion = async () => {
      try {
        // Add a cache-buster query parameter to avoid fetching a cached version.json
        const response = await fetch(`/build-version.json?t=${new Date().getTime()}`);
        if (!response.ok) return;

        const data = await response.json();
        const latestVersion = data.version;

        if (currentVersion.current === null) {
          // Initialize the current version on the first fetch
          currentVersion.current = latestVersion;
        } else if (currentVersion.current !== latestVersion) {
          // If the version has changed, force a reload
          console.log('New version detected. Reloading...');
          window.location.reload();
        }
      } catch (error) {
        // Ignore fetch errors (e.g. offline)
      }
    };

    // Check immediately on mount
    checkVersion();

    // Check when the tab regains focus
    const handleFocus = () => checkVersion();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkVersion();
      }
    });

    // Also check periodically (every 5 minutes) just in case they leave it open
    const intervalId = setInterval(checkVersion, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  }, []);

  return null; // This component doesn't render anything
}
