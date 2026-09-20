import React, { useEffect, useMemo, useState } from 'react';

// Modern App Showcase Data
// Screenshots live in public/images/mobile/ (the featured apps use the same files as the Mobile App tile).
const myApps = [
  {
    id: 'fleetflow',
    title: 'FleetFlow',
    badge: 'BETA',
    badgeTheme: 'bg-blue-600/90 text-white',
    tagline: 'Smart fleet tracking and dynamic route optimization.',
    taglineColor: 'text-blue-600',
    description:
      'Monitor vehicle locations in real time, cut unnecessary fuel consumption, and streamline daily dispatching across your entire fleet. Access predictive analytics, maintenance alerts, and driver performance metrics in a single, intuitive dashboard.',
    gradient: 'from-blue-50/70 via-indigo-50/50 to-sky-50/80',
    accentGlow: 'bg-blue-500/10',
    badges: [
      { primary: 'Android', subtitle: 'PLATFORM' },
      { primary: 'Play Store', subtitle: 'OPEN BETA' },
      { primary: 'PHP / MySQL', subtitle: 'BACKEND' },
    ],
    image: '/images/mobile/FleetFlow.jpg',
  },
  {
    id: 'cartly',
    title: 'Cartly',
    badge: 'BETA',
    badgeTheme: 'bg-purple-600/90 text-white',
    tagline: 'Shop smarter. Curated local marketplace.',
    taglineColor: 'text-purple-600',
    description:
      'Cartly brings your favorite verified local merchants, flash collections, and seamless checkout into a refined, lightning-fast mobile experience. Track deliveries in real time with end-to-end order transparency.',
    gradient: 'from-purple-50/70 via-fuchsia-50/40 to-pink-50/60',
    accentGlow: 'bg-purple-500/10',
    badges: [
      { primary: 'React Native', subtitle: 'FRAMEWORK' },
      { primary: 'Multi-Vendor', subtitle: 'ECOSYSTEM' },
      { primary: 'Direct Pay', subtitle: 'CHECKOUT' },
    ],
    image: '/images/mobile/Cartly.png',
  },
  {
    id: 'sauyo',
    title: 'Sauyo Rescue',
    badge: 'COMMUNITY',
    badgeTheme: 'bg-emerald-600/90 text-white',
    tagline: 'Emergency help, just one tap away.',
    taglineColor: 'text-emerald-600',
    description:
      'Community-focused emergency response app designed for Barangay Sauyo, connecting residents with verified local responders during medical emergencies, fires, and disaster relief with one-tap SOS and live GPS beacon sharing.',
    gradient: 'from-emerald-50/70 via-teal-50/50 to-cyan-50/60',
    accentGlow: 'bg-emerald-500/10',
    badges: [
      { primary: '1-Tap SOS', subtitle: 'DISPATCH' },
      { primary: 'Real-Time', subtitle: 'GPS TELEMETRY' },
      { primary: '100% Free', subtitle: 'PUBLIC SAFETY' },
    ],
    image: '/images/mobile/Rescue.png',
  },
];

const referenceApps = [
  {
    id: 'pickles',
    title: 'Pickles',
    badge: 'BETA',
    badgeTheme: 'bg-blue-600/90 text-white',
    tagline: 'Filipino grocery tracker with budget control.',
    taglineColor: 'text-blue-600',
    description:
      'Track prices across PH supermarkets, set per-trip budgets, and build a running product catalog. On Google Play - still in beta testing.',
    gradient: 'from-blue-50/70 via-indigo-50/50 to-sky-50/80',
    accentGlow: 'bg-blue-500/10',
    badges: [
      { primary: 'Android', subtitle: 'PLATFORM' },
      { primary: 'Play Store', subtitle: 'PUBLISHED' },
      { primary: 'PHP', subtitle: 'CURRENCY' },
    ],
    image: '/images/mobile/Pickles.png',
  },
  {
    id: 'celery',
    title: 'Celery Music',
    badge: 'BETA',
    badgeTheme: 'bg-purple-600/90 text-white',
    tagline: 'Your playlists, your vibe, your device.',
    taglineColor: 'text-purple-600',
    description:
      'Import music, pull tracks from YouTube, create playlists, and tune with a 10-band EQ. No ads, no cloud, no tracking. Everything stays on your phone.',
    gradient: 'from-purple-50/70 via-fuchsia-50/40 to-pink-50/60',
    accentGlow: 'bg-purple-500/10',
    badges: [
      { primary: '9', subtitle: 'AUDIO FORMATS' },
      { primary: '10 Band', subtitle: 'EQUALIZER' },
      { primary: 'Offline', subtitle: 'MODE' },
    ],
    image: '/images/mobile/Celery.png',
  },
  {
    id: 'lettuce',
    title: 'Lettuce Read',
    badge: 'FREE',
    badgeTheme: 'bg-emerald-600/90 text-white',
    tagline: 'Your purrfect reading companion.',
    taglineColor: 'text-emerald-600',
    description:
      'Free ebook reader that handles 21 file formats with no ads, no tracking, and no internet required. Just you and your books.',
    gradient: 'from-emerald-50/70 via-teal-50/50 to-cyan-50/60',
    accentGlow: 'bg-emerald-500/10',
    badges: [
      { primary: '21', subtitle: 'FILE FORMATS' },
      { primary: '100%', subtitle: 'OFFLINE' },
      { primary: 'Free', subtitle: 'FOREVER' },
    ],
    image: '/images/mobile/Lettuce.png',
  },
];

// ---- App screenshots ----
// If an image fails to load, try the same file name with the other common extensions
// (png / jpg / jpeg / webp), so switching a file from .png to .jpg never breaks it.
// (Same helper as in Projects.jsx.)
const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];

