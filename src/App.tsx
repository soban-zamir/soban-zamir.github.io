/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Ensure this matches your package (framer-motion or motion/react)
import { 
  Github, 
  Linkedin, 
  Mail, 
  Send,
  CheckCircle2,
  Menu,
  X,
  FileText
} from 'lucide-react';

// --- Data ---
const NAV_LINKS = ['About', 'Experience', 'Projects', 'Certifications', 'Contact', 'CV'];

const CV_URL = "https://raw.githubusercontent.com/soban-zamir/soban-zamir/main/CV%20-%20Muhammad%20Soban%20Zamir.pdf";

const FUN_FACTS = [
  "Octopuses have three hearts, nine brains, and blue blood.",
  "Honey never spoils.",
  "Scotland's national animal is the unicorn.",
  "Bananas are berries, but strawberries are not.",
  "Lobsters taste with their feet.",
  "A cloud can weigh over a million pounds.",
  "Sharks are older than trees.",
  "Venus is the only planet that rotates clockwise.",
  "The total weight of all the ants on Earth is roughly equal to the weight of all humans.",
  "A bolt of lightning is five times hotter than the surface of the sun."
];

const EXPERIENCES = [
  {
    company: "TUKL - NUST R&D Centre",
    role: "Research Intern",
    period: "June 2025 - Aug 2025",
    achievements: [
      "Selected through a competitive programming test and a detailed interview for an internship at TUKL Research Lab.",
      "Trained and optimized deep learning models using Python and PyTorch, implementing custom CNNs (89% accuracy) and Transformer-based sequence models (93% accuracy).",
      "Worked on a dental X-ray classification project as part of a research paper improving text embeddings and active learning loops."
    ]
  },
  {
    company: "Connect Logistics",
    role: "Industrial Automation Intern",
    period: "Jan 2025 – Feb 2025",
    achievements: [
      "Worked with Human Machine Interface (HMI), SCADA, and PLCs for monitoring and control of warehouse systems.",
      "Assisted in configuring PLC/SCADA-controlled subsystems for pharmaceutical storage (2°C–8°C).",
      "Gained exposure to industrial reliability for clients like GSK and Unilever."
    ]
  }
];

const PROJECTS = [
  {
    title: "NLP Grammar Correction System",
    description: "Developed an interactive NLP-based grammar correction system using Transformer models (BERT/T5), deployed via Gradio.",
    tags: ["NLP", "Transformers", "PyTorch", "Gradio"],
    image: "https://raw.githubusercontent.com/soban-zamir/soban-zamir.github.io/main/NLP%20Grammar%20Correction%20System.jpg",
    link: "https://github.com/soban-zamir/-NLP-Grammar-Correction-System-Using-Transformers"
  },
  {
    title: "Discrete Logic Electronic Slot Machine",
    description: "Designed a discrete logic electronic slot machine using asynchronous random counters and logic gates.",
    tags: ["Discrete Logic", "Electronics", "Circuit Design"],
    image: "https://raw.githubusercontent.com/soban-zamir/soban-zamir.github.io/main/Discrete%20Logic%20Electronic%20Slot%20Machine.jpeg",
    link: "https://github.com/soban-zamir/Discrete-Logic-Electronic-Slot-Machine"
  },
  {
    title: "MOSFET Analog Audio Amplifier",
    description: "Designed a MOSFET based audio amplifier. Simulated in PSPICE and validated in hardware.",
    tags: ["MOSFET", "PSPICE", "Audio Amplifier"],
    image: "https://raw.githubusercontent.com/soban-zamir/soban-zamir.github.io/main/MOSFET%20Analog%20Audio%20Amplifier.jpeg",
    link: "https://github.com/soban-zamir/-MOSFET-Designed-Analog-Audio-Amplifier"
  }
];

const CERTIFICATIONS = [
  {
    title: "English Language Proficiency (C1 Advanced)",
    issuer: "EF SET",
    date: "Feb 2026",
    link: "https://cert.efset.org/en/xC2ir1",
    logo: "https://www.efset.org/favicon.ico"
  },
  {
    title: "IoT for Everyone",
    issuer: "Higher Education Commission PK",
    date: "Aug 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/K6YM04K537LW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Coursera_logo.png"
  },
  {
    title: "Generative AI and LLMs: Architecture and Data Preparation",
    issuer: "IBM",
    date: "Jul 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/4UA5XS3GLJZB",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
  },
  {
    title: "Generative AI Language Modeling with Transformers",
    issuer: "IBM",
    date: "Jul 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/VJXEE2DM6P0J",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
  },
  {
    title: "Generative AI Engineering and Fine-Tuning Transformers",
    issuer: "IBM",
    date: "Jul 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/1IOM07B8KKOU",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
  },
  {
    title: "Gen AI Foundational Models for NLP & Language Understanding",
    issuer: "IBM",
    date: "Jul 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/Q4H07TTL108C",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "Jul 2025",
    link: "https://www.coursera.org/account/accomplishments/specialization/LV9KFG8ZGEY1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/DeepLearning.AI_logo.png"
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford Online",
    date: "Jul 2025",
    link: "https://www.coursera.org/account/accomplishments/specialization/U07XSRAGJM0O",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b7/Stanford_University_seal.svg"
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google",
    date: "Jul 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/FQQDMB7QX9TK",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Reference_Logo.svg"
  },
  {
    title: "Understanding Research Methods",
    issuer: "SOAS University of London",
    date: "Jul 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/JE4DLRB6PVUT",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d3/University_of_London_logo.svg"
  }
];

