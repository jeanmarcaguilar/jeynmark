import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const FALLBACK_EMBED =
  'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator&theme=0';
const POLL_MS = 10_000;

function formatTime(ms) {
  const total = Math.max(0, Math.floor((ms || 0) / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function StaticEmbed() {
  return (
    <div className="bg-[#07130c]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-2.5 shadow-[0_0_35px_rgba(0,255,157,0.12)]">
      <iframe
        style={{ borderRadius: '12px' }}
        src={FALLBACK_EMBED}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Music Player"
      />
    </div>
  );
}

const SpotifyNowPlaying = () => {
  const [track, setTrack] = useState(null);
  const [progressMs, setProgressMs] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch('/api/spotify-now-playing');
        const data = await response.json();
        if (cancelled) return;

        if (data?.premiumRequired) {
          setTrack({ premiumRequired: true });
          setReady(true);
          return;
        }

        if (!data?.configured || !data.trackId) {
          setTrack(data?.configured ? { idle: true } : null);
          setReady(true);
          return;
        }

        setTrack(data);
        setProgressMs(data.progressMs || 0);
        setReady(true);
      } catch {
        if (!cancelled) {
          setTrack(null);
          setReady(true);
        }
      }
    };

    load();
    const poll = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(poll);
    };
  }, []);

  useEffect(() => {
    if (!track?.isPlaying) return undefined;

    const startedAt = Date.now();
    const base = track.progressMs || 0;
    const tick = () => {
      const next = Math.min(base + (Date.now() - startedAt), track.durationMs || 0);
      setProgressMs(next);
    };

    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [track?.isPlaying, track?.progressMs, track?.durationMs, track?.trackId, track?.fetchedAt]);

  if (!ready) {
    return (
      <div className="bg-[#07130c]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 shadow-[0_0_35px_rgba(0,255,157,0.12)]">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-14 w-14 rounded-xl bg-emerald-500/10" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded bg-emerald-500/10" />
            <div className="h-4 w-40 rounded bg-zinc-800" />
            <div className="h-3 w-28 rounded bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  if (track?.premiumRequired) {
    return (
      <div className="bg-[#07130c]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 text-left shadow-[0_0_35px_rgba(0,255,157,0.12)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00FF9D]">Spotify connected</p>
        <p className="mt-2 text-sm font-semibold text-white">Now playing needs Spotify Premium</p>
        <p className="mt-1 text-xs font-mono text-zinc-400 leading-relaxed">
          Spotify now requires Premium on the account that owns the Developer app. After upgrading, wait a few hours, then play a song again.
        </p>
      </div>
    );
  }

  if (track?.idle) {
    return (
      <div className="bg-[#07130c]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 text-left shadow-[0_0_35px_rgba(0,255,157,0.12)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00FF9D]">Spotify connected</p>
        <p className="mt-2 text-sm font-semibold text-white">Nothing is playing right now</p>
        <p className="mt-1 text-xs font-mono text-zinc-400">Start a track in the Spotify app and this player will update.</p>
      </div>
    );
  }

  if (!track) return <StaticEmbed />;

  const percent = track.durationMs ? Math.min(100, (progressMs / track.durationMs) * 100) : 0;

  return (
    <div className="bg-[#07130c]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 shadow-[0_0_35px_rgba(0,255,157,0.12)]">
      <a
        href={track.songUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 text-left group"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-900">
          {track.albumImageUrl ? (
            <img
              src={track.albumImageUrl}
              alt={`${track.album} cover`}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00FF9D]">
              {track.isPlaying ? 'Now playing' : 'Last played'}
            </span>
            <ExternalLink size={14} className="text-zinc-500 group-hover:text-[#00FF9D] transition-colors" />
          </div>

          <p className="truncate text-sm font-semibold text-white mt-0.5">{track.title}</p>
          <p className="truncate text-xs font-mono text-zinc-400">{track.artist}</p>

          <div className="mt-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-[#00FF9D] transition-[width] duration-500 ease-linear"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-500">
              <span>{formatTime(progressMs)}</span>
              <span>{formatTime(track.durationMs)}</span>
            </div>
          </div>
        </div>

        {track.isPlaying ? (
          <div className="flex h-8 items-end gap-[3px] pr-1" aria-hidden>
            <span className="eq-bar eq-bar-1 w-[3px] rounded-full bg-[#00FF9D]" />
            <span className="eq-bar eq-bar-2 w-[3px] rounded-full bg-[#00FF9D]" />
            <span className="eq-bar eq-bar-3 w-[3px] rounded-full bg-[#00FF9D]" />
          </div>
        ) : null}
      </a>
    </div>
  );
};

export default SpotifyNowPlaying;
