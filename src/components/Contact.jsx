import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Link2, Code2 } from 'lucide-react';

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
    // Clear error for this field when user starts typing
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

    // Simulate form submission (replace with EmailJS implementation)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">Let's Work Together</h2>
          <p className="text-secondary text-lg mb-12 text-center">
            Have a project, opportunity, or idea? I'd love to hear from you.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:jeanmarc.aguilar@example.com"
                    className="flex items-center gap-3 text-secondary hover:text-primary transition-colors"
                  >
                    <Mail size={20} />
                    <span>jeanmarc.aguilar@example.com</span>
                  </a>
                  <a
                    href="https://github.com/jeanmarcaguilar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-secondary hover:text-primary transition-colors"
                  >
                    <Code2 size={20} />
                    <span>github.com/jeanmarcaguilar</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/jeanmarcaguilar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-secondary hover:text-primary transition-colors"
                  >
                    <Link2 size={20} />
                    <span>linkedin.com/in/jeanmarcaguilar</span>
                  </a>
                  <div className="flex items-center gap-3 text-secondary">
                    <MapPin size={20} />
                    <span>Philippines</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-card border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors placeholder:text-secondary/50 ${
                    errors.name ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-card border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors placeholder:text-secondary/50 ${
                    errors.email ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-card border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors placeholder:text-secondary/50 ${
                    errors.subject ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Project inquiry"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-card border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none placeholder:text-secondary/50 ${
                    errors.message ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-background px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-center"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
