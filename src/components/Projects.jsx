// ==========================================
// FILE: src/components/Projects.jsx
// ==========================================
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProjectModal from './ProjectModal';
import CapstoneModal from './CapstoneModal';

// ---- Replace these with your real project data / links / images ----
const projects = [
  {
    title: 'Website',
    description:
      'A full-stack web platform for tracking parking slot availability and transactions in real time, with a database-backed dashboard and API-driven data sync between the front end and server.',
    stack: ['', '', ''],
    liveUrl: '#',
    repoUrl: '#',
    // Real screenshots. Add or remove entries here and both the card tile
    // and the popup marquee pick it up automatically — no other code to touch.
    images: [
      { src: '/images/website/k.png', alt: 'Real-time slot tracker dashboard' },
      { src: '/images/website/e.png', alt: 'Transaction overview dashboard' },
      { src: '/images/website/l.png', alt: 'RESTful API data sync view' },
    ],
  },
  {
    title: 'Automations',
    description:
      'A backend automation system built with Laravel that streamlines order intake, stock updates, and notifications — replacing manual data entry with scheduled jobs and API-triggered workflows.',
    stack: ['', '', '', ''],
    liveUrl: '#',
    repoUrl: '#',
    images: [
      { src: '/images/automations/1.png', alt: 'Automations project image 1' },
      { src: '/images/automations/2.png', alt: 'Automations project image 2' },
      { src: '/images/automations/3.png', alt: 'Automations project image 3' },
      { src: '/images/automations/4.png', alt: 'Automations project image 4' },
      { src: '/images/automations/5.png', alt: 'Automations project image 5' },
      { src: '/images/automations/6.png', alt: 'Automations project image 6' },
      { src: '/images/automations/7.png', alt: 'Automations project image 7' },
      { src: '/images/automations/8.png', alt: 'Automations project image 8' },
    ],
  },
  {
    title: 'Mobile App',
    description:
      'A mobile companion app concept for students to check schedules, announcements, and academic records on the go, designed with a componentized, cross-platform front end.',
    stack: ['', '', ''],
    liveUrl: '#',
    repoUrl: '#',
    previewCards: [
      {
        style: 'dark',
        label: 'REACT NATIVE • CROSS-PLATFORM',
        labelColor: '#34D399',
        accent: '#60A5FA',
        headline: 'Student Schedule View',
        sub: 'Daily class timetable with real-time room changes.',
        footerLeft: 'student.app',
        footerRight: 'Mobile App',
        footerRightStyle: 'amber',
        image: '/images/mobile/Cartly.png',
      },
      {
        style: 'warm',
        dots: ['#60A5FA', '#FBBF24', '#34D399'],
        brand: 'ANNOUNCEMENTS',
        headline: 'Campus News Feed',
        sub: 'Push notifications for events and bulletins.',
        footerLeft: 'news.student.app',
        footerRight: 'Mobile App',
        footerRightStyle: 'blue',
        image: '/images/mobile/FleetFlow.jpg',
      },
      {
        style: 'light',
        label: 'RECORDS',
        headline: 'Academic Portal',
        sub: 'Grades, enrollment, and transcript on the go.',
        footerLeft: 'records.student.app',
        footerRight: 'Mobile App',
        footerRightStyle: 'cyan',
        image: '/images/mobile/Rescue.png',
      },
    ],
  },
  {
    title: 'Capstone',
    description:
      'A full-stack capstone system for managing student records, enrollment, and academic data - built and delivered end-to-end with a team as a final-year requirement.',
    stack: ['', '', '', ''],
    liveUrl: '#',
    repoUrl: '#',
    // Real screenshots (same files as CapstoneModal.jsx). Add or remove
    // entries here and the tile picks it up automatically.
    images: [
      { src: '/images/capstone/n.png', alt: 'Student Records System screenshot' },
      { src: '/images/capstone/j.png', alt: 'Registration Module screenshot' },
    ],
  },
];

