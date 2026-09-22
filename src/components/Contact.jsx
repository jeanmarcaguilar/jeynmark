import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, ArrowLeft, ChevronDown, AlertCircle } from 'lucide-react';

// Edit these before shipping — they're placeholders.
const CONTACT_INFO = {
  email: 'jeanmarcaguilar829@gmail.com',
};

// Edit these before shipping — they're placeholders.
const FAQS = [
  {
    q: 'What do you actually build?',
    a: "React and Node apps, dashboards, and the automations behind them — mostly for founders and small teams who need something shipped, not diagrammed. If it's on the web, I've probably built some version of it.",
  },
  {
    q: 'How fast can you start?',
    a: 'Usually within a week. Smaller, well-scoped work can often start sooner — just say what you need in the form.',
  },
  {
    q: 'Do you work with my stack?',
    a: "Mostly JavaScript and TypeScript — React on the front end, Node on the back. If you're on something else, tell me and we'll figure out if it's a fit.",
  },
  {
    q: 'How much do you charge?',
    a: "Depends on scope — project-based, day rate, or full-time, whichever fits what you're building. Send the details and I'll give you a straight number.",
  },
  {
    q: 'What happens after I write?',
    a: "I read every message myself and reply within a day or two — no funnel, no newsletter you didn't ask for.",
  },
];

// --- Brand icons (mirrors the set used in the sidebar) ---
const GitHubIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 1024 1024" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#E5E7EB" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5 shrink-0" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#E5E7EB" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 127.14 96.36">
    <path
      fill="#E5E7EB"
      d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z"
    />
  </svg>
);

const cardVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const labelClass = 'block text-xs font-bold uppercase tracking-wide text-slate-700 mb-2';

const fieldClass = (hasError) =>
  `w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-[#263BAA]/20 ${
    hasError ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-[#263BAA]'
  }`;

export default function Contact({ onNavigate }) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', business: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (data) => {
    const next = {};
    if (!data.firstName.trim()) next.firstName = 'Enter your first name.';
    if (!data.lastName.trim()) next.lastName = 'Enter your last name.';
    if (!data.email.trim()) {
      next.email = 'Enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!data.business.trim()) next.business = 'Add a few details.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const subject = `Portfolio inquiry from ${fullName}`;
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          subject: subject,
          message: formData.business,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('sent');
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({ firstName: '', lastName: '', email: '', business: '' });
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="shrink-0 flex items-center justify-between gap-4 pb-2 pt-2"
      >
        <div className="max-w-2xl min-w-0">
          <h2 className="text-3xl sm:text-5xl xl:text-[52px] font-extrabold text-[#263BAA] tracking-tight leading-[1.05]">
            Let's build something together.
          </h2>
          <p className="text-base sm:text-lg xl:text-xl text-slate-700 font-semibold mt-3 leading-snug">
            Got a project, a role, or just a question? Send a message and I'll get back to you.
          </p>
        </div>
        {onNavigate && (
          <div className="shrink-0 mr-4 xl:mr-6">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 xl:px-4 xl:py-2 rounded-full bg-[#111827] hover:bg-[#1f2937] text-white font-semibold text-xs xl:text-sm shadow-md hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-[#263BAA]/40 focus-visible:ring-offset-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform duration-200 ease-out group-hover:-translate-x-1" />
              <span>Home</span>
            </button>
          </div>
        )}
      </motion.header>

      {/* MASTER CONTAINER */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        className="flex-1 min-h-0 bg-[#FAF9F5] rounded-[32px] p-3 xl:p-4 shadow-xs mt-4 xl:mt-6 overflow-y-auto"
      >
        <div className="grid grid-cols-12 gap-3 h-full items-stretch">
          {/* LEFT — FAQ */}
          <motion.article
            variants={cardVariants}
            className="col-span-12 lg:col-span-5 h-full rounded-[26px] p-5 xl:p-7 flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.25)]"
            style={{
              background:
                'radial-gradient(130% 130% at 100% 100%, #1c2440 0%, #0a0b10 45%, #050506 75%)',
            }}
          >
            <p className="text-xs font-bold tracking-wide text-orange-400">FAQS</p>
            <h3 className="mt-2 text-2xl xl:text-3xl font-extrabold text-white leading-tight">Quick answers.</h3>
            <p className="text-lg xl:text-xl font-extrabold text-slate-500 leading-tight">Still have one? Write below.</p>

            <div className="mt-5 pt-1 border-t border-white/10 flex-1 flex flex-col">
              {FAQS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.q} className={i > 0 ? 'border-t border-white/10' : ''}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-3 py-4 text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-400/40 rounded-lg"
                    >
                      <span className="text-xs font-bold text-orange-400 shrink-0 w-5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-sm xl:text-[15px] font-bold text-white">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pl-8 pb-4 text-sm text-slate-400 leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-5 flex items-center justify-between gap-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-orange-400/40"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                {CONTACT_INFO.email}
              </a>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  aria-label="GitHub"
                  href="https://github.com/jeanmarcaguilar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-orange-400/40"
                >
                  <GitHubIcon />
                </a>
                <a
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/in/jiim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-orange-400/40"
                >
                  <LinkedInIcon />
                </a>
                <a
                  aria-label="Discord"
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-orange-400/40"
                >
                  <DiscordIcon />
                </a>
              </div>
            </div>
          </motion.article>

          {/* RIGHT — FORM */}
          <motion.article
            variants={cardVariants}
            className="col-span-12 lg:col-span-7 bg-white rounded-[26px] p-5 xl:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col h-full"
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col items-start justify-center gap-3"
                >
                  <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-slate-800 font-semibold">Message sent successfully!</p>
                  <p className="text-sm text-slate-500">I'll get back to you within one business day.</p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-1 text-sm font-semibold text-[#263BAA] hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#263BAA]/40 rounded"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col items-start justify-center gap-3"
                >
                  <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-slate-800 font-semibold">Something went wrong</p>
                  <p className="text-sm text-slate-500">{errorMessage}</p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-1 text-sm font-semibold text-[#263BAA] hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#263BAA]/40 rounded"
                  >
                    Try again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex-1 flex flex-col gap-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-firstName" className={labelClass}>
                        First name
                      </label>
                      <input
                        id="contact-firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Jean Marc"
                        className={fieldClass(Boolean(errors.firstName))}
                      />
                      {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-lastName" className={labelClass}>
                        Last name
                      </label>
                      <input
                        id="contact-lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Aguilar"
                        className={fieldClass(Boolean(errors.lastName))}
                      />
                      {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@yourbusiness.com"
                      className={fieldClass(Boolean(errors.email))}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="flex-1 flex flex-col min-h-[8rem]">
                    <label htmlFor="contact-business" className={labelClass}>
                      Tell me more about your business
                    </label>
                    <textarea
                      id="contact-business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="What's the bottleneck? Where do leads stop? What are you running it on?"
                      className={`resize-none flex-1 ${fieldClass(Boolean(errors.business))}`}
                    />
                    {errors.business && <p className="mt-1 text-xs text-red-500">{errors.business}</p>}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#263BAA] hover:bg-[#1e2f8a] disabled:opacity-60 text-white font-semibold text-sm shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#263BAA]/40 focus-visible:ring-offset-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{status === 'sending' ? 'Sending message…' : 'Send message'}</span>
                    </button>
                    <p className="text-xs text-slate-400">One business day. No newsletter, no drip.</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.article>
        </div>
      </motion.section>
    </>
  );
}