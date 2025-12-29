import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Mail,
  Github,
  Linkedin,
  Code2,
  BookOpen,
  Coffee,
  ExternalLink,
  Minus,
  Square,
  X
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================
interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

interface CommandPromptProps {
  children: React.ReactNode;
}

interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

// CRT Scanline Effect
const CRTOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    <div className="absolute inset-0 animate-scanline opacity-[0.03]" />
  </div>
);

// Animated background grid
const BackgroundGrid: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
          linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 50px 50px, 50px 50px',
        animation: 'gridMove 20s linear infinite'
      }} />
    </div>
  </div>
);

// Terminal Window Header
const TerminalHeader: React.FC = () => (
  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-zinc-900/50 to-transparent border-b border-zinc-800/50 backdrop-blur-sm">
    <div className="flex items-center gap-2">
      <button className="p-1.5 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-all shadow-lg shadow-[#ff5f57]/20">
        <X size={12} className="text-black" />
      </button>
      <button className="p-1.5 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-all shadow-lg shadow-[#febc2e]/20">
        <Minus size={12} className="text-black" />
      </button>
      <button className="p-1.5 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-all shadow-lg shadow-[#28c840]/20">
        <Square size={12} className="text-black" />
      </button>
    </div>
    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
      <Terminal size={14} className="text-violet-500" />
      <span>portfolio.sh</span>
      <span className="text-zinc-600">—</span>
      <span className="text-zinc-600">zsh</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/30">
        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
        <span className="text-xs text-violet-500 font-medium">ONLINE</span>
      </div>
    </div>
  </div>
);

// Enhanced Typewriter with cursor
const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    const cursorTimer = setInterval(() => {
      setShowCursor(v => !v);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, [text, speed, onComplete]);

  return (
    <span className="relative">
      {displayText}
      <span
        className={`inline-block w-0.5 h-[1.1em] bg-violet-500 ml-0.5 align-middle ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-100`}
      />
    </span>
  );
};

// Command Prompt
const CommandPrompt: React.FC<CommandPromptProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`flex items-center gap-2 font-mono transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-4'
      }`}
    >
      <span className="text-violet-500">❯</span>
      <span className="text-violet-500">→</span>
      {children}
    </div>
  );
};

// Glowing Section Container
const SectionContainer: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <section
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </section>
  );
};