// Shared tiny icons

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-2">
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 text-[#263BAA] text-xs font-bold uppercase tracking-wider mb-3">
      <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
      Featured Work
    </div>
    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#0A1629] tracking-tight leading-tight">
      Selected <span className="text-[#263BAA]">{title}</span>
    </h1>
    {subtitle && <p className="text-sm sm:text-base text-[#64748B] font-medium mt-1.5">{subtitle}</p>}
  </div>
);

const ProjectsFolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FF6B00" viewBox="0 0 256 256">
    <path d="M216,72H130.67L102.94,52.2a15.86,15.86,0,0,0-9.4-3.2H40A16,16,0,0,0,24,64V192.13A15.89,15.89,0,0,0,39.87,208h176.4A15.75,15.75,0,0,0,232,192.19V88A16,16,0,0,0,216,72ZM40,64H93.54l19.15,13.68a8.06,8.06,0,0,0,4.64,1.32H216v8H40Zm176,128H40V96H216V192Z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FF6B00" viewBox="0 0 256 256">
    <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"></path>
  </svg>
);

const AutomationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FF6B00" viewBox="0 0 256 256">
    <path d="M224,64a32,32,0,1,0-40,31v17a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V95a32,32,0,1,0-16,0v17a24,24,0,0,0,24,24h40v25a32,32,0,1,0,16,0V136h40a24,24,0,0,0,24-24V95A32.06,32.06,0,0,0,224,64ZM48,64A16,16,0,1,1,64,80,16,16,0,0,1,48,64Zm96,128a16,16,0,1,1-16-16A16,16,0,0,1,144,192ZM192,80a16,16,0,1,1,16-16A16,16,0,0,1,192,80Z"></path>
  </svg>
);

const MobileAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FF6B00" viewBox="0 0 256 256">
    <path d="M239.82,114.19,72,18.16a16,16,0,0,0-16.12,0A15.68,15.68,0,0,0,48,31.87V224.13a15.68,15.68,0,0,0,7.92,13.67,16,16,0,0,0,16.12,0l167.78-96a15.75,15.75,0,0,0,0-27.62ZM64,212.67V43.33L148.69,128Zm96-73.36,18.92,18.92-88.5,50.66ZM90.4,47.1l88.53,50.67L160,116.69ZM193.31,150l-22-22,22-22,38.43,22Z"></path>
  </svg>
);

const CapstoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FF6B00" viewBox="0 0 256 256">
    <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z"></path>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-3 h-3 stroke-[2.75] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-[#FF6B00]"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const CodeIcon = () => (
  <svg
    className="w-3 h-3 stroke-[2.5] text-[#263BAA]"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CardArrowButton = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#263BAA] hover:bg-[#263BAA] hover:text-white hover:shadow-md transition-all duration-200 opacity-0 group-hover/card:opacity-100 group-focus-within/card:opacity-100 shrink-0 cursor-pointer"
  >
    <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 stroke-[2.75]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  </button>
);

// Mini preview card matching modern outline-free aesthetic styles.
const footerBadgeClass = {
  amber: 'bg-orange-500/20 text-orange-300',
  blue: 'bg-blue-50 text-[#263BAA]',
  cyan: 'bg-cyan-950 text-cyan-300',
};

