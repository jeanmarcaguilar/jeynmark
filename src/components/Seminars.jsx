import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import seminar1Cover from '../assets/For Seminar 1.png';
import seminar2Cover from '../assets/images/For Seminar-2.png';
// TODO: add these certificate images (or change the paths) before running
import seminar1Certificate from '../assets/Seminar-1.png';
import seminar2Certificate from '../assets/images/Seminar-2.png';
import cert1Cover from '../assets/images/Cert1.png';
import cert1Image from '../assets/images/For Cert 1.png';
import cert2Cover from '../assets/images/Cert2.png';
import cert2Image from '../assets/images/for cert2.jpg';

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
    <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
  </svg>
);

const PresentationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h20" />
    <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
    <path d="m7 21 5-5 5 5" />
  </svg>
);

const AwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

// ---------- DATA ----------

// Optional fields you can add to any seminar or certificate:
//   overview  - the full text shown in the popup: a string (blank line = new paragraph) or an
//               array of paragraphs. Falls back to `description`.
//   readTime  - minutes for the "min read" label (worked out from the overview if left out)
//   role      - word before the organizer in the popup's author row ("Attendee" / "Recipient")
//   verifyUrl - adds a "Verify" link in the certificate viewer
// Seminars can also take `certificate` (an imported image) for their "View certificate" button,
// and an optional `credentialId`. Until a seminar has one, the button says it isn't added yet.
const seminars = [
  {
    image: seminar1Cover,
    certificate: seminar1Certificate,
    date: 'November 2024',
    title: 'Quantum Computing: Breaking The Limits. Generative AI & its Application',
    organizer: 'Tech Summit Philippines',
    description: 'Explored scalable web architecture, serverless integrations, and best practices for building responsive, high-performance applications.',
    overview: 'The accelerated convergence of decentralized Web3 frameworks and spatial computing is redefining how users interact with digital environments and immersive applications. Throughout this interactive showcase, visionaries explored how theoretical spatial design principles can transform user engagement and bridge physical realities with virtual workspaces. Although widespread adoption of fully immersive hardware is still unfolding, creators can immediately leverage modular design systems and cross-platform compatibility standards to build future-ready, deeply engaging experiences. Crucial strategies highlighted included integrating real-time telemetry, deploying secure decentralized identity verification protocols, and engineering high-performance edge computing nodes to deliver zero-latency experiences globally.',
    tags: ['Cloud Computing', 'Web Engineering', 'API Design'],
  },
  {
    image: seminar2Cover,
    certificate: seminar2Certificate,
    date: 'April 2023',
    title: 'BITZ 2023: Accelerating the Innovators Role in Digital Transformation',
    organizer: 'IT Conference & Academic Forum',
    description: 'Deep-dived into relational database indexing, RESTful API security, and modern full-stack performance tuning.',
    overview: 'BITZ 2023 acted as a strategic catalyst highlighting how digital changemakers drive systemic reform across public sector administration, community infrastructure, and civic technology. Panels and collaborative workshops emphasized the empowering duty of modern technologists to dismantle bureaucratic bottlenecks using cloud-native infrastructures, transparent citizen engagement portals, and data-driven policy design—frameworks that directly shaped subsequent grassroots prototypes and municipal digital transformation initiatives.',
    tags: ['MySQL', 'Database Design', 'Security'],
  },
];

