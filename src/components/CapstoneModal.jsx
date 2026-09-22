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
    fullDescription:
      'The Microfinance Administrative System is a centralized web application designed to help microfinance organizations manage administrative activities and maintain organized client and visitor records. The system provides tools for managing administrative information, monitoring daily activities, and maintaining accurate records through a structured digital platform. One of its key features is a QR code-based visitor management system, allowing visitors to quickly register by scanning a QR code using their mobile device. This reduces manual registration, improves data accuracy, and provides administrators with a convenient way to monitor and review visitor records. The project demonstrates the practical application of web development, database management, QR code technology, and administrative workflow automation in an organizational environment.',
    gradient: 'from-blue-50/70 via-indigo-50/50 to-sky-50/80',
    badges: [
      { primary: 'PHP', subtitle: 'BACKEND' },
      { primary: 'MySQL', subtitle: 'DATABASE' },
      { primary: 'HTML5', subtitle: 'FRONTEND' },
      { primary: 'CSS3', subtitle: 'STYLING' },
      { primary: 'Bootstrap', subtitle: 'FRAMEWORK' },
      { primary: 'Hostinger', subtitle: 'HOSTING' },
      { primary: 'JSON', subtitle: 'DATA' },
      { primary: 'RESTful APIs', subtitle: 'INTEGRATION' },
    ],
    image: { src: '/images/capstone/n.png', alt: 'Student Records System screenshot' },
    repository: 'https://github.com/jeanmarcaguilar/Admin',
    gallery: [
      { src: '/images/capstone/n2.png', alt: 'Dashboard view' },
      { src: '/images/capstone/n3.png', alt: 'Client management' },
      { src: '/images/capstone/n4.png', alt: 'QR code system' },
    ],
    keyFeatures: [
      'QR Code Visitor Registration — Allows visitors to quickly register by scanning a QR code using their mobile device, reducing manual data entry and making the registration process faster and more convenient.',
      'Administrative & Client Record Management — Provides administrators with organized tools for managing client information, visitor records, and other important administrative data within a centralized system.',
      'Visitor Monitoring & Activity Tracking — Maintains digital records of visitor activities and registration history, enabling administrators to easily monitor daily visits, review records, and maintain accurate organizational data.',
    ],
  },
  {
    id: 'enrollment',
    title: 'SJDM-Local Tour Guide & Booking System',
    badge: 'Back-End',
    badgeTheme: 'bg-purple-600/90 text-white',
    tagline: 'Discover SJDM. Explore More. Experience Local.',
    taglineColor: 'text-purple-600',
    description:
      'SJDM Local Tour Guide & Booking System is a web-based tourism platform designed to help visitors discover local attractions, explore tour destinations, and conveniently book local tour services in San Jose del Monte.',
    fullDescription:
      'SJDM Local Tour Guide & Booking System is a tourism-focused web application developed to provide visitors with a convenient way to discover attractions, explore local destinations, and arrange guided tours within San Jose del Monte. The platform organizes information about tourist spots, local tour guides, available schedules, and booking services into a centralized digital system. Visitors can browse destinations, view tour details, select available schedules, and submit booking requests through an intuitive interface. On the administrative side, the system provides tools for managing destinations, tour guides, schedules, bookings, and visitor information. The project demonstrates how web technology can be used to support local tourism while improving the organization and accessibility of tour-related services',
    gradient: 'from-purple-50/70 via-fuchsia-50/40 to-pink-50/60',
    badges: [
      { primary: 'PHP', subtitle: 'BACKEND' },
      { primary: 'HTML5', subtitle: 'FRONTEND' },
      { primary: 'CSS3', subtitle: 'STYLING' },
      { primary: 'JavaScript', subtitle: 'INTERACTIVITY' },
      { primary: 'Hostinger', subtitle: 'HOSTING' },
      { primary: 'RESTful APIs', subtitle: 'INTEGRATION' },
    ],
    image: { src: '/images/capstone/j.jpg', alt: 'Registration Module screenshot' },
    repository: 'https://github.com/christianbacay042504-coder/coderistyarn2',
    gallery: [
      { src: '/images/capstone/j2.jpg', alt: 'Tour destinations' },
      { src: '/images/capstone/j3.jpg', alt: 'Booking interface' },
      { src: '/images/capstone/j4.jpg', alt: 'Guide profiles' },
    ],
    keyFeatures: [
      'Tourist Destination & Guide Directory — Provides visitors with organized information about local attractions, destinations, tour guides, and available tour services, making it easier to explore and discover places within San Jose del Monte.',
      'Tour Schedule & Booking Management — Allows visitors to browse available tour schedules, view tour details, select preferred dates, and submit booking requests through a convenient and user-friendly interface.',
      'Administrative Management & Booking Tracking — Enables administrators to manage destinations, tour guides, schedules, visitor information, and booking requests while keeping tourism-related records organized and accessible.',
    ],
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

// Gallery image component with fallback support
const GalleryImage = ({ image, className }) => {
  const { current, onError } = useImageWithFallback(image?.src);

  if (!current) {
    return (
      <div className={`${className} flex items-center justify-center px-4 text-center text-xs font-medium text-slate-500/80 bg-slate-100`}>
        {image?.src ? `Image not found` : 'No image'}
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={image.alt || ''}
      draggable={false}
      onError={onError}
      className={className}
    />
  );
};

const CapstoneModal = ({ isOpen, onClose }) => {
  const [selectedModule, setSelectedModule] = React.useState(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Lock body scroll while open, and close on Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedModule) {
          setSelectedModule(null);
          setCurrentImageIndex(0);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, selectedModule]);

  // Reset image index when switching modules
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedModule]);

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
            {selectedModule ? (
              // Detailed Overview View
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <button
                  onClick={() => {
                    setSelectedModule(null);
                    setCurrentImageIndex(0);
                  }}
                  className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <span className="text-lg">←</span>
                  <span>Back to overview</span>
                </button>

                <div className="bg-white rounded-[28px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
                  {/* Large Preview Banner */}
                  <div
                    className={`h-80 sm:h-96 xl:h-112.5 relative bg-linear-to-br ${selectedModule.gradient} overflow-hidden`}
                  >
                    {/* Status Glass Pill */}
                    <span
                      className={`absolute top-4 right-4 z-20 ${selectedModule.badgeTheme} backdrop-blur-md text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm`}
                    >
                      {selectedModule.badge}
                    </span>

                    {/* Real screenshot - switches between main image and gallery images */}
                    <ModuleImage
                      image={
                        currentImageIndex === 0
                          ? selectedModule.image
                          : selectedModule.gallery?.[currentImageIndex - 1]
                      }
                    />

                    {/* Navigation dots */}
                    {selectedModule.gallery && selectedModule.gallery.length > 0 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        <button
                          onClick={() => setCurrentImageIndex(0)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndex === 0 ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                        {selectedModule.gallery.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index + 1)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              currentImageIndex === index + 1 ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Detailed Content */}
                  <div className="p-8 sm:p-10 lg:p-12">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
                      {selectedModule.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base font-semibold ${selectedModule.taglineColor} mb-6 leading-snug`}
                    >
                      {selectedModule.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                      {selectedModule.fullDescription || selectedModule.description}
                    </p>

                    {/* Technology Stack */}
                    <div className="mb-8">
                      <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedModule.badges.map((b, i) => (
                          <div
                            key={i}
                            className="bg-slate-50/90 rounded-2xl px-4 py-3 flex flex-col items-center justify-center min-w-25"
                          >
                            <span className="text-sm font-bold text-slate-800 leading-tight">
                              {b.primary}
                            </span>
                            <span className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase mt-1">
                              {b.subtitle}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View Repository Button */}
                    {selectedModule.repository && (
                      <div className="mb-8">
                        <a
                          href={selectedModule.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                            selectedModule.id === 'records'
                              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
                              : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/25'
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          View Repository
                        </a>
                      </div>
                    )}

                    {/* Image Gallery */}
                    {selectedModule.gallery && selectedModule.gallery.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">
                          Project Gallery
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedModule.gallery.map((img, index) => (
                            <div
                              key={index}
                              className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-sm group cursor-pointer"
                              onClick={() => setCurrentImageIndex(index)}
                            >
                              <GalleryImage
                                image={img}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Features Section */}
                    <div className="bg-slate-50/70 rounded-2xl p-6">
                      <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {selectedModule.keyFeatures?.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                                selectedModule.id === 'records' ? 'bg-blue-500' : 'bg-purple-500'
                              }`}
                            ></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {capstoneModules.map((mod) => (
                  <article
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    className="group bg-white rounded-[28px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    {/* Top Preview Banner */}
                    <div
                      className={`h-64 sm:h-76 xl:h-80 relative bg-linear-to-br ${mod.gradient} overflow-hidden`}
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
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CapstoneModal;