const MiniPreviewCard = ({ card }) => {
  const badge = footerBadgeClass[card.footerRightStyle] ?? 'bg-slate-100 text-slate-600';
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

  if (card.style === 'dark') {
    return (
      <div className="w-full rounded-xl bg-slate-900/95 p-2.5 shadow-sm flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5 text-[7.5px] font-mono" style={{ color: card.labelColor || '#60A5FA' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: card.accent || '#FF6B00' }} />
            <span className="font-bold tracking-wide">{card.label}</span>
          </div>
          <span className="text-slate-400 font-mono text-[7px]">{dateStr}</span>
        </div>
        <div className="my-1.5">
          <h4 className="text-[10.5px] font-bold text-white tracking-tight leading-tight">{card.headline}</h4>
          <p className="text-[8px] text-slate-400 line-clamp-1 mt-0.5">{card.sub}</p>
        </div>
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80">
          <span className="font-mono text-slate-300 text-[7px]">{card.footerLeft}</span>
          <span className={`px-1.5 py-0.5 rounded-md text-[7px] font-bold ${badge}`}>{card.footerRight}</span>
        </div>
      </div>
    );
  }

  if (card.style === 'warm') {
    return (
      <div className="w-full rounded-xl bg-white p-2.5 shadow-xs flex flex-col justify-between overflow-hidden">
        <div className="flex items-center pb-1.5 border-b border-slate-100 gap-1.5">
          {(card.dots || ['#FF6B00', '#FBBF24', '#34D399']).map((c, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
          <span className="text-[7.5px] text-slate-500 font-sans tracking-wider uppercase ml-1">
            <span className="text-[#263BAA] font-bold">{card.brand}</span>
          </span>
        </div>
        <div className="my-1.5 bg-slate-50/80 rounded-lg p-1.5">
          <p className="text-[10px] font-bold text-slate-900 truncate">{card.headline}</p>
          <p className="text-[8px] text-slate-600 line-clamp-1 mt-0.5">{card.sub}</p>
        </div>
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
          <span className="font-mono text-[7px] text-slate-600 flex items-center gap-1">
            <i className="ph-bold ph-browsers text-orange-500" /> {card.footerLeft}
          </span>
          <span className={`px-1.5 py-0.5 rounded-md text-[7px] font-bold ${badge}`}>{card.footerRight}</span>
        </div>
      </div>
    );
  }

  // light style
  return (
    <div className="w-full rounded-xl bg-slate-100/80 p-2.5 shadow-2xs flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[7.5px] text-slate-600 font-sans tracking-wide font-bold">{card.label}</span>
        </div>
        <span className="text-slate-400 font-mono text-[7px]">{dateStr}</span>
      </div>
      <div className="my-1.5">
        <h4 className="text-[10.5px] font-bold text-slate-800 tracking-tight leading-tight">{card.headline}</h4>
        <p className="text-[8px] text-slate-500 line-clamp-1 mt-0.5">{card.sub}</p>
      </div>
      <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60">
        <span className="text-slate-500 font-mono text-[7px] flex items-center gap-1">
          <i className="ph-bold ph-brackets-curly text-[#263BAA]" /> {card.footerLeft}
        </span>
        <span className={`px-1.5 py-0.5 rounded-md text-[7px] font-bold ${badge}`}>{card.footerRight}</span>
      </div>
    </div>
  );
};

// ---- Image loading helper ----
// If an image fails to load, try the same file name with the other common extensions
// (png / jpg / jpeg / webp), so switching a file from .png to .jpg never breaks a marquee.
// Only when every option fails does the caller show its "Image not found" tile.
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

// One image in the marquee. If the file path is wrong, it shows a tile that names the missing file.
const MarqueeImage = ({ image }) => {
  const { current, onError } = useImageWithFallback(image.src);

  if (!current) {
    return (
      <div className="h-full w-80 sm:w-[36rem] rounded-2xl bg-white/10 flex items-center justify-center px-6 text-center text-sm font-medium text-white/70">
        Image not found: {image.src}
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={image.alt || ''}
      draggable={false}
      onError={onError}
      className="h-full w-auto max-w-none rounded-2xl"
    />
  );
};

// Popup with a right-to-left image marquee. Opens when a project with `images` is clicked.
const ImageMarqueeModal = ({ project, onClose }) => {
  const isOpen = Boolean(project);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const images = project.images || [];
  const loop = [...images, ...images, ...images, ...images];
  const duration = Math.max(30, images.length * 20);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1629]/75 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} images`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        autoFocus
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white hover:text-[#0A1629] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg className="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <div
        className="automation-marquee-viewport relative w-full overflow-hidden h-[60vh] sm:h-[72vh] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="automation-marquee-track flex flex-row items-center w-max h-full"
          style={{ animationDuration: `${duration}s` }}
        >
          {loop.map((image, idx) => (
            <div key={idx} className="shrink-0 h-full mr-4">
              <MarqueeImage image={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Real screenshot thumb for a bento tile's vertical marquee (Website, Capstone).
// If the file is missing, a small tile names the path it expected.
const TileScreenshot = ({ image }) => {
  const { current, onError } = useImageWithFallback(image.src);

  if (!current) {
    return (
      <div className="w-full aspect-video rounded-xl bg-slate-200/70 flex items-center justify-center px-3 text-center text-[9px] leading-tight font-medium text-slate-500 break-all">
        {image.src ? `Image not found: ${image.src}` : 'No image set'}
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={image.alt || ''}
      draggable={false}
      onError={onError}
      className="w-full aspect-video object-cover rounded-xl shadow-sm"
    />
  );
};

// Plain image for the Mobile App tile marquee (no frame or bezel).
// Height comes from the tile (h-full); width follows the image's own aspect ratio.
// If the file is missing, a small tile names the path it expected.
const MobileMarqueeImage = ({ card, className = '' }) => {
  const { current, onError } = useImageWithFallback(card.image);

  if (!current) {
    return (
      <div
        className={`shrink-0 h-full w-24 rounded-xl bg-slate-200/70 flex items-center justify-center px-2 text-center text-[8px] leading-tight font-medium text-slate-500 break-all ${className}`}
      >
        {card.image ? `Image not found: ${card.image}` : 'No image set'}
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={card.alt || card.headline || ''}
      draggable={false}
      onError={onError}
      className={`shrink-0 h-full w-auto max-w-none rounded-xl ${className}`}
    />
  );
};

// Mobile App tile marquee speed, in pixels per second. Higher = faster.
// (The Automations image popup runs at roughly 90-115 px/s.)
const MOBILE_MARQUEE_SPEED = 100;

// The scrolling strip of images for the Mobile App tile.
// The loop duration is worked out from the strip's real width, so the speed stays the same
// no matter how many screenshots there are or how wide they are (a fixed duration would make
// short strips of small images crawl).
const MobileMarqueeTrack = ({ items }) => {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(24); // seconds; replaced once the width is known

  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const update = () => {
      const half = el.offsetWidth / 2; // the loop moves exactly half of the strip
      if (half > 0) setDuration(half / MOBILE_MARQUEE_SPEED);
    };

    update();
    const observer = new ResizeObserver(update); // fires again as images finish loading
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={trackRef}
      className="animate-mobile-marquee-left flex flex-row items-center w-max h-full py-2"
      style={{ animationDuration: `${duration}s` }}
    >
      {items.map((card, idx) => (
        <MobileMarqueeImage key={idx} card={card} className="mr-2.5" />
      ))}
    </div>
  );
};

// ---- Website Image Marquee Modal ----
// Loops whatever is in project.images. Add/remove screenshots there and this
// grows or shrinks automatically — nothing here needs to change.
const buildMarqueeCards = (project) => {
  if (!project) return [];
  const src = project.images || [];
  if (!src.length) return [];
  const loop = [];
  while (loop.length < 8) loop.push(...src);
  return [...loop, ...loop];
};

// Plain real screenshot, no fake browser chrome or mock copy.
// If the file is missing, the frame stays and names the file it expected.
const MarqueeSiteCard = ({ card }) => {
  const { current, onError } = useImageWithFallback(card.src);

  return (
    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-800/70 shadow-xl">
      {current ? (
        <img
          src={current}
          alt={card.alt || ''}
          draggable={false}
          onError={onError}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-slate-300">
          {card.src ? `Image not found: ${card.src}` : 'No image set for this card'}
        </div>
      )}
    </div>
  );
};

const WebsiteMarqueeModal = ({ project, onClose }) => {
  const isOpen = Boolean(project);
  const loop = useMemo(() => buildMarqueeCards(project), [project]);
  const duration = Math.max(28, (loop.length / 2) * 14);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1629]/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        autoFocus
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white hover:text-[#0A1629] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg className="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur text-white/80 text-[10px] font-bold uppercase tracking-wider select-none pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
        {project.title} — Screenshots
      </div>

      <div
        className="website-marquee-viewport relative w-full overflow-hidden select-none py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="website-marquee-track flex flex-row items-center"
          style={{ animationDuration: `${duration}s`, width: 'max-content' }}
        >
          {loop.map((card, idx) => (
            <div key={idx} className="shrink-0 mr-6 w-[80vw] sm:w-[560px] lg:w-[680px]">
              <MarqueeSiteCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bento-style project card
const BentoProjectCard = ({ project, onOpenModal, onOpenImages, onOpenWebsiteMarquee, onOpenCapstone }) => {
  const isMobileApp = project.title === 'Mobile App';
  const isWebsite = project.title === 'Website';
  const isAutomations = project.title === 'Automations';
  const isCapstone = project.title === 'Capstone';
  const hasImages = Boolean(project.images && project.images.length);
  const primaryUrl = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : project.repoUrl;

  const handleCardClick = () => {
    if (isMobileApp) {
      if (onOpenModal) onOpenModal();
      return;
    }
    if (isWebsite) {
      if (onOpenWebsiteMarquee) onOpenWebsiteMarquee(project);
      return;
    }
    if (isCapstone) {
      if (onOpenCapstone) onOpenCapstone();
      return;
    }
    if (hasImages) {
      if (onOpenImages) onOpenImages(project);
      return;
    }
    if (primaryUrl && primaryUrl !== '#') {
      window.open(primaryUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const marqueeItems = project.previewCards
    ? [...project.previewCards, ...project.previewCards, ...project.previewCards, ...project.previewCards]
    : [];

  // Real screenshots for tiles that use project.images (Website, Capstone, Automations),
  // looped for a seamless scroll. Add/remove images in the project data and this follows.
  const tileImages = project.images
    ? [...project.images, ...project.images, ...project.images, ...project.images]
    : [];

  return (
    <article
      onClick={handleCardClick}
      className="group group/card relative bg-slate-50/60 hover:bg-white rounded-[26px] p-3.5 xl:p-4.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 hover:z-20 transition-all duration-300 ease-out flex flex-col justify-between min-h-0 overflow-hidden cursor-pointer"
      style={{ height: '280px' }}
    >
      <div className="absolute top-3.5 right-3.5 z-30">
        <CardArrowButton
          label={`Open ${project.title}`}
          onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
        />
      </div>

      <div className="w-full h-full flex flex-row gap-3.5 min-h-0 relative overflow-hidden">

        {/* LEFT panel */}
        <div className="w-5/12 flex flex-col justify-between h-full min-h-0 shrink-0 z-10 p-1">
          <div>
            <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-2.5">
              {isMobileApp ? <MobileAppIcon /> : isWebsite ? <WebsiteIcon /> : isAutomations ? <AutomationsIcon /> : isCapstone ? <CapstoneIcon /> : <ProjectsFolderIcon />}
            </div>
            <h3 className="text-base xl:text-lg font-black text-[#0A1629] tracking-tight leading-tight mb-1">
              {project.title}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium leading-snug line-clamp-4">
              {project.description}
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.stack.map((tag, j) => (
                <span key={j} className="text-[9.5px] font-semibold text-[#263BAA] bg-blue-50/80 hover:bg-blue-100/70 transition-colors rounded-lg px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
              {isMobileApp ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenModal) onOpenModal();
                  }}
                  className="group/link inline-flex items-center gap-1 text-[10px] font-bold text-[#263BAA] hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  View Apps <ExternalLinkIcon />
                </button>
              ) : isWebsite ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenWebsiteMarquee) onOpenWebsiteMarquee(project);
                  }}
                  className="group/link inline-flex items-center gap-1 text-[10px] font-bold text-[#263BAA] hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  View Sites <ExternalLinkIcon />
                </button>
              ) : isCapstone ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenCapstone) onOpenCapstone();
                  }}
                  className="group/link inline-flex items-center gap-1 text-[10px] font-bold text-[#263BAA] hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  View Details <ExternalLinkIcon />
                </button>
              ) : hasImages ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenImages) onOpenImages(project);
                  }}
                  className="group/link inline-flex items-center gap-1 text-[10px] font-bold text-[#263BAA] hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  View Images <ExternalLinkIcon />
                </button>
              ) : (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/link inline-flex items-center gap-1 text-[10px] font-bold text-[#263BAA] hover:text-[#FF6B00] transition-colors"
                >
                  Live Demo <ExternalLinkIcon />
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/link inline-flex items-center gap-1 text-[10px] font-bold text-[#0A1629] hover:text-[#263BAA] transition-colors"
              >
                <CodeIcon /> Source
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT panel */}
        <div className="w-7/12 h-full relative min-h-0 overflow-hidden rounded-[20px] bg-slate-100/60 p-1 flex flex-col select-none shadow-2xs">
          {isMobileApp ? (
            <>
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-slate-100/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-slate-100/80 to-transparent z-20 pointer-events-none" />
            </>
          ) : (
            <>
              <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-slate-100/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-100/80 to-transparent z-20 pointer-events-none" />
            </>
          )}

          <div className="relative overflow-hidden w-full h-full">
            {isMobileApp ? (
              <MobileMarqueeTrack items={marqueeItems} />
            ) : isWebsite || isCapstone || isAutomations ? (
              <div className="animate-marquee-up flex flex-col gap-2.5 p-1.5" style={{ animationDuration: '28s' }}>
                {tileImages.map((image, idx) => (
                  <div key={idx} className="shrink-0 w-full">
                    <TileScreenshot image={image} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-marquee-up flex flex-col gap-2.5 p-1.5" style={{ animationDuration: '24s' }}>
                {marqueeItems.map((card, idx) => (
                  <div key={idx} className="shrink-0 w-full">
                    <MiniPreviewCard card={card} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};

const Projects = ({ onNavigate } = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCapstoneOpen, setIsCapstoneOpen] = useState(false);
  const [imageProject, setImageProject] = useState(null);
  const [websiteMarqueeProject, setWebsiteMarqueeProject] = useState(null);

  return (
    <>
      <style>{`
        .main-card-shadow {
          box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.08), 0 10px 30px -10px rgba(15, 23, 42, 0.04);
        }

        @keyframes mobile-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-mobile-marquee-left {
          animation: mobile-marquee-left 24s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-mobile-marquee-left { animation: none; }
        }

        @keyframes automation-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .automation-marquee-track {
          animation: automation-marquee-left 60s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .automation-marquee-track { animation: none; }
          .automation-marquee-viewport { overflow-x: auto; }
        }

        @keyframes website-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .website-marquee-track {
          animation: website-marquee-left linear infinite;
          will-change: transform;
        }
        .website-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .website-marquee-track { animation: none; }
          .website-marquee-viewport { overflow-x: auto; }
        }
      `}</style>

      <div className="relative w-full">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        <main className="relative z-10 w-full min-h-screen py-12 px-3 sm:px-5 lg:px-8 xl:px-10 flex flex-col">
          <section className="flex-1 bg-white rounded-[32px] main-card-shadow overflow-hidden relative flex flex-col">
            <div className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col gap-10">
              <SectionHeading
                title="Projects"
                subtitle="A selection of things I've built."
              />

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                {projects.map((project, i) => (
                  <BentoProjectCard
                    key={i}
                    project={project}
                    onOpenModal={() => setIsModalOpen(true)}
                    onOpenCapstone={() => setIsCapstoneOpen(true)}
                    onOpenImages={setImageProject}
                    onOpenWebsiteMarquee={setWebsiteMarqueeProject}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <CapstoneModal
        isOpen={isCapstoneOpen}
        onClose={() => setIsCapstoneOpen(false)}
      />

      <ImageMarqueeModal
        project={imageProject}
        onClose={() => setImageProject(null)}
      />

      <WebsiteMarqueeModal
        project={websiteMarqueeProject}
        onClose={() => setWebsiteMarqueeProject(null)}
      />
    </>
  );
};

export default Projects;