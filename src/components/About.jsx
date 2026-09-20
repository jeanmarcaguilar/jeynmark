// ==========================================
// FILE: src/components/About.jsx
// ==========================================
import React from 'react';
import aboutCard1 from '../assets/images/about_card_1.jpg';
import aboutCard2 from '../assets/images/about_card_2.jpg';
import aboutCard3 from '../assets/images/about_card_3.jpg';
import aboutCard4 from '../assets/images/about_card_4.png';

const education = 'My journey in technology is grounded in a Bachelor of Science in Information Technology, where I developed a strong foundation in software development, system design, and modern engineering practices. Through academic projects and hands-on experience, I transformed that foundation into practical skills for building reliable, user-focused digital solutions.';

const stack = 'I specialize in full-stack web development, working across React, JavaScript, PHP, Laravel, Blade, Tailwind CSS, MySQL, and RESTful APIs. From crafting responsive interfaces to engineering complete backend systems, I focus on creating scalable solutions that are performant, maintainable, and built around real-world user needs.';

const experience = [
  {
    role: 'On-the-Job Training — Administrative Division',
    company: 'Commission on Human Rights',
    period: 'Oct 2025 — Jan 2026',
    points: [
      'Provided basic IT support by troubleshooting software applications and resolving day-to-day technical issues.',
      'Assisted with handling records and documentation for the Administrative Division.',
      'Maintained digital assets and internal resources to keep office systems organized and accessible.',
      'Created visual materials such as flyers, posters, and presentations to support organizational communication.',
    ],
    tags: ['IT Support', 'Documentation', 'Graphic Design'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Microfinancial — Capstone | School Management System',
    period: '2025 — 2026',
    points: [
      'Developed two full-stack web applications from database design through deployment.',
      'Built a School Management System using PHP, MySQL, JSON, and RESTful APIs.',
      'Delivered a Capstone Project on the Laravel framework using PHP, JSON, and RESTful APIs.',
    ],
    tags: ['PHP', 'Laravel', 'MySQL', 'RESTful APIs', 'JSON'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Bestlink College of the Philippines',
    period: '2024 — 2025',
    points: [
      'Developed full-stack web applications, including a Parking Management System.',
      'Implemented database management and backend functionality using PHP, JSON, and MySQL.',
      'Integrated RESTful APIs to support system integration and data exchange.',
    ],
    tags: ['PHP', 'MySQL', 'RESTful APIs'],
  },
];

const quickStats = [
  { value: '06+', label: 'Full-Stack Projects', target: 'projects' },
  { value: '10+', label: 'Core Technologies', target: 'stack' },
  { value: '270+', label: 'GitHub Contributions', target: 'contributions', url: 'https://github.com/jeanmarcaguilar' },
  { value: '03', label: 'Seminars Attended', target: 'seminars' },
];

const QuickStats = ({ onNavigate }) => (
  <div className="relative mt-8 p-3 sm:p-4 bg-slate-50/70 rounded-2xl flex flex-wrap gap-3 items-center">
    {quickStats.map((stat, i) => (
      <button
        key={i}
        type="button"
        onClick={() => {
          if (stat.url) {
            window.open(stat.url, '_blank', 'noopener,noreferrer');
          } else if (stat.target === 'projects' && onNavigate) {
            onNavigate('projects');
          } else if (onNavigate) {
            onNavigate(stat.target);
          }
        }}
        className="group/stat relative flex items-center gap-3.5 px-5 py-3.5 cursor-pointer transition-all duration-300 bg-white hover:bg-white/90 hover:-translate-y-1 rounded-2xl shadow-xs hover:shadow-md flex-1 min-w-[190px]"
      >
        <span className="flex flex-col text-left">
          <span className="block text-lg sm:text-xl font-black text-[#0A1629] leading-none">
            {stat.value}
          </span>
          <span className="block text-[10px] sm:text-[11px] text-[#64748B] font-semibold mt-1 leading-tight">
            {stat.label}
          </span>
        </span>
        <div className="ml-auto w-8 h-8 rounded-xl bg-slate-50 group-hover/stat:bg-orange-50 flex items-center justify-center transition-colors">
          <svg
            className="w-3.5 h-3.5 stroke-[2.75] transition-transform duration-200 group-hover/stat:translate-x-0.5 group-hover/stat:-translate-y-0.5 text-[#FF6B00]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </button>
    ))}
  </div>
);

const SectionHeading = ({ icon, title, subtitle, customIcon }) => (
  <div className="flex items-center gap-3.5 mb-6">
    <div className="w-11 h-11 rounded-2xl bg-blue-50/80 text-[#263BAA] flex items-center justify-center shrink-0 shadow-2xs">
      {customIcon ? (
        <div className="w-6 h-6 flex items-center justify-center">
          {customIcon}
        </div>
      ) : (
        <i className={`ph-bold ${icon} text-lg`}></i>
      )}
    </div>
    <div>
      <h2 className="text-xl sm:text-2xl font-black text-[#0A1629] tracking-tight leading-tight">{title}</h2>
      {subtitle && <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const EducationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FF6B00" viewBox="0 0 256 256">
    <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z"></path>
  </svg>
);

const StackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FF6B00" viewBox="0 0 256 256">
    <path d="M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z"></path>
  </svg>
);

const ExperienceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FF6B00" viewBox="0 0 256 256">
    <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path>
  </svg>
);

const About = ({ onNavigate } = {}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = [aboutCard1, aboutCard2, aboutCard3, aboutCard4];

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <style>{`
        .pill-shadow {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05);
        }
        .main-card-shadow {
          box-shadow: 0 30px 70px -20px rgba(15, 23, 42, 0.08), 0 10px 30px -10px rgba(15, 23, 42, 0.04);
        }
        .shuffle-image {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div className="relative w-full">
        {/* Subtle Ambient Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        <main className="relative z-10 w-full py-12 px-6 sm:px-10 lg:px-16">

          {/* Main Content Card */}
          <section className="bg-white rounded-[32px] main-card-shadow overflow-hidden relative">
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col gap-14">

              {/* ============ ABOUT ME ============ */}
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 text-[#263BAA] text-xs font-bold uppercase tracking-wider mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
                      Who I Am
                    </div>
                    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#0A1629] tracking-tight leading-tight mb-4">
                      About <span className="text-[#263BAA]">Me</span>
                    </h1>
                    <p className="text-base sm:text-lg xl:text-xl text-[#475569] leading-relaxed">
                      As a Web Designer and Developer, I combine creative design with thoughtful development to create digital experiences that are both visually engaging and easy to use. I believe great websites should not only look good but also feel intuitive, perform smoothly, and communicate ideas clearly.
                    </p>
                    <p className="text-base sm:text-lg xl:text-xl text-[#475569] leading-relaxed mt-4">
                      I enjoy turning concepts into responsive, functional, and polished digital products. From shaping the visual direction to building the final experience, I focus on every detail to ensure the result is reliable, accessible, and designed with the user in mind.
                    </p>

                    <QuickStats onNavigate={onNavigate} />
                  </div>

                  <div className="lg:col-span-5 w-full">
                    <div className="relative w-full h-72 sm:h-80 xl:h-96 flex items-center justify-center">
                      <div 
                        className="relative w-52 sm:w-60 xl:w-72 aspect-3/4 rounded-[28px] shadow-[0_20px_50px_-10px_rgba(15,23,42,0.18)] cursor-pointer overflow-hidden group transition-all duration-300 hover:scale-[1.03]"
                        onClick={handleImageClick}
                      >
                        <img 
                          src={images[currentImageIndex]} 
                          alt="About illustration" 
                          className="w-full h-full object-cover shuffle-image group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 right-3 backdrop-blur-md bg-black/60 hover:bg-black/80 text-white text-[11px] font-medium tracking-wide px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg transition-all duration-200">
                          <i className="ph-bold ph-arrows-clockwise text-xs text-[#FF6B00]"></i>
                          <span>Click to shuffle</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ============ EDUCATION + STACK ============ */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                {/* ---- EDUCATION ---- */}
                <section className="bg-slate-50/70 hover:bg-slate-50 transition-colors rounded-[28px] p-6 sm:p-8 shadow-xs">
                  <SectionHeading icon="ph-graduation-cap" title="Education" subtitle="Where the foundation was built." customIcon={<EducationIcon />} />
                  <p className="text-sm sm:text-base xl:text-lg text-[#475569] leading-relaxed font-normal">{education}</p>
                </section>

                {/* ---- STACK ---- */}
                <section className="bg-slate-50/70 hover:bg-slate-50 transition-colors rounded-[28px] p-6 sm:p-8 shadow-xs">
                  <SectionHeading icon="ph-stack" title="Stack" subtitle="Tools I reach for every day." customIcon={<StackIcon />} />
                  <p className="text-sm sm:text-base xl:text-lg text-[#475569] leading-relaxed font-normal">{stack}</p>
                </section>
              </div>

              {/* ============ EXPERIENCE / PROJECT EXPERIENCE ============ */}
              <section>
                <SectionHeading icon="ph-briefcase" title="Experience" subtitle="Roles and projects that shaped how I build." customIcon={<ExperienceIcon />} />
                <div className="relative pl-8 flex flex-col gap-8 before:content-[''] before:absolute before:left-2.25 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-blue-200 before:via-slate-200 before:to-transparent">
                  {experience.map((job, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-8 top-1.5 w-5 h-5 rounded-full bg-white shadow-xs ring-4 ring-blue-50 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#263BAA]"></span>
                      </span>
                      <div className="bg-slate-50/60 hover:bg-white rounded-[24px] p-6 sm:p-7 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-[#0A1629] leading-tight">{job.role}</h3>
                            <p className="text-sm text-[#263BAA] font-semibold mt-0.5">{job.company}</p>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-600 bg-white shadow-xs rounded-full px-3 py-1 shrink-0">
                            {job.period}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-2 mt-3.5">
                          {job.points.map((pt, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-[#475569] leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] mt-2 shrink-0"></span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-5">
                          {job.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="text-[11px] font-semibold text-[#263BAA] bg-blue-50/80 hover:bg-blue-100/70 transition-colors rounded-lg px-2.5 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default About;