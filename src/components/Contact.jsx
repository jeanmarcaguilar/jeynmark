import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, MapPin, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      text: 'jeanmarcaguilar829@gmail.com',
      href: 'mailto:jeanmarcaguilar829@gmail.com',
      label: 'Email'
    },
    {
      icon: ({ size = 18, className = '' }) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      text: 'github.com/jeanmarcaguilar',
      href: 'https://github.com/jeanmarcaguilar',
      label: 'GitHub'
    },
    {
      icon: ({ size = 18, className = '' }) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      text: 'linkedin.com/in/jiim',
      href: 'https://www.linkedin.com/in/jiim/',
      label: 'LinkedIn'
    },
    {
      icon: MapPin,
      text: 'Philippines',
      href: null,
      label: 'Location'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must contain at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#050505] text-white relative overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight text-center">
            Let's Work Together
            <p className="font-code text-zinc-400 text-xs leading-relaxed mb-3">Have a project, opportunity, or idea? I'd love to hear from you.</p>
          </h2>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: Get In Touch Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative rounded-2xl border border-emerald-500/30 bg-[#07130c]/70 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(0,255,157,0.06)]"
          >
            {/* Corner Crosshairs */}
            <span className="absolute top-3.5 left-4 font-mono text-sm text-[#00FF9D]/70 select-none pointer-events-none">
              +
            </span>
            <span className="absolute bottom-3.5 right-4 font-mono text-sm text-[#00FF9D]/70 select-none pointer-events-none">
              +
            </span>

            <div>
              {/* Card Label */}
              <h3 className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#00FF9D] uppercase mb-6">
                GET IN TOUCH
              </h3>

              {/* Contact Pills List */}
              <div className="space-y-4">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? 'a' : 'div';
                  const wrapperProps = item.href
                    ? {
                      href: item.href,
                      target: item.href.startsWith('http') ? '_blank' : undefined,
                      rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                    }
                    : {};

                  return (
                    <Wrapper
                      key={idx}
                      {...wrapperProps}
                      className="group flex items-center gap-3.5 p-2 pr-5 rounded-full border border-emerald-500/25 bg-[#06120a]/90 hover:border-[#00FF9D]/60 hover:bg-[#0c2415] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,157,0.03)]"
                    >
                      {/* Icon container */}
                      <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-[#00FF9D]/35 flex items-center justify-center text-[#00FF9D] group-hover:shadow-[0_0_12px_rgba(0,255,157,0.3)] transition-all shrink-0">
                        <Icon size={18} />
                      </div>

                      {/* Text label */}
                      <span className="font-mono text-xs sm:text-sm text-[#00FF9D] tracking-wide truncate group-hover:text-white transition-colors">
                        {item.text}
                      </span>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 relative rounded-2xl border border-emerald-500/30 bg-[#07130c]/70 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_40px_rgba(0,255,157,0.06)]"
          >
            {/* Corner Crosshairs */}
            <span className="absolute top-3.5 left-4 font-mono text-sm text-[#00FF9D]/70 select-none pointer-events-none">
              +
            </span>
            <span className="absolute bottom-3.5 right-4 font-mono text-sm text-[#00FF9D]/70 select-none pointer-events-none">
              +
            </span>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-mono text-xs font-bold tracking-widest text-[#00FF9D] uppercase mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 bg-[#050c08]/90 border rounded-lg font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all ${errors.name ? 'border-red-500' : 'border-emerald-500/25'
                    }`}
                />
                {errors.name && <p className="font-mono text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-mono text-xs font-bold tracking-widest text-[#00FF9D] uppercase mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-[#050c08]/90 border rounded-lg font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all ${errors.email ? 'border-red-500' : 'border-emerald-500/25'
                    }`}
                />
                {errors.email && <p className="font-mono text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block font-mono text-xs font-bold tracking-widest text-[#00FF9D] uppercase mb-2">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                  className={`w-full px-4 py-3 bg-[#050c08]/90 border rounded-lg font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-all ${errors.subject ? 'border-red-500' : 'border-emerald-500/25'
                    }`}
                />
                {errors.subject && <p className="font-mono text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block font-mono text-xs font-bold tracking-widest text-[#00FF9D] uppercase mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`w-full px-4 py-3 bg-[#050c08]/90 border rounded-lg font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] resize-none transition-all ${errors.message ? 'border-red-500' : 'border-emerald-500/25'
                    }`}
                />
                {errors.message && <p className="font-mono text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#00FF9D] hover:bg-[#33FFAD] text-black font-mono font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,157,0.35)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <ArrowUpRight size={16} strokeWidth={2.5} />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Submit Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-emerald-950/60 border border-[#00FF9D]/40 rounded-xl text-[#00FF9D] font-mono text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,157,0.15)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-ping shrink-0" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
