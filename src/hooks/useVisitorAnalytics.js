import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { detectDeviceDetails } from '../utils/deviceDetection';

function getOrCreateSessionId() {
  if (typeof window === 'undefined') return 'session_default';
  try {
    let id = sessionStorage.getItem('portfolio_session_id');
    if (!id) {
      id = 's_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      sessionStorage.setItem('portfolio_session_id', id);
    }
    return id;
  } catch {
    return 's_' + Date.now().toString(36);
  }
}

export function useVisitorAnalytics() {
  const location = useLocation();
  const sessionStartTimeRef = useRef(null);
  if (sessionStartTimeRef.current === null) {
    sessionStartTimeRef.current = Date.now();
  }
  const initialSentRef = useRef(false);
  const sessionIdRef = useRef(null);
  if (sessionIdRef.current === null) {
    sessionIdRef.current = getOrCreateSessionId();
  }

  const sendPayload = (isHeartbeat = false, customPage = null) => {
    const details = detectDeviceDetails();
    const durationSeconds = Math.floor((Date.now() - sessionStartTimeRef.current) / 1000);

    const payload = {
      sessionId: sessionIdRef.current,
      ...details,
      pageVisited: customPage || (location.pathname + location.search),
      sessionDuration: durationSeconds,
      isHeartbeat,
    };

    const endpoint = '/api/visitor-analytics';
    const bodyStr = JSON.stringify(payload);

    try {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon && isHeartbeat) {
        const blob = new Blob([bodyStr], { type: 'application/json' });
        navigator.sendBeacon(endpoint, blob);
        return;
      }
    } catch {
      // Fallback to fetch if sendBeacon fails or unsupported
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr,
      keepalive: true,
    }).catch(() => {
      // Silent error handling for client analytics
    });
  };

  // Initial session tracking
  useEffect(() => {
    if (!initialSentRef.current) {
      initialSentRef.current = true;
      sendPayload(false);
    }
  }, []);

  // Track route changes
  useEffect(() => {
    if (initialSentRef.current) {
      const currentPath = location.pathname + location.search;
      sendPayload(true, currentPath);
    }
  }, [location.pathname, location.search]);

  // Periodic heartbeat & unload tracking
  useEffect(() => {
    const intervalId = setInterval(() => {
      sendPayload(true);
    }, 30000); // 30 second duration updates

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendPayload(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
