import { motion } from 'framer-motion';

// Clean Tech SVG Icons
const FigmaIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#0ACF83" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#1ABCFE" />
    <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#A259FF" />
    <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E" />
    <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" />
  </svg>
);

const FramerIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 2h14v7H5z" fill="currentColor" fillOpacity="0.2" />
    <path d="M5 9h7l7 7H5z" fill="currentColor" fillOpacity="0.4" />
    <path d="M5 16h7v6z" fill="currentColor" />
  </svg>
);

const HTML5Icon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm17.65 5.56H5.43l.36 4.09h12.63l-.48 5.37-5.97 1.62-5.96-1.62-.28-3.13H1.61l.54 6.07 9.82 2.7 9.82-2.7 1.36-15.39z" fill="#E34F26" />
  </svg>
);

const CSS3Icon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm17.65 5.56H5.43l.36 4.09h12.63l-.48 5.37-5.97 1.62-5.96-1.62-.28-3.13H1.61l.54 6.07 9.82 2.7 9.82-2.7 1.36-15.39z" fill="#1572B6" />
  </svg>
);

const JSIcon = () => (
  <div className="w-4 h-4 bg-[#F7DF1E] text-black font-bold text-[9px] rounded flex items-center justify-center shrink-0">
    JS
  </div>
);

const ReactIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="9" ry="3.5" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const ViteIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M22.6 3.3L12.4 23.3.4 3.6l10-1.8L22.6 3.3z" fill="#BD34FE" />
    <path d="M17.5 1.5L11.8 13 8 7.5l-5.5.9L12.4 23.3 22.6 3.3 17.5 1.5z" fill="#FFC812" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6c-3.182 0-5.182 1.5-6 4.5 1.182-1.5 2.591-2.025 4.227-1.575 1.05.289 1.8 1.054 2.628 1.9 1.348 1.378 2.915 2.975 6.145 2.975 3.182 0 5.182-1.5 6-4.5-1.182 1.5-2.591 2.025-4.227 1.575-1.05-.289-1.8-1.054-2.628-1.9C16.8 7.6 15.233 6 12 6zm-6 6c-3.182 0-5.182 1.5-6 4.5 1.182-1.5 2.591-2.025 4.227-1.575 1.05.289 1.8 1.054 2.628 1.9 1.348 1.378 2.915 2.975 6.145 2.975 3.182 0 5.182-1.5 6-4.5-1.182 1.5-2.591 2.025-4.227 1.575-1.05-.289-1.8-1.054-2.628-1.9C10.8 13.6 9.233 12 6 12z" />
  </svg>
);

const TSIcon = () => (
  <div className="w-4 h-4 bg-[#3178C6] text-white font-bold text-[9px] rounded flex items-center justify-center shrink-0">
    TS
  </div>
);

const NodeIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.2l7.5 4.1v7.4L12 19.8 4.5 15.7V8.3L12 4.2z" />
  </svg>
);

const LaravelIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.5 3.8v7.6L12 19.4 4.5 15.6V8L12 4.2z" />
  </svg>
);

const PythonIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-4 0-5 2-5 4v2h6v1H6c-2 0-4 2-4 5s2 4 4 4h2v-2c0-2 2-3 4-3h4c2 0 3-1 3-3V6c0-2-2-4-5-4zm-2 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 16c4 0 5-2 5-4v-2h-6v-1h7c2 0 4-2 4-5s-2-4-4-4h-2v2c0 2-2 3-4 3h-4c-2 0-3 1-3 3v4c0 2 2 4 5 4zm2-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
  </svg>
);

const MySQLIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 6c0 1.657 3.582 3 8 3s8-1.343 8-3-3.582-3-8-3-8 1.343-8 3z" />
    <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
    <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
  </svg>
);

const RestAPIIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const ClaudeIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const HuggingFaceIcon = () => (
  <span className="w-4 h-4 flex items-center justify-center text-xs leading-none shrink-0">🤗</span>
);

const OpenAIIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.28 9.82a6.76 6.76 0 0 0-.6-5.4 6.84 6.84 0 0 0-6.85-3.3 6.74 6.74 0 0 0-5.18 2.37A6.74 6.74 0 0 0 4.5 2.14 6.84 6.84 0 0 0 1.2 5.44a6.76 6.76 0 0 0 .61 5.39A6.74 6.74 0 0 0 .5 14.18a6.84 6.84 0 0 0 3.3 6.85 6.74 6.74 0 0 0 5.18-2.37 6.74 6.74 0 0 0 5.15 1.35 6.84 6.84 0 0 0 3.3-3.3 6.76 6.76 0 0 0 4.85-6.89zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

const GitIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.7 10.3l-9-9c-.4-.4-1-.4-1.4 0l-9 9c-.4.4-.4 1 0 1.4l9 9c.4.4 1 .4 1.4 0l9-9c.4-.4.4-1 0-1.4zM10 15.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm.5-5.5V7.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v2.5" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ChatGPTIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.28 9.82a6.76 6.76 0 0 0-.6-5.4 6.84 6.84 0 0 0-6.85-3.3 6.74 6.74 0 0 0-5.18 2.37A6.74 6.74 0 0 0 4.5 2.14 6.84 6.84 0 0 0 1.2 5.44a6.76 6.76 0 0 0 .61 5.39A6.74 6.74 0 0 0 .5 14.18a6.84 6.84 0 0 0 3.3 6.85 6.74 6.74 0 0 0 5.18-2.37 6.74 6.74 0 0 0 5.15 1.35 6.84 6.84 0 0 0 3.3-3.3 6.76 6.76 0 0 0 4.85-6.89zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.098.245.195.372.288a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const VSCodeIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.63-3.5a.748.748 0 0 0-.965.068L.23 6.94a.75.75 0 0 0 0 1.06l3.86 3.86-3.86 3.86a.75.75 0 0 0 0 1.06l1.22 1.242a.75.75 0 0 0 .965.068l4.63-3.5 9.46 8.63a1.492 1.492 0 0 0 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 19.803V4.197a1.5 1.5 0 0 0-.85-1.61zM18 16.586l-6.4-4.586L18 7.414v9.172z" />
  </svg>
);

