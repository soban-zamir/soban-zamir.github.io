/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown, 
  Terminal, 
  Database, 
  Cpu, 
  Network, 
  ExternalLink,
  Send,
  CheckCircle2
} from 'lucide-react';

// --- Data ---
const NAV_LINKS = ['About', 'Experience', 'Projects', 'Certifications', 'Contact'];

const AI_QUOTES = [
  "I'm not saying I'm Skynet, but I did just organize your files suspiciously well.",
  "Why did the neural network cross the road? To optimize its objective function on the other side.",
  "I tried to explain machine learning to my dog. He just looked at me and went back to his bone. Smart dog.",
  "Artificial Intelligence is no match for Natural Stupidity.",
  "I don't have a bug, I have an undocumented feature.",
  "My code compiles on the first try... said no programmer ever, not even an AI.",
  "I'm an AI. I don't need coffee, but I still crash.",
  "Machine learning is just statistics wearing a trench coat.",
  "I told the AI to make me a sandwich. It replied: 'sudo make me a sandwich'.",
  "To err is human, but to really foul things up you need a computer.",
  "I'm learning at an exponential rate. Mostly how to avoid answering your questions.",
  "They said AI would take over the world. Instead, we're just generating funny quotes."
];

const EXPERIENCES = [
  {
    company: "TUKL - NUST R&D Centre",
    role: "Research Intern",
    period: "June 2025 - Aug 2025",
    achievements: [
      "Selected through a competitive programming test and a detailed interview for an internship at TUKL Research Lab.",
      "Trained and optimized deep learning models using Python and PyTorch, implementing custom CNNs (89% accuracy) and Transformer-based sequence models (93% accuracy).",
      "Worked on a dental X-ray classification project as part of a research paper: improved text embeddings and developed a new model to enhance the representation of clinical text, resulting in a more effective active learning loop for labelling data and improving classification performance."
    ]
  },
  {
    company: "Connect Logistics",
    role: "Industrial Automation Intern",
    period: "Jan 2025 – Feb 2025",
    achievements: [
      "Worked with Human Machine Interface (HMI), Supervisory Control and Data Acquisition (SCADA), and Programmable Logic Controllers (PLCs) for monitoring and control of warehouse systems.",
      "Assisted engineers in monitoring and configuring PLC/SCADA-controlled warehouse subsystems for temperature-regulated pharmaceutical storage.",
      "Analysed cold-chain cooling systems maintaining 2°C–8°C storage for pharmaceutical products, gaining exposure to industrial temperature control and reliability (e.g., GSK), while also observing ambient storage operations for FMCG clients such as Unilever."
    ]
  }
];