// --- Sub-Components ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

const TITLES = ["Electrical Engineer", "Researcher", "Deep Learning Practitioner"];

export default function App() {
  const [quote, setQuote] = useState(FUN_FACTS[0]);
  const [availableIndices, setAvailableIndices] = useState<number[]>(FUN_FACTS.map((_, i) => i).filter(idx => idx !== 0));
  const [activeSection, setActiveSection] = useState('About');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        body: JSON.stringify({ ...formData, _replyto: formData.email })
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch {
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
    let pool = [...availableIndices];
    if (pool.length === 0) pool = FUN_FACTS.map((_, i) => i);
    const randomIndexInPool = Math.floor(Math.random() * pool.length);
    const factIndex = pool[randomIndexInPool];
    pool.splice(randomIndexInPool, 1);
    setQuote(FUN_FACTS[factIndex]);
    setAvailableIndices(pool);
  };

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] to-[#2d2d2d] text-gray-300 font-sans selection:bg-cyan-500/30 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <nav className="fixed top-0 w-full z-50 bg-[#1f1f1f]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold text-white">Muhammad Soban Zamir</div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => link === 'CV' ? window.open(CV_URL) : scrollTo(link.toLowerCase())}
                className="text-sm font-medium hover:text-yellow-400 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <section id="about" className="min-h-screen flex flex-col items-center justify-center pt-16 px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">Hi, I'm <span className="text-yellow-400">Soban</span></h1>
            <h2 className="text-xl md:text-2xl text-gray-400 h-8">{displayedText}<span className="animate-pulse text-yellow-400">|</span></h2>
            <div className="mt-8 w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-[#1f1f1f] overflow-hidden mx-auto shadow-2xl">
                <img src={`https://github.com/soban-zamir.png?v=${avatarTimestamp}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button onClick={generateQuote} className="mt-8 px-6 py-2 rounded-full bg-white/5 border border-white/20 text-white text-sm hover:bg-white/10 transition-all">
                Fun Fact😎
            </button>
            <p className="mt-4 text-sm font-mono text-gray-500 italic">"{quote}"</p>
          </motion.div>
        </section>

        <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-white text-center mb-16">Experience</h2>
            <div className="space-y-12">
                {EXPERIENCES.map((exp, i) => (
                    <GlassCard key={i}>
                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                        <div className="text-yellow-400 mb-4">{exp.company} | {exp.period}</div>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                        </ul>
                    </GlassCard>
                ))}
            </div>
        </section>

        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-white text-center mb-16">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p, i) => (
              <GlassCard key={i} className="hover:border-yellow-400/30 transition-all group">
                <img src={p.image} className="rounded-xl mb-4 h-48 w-full object-cover" alt={p.title} />
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400">{p.title}</h3>
                <p className="text-gray-400 text-sm my-4">{p.description}</p>
                <div className="flex gap-2 flex-wrap">
                    {p.tags.map(t => <span key={t} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10">{t}</span>)}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Corrected Certifications Section */}
        <section id="certifications" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-white text-center mb-16">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <GlassCard className="relative flex flex-col h-full group hover:border-yellow-400/30 hover:bg-white/5 transition-all overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-yellow-400/10" />
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors pr-8">{cert.title}</h3>
                      <img src={cert.logo} alt="logo" className="w-8 h-8 object-contain filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all" />
                    </div>
                    <div className="text-gray-400 text-sm mb-4">{cert.issuer}</div>
                    <div className="mt-auto text-xs font-mono text-gray-500">{cert.date}</div>
                  </GlassCard>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-24 px-6 max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Get In Touch</h2>
            <GlassCard>
                {formStatus === 'success' ? (
                    <div className="text-center py-10 text-green-400">Message sent successfully!</div>
                ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <input type="text" id="name" placeholder="Name" required onChange={handleFormChange} className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white" />
                        <input type="email" id="email" placeholder="Email" required onChange={handleFormChange} className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white" />
                        <textarea id="message" placeholder="Message" rows={5} required onChange={handleFormChange} className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white" />
                        <button className="w-full bg-yellow-400 py-3 rounded-lg text-black font-bold hover:bg-yellow-300 transition-all">Send Message</button>
                    </form>
                )}
            </GlassCard>
        </section>
      </main>

      <footer className="py-10 text-center border-t border-white/5 text-sm text-gray-500">
        © {new Date().getFullYear()} Muhammad Soban Zamir. Built with React & Framer Motion.
      </footer>
    </div>
  );
}
