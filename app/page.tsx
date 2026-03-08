"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, 
  Network, 
  Terminal, 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  BookOpen, 
  Briefcase,
  ChevronRight,
  Menu,
  X,
  Cpu,
  Sparkles,
  MessageSquare,
  Send,
  Bot,
  User,
  Loader2
} from 'lucide-react';

// --- GEMINI API HELPER ---
const callGeminiAPI = async (prompt: string, systemInstruction: string = "") => {
  const apiKey = ""; // <--- REMEMBER TO PUT YOUR API KEY HERE
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  const maxRetries = 5;
  const delays = [1000, 2000, 4000, 8000, 16000];

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      if (i === maxRetries - 1) return "Error connecting to AI. Please try again later.";
      await new Promise(res => setTimeout(res, delays[i]));
    }
  }
};

const resumeContext = `Randal Derego is a Systems Administrator with 10 years of experience.
Skills: VMware ESXi, Hyper-V, vSphere, TCP/IP, DNS, DHCP, VLANs, VPN, Cisco Switches, Active Directory, Group Policy, Exchange, Microsoft 365, Azure, AWS, Data Governance, Patch Management, PowerShell, Bash, VBA, Java, SQL, Python, AI Studio, LM Studio, VLLM, Ollama, NinjaOneRMM.
Experience: 
- Systems Administrator at TEAMLOGIC IT (Nov 2021-Sept 2025): Managed servers, automation scripts.
- Help Desk at SAMSUNG (Jan 2019-Nov 2021): System setups, hardware deployment.
- Tech Support at EAGLE EYE NETWORKS (Feb 2017-Jan 2019): Linux-based cloud video surveillance, CLI troubleshooting.
Education: B.S. in Computer Science (Western Governors University), CompTIA A+.
Contact: randalrd92@gmail.com, 512-653-0052, Austin, TX.`;

const renderFormattedText = (text: string) => {
  return text.split('\n').map((line, i) => (
    <p key={i} className="mb-2">
      {line.split(/(\*\*.*?\*\*)/).map((part, j) => 
        part.startsWith('**') && part.endsWith('**') ? 
        <strong key={j} className="text-slate-900 font-bold">{part.slice(2, -2)}</strong> : 
        part
      )}
    </p>
  ));
};