const imageCandidates = (src) => {
  if (!src) return [];
  const match = /^(.*)\.(png|jpe?g|webp)$/i.exec(src);
  if (!match) return [src];
  const others = IMAGE_EXTENSIONS.map((ext) => `${match[1]}.${ext}`).filter((candidate) => candidate !== src);
  return [src, ...others];
};

// Returns the src to render (null once every option has failed) and an onError handler.
// The attempt counter belongs to `src`, so pointing an image at a new path starts fresh.
const useImageWithFallback = (src) => {
  const candidates = useMemo(() => imageCandidates(src), [src]);
  const [state, setState] = useState({ src, attempt: 0 });
  const attempt = state.src === src ? state.attempt : 0;

  return {
    current: candidates[attempt] ?? null,
    onError: () => setState({ src, attempt: attempt + 1 }),
  };
};

// The app's screenshot, shown as-is (no device frame) and fitted inside the banner without cropping.
// If the file is missing, a small tile names the path it expected.
const AppScreenshot = ({ src, alt }) => {
  const { current, onError } = useImageWithFallback(src);

  if (!current) {
    return (
      <div className="h-full w-40 rounded-2xl bg-white/60 flex items-center justify-center px-3 text-center text-xs font-medium text-slate-500 break-all">
        {src ? `Image not found: ${src}` : 'No image set'}
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={alt}
      draggable={false}
      onError={onError}
      className="max-h-full max-w-full rounded-2xl shadow-[0_20px_40px_-12px_rgba(15,23,42,0.35)] transform group-hover:scale-[1.03] transition-transform duration-500 select-none"
    />
  );
};

const ProjectModal = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState('myApps'); // 'myApps' or 'reference'

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentApps = viewMode === 'myApps' ? myApps : referenceApps;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#0A1629]/75 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      {/* Outer Modern Frameless Window Container (No harsh outlines) */}
      <div
        className="w-[98vw] sm:w-[96vw] max-w-[1580px] max-h-[94vh] flex flex-col bg-[#FAF9F5] rounded-[32px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek Frameless Titlebar */}
        <div className="h-12 bg-[#F1EFE8]/70 backdrop-blur-md px-5 sm:px-7 flex items-center justify-between shrink-0 select-none">
          {/* Left: macOS Traffic Lights & Clean Tab */}
          <div className="flex items-center gap-4">
            {/* Traffic Dots without harsh borders */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                title="Close modal"
                className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-xs hover:brightness-90 transition flex items-center justify-center group/dot cursor-pointer"
              >
                <span className="text-[7px] font-black text-[#6B0C06] opacity-0 group-hover/dot:opacity-100 transition-opacity leading-none">
                  ✕
                </span>
              </button>
              <div
                title="Minimize"
                className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-xs opacity-90"
              />
              <div
                title="Expand"
                className="w-3 h-3 rounded-full bg-[#27C93F] shadow-xs opacity-90"
              />
            </div>

            {/* Clean Tab */}
            <div className="text-slate-800 font-bold text-xs sm:text-[13px] tracking-tight flex items-center gap-2">
              <span>Mobile Apps</span>
            </div>
          </div>

          {/* Right: Modern Segmented Switcher & Minimal Close */}
          <div className="flex items-center gap-3">
            <div className="bg-black/[0.04] p-1 rounded-full flex items-center text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('myApps')}
                className={`px-3 py-0.5 rounded-full transition-all ${viewMode === 'myApps'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                Featured Apps
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs font-bold transition cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-9 lg:p-12 xl:p-14 custom-scrollbar">
          <section className="mb-6">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                APPS I ALSO SHIP
              </h3>
              {viewMode === 'myApps' && (
                <span className="text-[11px] font-medium text-slate-400 hidden sm:inline-block">
                  Live Beta & Production Concepts
                </span>
              )}
            </div>

            {/* 3 Apps Grid (No harsh borders, subtle ambient shadows) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {currentApps.map((app) => (
                <article
                  key={app.id}
                  className="group bg-white rounded-[28px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Preview Banner */}
                  <div
                    className={`h-64 sm:h-76 xl:h-80 relative bg-gradient-to-br ${app.gradient} overflow-hidden flex items-center justify-center p-4`}
                  >
                    {/* Status Glass Pill */}
                    <span
                      className={`absolute top-4 right-4 z-20 ${app.badgeTheme} backdrop-blur-md text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm`}
                    >
                      {app.badge}
                    </span>

                    {/* App screenshot */}
                    <AppScreenshot src={app.image} alt={`${app.title} screenshot`} />
                  </div>

                  {/* Bottom Content Area (Refined, outline-free) */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      {/* Title */}
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1.5 group-hover:text-blue-600 transition-colors">
                        {app.title}
                      </h4>

                      {/* Tagline */}
                      <p
                        className={`text-xs sm:text-[13px] font-semibold ${app.taglineColor} mb-3 leading-snug`}
                      >
                        {app.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-[11.5px] sm:text-xs text-slate-500 leading-relaxed line-clamp-4 font-normal mb-6">
                        {app.description}
                      </p>
                    </div>

                    {/* Bottom Clean Specs (No borders, subtle fills) */}
                    <div className="grid grid-cols-3 gap-2.5 pt-4">
                      {app.badges.map((b, i) => (
                        <div
                          key={i}
                          className="bg-slate-50/90 group-hover:bg-slate-100/90 rounded-2xl p-2.5 text-center flex flex-col justify-center transition-colors"
                        >
                          <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight truncate">
                            {b.primary}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5 truncate">
                            {b.subtitle}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ProjectModal;