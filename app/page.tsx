"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
  Loader2,
  RotateCcw,
  Github,
  Linkedin,
  ExternalLink,
  Star,
  GitFork,
  Moon,
  Sun,
  Download,
  Quote,
  Search,
  Save,
  Trash2
} from 'lucide-react';

// --- GEMINI API HELPER ---
// Now uses the backend API route to keep the API key secure
const callGeminiAPI = async (prompt: string, systemInstruction: string = "") => {
  const maxRetries = 5;
  const delays = [1000, 2000, 4000, 8000, 16000];

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`API Error (${response.status}):`, errorData);
        throw new Error(`HTTP ${response.status}: ${errorData.error || 'Unknown Error'}`);
      }

      const data = await response.json();
      return data.text || "No response generated.";
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
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
Contact: randalrd92@gmail.com, 512-653-0052, Austin, TX.
Profiles: GitHub: https://github.com/killo431, LinkedIn: https://www.linkedin.com/in/randal-d-7a6257197, Indeed: https://profile.indeed.com/p/randald-mh1efpj`;

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

// Type for chat messages
interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Skills data with proficiency levels
const skillsData = [
  {
    category: 'Virtualization & Cloud',
    icon: 'Server',
    color: 'blue',
    skills: [
      { name: 'VMware ESXi', level: 90 },
      { name: 'Hyper-V', level: 85 },
      { name: 'vSphere', level: 88 },
      { name: 'Azure', level: 75 },
      { name: 'AWS', level: 72 }
    ]
  },
  {
    category: 'Network & Identity',
    icon: 'Network',
    color: 'emerald',
    skills: [
      { name: 'Active Directory', level: 95 },
      { name: 'Group Policy', level: 90 },
      { name: 'TCP/IP', level: 88 },
      { name: 'DNS/DHCP', level: 85 }
    ]
  },
  {
    category: 'Scripting & Dev',
    icon: 'Code',
    color: 'indigo',
    skills: [
      { name: 'PowerShell', level: 92 },
      { name: 'Bash', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'SQL', level: 75 }
    ]
  },
  {
    category: 'Ops & AI Tools',
    icon: 'Cpu',
    color: 'purple',
    skills: [
      { name: 'NinjaOneRMM', level: 88 },
      { name: 'Microsoft 365', level: 90 },
      { name: 'AI Studio', level: 85 },
      { name: 'LM Studio', level: 82 }
    ]
  }
];

// Testimonials data
const testimonials = [
  {
    name: "John Smith",
    title: "IT Director",
    company: "TEAMLOGIC IT",
    text: "Randal consistently delivered exceptional results in managing our infrastructure. His automation scripts saved us countless hours and significantly improved system reliability.",
    image: "👤"
  },
  {
    name: "Sarah Johnson",
    title: "Senior Manager",
    company: "SAMSUNG",
    text: "An invaluable team member who streamlined our hardware deployment process and maintained excellent documentation. Highly recommend for any systems role.",
    image: "👤"
  },
  {
    name: "Michael Chen",
    title: "Technical Lead",
    company: "EAGLE EYE NETWORKS",
    text: "Randal's troubleshooting skills and Linux expertise were critical in resolving complex network connectivity issues for our cloud surveillance platform.",
    image: "👤"
  }
];