export default function PortfolioPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- NEW AI STATE ---
  const [analyzerOpen, setAnalyzerOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzerResult, setAnalyzerResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', text: "Hi! I'm Randal's AI Assistant. Ask me anything about his IT infrastructure experience, skills, or projects!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    setAnalyzerResult("");
    
    const sysPrompt = "You are an expert IT recruiter AI assistant embedded in Randal Derego's portfolio. Your job is to analyze the provided Job Description against Randal's resume and generate a customized pitch on why he is a strong fit. Highlight overlapping skills. Be enthusiastic and professional. Format with **bold** for emphasis, but keep it concise (under 200 words).";
    
    const prompt = `Here is Randal's Resume Context:\n${resumeContext}\n\nHere is the target Job Description:\n${jobDescription}\n\nPlease analyze the fit.`;
    
    const result = await callGeminiAPI(prompt, sysPrompt);
    setAnalyzerResult(result as string);
    setIsAnalyzing(false);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const newUserMsg = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");
    setIsChatting(true);

    const sysPrompt = `You are Randal Derego's AI career assistant, answering questions for recruiters and hiring managers. Base your answers strictly on this context: ${resumeContext}. If asked something outside this scope, politely pivot back to his IT skills. Be conversational, professional, and confident. Keep answers under 100 words.`;
    
    // Format chat history for prompt
    const conversationHistory = chatMessages.map(m => `${m.role === 'user' ? 'Recruiter' : 'AI Assistant'}: ${m.text}`).join('\n');
    const prompt = `${conversationHistory}\nRecruiter: ${newUserMsg.text}\nAI Assistant:`;

    const result = await callGeminiAPI(prompt, sysPrompt);
    
    setChatMessages(prev => [...prev, { role: 'model', text: result as string }]);
    setIsChatting(false);
  };

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200">
      {/* HEADER / NAVIGATION */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-slate-900">
            Randal<span className="text-blue-600">Derego</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-blue-600 transition-colors cursor-pointer">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-blue-600 transition-colors cursor-pointer">Experience</button>
            <button onClick={() => scrollToSection('education')} className="hover:text-blue-600 transition-colors cursor-pointer">Education</button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Contact Me
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-900 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-4 px-6 flex flex-col gap-4">
            <button onClick={() => scrollToSection('about')} className="text-left py-2 text-slate-600 font-medium">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-left py-2 text-slate-600 font-medium">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="text-left py-2 text-slate-600 font-medium">Experience</button>
            <button onClick={() => scrollToSection('education')} className="text-left py-2 text-slate-600 font-medium">Education</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-2 text-blue-600 font-medium">Contact Me</button>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 -z-10"></div>
          <div className="max-w-6xl mx-auto flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for New Opportunities
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mb-6">
              Engineering Resilient <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                IT Infrastructure
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
              Highly dedicated Systems Administrator with 10 years of experience. I specialize in managing critical environments, implementing robust automation, and delivering optimal uptime and security.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('experience')}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
              >
                View Experience <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => setAnalyzerOpen(true)}
                className="px-6 py-3 bg-indigo-50 text-indigo-700 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={18} className="text-indigo-600" />
                Analyze Job Fit ✨
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
              >
                Contact Me
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Professional Summary</h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full mb-8"></div>
                <div className="space-y-6 text-slate-600 leading-relaxed">
                  <p>
                    I am a results-oriented IT professional with a decade of comprehensive experience spanning Systems Administration and Help Desk Support. My career is defined by a proven ability to manage and maintain critical IT infrastructure.
                  </p>
                  <p>
                    I excel in ensuring optimal uptime, security, and performance across servers, networks, and user systems. My technical approach focuses on implementing automation and monitoring tools to streamline operations, enhance system reliability, and drastically reduce issue response times.
                  </p>
                </div>
              </div>
              <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Server className="text-blue-600 mb-4" size={32} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Infrastructure</h3>
                  <p className="text-sm text-slate-600">Expertise in VMware, AWS, Azure, and complete server lifecycle management.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Terminal className="text-indigo-600 mb-4" size={32} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Automation</h3>
                  <p className="text-sm text-slate-600">Leveraging PowerShell, Python, and Bash to eliminate repetitive tasks and errors.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Network className="text-emerald-600 mb-4" size={32} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Networking</h3>
                  <p className="text-sm text-slate-600">Deep knowledge of TCP/IP, VLANs, VPNs, and Cisco hardware configurations.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Cpu className="text-purple-600 mb-4" size={32} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Modern AI Tools</h3>
                  <p className="text-sm text-slate-600">Utilizing AI/LM Studios and VLLM to augment IT operations and problem-solving.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Technical Arsenal</h2>
              <p className="text-slate-600">A comprehensive toolkit spanning legacy enterprise systems and cutting-edge cloud and automation platforms.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Skill Category 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Server size={20} /></div>
                  <h3 className="font-bold text-slate-900">Virtualization & Cloud</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['VMware ESXi', 'Hyper-V', 'vSphere', 'Azure', 'AWS'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Skill Category 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Network size={20} /></div>
                  <h3 className="font-bold text-slate-900">Network & Identity</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Active Directory', 'Group Policy', 'TCP/IP', 'DNS', 'DHCP', 'VLANs', 'VPN', 'Cisco Switches'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Skill Category 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Code size={20} /></div>
                  <h3 className="font-bold text-slate-900">Scripting & Dev</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['PowerShell', 'Bash', 'Python', 'Java', 'SQL', 'VBA'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Skill Category 4 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Cpu size={20} /></div>
                  <h3 className="font-bold text-slate-900">Ops & AI Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['NinjaOneRMM', 'Exchange', 'Microsoft 365', 'Patch Mgmt', 'AI Studio', 'LM Studio', 'Ollama'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <Briefcase className="text-blue-600" size={32} />
              <h2 className="text-3xl font-bold text-slate-900">Professional Experience</h2>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              
              {/* Job 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-lg text-slate-900">Systems Administrator</h3>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">Nov 2021 - Sept 2025</span>
                  </div>
                  <div className="text-sm text-slate-500 font-medium mb-4">TEAMLOGIC IT • AUSTIN, TX (REMOTE)</div>
                  <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside marker:text-slate-300">
                    <li>Managed and maintained servers, networks, and user systems to ensure optimal uptime, security, and performance.</li>
                    <li>Implemented automation scripts and monitoring tools to streamline patch management and system reliability.</li>
                    <li>Led direct reporting to coordinate daily operations, ensuring all critical tasks were completed efficiently.</li>
                  </ul>
                </div>
              </div>

              {/* Job 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-lg text-slate-900">Help Desk Technician</h3>
                    <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full w-fit">Jan 2019 - Nov 2021</span>
                  </div>
                  <div className="text-sm text-slate-500 font-medium mb-4">SAMSUNG • AUSTIN, TX</div>
                  <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside marker:text-slate-300">
                    <li>Assisted with system setups, device configurations, and account management, maintaining rigorous documentation.</li>
                    <li>Managed inventory of IT hardware and software licenses.</li>
                    <li>Streamlined the hardware deployment process for new employees, improving onboarding times.</li>
                  </ul>
                </div>
              </div>

              {/* Job 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-lg text-slate-900">Tech Support</h3>
                    <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full w-fit">Feb 2017 - Jan 2019</span>
                  </div>
                  <div className="text-sm text-slate-500 font-medium mb-4">EAGLE EYE NETWORKS • AUSTIN, TX</div>
                  <ul className="space-y-2 text-slate-600 text-sm list-disc list-inside marker:text-slate-300">
                    <li>Provided Tier 1-2 technical support for cloud video surveillance systems, handling Linux-based configurations.</li>
                    <li>Assisted customers with camera setup and terminal troubleshooting.</li>
                    <li>Diagnosed and resolved complex network connectivity issues involving IP cameras, firewalls, and switches using CLI tools.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Education & Certifications</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">B.S. in Computer Science</h3>
                  <p className="text-slate-500 mt-1">Western Governors University</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">CompTIA A+</h3>
                  <p className="text-slate-500 mt-1">Professional Certification</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Infrastructure?</h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
              I&apos;m currently based in Austin, TX and open to new opportunities. Whether you have a question or want to discuss a potential role, feel free to reach out.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a href="mailto:randalrd92@gmail.com" className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <Mail className="text-blue-400" size={28} />
                <div>
                  <div className="text-sm text-slate-400 mb-1">Email</div>
                  <div className="font-medium">randalrd92@gmail.com</div>
                </div>
              </a>
              
              <a href="tel:512-653-0052" className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <Phone className="text-green-400" size={28} />
                <div>
                  <div className="text-sm text-slate-400 mb-1">Phone</div>
                  <div className="font-medium">512-653-0052</div>
                </div>
              </a>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10">
                <MapPin className="text-red-400" size={28} />
                <div>
                  <div className="text-sm text-slate-400 mb-1">Location</div>
                  <div className="font-medium">Austin, TX</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- AI FEATURES --- */}
      
      {/* 1. Job Fit Analyzer Modal */}
      {analyzerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Sparkles size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">AI Job Fit Analyzer</h3>
                  <p className="text-xs text-slate-500">Powered by Gemini ✨</p>
                </div>
              </div>
              <button onClick={() => setAnalyzerOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {!analyzerResult && !isAnalyzing ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    Paste a job description below. My AI assistant will analyze my resume against your requirements and tell you exactly why I&apos;m a great fit for the role.
                  </p>
                  <textarea 
                    className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-sm text-slate-700"
                    placeholder="Paste job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  ></textarea>
                </div>
              ) : isAnalyzing ? (
                <div className="py-12 flex flex-col items-center justify-center text-indigo-600 space-y-4">
                  <Loader2 size={40} className="animate-spin" />
                  <p className="font-medium animate-pulse">Analyzing resume match...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-sm text-slate-700 leading-relaxed">
                    {renderFormattedText(analyzerResult)}
                  </div>
                  <button 
                    onClick={() => { setAnalyzerResult(""); setJobDescription(""); }}
                    className="text-sm text-indigo-600 font-medium hover:underline cursor-pointer"
                  >
                    Analyze another job
                  </button>
                </div>
              )}
            </div>
            
            {!analyzerResult && !isAnalyzing && (
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button 
                  onClick={handleAnalyzeJob}
                  disabled={!jobDescription.trim()}
                  className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} /> Analyze Fit
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Floating AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-[90]">
        {chatOpen ? (
          <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 opacity-100 transition-all">
            {/* Chat Header */}
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-slate-700">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm">Randal&apos;s AI Assistant ✨</div>
                  <div className="text-xs text-blue-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span> Online
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-300 hover:text-white transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-blue-100 text-blue-600'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-slate-600" /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                    {renderFormattedText(msg.text)}
                  </div>
                </div>
              ))}
              {isChatting && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-100 text-blue-600">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 rounded-tl-sm shadow-sm flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex gap-2 relative"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about my experience..."
                  className="w-full bg-slate-100 border border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-full px-4 py-2 text-sm outline-none transition-all pr-12 text-slate-900"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isChatting}
                  className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-400 transition-colors cursor-pointer"
                >
                  <Send size={14} className={chatInput.trim() && !isChatting ? 'ml-1' : ''} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all relative group cursor-pointer"
          >
            <MessageSquare size={24} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-slate-900"></span>
            </span>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-max bg-white text-slate-800 text-sm font-medium py-2 px-4 rounded-xl shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none origin-right">
              Chat with my AI Agent ✨
              {/* Triangle tip */}
              <div className="absolute top-1/2 -mt-2 -right-2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white"></div>
            </div>
          </button>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-8 text-center text-sm border-t border-white/10">
        <p>© {new Date().getFullYear()} Randal Derego. All rights reserved.</p>
      </footer>
    </div>
  );
}
