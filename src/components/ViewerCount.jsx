import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_live_viewer_id';
const PULSE_INTERVAL_MS = 4_000;

const LiveViewsContext = createContext(null);

function formatCount(count) {
  return new Intl.NumberFormat('en-US').format(count);
}

function viewerId() {
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID().replaceAll('-', '');
    window.localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    let id = window.sessionStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID().replaceAll('-', '');
      window.sessionStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  }
}

async function syncLiveViewers({ id, leave = false } = {}) {
  const response = await fetch('/api/live-viewers', {
    method: id ? 'POST' : 'GET',
    headers: id ? { 'Content-Type': 'application/json' } : undefined,
    body: id ? JSON.stringify({ id, leave }) : undefined,
    keepalive: leave,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Could not load live viewers.');
  return Number(data.live) || 0;
}

function sendLeaveBeacon(id) {
  if (!id) return;
  const payload = JSON.stringify({ id, leave: true });
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon('/api/live-viewers', blob);
  } else {
    syncLiveViewers({ id, leave: true }).catch(() => {});
  }
}

export function LiveViewersProvider({ children }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const id = viewerId();

    const pulse = async () => {
      if (document.visibilityState === 'hidden') return;
      try {
        const live = await syncLiveViewers({ id });
        if (!cancelled) setCount(live);
      } catch {
        if (!cancelled) setCount((current) => current ?? 1);
      }
    };

    pulse();
    const interval = setInterval(pulse, PULSE_INTERVAL_MS);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') pulse();
    };

    const onPageHide = () => {
      sendLeaveBeacon(id);
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

  return (
    <LiveViewsContext.Provider value={count}>
      {children}
    </LiveViewsContext.Provider>
  );
}

export function ViewerCount() {
  const count = useContext(LiveViewsContext);
  const ready = count != null;

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-5xl font-extrabold text-white flex items-center justify-center min-h-[1em]">
        {ready ? formatCount(count) : (
          <span className="inline-block h-8 w-16 sm:h-12 sm:w-20 rounded bg-zinc-800/80 animate-pulse" />
        )}
      </div>
      <div className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase mt-2 flex items-center justify-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#00FF9D] opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00FF9D]" />
        </span>
        LIVE
      </div>
    </div>
  );
}