// TODO: replace the placeholder text below with your real certificates
const certificates = [
  {
    image: cert1Cover,
    certificate: cert1Image,
    date: 'Sept 04, 2025 - October 31, 2025',
    title: 'Information Management in the Digital Age',
    issuer: 'Singapore Institute of Multidisciplinary Professions & Bestlink College of the Philippines',
    description: 'A collaborative initiative bridging academic theory and corporate execution in data governance, infrastructure security, and automated workflows.',
    overview: [
      'The Information Management in the Digital Age certificate program is a collaborative initiative by the Singapore Institute of Multidisciplinary Professions and Bestlink College of the Philippines, designed to bridge the gap between academic theory and corporate execution. This comprehensive program focuses on data governance, infrastructure security, and automated workflows, preparing professionals for the evolving digital landscape.',
      'Featured Industry Expert: Marc Tonido',
      'A technical leader with over twenty years of experience in software engineering, global development management, and architecture across various high-growth sectors. He holds a Bachelor of Science in Computer Science from the University of the Philippines Visayas.',
      'Core Program Modules & Learning Outcomes',
      '1. Artificial Intelligence Fundamentals & Impact',
      'Covers foundational concepts of machine learning models, algorithms, and AI\'s role in reshaping industry standards and large-scale information processing.',
      '2. Practical AI Trends and Tools',
      'Explores cutting-edge AI technologies and strategies for integrating intelligent automation into professional workflows and business operations.',
      '3. Applied Python Programming',
      'Hands-on implementation of Python for building, scaling, and powering AI applications.',
      '4. Enterprise Cybersecurity',
      'Focuses on comprehensive defense strategies to protect digital infrastructure and enterprise assets against cyber threats.',
      '5. Cloud Security and Compliance',
      'Specializes in navigating security challenges, regulatory compliance standards, and risk mitigation in multi-tenant cloud environments.',
      '6. Web Application Security',
      'Provides advanced training on safeguarding web platforms, mitigating vulnerabilities, neutralizing injection flaws, and defending against common digital attack vectors.',
    ],
    tags: ['Artificial Intelligence', 'Cybersecurity', 'Cloud Security', 'Python Programming'],
  },
  {
    image: cert2Cover,
    certificate: cert2Image,
    date: 'May 06, 2026',
    title: 'Bachelor of Science in Information Technology',
    issuer: 'Bestlink College of the Philippines',
    description: 'Graduated with a Bachelor of Science in Information Technology degree, completing all academic requirements for the program.',
    overview: [
      'Beyond celebrating the completion of coursework, a graduation ceremony embodies the profound transformation from dedicated students into capable, forward-thinking professionals equipped to shape tomorrow\'s industries.',
      'The 25th Commencement Exercises of the Bestlink College of the Philippines, held on May 06, 2026, at the historic Fiesta Pavillion Hall of the Manila Hotel, united graduates, families, faculty, and institutional leaders in a powerful celebration. Guided by the inspiring theme "One Together: Stronger as One, Rising Above Challenges," the ceremony served as a testament to the collective grit, solidarity, and relentless determination of the graduating batch.',
      'As these emerging professionals transition into fast-paced corporate and technological environments, they carry forward the enduring principles of excellence and perseverance instilled by Bestlink College of the Philippines, poised to drive meaningful innovation in their respective careers.',
    ],
    tags: ['Information Technology', 'Software Development', 'Web Development'],
  },
];

// ---------- SECTION HEADER ----------
// Icon + title + short description, always placed above its cards.

