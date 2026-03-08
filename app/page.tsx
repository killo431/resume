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
const callGeminiAPI = async (prompt, systemInstruction = "") => {
  const apiKey = "";
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

const renderFormattedText = (text) => {
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

const App = () => {
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
  const chatEndRef = useRef(null);

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
    setAnalyzerResult(result);
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
    
    setChatMessages(prev => [...prev, { role: 'model', text: result }]);
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

  const scrollToSection = (id) => {
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
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition-colors">About</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-blue-600 transition-colors">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-blue-600 transition-colors">Experience</button>
            <button onClick={() => scrollToSection('education')} className="hover:text-blue-600 transition-colors">Education</button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Contact Me
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-900"
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
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 flex items-center gap-2"
              >
                View Experience <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => setAnalyzerOpen(true)}
                className="px-6 py-3 bg-indigo-50 text-indigo-700 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-all shadow-sm flex items-center gap-2"
              >
                <Sparkles size={18} className="text-indigo-600" />
                Analyze Job Fit ✨
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
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
                    <li>Managed and maintained servers
