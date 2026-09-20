// ==========================================
// FILE: src/components/Seminars.jsx
// ==========================================
import React from 'react';
import seminar1 from '../assets/images/seminar_1.jpg';
import seminar2 from '../assets/images/seminar_2.jpg';
import seminar3 from '../assets/images/seminar_3.jpg';
// TODO: add these certificate images (or change the paths) before running
import certificate1 from '../assets/images/certificate_1.jpg';
import certificate2 from '../assets/images/certificate_2.jpg';
import certificate3 from '../assets/images/certificate_3.jpg';

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

// ---------- DATA ----------

const seminars = [
  {
    image: seminar1,
    date: 'Oct 2025',
    title: 'Modern Web Development & Cloud Systems',
    organizer: 'Tech Summit Philippines',
    description: 'Explored scalable web architecture, serverless integrations, and best practices for building responsive, high-performance applications.',
    tags: ['Cloud Computing', 'Web Engineering', 'API Design'],
  },
  {
    image: seminar2,
    date: 'Aug 2025',
    title: 'Full-Stack Architecture & Database Optimization',
    organizer: 'DevCon Tech Sessions',
    description: 'Deep-dived into relational database indexing, RESTful API security, and modern full-stack performance tuning.',
    tags: ['MySQL', 'Database Design', 'Security'],
  },
  {
    image: seminar3,
    date: 'Mar 2025',
    title: 'UI/UX Design Systems & Interactive Prototyping',
    organizer: 'Creative Tech Symposium',
    description: 'Hands-on workshop on crafting intuitive user experiences, accessibility standards, and seamless component-driven design systems.',
    tags: ['UI/UX Design', 'Design Systems', 'Accessibility'],
  },
];

// TODO: replace the placeholder text below with your real certificates
const certificates = [
  {
    image: certificate1,
    date: 'Nov 2025',
    title: 'Certificate Title #1',
    issuer: 'Issuing Organization',
    credentialId: 'CERT-0001',
    description: 'Short summary of what this certification covers and the skills it validates.',
    tags: ['Skill One', 'Skill Two', 'Skill Three'],
  },
  {
    image: certificate2,
    date: 'Sep 2025',
    title: 'Certificate Title #2',
    issuer: 'Issuing Organization',
    credentialId: 'CERT-0002',
    description: 'Short summary of what this certification covers and the skills it validates.',
    tags: ['Skill One', 'Skill Two', 'Skill Three'],
  },
  {
    image: certificate3,
    date: 'Jul 2025',
    title: 'Certificate Title #3',
    issuer: 'Issuing Organization',
    credentialId: 'CERT-0003',
    description: 'Short summary of what this certification covers and the skills it validates.',
    tags: ['Skill One', 'Skill Two', 'Skill Three'],
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

// ---------- PAGE ----------

const Seminars = ({ onNavigate } = {}) => {
  return (
    <>
      <style>{`
        .main-card-shadow {
          box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.08), 0 10px 30px -10px rgba(15, 23, 42, 0.04);
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

              {/* ================= SEMINARS (3) ================= */}
              <div className="flex flex-col gap-6">
                <SectionHeader
                  icon={<PresentationIcon />}
                  title="Seminars"
                  subtitle="Industry talks and hands-on workshops I've attended."
                  count={seminars.length}
                  accent="blue"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1320px]">
                  {seminars.map((s) => (
                    <div
                      key={s.title}
                      className="bg-slate-50/60 hover:bg-white rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
                    >
                      <div className="w-full aspect-video overflow-hidden bg-slate-100 relative">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col gap-1.5 flex-1">
                        <span className="text-[11px] font-semibold text-slate-600 bg-white shadow-xs rounded-full px-2.5 py-0.5 w-fit">
                          {s.date}
                        </span>
                        <h3 className="text-[15px] sm:text-base font-bold text-[#0A1629] leading-snug mt-1 group-hover:text-[#263BAA] transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-[13px] text-[#263BAA] font-semibold">{s.organizer}</p>
                        <p className="text-[13px] text-[#64748B] leading-relaxed mt-1">{s.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                          {s.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold text-[#263BAA] bg-blue-50/80 hover:bg-blue-100/70 transition-colors rounded-lg px-2.5 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* ================= CERTIFICATES (3) ================= */}
              <div className="flex flex-col gap-6">
                <SectionHeader
                  icon={<AwardIcon />}
                  title="Certifications"
                  subtitle="Credentials that validate my technical skills."
                  count={certificates.length}
                  accent="orange"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1320px]">
                  {certificates.map((c) => (
                    <div
                      key={c.title}
                      className="bg-slate-50/60 hover:bg-white rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
                    >
                      {/* object-contain so the full certificate is visible, never cropped */}
                      <div className="w-full aspect-16/10 overflow-hidden bg-slate-100 relative">
                        <img
                          src={c.image}
                          alt={`${c.title} certificate`}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col gap-1.5 flex-1">
                        <span className="text-[11px] font-semibold text-slate-600 bg-white shadow-xs rounded-full px-2.5 py-0.5 w-fit">
                          Issued {c.date}
                        </span>
                        <h3 className="text-[15px] sm:text-base font-bold text-[#0A1629] leading-snug mt-1 group-hover:text-[#263BAA] transition-colors">
                          {c.title}
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
                        <p className="text-[13px] text-[#64748B] leading-relaxed mt-1">{c.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                          {c.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold text-orange-700 bg-orange-50/80 hover:bg-orange-100/70 transition-colors rounded-lg px-2.5 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
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
    </>
  );
};

export default Seminars;