// Project Card with Glow Effect
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`relative border transition-all duration-300 ${
          isHovered
            ? 'border-violet-500/50 bg-violet-500/5 shadow-[0_0_30px_rgba(139,92,246,0.2)]'
            : 'border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700'
        } rounded-lg overflow-hidden`}
      >
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-violet-600/10 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-violet-400 transition-colors">
              {project.title}
            </h3>
            <ExternalLink
              size={16}
              className={`text-zinc-600 transition-all duration-300 ${
                isHovered ? 'text-violet-500 translate-x-0 translate-y-0' : 'translate-x-1 translate-y-1'
              }`}
            />
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded font-mono bg-zinc-800/50 text-zinc-500 border border-zinc-800 group-hover:border-zinc-700 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================
const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const projects: Project[] = [
    {
      title: 'Bitcoin in Rust',
      description: 'Toy implementation of the Bitcoin protocol based on the original whitepaper.',
      url: 'https://github.com/mihaidaniel34/bitcoin-in-rust',
      tags: ['#rust', '#bitcoin', '#blockchain'],
    },
    {
      title: 'Bossman',
      description: 'Elden Ring boss checklist with a working map showing all boss locations. Built for fun to help players track their progress through the game.',
      url: 'https://bossman-fe.vercel.app/',
      tags: ['#elden-ring', '#map', '#gaming', '#checklist'],
    },
    {
      title: 'Pepegen',
      description: 'Pepe image generator based on your X profile. Meme project that reached over 400 users in less than a day. Made using a Flux LoRa trained on a dataset of 1000 pepe images. Currently inactive.',
      url: 'https://pepegen-frontend.vercel.app/',
      tags: ['#flux', '#lora', '#image-generation'],
    },
    {
      title: 'Url Shortener',
      description: 'Simple url shortener written in Go using Gin and Redis.',
      url: 'https://url.danielmihai.com/',
      tags: ['#go', '#gin', '#redis'],
    },
    {
      title: 'Raycaster',
      description: 'A raycasting engine built in C++ using SDL. It simulates 3D environments with 2D maps, implementing basic graphics techniques like raycasting and texture mapping.',
      url: 'https://github.com/mihaidaniel34/Raycaster',
      tags: ['#cpp', '#sdl', '#graphics', '#gamedev'],
    },
  ];

  const contactLinks = [
    {
      icon: Mail,
      label: 'contact@danielmihai.com',
      href: 'mailto:contact@danielmihai.com',
    },
    {
      icon: Github,
      label: 'github.com/mihaidaniel34',
      href: 'https://github.com/mihaidaniel34',
    },
    {
      icon: Linkedin,
      label: 'linkedin.com/in/mihai-daniel-p',
      href: 'https://linkedin.com/in/mihai-daniel-p',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'JetBrains Mono', monospace !important;
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .animate-scanline {
          animation: scanline 8s linear infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }

        /* Selection */
        ::selection {
          background: rgba(139, 92, 246, 0.3);
          color: #a78bfa;
        }
      `}</style>

      {/* Background effects */}
      <CRTOverlay />
      <BackgroundGrid />

      {/* Main content */}
      <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-300">
        {/* Radial glow effect */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Terminal Window */}
          <div className="mx-4 md:mx-8 mt-8 md:mt-12 rounded-xl border border-zinc-800/50 bg-[#0a0a0a]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/50">
            <TerminalHeader />

            {/* Terminal Content */}
            <div className="p-6 md:p-10 space-y-10">
              {/* Intro Section */}
              <SectionContainer delay={200}>
                <div className="space-y-6">
                  <CommandPrompt>
                    <TypewriterText
                      text="Mihai Daniel Potirniche"
                      speed={80}
                    />
                  </CommandPrompt>
                  <div className="pl-8 space-y-3">
                    <p className="text-violet-400 text-lg font-medium animate-in fade-in slide-in-from-bottom-2 duration-500 delay-700 fill-mode-forwards">
                      Software Engineer
                    </p>
                    <p className="text-zinc-500 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 delay-1000 fill-mode-forwards">
                      Passionate about programming and problem solving. Building systems that matter.
                    </p>
                  </div>
                </div>
              </SectionContainer>

              {/* Contact Section */}
              <SectionContainer delay={1200}>
                <div className="space-y-4">
                  <CommandPrompt>
                    <span className="text-violet-500">contact</span>
                    <span className="text-zinc-600 mx-1">--list</span>
                  </CommandPrompt>
                  <div className="pl-8 space-y-3">
                    {contactLinks.map((link, idx) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 text-zinc-400 hover:text-violet-400 transition-all duration-200 group"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <link.icon size={16} className="text-violet-500 group-hover:text-violet-500 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </SectionContainer>

              {/* Skills Section */}
              <SectionContainer delay={1600}>
                <div className="space-y-4">
                  <CommandPrompt>
                    <span className="text-violet-500">skills</span>
                    <span className="text-zinc-600 mx-1">--verbose</span>
                  </CommandPrompt>
                  <div className="pl-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Code2 size={16} className="text-violet-500" />
                        <span className="font-medium">Languages</span>
                      </div>
                      <ul className="space-y-1.5 text-zinc-500">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-violet-500" />
                          Java
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-violet-500" />
                          Python
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                          Rust <span className="text-xs text-amber-500">[WIP]</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                          Go <span className="text-xs text-amber-500">[WIP]</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <BookOpen size={16} className="text-violet-500" />
                        <span className="font-medium">Frameworks</span>
                      </div>
                      <ul className="space-y-1.5 text-zinc-500">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-violet-500" />
                          Spring Boot
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </SectionContainer>

              {/* Projects Section */}
              <SectionContainer delay={2000}>
                <div className="space-y-4">
                  <CommandPrompt>
                    <span className="text-violet-500">projects</span>
                    <span className="text-zinc-600 mx-1">--list</span>
                  </CommandPrompt>
                  <div className="pl-8 space-y-4">
                    {projects.map((project, index) => (
                      <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                  </div>
                </div>
              </SectionContainer>

              {/* Footer */}
              <footer className="pt-8 mt-12 border-t border-zinc-800/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Coffee size={14} className="text-zinc-500" />
                    <span>Fueled by coffee and ambition</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-600">
                    <span>©</span>
                    <span>{currentYear}</span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-violet-500/60">v1.0.0</span>
                  </div>
                </div>
              </footer>
            </div>
          </div>

          {/* Status bar decoration */}
          <div className="mx-4 md:mx-8 mb-8 mt-4 px-4 py-2 rounded-lg border border-zinc-800/30 bg-zinc-900/20 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-zinc-600 font-mono">
              <div className="flex items-center gap-4">
                <span>uptime: <span className="text-violet-500/60">∞</span></span>
                <span>mem: <span className="text-violet-500/60">128MB</span></span>
                <span>cpu: <span className="text-zinc-500/60">0.01%</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                <span>system operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