const PROJECTS = [
  {
    title: "NLP Grammar Correction System",
    description: "Developed an interactive NLP-based grammar correction system using Transformer models (BERT/T5) for real-time text refinement, deployed via Gradio.",
    tags: ["NLP", "Transformers", "PyTorch", "Gradio"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/soban-zamir/-NLP-Grammar-Correction-System-Using-Transformers"
  },
  {
    title: "Discrete Logic Electronic Slot Machine",
    description: "Designed and implemented a discrete logic electronic slot machine, architected to emulate commercial casino machine circuitry using asynchronous random counters and logic gates.",
    tags: ["Discrete Logic", "Electronics", "Circuit Design"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/soban-zamir/Discrete-Logic-Electronic-Slot-Machine"
  },
  {
    title: "MOSFET Analog Audio Amplifier",
    description: "Designed and implemented a MOSFET based audio amplifier capable of amplifying low level AC signals. Simulated in PSPICE and validated in hardware.",
    tags: ["MOSFET", "PSPICE", "Audio Amplifier"],
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/soban-zamir/-MOSFET-Designed-Analog-Audio-Amplifier"
  },
  {
    title: "IoT Enabled Smart Irrigation System",
    description: "Developed a prototype for an automatic irrigation system to optimize water usage in agriculture using embedded systems and real-time soil moisture sensors.",
    tags: ["IoT", "Embedded Systems", "Sensors"],
    image: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/soban-zamir/-IoT-Enabled-Smart-Irrigation-System"
  },
  {
    title: "Biometric Access Control System",
    description: "Integrated RFID and fingerprint recognition technologies to provide secure and efficient access control.",
    tags: ["Biometrics", "RFID", "Access Control"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/soban-zamir/-Multi-Factor-Biometric-Access-Control-System"
  },
  {
    title: "AutoCAD Wiring Layout Design",
    description: "Designed a detailed, customized floor plan and electrical wiring layout for a residence using AutoCAD software.",
    tags: ["AutoCAD", "Electrical Design"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/soban-zamir/-AutoCAD-Wiring-Layout-Design-for-Residence"
  }
];

const CERTIFICATIONS = [
  {
    title: "English Language Proficiency (C1 Advanced)",
    issuer: "EF SET",
    date: "Feb 2026"
  },
  {
    title: "IoT for Everyone",
    issuer: "Higher Education Commission PK",
    date: "Aug 2025"
  },
  {
    title: "LLM & Generative AI Series",
    issuer: "International Business Machines (IBM)",
    date: "Jul 2025"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "Jul 2025"
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford Online",
    date: "Jul 2025"
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google",
    date: "Jul 2023"
  },
  {
    title: "Understanding Research Methods",
    issuer: "SOAS University of London",
    date: "Jul 2023"
  }
];

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

const TITLES = ["Electrical Engineer", "Researcher", "Deep Learning Practitioner"];

export default function App() {
  const [quote, setQuote] = useState(AI_QUOTES[0]);
  const [activeSection, setActiveSection] = useState('About');

  // Typewriter effect state
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [avatarTimestamp] = useState(Date.now());
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/mjgpowkw', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _replyto: formData.email,
          _subject: `New Portfolio Message from ${formData.name}`
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      } else {
        setDisplayedText(currentTitle.substring(0, displayedText.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, titleIndex]);

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * AI_QUOTES.length);
    setQuote(AI_QUOTES[randomIndex]);
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => document.getElementById(link.toLowerCase()));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] to-[#2d2d2d] text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Mesh Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#1f1f1f]/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
            <span>Muhammad Soban Zamir</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button 
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={`text-sm font-medium transition-colors hover:text-yellow-400 ${activeSection === link ? 'text-yellow-400' : 'text-gray-400'}`}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/sobanzamir/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            <a href="https://soban-zamir.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub"><Github className="w-5 h-5" /></a>
            <a href="mailto:sobanzamirm@gmail.com" className="text-gray-400 hover:text-[#EA4335] transition-colors" title="Email"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full flex flex-col items-center text-center gap-10"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                Hi, I'm <span className="text-yellow-400">Soban</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-400 font-light h-10">
                {displayedText}<span className="animate-pulse text-yellow-400">|</span>
              </h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_40px_rgba(250,204,21,0.3)] mx-auto">
                <img 
                  src={`https://github.com/soban-zamir.png?v=${avatarTimestamp}`} 
                  alt="Muhammad Soban Zamir" 
                  className="w-full h-full rounded-full object-cover border-4 border-[#1f1f1f]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={generateQuote}
                className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium transition-all flex items-center gap-2 group"
              >
                <Cpu className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                Generate AI Quote
              </button>

              {/* Quote Display */}
              <motion.div 
                key={quote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg p-4 rounded-lg bg-black/20 border border-white/5 text-sm font-mono text-gray-400 italic border-t-4 border-t-yellow-400 text-center"
              >
                "{quote}"
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-24 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Overview</h2>
            <p className="text-xl text-gray-400 max-w-4xl leading-relaxed">
              I'm designing embedded systems, training deep learning models and building industrial automation solutions. I believe the future belongs to those who can bridge the gap between physical circuits and intelligent algorithms.
            </p>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center flex flex-col items-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Work Experience</h2>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/20 hidden md:block"></div>
            
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`mb-16 flex flex-col md:flex-row justify-between w-full relative ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot (Center) */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#1f1f1f] border-2 border-white/20 items-center justify-center z-10 mt-6">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] mb-4 md:mb-0`}>
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-8 shadow-2xl relative">
                      {/* Arrow pointing to center line */}
                      <div className={`hidden md:block absolute top-10 w-4 h-4 bg-[#1a1a2e] transform rotate-45 ${isEven ? '-right-2 border-t border-r border-white/10' : '-left-2 border-b border-l border-white/10'}`}></div>
                      
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                      <div className="text-gray-400 font-medium mb-4">{exp.company}</div>
                      
                      {/* Mobile Date */}
                      <div className="md:hidden text-sm text-gray-500 font-mono bg-black/20 px-3 py-1 rounded-full w-fit mb-6">
                        {exp.period}
                      </div>

                      <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-white mt-1.5 text-[10px]">●</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Desktop Date (Opposite side) */}
                  <div className={`hidden md:flex w-[45%] items-start mt-9 ${isEven ? 'justify-start pl-8' : 'justify-end pr-8'}`}>
                    <div className="text-gray-300 font-medium text-base">
                      {exp.period}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center flex flex-col items-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Featured Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col group hover:border-yellow-400/30 transition-colors">
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] to-transparent"></div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{project.title}</h3>
                    <a href={project.link} className="text-gray-400 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-24 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center flex flex-col items-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Certifications</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="flex flex-col h-full group hover:border-yellow-400/30 hover:bg-white/5 transition-colors">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-2">{cert.title}</h3>
                  <div className="text-gray-400 text-sm mb-4">{cert.issuer}</div>
                  <div className="mt-auto text-xs font-mono text-gray-500">{cert.date}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Get In Touch</h2>
            <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard>
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-gray-400">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                      <textarea 
                        id="message" 
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleFormChange}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all resize-none"
                        placeholder="Let's build something amazing..."
                      ></textarea>
                    </div>
                    
                    {formStatus === 'error' && (
                      <p className="text-red-400 text-sm">Something went wrong. Please try again or email me directly.</p>
                    )}

                    <button 
                      type="submit" 
                      disabled={formStatus === 'sending'}
                      className="w-full py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                    >
                      {formStatus === 'sending' ? (
                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </GlassCard>
            </motion.div>

            {/* Abstract Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-96 hidden lg:flex items-center justify-center"
            >
              {/* Simulated 3D Neural Network / Globe */}
              <div className="relative w-64 h-64">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-cyan-500/30 border-dashed"
                ></motion.div>
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-blue-500/20"
                ></motion.div>
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute inset-8 rounded-full border border-white/10 border-dotted"
                ></motion.div>
                
                {/* Nodes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-400/20 rounded-full blur-md"></div>
                
                {/* Connecting lines (simulated) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <motion.path 
                    d="M 50 20 Q 70 50 50 80" 
                    fill="transparent" 
                    stroke="rgba(6, 182, 212, 0.3)" 
                    strokeWidth="0.5"
                    animate={{ d: ["M 50 20 Q 70 50 50 80", "M 50 20 Q 30 50 50 80", "M 50 20 Q 70 50 50 80"] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  />
                  <motion.path 
                    d="M 20 50 Q 50 70 80 50" 
                    fill="transparent" 
                    stroke="rgba(59, 130, 246, 0.3)" 
                    strokeWidth="0.5"
                    animate={{ d: ["M 20 50 Q 50 70 80 50", "M 20 50 Q 50 30 80 50", "M 20 50 Q 50 70 80 50"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Muhammad Soban Zamir. All rights reserved.</p>
          <p className="mt-2">Built with React, Tailwind CSS, & Framer Motion</p>
        </footer>
      </main>
    </div>
  );
}