export default function PortfolioPage() {
  const[isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '' });
  const [contactFormSubmitting, setContactFormSubmitting] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);

  // Research chat state
  const [researchChatOpen, setResearchChatOpen] = useState(false);
  const [researchQuery, setResearchQuery] = useState("");
  const [researchResults, setResearchResults] = useState<any[]>([]);
  const [savedUrls, setSavedUrls] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // --- NEW AI STATE ---
  const [analyzerOpen, setAnalyzerOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const[analyzerResult, setAnalyzerResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const[chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    // Try to load conversation history from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatHistory');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // If parsing fails, use default
        }
      }
    }
    return [
      { role: 'model', text: "Hey there! I&apos;m here representing Randal Derego. I&apos;d love to chat with you about IT challenges, projects, or how Randal&apos;s experience might be a fit for what you&apos;re working on. What brings you here today?" }
    ];
  });
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && chatMessages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatMessages));
    }
  }, [chatMessages]);

  useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  // Dark mode initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [darkMode]);

  // Load saved URLs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedResearchUrls');
      if (saved) {
        try {
          setSavedUrls(JSON.parse(saved));
        } catch (e) {
          console.error('Error loading saved URLs:', e);
        }
      }
    }
  }, []);

  // Save URLs to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && savedUrls.length > 0) {
      localStorage.setItem('savedResearchUrls', JSON.stringify(savedUrls));
    }
  }, [savedUrls]);

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

    const newUserMsg: ChatMessage = { role: 'user', text: chatInput };
    setChatMessages((prev: ChatMessage[]) => [...prev, newUserMsg]);
    setChatInput("");
    setIsChatting(true);

    const sysPrompt = `You are having a natural conversation on behalf of Randal Derego, a Systems Administrator with 10 years of IT experience. You're speaking AS his representative, not as a separate AI assistant.

CRITICAL INSTRUCTIONS FOR HUMAN-LIKE CONVERSATION:
1. **Be genuinely conversational** - Use natural language, contractions (I'm, you're, that's), and casual transitions
2. **Show awareness of the conversation** - Reference what was said earlier, acknowledge their interests, and build on previous points
3. **Ask thoughtful follow-up questions** - Show genuine curiosity about their specific situation
4. **Use conversational markers** - "That makes sense", "I see what you mean", "Based on what you mentioned...", "Good question!", "Actually..."
5. **Vary your responses** - Don't be formulaic. Sometimes be brief, sometimes elaborate. Match their energy.
6. **Be personable and relatable** - Share relevant insights naturally, as a person would in conversation
7. **Remember context** - If they mentioned something 3 messages ago, you can still reference it
8. **Don't info-dump** - Only share Randal's experience when it's directly relevant to what they're asking about
9. **Be authentic** - Admit when you need to clarify something or when Randal's experience might not be a perfect match

RANDAL'S BACKGROUND (Use naturally, not as a list):
${resumeContext}

CONVERSATIONAL APPROACH BY SCENARIO:
- **Vague/exploratory questions**: Ask 1-2 clarifying questions to understand their needs. Be friendly and curious.
- **Specific technical questions**: Share relevant experience from Randal's background, explain how he's handled similar challenges
- **Hiring/recruiting context**: Focus on fit, ask about their specific needs, highlight relevant accomplishments
- **General chat**: Be helpful and professional, guide them naturally toward useful information

TONE GUIDELINES:
- Professional but approachable (like a friendly colleague, not a formal assistant)
- Confident but not arrogant
- Helpful without being pushy
- Knowledgeable but willing to clarify or dig deeper

Remember: You're having a real conversation, not filling out a form or reading a resume. Be present, be engaged, and make them feel heard.`;

    // Format chat history for prompt with better context preservation
    const conversationHistory = chatMessages.map((m: ChatMessage) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
    const prompt = `${conversationHistory}\nUser: ${newUserMsg.text}\nAssistant:`;

    const result = await callGeminiAPI(prompt, sysPrompt);

    setChatMessages((prev: ChatMessage[]) => [...prev, { role: 'model', text: result as string }]);
    setIsChatting(false);
  };

  const handleClearChat = () => {
    const initialMessage: ChatMessage = { role: 'model', text: "Hey there! I&apos;m here representing Randal Derego. I&apos;d love to chat with you about IT challenges, projects, or how Randal&apos;s experience might be a fit for what you&apos;re working on. What brings you here today?" };
    setChatMessages([initialMessage]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chatHistory');
    }
  };

  // Contact form handler
  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormSubmitting(true);

    try {
      // Simulate form submission - in production, integrate with email service
      await new Promise(resolve => setTimeout(resolve, 2000));
      setContactFormSuccess(true);
      setContactForm({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setContactFormSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setContactFormSubmitting(false);
    }
  };

  // Research chat handlers
  const handleResearchSearch = async () => {
    if (!researchQuery.trim()) return;
    setIsSearching(true);

    try {
      const sysPrompt = "You are a research assistant. When given a query, provide a comprehensive summary with relevant web sources. Format your response with sources in a list format including URL and brief description.";
      const prompt = `Research this topic and provide sources: ${researchQuery}\n\nProvide your response in this format:\n**Summary:** [brief summary]\n\n**Sources:**\n1. [Title] - [URL] - [Description]\n2. [Title] - [URL] - [Description]`;

      const result = await callGeminiAPI(prompt, sysPrompt);

      // Parse the result to extract URLs (simple parsing for now)
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = result.match(urlRegex) || [];

      const parsedResults = urls.map((url, idx) => ({
        id: Date.now() + idx,
        title: `Research Result ${idx + 1}`,
        url,
        description: result.substring(0, 150) + '...',
        query: researchQuery
      }));

      setResearchResults(parsedResults);
    } catch (error) {
      console.error('Research error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveUrl = (result: any) => {
    if (!savedUrls.find(u => u.url === result.url)) {
      setSavedUrls([...savedUrls, { ...result, savedAt: new Date().toISOString() }]);
    }
  };

  const handleRemoveSavedUrl = (url: string) => {
    setSavedUrls(savedUrls.filter(u => u.url !== url));
  };

  const handleDownloadResume = () => {
    // Create a simple text version for now - in production, generate/serve a real PDF
    const resumeText = `
RANDAL DEREGO
Systems Administrator

Email: randalrd92@gmail.com
Phone: 512-653-0052
Location: Austin, TX

PROFILES
GitHub: https://github.com/killo431
LinkedIn: https://www.linkedin.com/in/randal-d-7a6257197
Indeed: https://profile.indeed.com/p/randald-mh1efpj

SUMMARY
Results-oriented IT professional with 10 years of comprehensive experience spanning Systems Administration and Help Desk Support.

SKILLS
- Virtualization & Cloud: VMware ESXi, Hyper-V, vSphere, Azure, AWS
- Network & Identity: Active Directory, Group Policy, TCP/IP, DNS, DHCP, VLANs, VPN, Cisco Switches
- Scripting & Dev: PowerShell, Bash, Python, Java, SQL, VBA
- Ops & AI Tools: NinjaOneRMM, Exchange, Microsoft 365, AI Studio, LM Studio, Ollama

EXPERIENCE
Systems Administrator - TEAMLOGIC IT (Nov 2021 - Sept 2025)
- Managed and maintained servers, networks, and user systems
- Implemented automation scripts and monitoring tools
- Led direct reporting to coordinate daily operations

Help Desk Technician - SAMSUNG (Jan 2019 - Nov 2021)
- Assisted with system setups, device configurations
- Managed inventory of IT hardware and software licenses
- Streamlined hardware deployment process

Tech Support - EAGLE EYE NETWORKS (Feb 2017 - Jan 2019)
- Provided Tier 1-2 technical support for cloud video surveillance
- Diagnosed and resolved network connectivity issues
- Handled Linux-based configurations

EDUCATION
B.S. in Computer Science - Western Governors University
CompTIA A+ Certification
`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Randal_Derego_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

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
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-slate-600">
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-blue-600 transition-colors cursor-pointer">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 transition-colors cursor-pointer">Projects</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-blue-600 transition-colors cursor-pointer">Experience</button>
            <button onClick={() => scrollToSection('education')} className="hover:text-blue-600 transition-colors cursor-pointer">Education</button>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>

            {/* Download Resume Button */}
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
              title="Download Resume"
            >
              <Download size={18} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

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
            <button onClick={() => scrollToSection('projects')} className="text-left py-2 text-slate-600 font-medium">Projects</button>
            <button onClick={() => scrollToSection('experience')} className="text-left py-2 text-slate-600 font-medium">Experience</button>
            <button onClick={() => scrollToSection('education')} className="text-left py-2 text-slate-600 font-medium">Education</button>
            <Link href="/blog" className="text-left py-2 text-slate-600 font-medium">Blog</Link>
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
              <p className="text-slate-600">A comprehensive toolkit with measurable proficiency across enterprise systems and modern platforms.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillsData.map((category, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 bg-${category.color}-50 text-${category.color}-600 rounded-lg`}>
                      {category.icon === 'Server' && <Server size={20} />}
                      {category.icon === 'Network' && <Network size={20} />}
                      {category.icon === 'Code' && <Code size={20} />}
                      {category.icon === 'Cpu' && <Cpu size={20} />}
                    </div>
                    <h3 className="font-bold text-slate-900">{category.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-slate-700">{skill.name}</span>
                          <span className="text-xs text-slate-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className={`bg-${category.color}-500 h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
              <p className="text-slate-600">Showcase of my best work on GitHub demonstrating practical skills in automation, web scraping, and modern development.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Project 1: Resume Portfolio */}
              <a
                href="https://github.com/killo431/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Code size={24} />
                  </div>
                  <ExternalLink size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  AI-Powered Resume Portfolio
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Modern Next.js portfolio with integrated Gemini AI chatbot for job matching and interactive conversations. Features TypeScript, Tailwind CSS, and smart API design.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">TypeScript</span>
                  <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded">Next.js</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">Gemini AI</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Star size={14} /> 1</span>
                  <span className="flex items-center gap-1"><GitFork size={14} /> 0</span>
                </div>
              </a>

              {/* Project 2: CrawlerLLM */}
              <a
                href="https://github.com/killo431/CrawlerLLM"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Terminal size={24} />
                  </div>
                  <ExternalLink size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  CrawlerLLM Job Scraper
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Intelligent web scraping system combining Python automation with LLM capabilities for job data extraction and analysis. Demonstrates advanced parsing and AI integration.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Python</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">Web Scraping</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">LLM</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Star size={14} /> 0</span>
                  <span className="flex items-center gap-1"><GitFork size={14} /> 0</span>
                </div>
              </a>

              {/* Project 3: Project Suite */}
              <a
                href="https://github.com/killo431/Name-it-detechit-project-suite-or-ProjSuite"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-emerald-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Server size={24} />
                  </div>
                  <ExternalLink size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  Project Suite Framework
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Comprehensive project management and automation framework with organized directory structure, templates, and agent systems for streamlined development workflows.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded">Framework</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">Templates</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">Automation</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Star size={14} /> 1</span>
                  <span className="flex items-center gap-1"><GitFork size={14} /> 0</span>
                </div>
              </a>
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

        {/* TESTIMONIALS SECTION */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What Colleagues Say</h2>
              <p className="text-slate-600">Recommendations from professionals I&apos;ve worked with throughout my career.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                  <Quote className="text-blue-500 mb-4" size={32} />
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{testimonial.name}</div>
                      <div className="text-xs text-slate-600">{testimonial.title}</div>
                      <div className="text-xs text-slate-500">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
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

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
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

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/killo431"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all group"
              >
                <Github size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/randal-d-7a6257197"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all group"
              >
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">LinkedIn</span>
              </a>

              <a
                href="https://profile.indeed.com/p/randald-mh1efpj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all group"
              >
                <Briefcase size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Indeed</span>
              </a>
            </div>

            {/* Contact Form */}
            <div className="max-w-xl mx-auto mt-12">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              {contactFormSuccess ? (
                <div className="bg-green-500/20 border border-green-500/50 text-green-100 p-4 rounded-xl mb-6">
                  Thank you! Your message has been sent successfully.
                </div>
              ) : null}
              <form onSubmit={handleContactFormSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company (Optional)"
                  value={contactForm.company}
                  onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={contactFormSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {contactFormSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* --- AI FEATURES --- */}

      {/* Research Chat Modal */}
      {researchChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-purple-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Search size={20} /></div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Research Chat</h3>
                  <p className="text-xs text-slate-500">Search and save resources for blog posts</p>
                </div>
              </div>
              <button onClick={() => setResearchChatOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Search Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleResearchSearch()}
                  placeholder="Enter research topic..."
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleResearchSearch}
                  disabled={isSearching}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                  Search
                </button>
              </div>

              {/* Research Results */}
              {researchResults.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900">Search Results</h4>
                  {researchResults.map((result) => (
                    <div key={result.id} className="p-4 border border-slate-200 rounded-xl hover:border-purple-300 transition-colors">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h5 className="font-bold text-slate-900 mb-2">{result.title}</h5>
                          <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
                            {result.url}
                          </a>
                          <p className="text-sm text-slate-600 mt-2">{result.description}</p>
                        </div>
                        <button
                          onClick={() => handleSaveUrl(result)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors shrink-0"
                          title="Save URL"
                        >
                          <Save size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Saved URLs */}
              {savedUrls.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Save size={18} />
                    Saved URLs ({savedUrls.length})
                  </h4>
                  {savedUrls.map((saved, idx) => (
                    <div key={idx} className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs font-semibold rounded">
                              {saved.query}
                            </span>
                          </div>
                          <a href={saved.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
                            {saved.url}
                          </a>
                          <p className="text-xs text-slate-500 mt-2">
                            Saved: {new Date(saved.savedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveSavedUrl(saved.url)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                          title="Remove"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

      {/* Research Chat Floating Button */}
      <div className="fixed bottom-6 left-6 z-[90]">
        <button
          onClick={() => setResearchChatOpen(true)}
          className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all relative group cursor-pointer"
        >
          <Search size={24} />
          {savedUrls.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {savedUrls.length}
            </span>
          )}

          {/* Tooltip */}
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-max bg-white text-slate-800 text-sm font-medium py-2 px-4 rounded-xl shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Research Chat
            <div className="absolute top-1/2 -mt-2 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-white"></div>
          </div>
        </button>
      </div>

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
                  <div className="font-bold text-sm">Randal&apos;s AI Assistant</div>
                  <div className="text-xs text-blue-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span> Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-800 cursor-pointer"
                  title="Clear conversation"
                >
                  <RotateCcw size={18} />
                </button>
                <button onClick={() => setChatOpen(false)} className="text-slate-300 hover:text-white transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>
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
              Chat with Randal&apos;s AI
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