const SectionHeader = ({ icon, title, subtitle, count, accent }) => (
  <div className="flex items-center gap-4">
    <div
      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
        accent === 'orange' ? 'bg-orange-50 text-[#FF6B00]' : 'bg-blue-50 text-[#263BAA]'
      }`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <div className="flex items-center gap-2.5">
        <h2 className="text-xl sm:text-2xl font-black text-[#0A1629] tracking-tight">{title}</h2>
        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5">
          {count}
        </span>
      </div>
      <p className="text-sm text-[#64748B] font-medium mt-0.5">{subtitle}</p>
    </div>
  </div>
);

// ---------- CARD HELPERS ----------
// The card title is the card's real <button>; its ::after stretches over the whole card, so the
// entire card opens the overview popup. The "View certificate" button sits above that layer
// (relative z-10) and opens the certificate viewer instead.
const CARD_OPEN_CLASS =
  "text-left cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263BAA]/50 after:content-[''] after:absolute after:inset-0";

const VIEW_BTN_CLASS =
  'relative z-10 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#263BAA] hover:bg-[#FF6B00] text-white text-xs font-bold py-2.5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263BAA]/40 focus-visible:ring-offset-2';

// The viewer takes one shape for both lists.
const viewerFromSeminar = (s) => ({
  title: s.title,
  issuer: s.organizer,
  meta: `Attended ${s.date}`,
  image: s.certificate, // optional - see the note above the seminars list
  credentialId: s.credentialId,
  verifyUrl: s.verifyUrl,
});

const viewerFromCertificate = (c) => ({ ...c, image: c.certificate, meta: `Issued ${c.date}` });

// ---------- POPUP HELPERS ----------
// Shown in the popup's author row. The name was taken from your reference screenshot - edit it here.
// Set `avatar` to an imported photo to show it instead of the initials.
const PROFILE = { name: 'Jean Marc Aguilar', avatar: '/jims.png' };

const MONTHS = {
  Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April', May: 'May', Jun: 'June',
  Jul: 'July', Aug: 'August', Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
};
// 'Oct 2025' -> 'October 2025' (anything else is left as you typed it)
const fullDate = (d) => String(d).replace(/^([A-Za-z]{3})\b/, (m) => MONTHS[m] || m);

// string with blank lines, or an array -> clean list of paragraphs
const toParagraphs = (v) =>
  (Array.isArray(v) ? v : String(v || '').split(/\n\s*\n/)).map((p) => String(p).trim()).filter(Boolean);

// ~200 words per minute, never less than 1
const readMinutes = (paragraphs) =>
  Math.max(1, Math.ceil(paragraphs.join(' ').split(/\s+/).filter(Boolean).length / 200));

const initials = (name) => {
  const words = name.split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  const last = words.length > 1 ? words[words.length - 1] : '';
  return (words[0][0] + (last ? last[0] : '')).toUpperCase();
};

// ---------- SHARED DIALOG BEHAVIOUR ----------
// Esc closes, page scroll is locked, focus moves into the dialog and stays there,
// then returns to whatever opened it.

const useDialog = (isOpen, onClose) => {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const trigger = document.activeElement;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    // lock page scroll without the layout jumping when the scrollbar disappears
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    if (closeRef.current) closeRef.current.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (trigger && typeof trigger.focus === 'function') trigger.focus();
    };
  }, [isOpen, onClose]);

  return { dialogRef, closeRef };
};

// ---------- OVERVIEW POPUP ----------
// Article-style popup opened by clicking a seminar or certificate card:
// date + read time, title, author row, the poster, the full overview, then "View Certificate".
// `overview` can be a string (blank line = new paragraph) or an array of paragraphs; without one
// it falls back to `description`. A long overview scrolls inside the popup.
// Rendered in a portal so it always sits above the page, whatever wraps this component.
// Width is set by max-w-lg on the panel (max-w-md = narrower, max-w-xl = wider).

const DetailModal = ({ detail, onClose, onViewCertificate }) => {
  const { dialogRef, closeRef } = useDialog(!!detail, onClose);
  if (!detail) return null;

  const { type, item } = detail;
  const isCert = type === 'certificate';
  const paragraphs = toParagraphs(item.overview || item.description);
  const minutes = item.readTime || readMinutes(paragraphs);
  const role = item.role || (isCert ? 'Recipient' : 'Attendee');
  const org = isCert ? item.issuer : item.organizer;

  return createPortal(
    <div
      className="modal-fade fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="modal-pop relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white rounded-[22px] overflow-hidden shadow-[0_30px_70px_-20px_rgba(15,23,42,0.4)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-[#FF6B00] flex items-center justify-center transition-colors cursor-pointer"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col max-h-[90vh]">
          {/* Fixed header section - always visible */}
          <div className="shrink-0 p-6 sm:p-7 pb-4">
            {/* date - read time, then the title */}
            <div className="pr-9">
              <p className="text-xs font-medium text-slate-500">
                {fullDate(item.date)}
                <span className="mx-1.5">•</span>
                {minutes} min read
              </p>
              <h3
                id="detail-modal-title"
                className="mt-2 text-xl sm:text-2xl font-bold text-[#0A1629] leading-snug tracking-tight"
              >
                {item.title}
              </h3>
            </div>

            {/* author row */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              {PROFILE.avatar ? (
                <img src={PROFILE.avatar} alt={PROFILE.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
              ) : (
                <span className="w-8 h-8 rounded-full bg-[#263BAA] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  {initials(PROFILE.name)}
                </span>
              )}
              <div className="min-w-0 leading-tight">
                <p className="text-xs font-bold text-[#0A1629]">{PROFILE.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {role} <span className="mx-0.5">•</span> {org}
                </p>
              </div>
            </div>

            {/* poster / certificate - always visible */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm bg-slate-100 mt-4 aspect-video">
              <img
                src={item.image}
                alt={isCert ? `${item.title} cover` : item.title}
                className="block w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Scrollable content section for long descriptions */}
          <div className="overflow-y-auto px-6 sm:px-7 pb-6 flex flex-col gap-4">
            {/* full overview */}
            <div className="flex flex-col gap-3.5 text-sm text-[#64748B] leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {item.credentialId && (
              <p className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <span className="text-[#FF6B00]"><CheckIcon /></span>
                <span>
                  Credential ID: <span className="font-mono text-slate-600">{item.credentialId}</span>
                </span>
              </p>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] font-semibold rounded-lg px-2.5 py-0.5 ${
                      isCert ? 'text-orange-700 bg-orange-50/80' : 'text-[#263BAA] bg-blue-50/80'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={onViewCertificate}
              className="inline-flex items-center gap-1.5 w-fit rounded text-xs font-bold text-[#0A1629] hover:text-[#FF6B00] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#263BAA]/40 focus-visible:ring-offset-2"
            >
              View Certificate
              <ArrowUpRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ---------- CERTIFICATE VIEWER ----------
// The "View certificate" button opens the certificate image at a readable size.
// Width is set by max-w-2xl on the panel (max-w-xl = smaller, max-w-4xl = larger).

const CertificateViewer = ({ cert, onClose }) => {
  const { dialogRef, closeRef } = useDialog(!!cert, onClose);
  if (!cert) return null;

  const hasFooter = cert.credentialId || cert.verifyUrl || cert.image;
  const linkClass =
    'inline-flex items-center gap-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-[#263BAA] hover:text-[#FF6B00] text-xs font-bold px-3 py-1.5 transition-colors';

  return createPortal(
    <div
      className="modal-fade fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-viewer-title"
        onClick={(e) => e.stopPropagation()}
        className="modal-pop w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-[22px] overflow-hidden shadow-[0_30px_70px_-20px_rgba(15,23,42,0.4)]"
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-100">
          <div className="min-w-0">
            <h3 id="cert-viewer-title" className="text-base font-black text-[#0A1629] leading-snug">
              {cert.title}
            </h3>
            <p className="text-[13px] font-semibold text-[#263BAA]">
              {cert.issuer}
              {cert.meta && <span className="text-slate-400 font-medium"> · {cert.meta}</span>}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-[#FF6B00] flex items-center justify-center transition-colors cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-auto bg-slate-100 p-3 sm:p-4">
          {cert.image ? (
            /* object-contain so the whole certificate is visible, never cropped */
            <img
              src={cert.image}
              alt={`${cert.title} certificate`}
              className="block w-full h-auto max-h-[60vh] object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
                <AwardIcon />
              </div>
              <p className="text-sm font-bold text-[#0A1629]">Certificate not added yet</p>
              <p className="text-xs text-[#64748B] max-w-[260px] leading-relaxed">
                The certificate image will show up here once it has been added.
              </p>
            </div>
          )}
        </div>

        {hasFooter && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-slate-100">
            {cert.credentialId ? (
              <p className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <span className="text-[#FF6B00]"><CheckIcon /></span>
                <span>
                  Credential ID: <span className="font-mono text-slate-600">{cert.credentialId}</span>
                </span>
              </p>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2">
              {cert.verifyUrl && (
                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Verify <ExternalLinkIcon />
                </a>
              )}
              {cert.image && (
                <a href={cert.image} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Open full size <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

// ---------- PAGE ----------

const Seminars = ({ onNavigate } = {}) => {
  const [detail, setDetail] = useState(null); // { type: 'seminar' | 'certificate', item } -> overview popup
  const [viewing, setViewing] = useState(null); // certificate shown in the viewer
  const openDetail = (type, item) => setDetail({ type, item });
  const closeDetail = useCallback(() => setDetail(null), []);
  const openViewer = (cert) => setViewing(cert);
  const closeViewer = useCallback(() => setViewing(null), []);
  // "View Certificate" inside the overview popup: swap the popup for the certificate viewer
  const viewFromDetail = () => {
    if (!detail) return;
    const { type, item } = detail;
    setDetail(null);
    setViewing(type === 'certificate' ? viewerFromCertificate(item) : viewerFromSeminar(item));
  };

  return (
    <>
      <style>{`
        .main-card-shadow {
          box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.08), 0 10px 30px -10px rgba(15, 23, 42, 0.04);
        }
        @keyframes modal-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .modal-fade { animation: modal-fade 0.18s ease-out; }
        .modal-pop { animation: modal-pop 0.2s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .modal-fade, .modal-pop { animation: none; }
        }
      `}</style>

      <div className="relative w-full">
        {/* Subtle Ambient Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        <main className="relative z-10 w-full py-12 px-6 sm:px-10 lg:px-16">
          <section className="bg-white rounded-[32px] main-card-shadow overflow-hidden relative">
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col gap-10">

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 hover:bg-blue-50 text-[#263BAA] hover:text-[#FF6B00] text-xs font-bold transition-all shadow-2xs w-fit cursor-pointer"
                >
                  <BackIcon />
                  <span>Back</span>
                </button>
              )}

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 text-[#263BAA] text-xs font-bold uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
                  Professional Growth
                </div>
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#0A1629] tracking-tight leading-tight mb-3">
                  Seminars & <span className="text-[#263BAA]">Certifications</span>
                </h1>
                <p className="text-base sm:text-lg text-[#64748B] font-medium leading-relaxed max-w-3xl">
                  Continuous learning and practical workshops that expand my knowledge in modern engineering, architecture, and technology leadership.
                </p>
              </div>

              {/* ================= SEMINARS (2) ================= */}
              <div className="flex flex-col gap-6 w-full max-w-[840px] mx-auto">
                <SectionHeader
                  icon={<PresentationIcon />}
                  title="Seminars"
                  subtitle="Industry talks and hands-on workshops I've attended."
                  count={seminars.length}
                  accent="blue"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  {seminars.map((s) => (
                    <div
                      key={s.title}
                      className="bg-slate-50/60 hover:bg-white rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
                    >
                      <div className="w-full aspect-video overflow-hidden bg-slate-100 relative">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-1.5 flex-1">
                        <span className="text-[11px] font-semibold text-slate-600 bg-white shadow-xs rounded-full px-2.5 py-0.5 w-fit">
                          {s.date}
                        </span>
                        <h3 className="text-[15px] sm:text-base font-bold text-[#0A1629] leading-snug mt-1 group-hover:text-[#263BAA] transition-colors">
                          <button
                            type="button"
                            onClick={() => openDetail('seminar', s)}
                            aria-haspopup="dialog"
                            className={CARD_OPEN_CLASS}
                          >
                            {s.title}
                          </button>
                        </h3>
                        <p className="text-[13px] text-[#263BAA] font-semibold">{s.organizer}</p>
                        <div className="mt-auto pt-3">
                          <button
                            type="button"
                            onClick={() => openDetail('seminar', s)}
                            aria-haspopup="dialog"
                            className={VIEW_BTN_CLASS}
                          >
                            <EyeIcon />
                            <span>Unlock Excellence</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* ================= CERTIFICATES (2) ================= */}
              <div className="flex flex-col gap-6 w-full max-w-[840px] mx-auto">
                <SectionHeader
                  icon={<AwardIcon />}
                  title="Certifications"
                  subtitle="Credentials that validate my technical skills."
                  count={certificates.length}
                  accent="orange"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  {certificates.map((c) => (
                    <div
                      key={c.title}
                      className="bg-slate-50/60 hover:bg-white rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
                    >
                      {/* object-contain so the full certificate is visible, never cropped */}
                      <div className="w-full aspect-video overflow-hidden bg-slate-100 relative">
                        <img
                          src={c.image}
                          alt={`${c.title} certificate`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-1.5 flex-1">
                        <span className="text-[11px] font-semibold text-slate-600 bg-white shadow-xs rounded-full px-2.5 py-0.5 w-fit">
                          Issued {c.date}
                        </span>
                        <h3 className="text-[15px] sm:text-base font-bold text-[#0A1629] leading-snug mt-1 group-hover:text-[#263BAA] transition-colors">
                          <button
                            type="button"
                            onClick={() => openDetail('certificate', c)}
                            aria-haspopup="dialog"
                            className={CARD_OPEN_CLASS}
                          >
                            {c.title}
                          </button>
                        </h3>
                        <p className="text-[13px] text-[#263BAA] font-semibold">{c.issuer}</p>
                        {c.credentialId && (
                          <p className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                            <span className="text-[#FF6B00]"><CheckIcon /></span>
                            <span>
                              Credential ID: <span className="font-mono text-slate-600">{c.credentialId}</span>
                            </span>
                          </p>
                        )}
                        <div className="mt-auto pt-3">
                          <button
                            type="button"
                            onClick={() => openDetail('certificate', c)}
                            aria-haspopup="dialog"
                            className={VIEW_BTN_CLASS}
                          >
                            <EyeIcon />
                            <span>Unlock Excellence</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </main>
      </div>

      <DetailModal detail={detail} onClose={closeDetail} onViewCertificate={viewFromDetail} />
      <CertificateViewer cert={viewing} onClose={closeViewer} />
    </>
  );
};

export default Seminars;