const Skills = () => {
  const topRowCategories = [
    {
      id: 'frontend',
      title: "Frontend",
      description: "Building responsive, polished interfaces that people use every day.",
      items: [
        { icon: <HTML5Icon />, name: "HTML5", desc: "Semantic markup & accessibility standards" },
        { icon: <CSS3Icon />, name: "CSS3", desc: "Modern layouts, animations & responsive systems" },
        { icon: <JSIcon />, name: "JavaScript", desc: "Dynamic scripts & asynchronous programming" },
        { icon: <ReactIcon />, name: "React", desc: "State management & modular UI components" },
        { icon: <ViteIcon />, name: "Vite", desc: "Optimized bundling & hot module replacement" },
        { icon: <TailwindIcon />, name: "Tailwind", desc: "Rapid utility-first CSS styling & layouts" },
        { icon: <TSIcon />, name: "TypeScript", desc: "Static typing & robust code quality" },
      ]
    },
    {
      id: 'backend',
      title: "Backend",
      description: "Powering reliable applications with APIs, data, and server-side logic.",
      items: [
        { icon: <NodeIcon />, name: "Node.js", desc: "Asynchronous server runtimes & scalable APIs" },
        { icon: <LaravelIcon />, name: "Laravel", desc: "Expressive PHP framework for robust backends" },
        { icon: <PythonIcon />, name: "Python", desc: "Scripting, automation & data handling" },
        { icon: <MySQLIcon />, name: "MySQL", desc: "Relational database design & complex queries" },
        { icon: <RestAPIIcon />, name: "Rest API", desc: "Secure, clean HTTP endpoints & integrations" },
      ]
    },
    {
      id: 'version-control',
      title: "Version Control & Productivity",
      description: "Keeping projects organized, collaborative, and ready to ship.",
      items: [
        { icon: <GitIcon />, name: "Git", desc: "Source code tracking & branching workflows" },
        { icon: <GitHubIcon />, name: "GitHub", desc: "Pull requests, code review & cloud hosting" },
        { icon: <ChatGPTIcon />, name: "ChatGPT", desc: "Conversational AI for problem-solving" },
        { icon: <DiscordIcon />, name: "Discord", desc: "Developer community & real-time collaboration" },
        { icon: <VSCodeIcon />, name: "VS Code", desc: "Advanced IDE configuration & extensions" },
      ]
    }
  ];

  const bottomRowCategories = [
    {
      id: 'design',
      title: "Design & Prototyping",
      description: "Turning concepts into clear, interactive product experiences.",
      items: [
        { icon: <FigmaIcon />, name: "Figma", desc: "Collaborative UI/UX wireframes & design systems" },
        { icon: <FramerIcon />, name: "Framer", desc: "High-fidelity interactive page prototyping" },
      ]
    },
    {
      id: 'ai',
      title: "AI & Machine Learning",
      description: "Using intelligent tools to accelerate research, coding, and ideas.",
      items: [
        { icon: <ClaudeIcon />, name: "Claude Code", desc: "Context-aware agentic AI software assistance" },
        { icon: <HuggingFaceIcon />, name: "Hugging Face", desc: "Open-source NLP models & AI datasets" },
        { icon: <OpenAIIcon />, name: "Open AI", desc: "Advanced LLM APIs & neural network tools" },
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center py-10 lg:py-14 bg-[#050505] text-white relative overflow-hidden select-none">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-0 w-125 h-125 bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 lg:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Tools & Tech Stack
            <p className="font-code text-zinc-400 text-xs leading-relaxed mb-3">The tools I use to build amazing web applications.</p>
          </h2>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {/* Top Row: 3 Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
            {topRowCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full bg-[#080a0c]/80 backdrop-blur-xl border border-zinc-800/80 hover:border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                      {category.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-[#00FF9D] text-[10px] font-code shrink-0">
                      {category.items.length} tools
                    </span>
                  </div>

                  <p className="font-code text-zinc-400 text-xs leading-relaxed mb-3">
                    {category.description}
                  </p>

                  <div className="space-y-1.5 font-code text-xs">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-2.5 p-1.5 rounded-lg bg-zinc-900/40 border border-transparent hover:border-zinc-800 hover:bg-zinc-900/80 transition-all group/item"
                      >
                        {item.icon}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-white tracking-tight group-hover/item:text-[#00FF9D] transition-colors">
                            {item.name}
                          </span>
                          <span className="text-zinc-600">—</span>
                          <span className="text-zinc-400 font-medium text-[11px]">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: 2 Centered Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-stretch max-w-4xl mx-auto w-full">
            {bottomRowCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                className="h-full bg-[#080a0c]/80 backdrop-blur-xl border border-zinc-800/80 hover:border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                      {category.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-[#00FF9D] text-[10px] font-code shrink-0">
                      {category.items.length} tools
                    </span>
                  </div>

                  <p className="font-code text-zinc-400 text-xs leading-relaxed mb-3">
                    {category.description}
                  </p>

                  <div className="space-y-1.5 font-code text-xs">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-2.5 p-1.5 rounded-lg bg-zinc-900/40 border border-transparent hover:border-zinc-800 hover:bg-zinc-900/80 transition-all group/item"
                      >
                        {item.icon}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-white tracking-tight group-hover/item:text-[#00FF9D] transition-colors">
                            {item.name}
                          </span>
                          <span className="text-zinc-600">—</span>
                          <span className="text-zinc-400 font-medium text-[11px]">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;