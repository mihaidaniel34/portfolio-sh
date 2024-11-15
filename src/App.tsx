import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Mail, 
  Github, 
  Linkedin, 
  Code2, 
  BookOpen, 
  Coffee 
} from 'lucide-react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

interface CommandPromptProps {
  children: React.ReactNode;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return <span>{displayText}</span>;
};

const CommandPrompt: React.FC<CommandPromptProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-2 font-mono">
      <span className="text-violet-500">❯</span>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-4 md:p-8 font-mono">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
          <Terminal className="text-violet-500" size={20} />
          <span className="text-zinc-400">portfolio.sh</span>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Intro Section */}
          <section className="space-y-4">
            <CommandPrompt>
              <TypewriterText text="Mihai Daniel Potirniche" />
            </CommandPrompt>
            <div className="pl-6 space-y-2">
              <p className="text-violet-400">Software Engineer</p>
              <p className="text-zinc-400">Passionate about programming and problem solving</p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="space-y-3">
            <CommandPrompt>
              <span className="text-violet-500">contact</span> --list
            </CommandPrompt>
            <div className="pl-6 space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-violet-500" />
                <a href="mailto:potirnichemd@gmail.com" className="hover:text-violet-400 transition-colors">
                  potirnichemd@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github size={16} className="text-violet-500" />
                <a 
                  href="https://github.com/mihaidaniel34" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-violet-400 transition-colors"
                >
                  github.com/mihaidaniel34
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={16} className="text-violet-500" />
                <a 
                  href="https://linkedin.com/in/mihai-daniel-p" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-violet-400 transition-colors"
                >
                  linkedin.com/in/mihai-daniel-p
                </a>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="space-y-3">
            <CommandPrompt>
              <span className="text-violet-500">skills</span> --verbose
            </CommandPrompt>
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Code2 size={16} className="text-violet-500" />
                  <span className="text-zinc-200">Languages</span>
                </div>
                <ul className="list-none pl-6 text-zinc-400 space-y-1">
                  <li>Java</li>
                  <li>Python</li>
                  <li>Rust -- WIP</li>
                  <li>Go -- WIP</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-violet-500" />
                  <span className="text-zinc-200">Frameworks</span>
                </div>
                <ul className="list-none pl-6 text-zinc-400 space-y-1">
                  <li>Spring Boot</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="space-y-4">
            <CommandPrompt>
              <span className="text-violet-500">projects</span> --list
            </CommandPrompt>
            <div className="pl-6 space-y-6">
              {/* Project 1 */}
              <div className="border border-zinc-800 bg-zinc-900/30 p-4 rounded-lg hover:border-violet-500 transition-colors">
                <a 
                  href="https://github.com/mihaidaniel34/Raycaster" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <h3 className="text-zinc-200 font-bold hover:text-violet-400 transition-colors">
                    Raycaster
                  </h3>
                  <p className="text-zinc-400 mt-2">
                    A raycasting engine built in C++ using SDL. It simulates 3D environments with 2D maps, 
                    implementing basic graphics techniques like raycasting and texture mapping.
                  </p>
                  <div className="flex gap-2 mt-2 text-zinc-500 text-sm">
                    <span>#cpp</span>
                    <span>#sdl</span>
                    <span>#graphics</span>
                    <span>#gamedev</span>
                  </div>
                </a>
              </div>
              
              {/* Project 2 */}
              <div className="border border-zinc-800 bg-zinc-900/30 p-4 rounded-lg hover:border-violet-500 transition-colors">
                <a 
                  href="https://github.com/mihaidaniel34/bitcoin-in-rust" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <h3 className="text-zinc-200 font-bold hover:text-violet-400 transition-colors">
                    Bitcoin in Rust -- WIP
                  </h3>
                  <p className="text-zinc-400 mt-2">
                    Toy implementation of the Bitcoin protocol based on the original whitepaper. 
                  </p>
                  <div className="flex gap-2 mt-2 text-zinc-500 text-sm">
                    <span>#rust</span>
                    <span>#bitcoin</span>
                    <span>#blockchain</span>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-zinc-800 flex items-center justify-between text-zinc-500">
            <div className="flex items-center gap-2">
              <Coffee size={16} />
              <span>Fueled by coffee and ambition</span>
            </div>
            <span>{currentYear}</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;