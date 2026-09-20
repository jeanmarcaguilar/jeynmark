// ==========================================
// FILE: src/components/CapstoneModal.jsx
// Same window style as ProjectModal.jsx (the Mobile App modal).
// ==========================================
import React, { useEffect } from 'react';

// Capstone showcase data — same shape as the app data in ProjectModal.jsx.
// Edit the text here, and point `image` at your real screenshot.
// Each entry becomes one card.
const capstoneModules = [
  {
    id: 'records',
    title: 'Microfinancial Administrative - Capstone III',
    badge: 'FULL-STACK',
    badgeTheme: 'bg-blue-600/90 text-white',
    tagline: 'Centralized management of data.',
    taglineColor: 'text-blue-600',
    description:
      'A web-based microfinance administrative system designed to streamline administrative operations, client management, and visitor monitoring through a QR code-based visitor registration system.',
    gradient: 'from-blue-50/70 via-indigo-50/50 to-sky-50/80',
    badges: [
      { primary: 'PHP', subtitle: 'BACKEND' },
      { primary: 'MySQL', subtitle: 'DATABASE' },
      { primary: 'JSON', subtitle: 'DATA' },
    ],
    image: { src: '/images/capstone/n.png', alt: 'Student Records System screenshot' },
  },
  {
    id: 'enrollment',
    title: 'SJDM-Local Tour Guide & Booking System',
    badge: 'Back-End',
    badgeTheme: 'bg-purple-600/90 text-white',
    tagline: 'Discover SJDM. Explore More. Experience Local. .',
    taglineColor: 'text-purple-600',
    description:
      'SJDM Local Tour Guide & Booking System is a web-based tourism platform designed to help visitors discover local attractions, explore tour destinations, and conveniently book local tour services in San Jose del Monte.',
    gradient: 'from-purple-50/70 via-fuchsia-50/40 to-pink-50/60',
    badges: [
      { primary: 'PHP', subtitle: 'BACKEND' },
      { primary: 'MySQL', subtitle: 'DATABASE' },
      { primary: 'RESTful', subtitle: 'API' },
    ],
    image: { src: '/images/capstone/j.jpg', alt: 'Registration Module screenshot' },
  },
];

// ---- Image loading helper (same behavior as Projects.jsx) ----
// If an image fails to load, try the same file name with the other common
// extensions (png / jpg / jpeg / webp) before giving up, so switching a file
// from .png to .jpg never breaks the card.
const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];

const imageCandidates = (src) => {
  if (!src) return [];
  const match = /^(.*)\.(png|jpe?g|webp)$/i.exec(src);
  if (!match) return [src];
  const others = IMAGE_EXTENSIONS.map((ext) => `${match[1]}.${ext}`).filter((candidate) => candidate !== src);
  return [src, ...others];
};

const useImageWithFallback = (src) => {
  const candidates = React.useMemo(() => imageCandidates(src), [src]);
  const [state, setState] = React.useState({ src, attempt: 0 });
  const attempt = state.src === src ? state.attempt : 0;

  return {
    current: candidates[attempt] ?? null,
    onError: () => setState({ src, attempt: attempt + 1 }),
  };
};

// Real screenshot for the module's preview banner.
// If the file is missing, the banner stays and names the file it expected.
const ModuleImage = ({ image }) => {
  const { current, onError } = useImageWithFallback(image?.src);

  if (!current) {
    return (
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs font-medium text-slate-500/80">
        {image?.src ? `Image not found: ${image.src}` : 'No image set'}
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={image.alt || ''}
      draggable={false}
      onError={onError}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

const CapstoneModal = ({ isOpen, onClose }) => {
  // Lock body scroll while open, and close on Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#0A1629]/75 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Capstone"
    >
      {/* Outer Modern Frameless Window Container (No harsh outlines) */}
      <div
        className="w-[98vw] sm:w-[96vw] max-w-[1100px] max-h-[94vh] flex flex-col bg-[#FAF9F5] rounded-[32px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] overflow-hidden relative"
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
                aria-label="Close modal"
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
              <span>Capstone</span>
            </div>
          </div>

          {/* Right: Minimal Close */}
          <div className="flex items-center gap-3">
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
                WHAT WE BUILT
              </h3>
              <span className="text-[11px] font-medium text-slate-400 hidden sm:inline-block">
                Final-Year Team Project
              </span>
            </div>

            {/* 2 Module Cards (No harsh borders, subtle ambient shadows) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {capstoneModules.map((mod) => (
                <article
                  key={mod.id}
                  className="group bg-white rounded-[28px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Preview Banner */}
                  <div
                    className={`h-64 sm:h-76 xl:h-80 relative bg-gradient-to-br ${mod.gradient} overflow-hidden`}
                  >
                    {/* Status Glass Pill */}
                    <span
                      className={`absolute top-4 right-4 z-20 ${mod.badgeTheme} backdrop-blur-md text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm`}
                    >
                      {mod.badge}
                    </span>

                    {/* Real screenshot */}
                    <ModuleImage image={mod.image} />
                  </div>

                  {/* Bottom Content Area (Refined, outline-free) */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      {/* Title */}
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1.5 group-hover:text-blue-600 transition-colors">
                        {mod.title}
                      </h4>

                      {/* Tagline */}
                      <p
                        className={`text-xs sm:text-[13px] font-semibold ${mod.taglineColor} mb-3 leading-snug`}
                      >
                        {mod.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-[11.5px] sm:text-xs text-slate-500 leading-relaxed line-clamp-4 font-normal mb-6">
                        {mod.description}
                      </p>
                    </div>

                    {/* Bottom Clean Specs (No borders, subtle fills) */}
                    <div className="grid grid-cols-3 gap-2.5 pt-4">
                      {mod.badges.map((b, i) => (
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

export default CapstoneModal;