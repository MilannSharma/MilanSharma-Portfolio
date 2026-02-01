import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import CertificationCard from './components/CertificationCard';
import LifeStyleCard from './components/LifeStyleCard';
import SubscribeModal from './components/SubscribeModal';
import Globe from './components/Globe';
import Resume from './components/Resume';
import { SKILLS, PROJECTS, CERTIFICATIONS, LIFESTYLE } from './constants';
import { POSTS } from './blogData';
import { 
  Zap, 
  MapPin, 
  User,
  FileText,
  Mail,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Newspaper,
  BookOpen,
  ArrowLeft,
  Clock,
  HelpCircle,
  Link as LinkIcon,
  ChevronRight
} from 'lucide-react';

type TabType = 'about' | 'resume' | 'contact' | 'library';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  
  // Contact Form State
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techStackIcons = [
    "python", "mysql", "flask", "docker", "pytorch", "tensorflow", 
    "fastapi", "pandas", "numpy", "git", "sqlite", "jupyter", "mongodb", "postgresql", "linux"
  ].map(slug => `https://cdn.simpleicons.org/${slug}`);

  const navigateToTab = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedPostSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPost = (slug: string) => {
    setSelectedPostSlug(slug);
    setActiveTab('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    
    // Simulate API call for form submission
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    }, 2000);
  };

  const renderBlogDetail = () => {
    const post = POSTS.find(p => p.slug === selectedPostSlug);
    if (!post) return null;

    // Get 2 suggested blogs (not including current)
    const suggested = POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <button 
          onClick={() => setSelectedPostSlug(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#f59e0b] transition-colors mb-6 md:mb-10 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} /> Back to Library
        </button>
        
        <div className="mb-4 md:mb-6">
          <span className="text-[9px] md:text-[10px] font-black text-[#f59e0b] uppercase tracking-[0.3em] bg-[#f59e0b]/10 px-2.5 py-1 rounded-lg border border-[#f59e0b]/20">
            {post.tags[0]}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-6xl font-black text-white tracking-tight leading-[1.2] md:leading-[1.1] mb-8 md:mb-10">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 md:gap-8 pb-8 md:pb-10 border-b border-[#222] mb-8 md:mb-12">
          <div className="flex items-center gap-3 md:gap-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#333] shadow-lg" />
            <div>
              <div className="text-[13px] md:text-[15px] font-bold text-white leading-none mb-1 md:mb-1.5">{post.author.name}</div>
              <div className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">{post.author.role}</div>
            </div>
          </div>
          <div className="hidden md:block h-6 w-[1px] bg-[#333]"></div>
          <div className="flex items-center gap-4 md:gap-5 text-gray-500 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
            <span>{post.date}</span>
            <span className="w-1.5 h-1.5 bg-[#333] rounded-full hidden md:inline-block"></span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-[#f59e0b]" /> {post.readTime || '10 MIN READ'}</span>
          </div>
        </div>

        <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[24px] md:rounded-[40px] overflow-hidden mb-12 md:mb-16 border border-[#222] shadow-2xl">
          <img src={post.image} alt="" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
        </div>

        {/* Detailed Blog Content */}
        <div className="max-w-4xl mx-auto px-1 md:px-0">
          <div className="prose prose-invert prose-lg max-w-none space-y-6 md:space-y-8 text-gray-300 leading-[1.7] md:leading-[1.8] text-[16px] md:text-[18px]">
             <div 
               dangerouslySetInnerHTML={{ 
                 __html: post.content
                   .replace(/## (.*)/g, '<h2 class="text-2xl md:text-3xl font-black text-white mt-12 md:mt-20 mb-6 md:mb-8 tracking-tight border-l-4 border-[#f59e0b] pl-4 md:pl-6">$1</h2>')
                   .replace(/### (.*)/g, '<h3 class="text-xl md:text-2xl font-bold text-white mt-8 md:mt-12 mb-4 md:mb-6 tracking-tight">$1</h3>')
                   .replace(/\*\*(.*)\*\*/g, '<strong class="text-white font-black">$1</strong>')
                   .replace(/`(.*)`/g, '<code class="bg-[#121212] text-[#f59e0b] px-2 py-1 rounded-lg font-mono text-[14px] md:text-[15px] border border-[#222]">$1</code>')
               }} 
             />
          </div>

          {/* Resources Section */}
          {post.resources && post.resources.length > 0 && (
            <div className="mt-16 md:mt-24 p-6 md:p-10 bg-[#121212] rounded-[24px] md:rounded-[32px] border border-[#222] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-6 md:mb-10 flex items-center gap-3">
                <LinkIcon size={14} className="text-[#f59e0b]" /> Research & Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {post.resources.map((res, i) => (
                  <a 
                    key={i} 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 md:p-5 bg-[#1a1a1a] rounded-xl md:rounded-2xl border border-[#252525] hover:border-[#f59e0b]/40 hover:bg-[#1a1a1a]/80 transition-all group/link"
                  >
                    <span className="text-[13px] md:text-sm font-bold text-gray-300 group-hover/link:text-white truncate pr-4">{res.title}</span>
                    <ExternalLink size={16} className="text-gray-600 group-hover/link:text-[#f59e0b] transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge Check: 5 Questions */}
          {post.questions && post.questions.length > 0 && (
            <div className="mt-16 md:mt-24">
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center border border-[#f59e0b]/20">
                   {/* Fix: Removed non-existent md:size prop and consolidated to a standard size={20} */}
                   <HelpCircle size={20} className="text-[#f59e0b]" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Technical Deep Dive Q&A</h3>
              </div>
              <div className="space-y-4 md:space-y-6">
                {post.questions.slice(0, 5).map((q, idx) => (
                  <div key={idx} className="bg-[#121212] p-6 md:p-8 rounded-[20px] md:rounded-[28px] border border-[#222] hover:border-[#f59e0b]/20 transition-all group">
                    <div className="flex gap-4 md:gap-6">
                      <span className="text-xl md:text-2xl font-black text-[#f59e0b]/20 group-hover:text-[#f59e0b]/40 transition-colors">0{idx + 1}</span>
                      <div className="space-y-2 md:space-y-4">
                        <h4 className="text-[15px] md:text-[17px] font-black text-white leading-snug">{q.question}</h4>
                        <p className="text-[14px] md:text-[15px] text-gray-400 font-medium leading-relaxed">{q.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Blogs */}
          <div className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-[#222]">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-8 md:mb-12">Related Breakthroughs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {suggested.map((sPost) => (
                <div 
                  key={sPost.slug}
                  onClick={() => handleOpenPost(sPost.slug)}
                  className="group cursor-pointer bg-[#121212] p-5 md:p-6 rounded-[20px] md:rounded-[28px] border border-[#222] hover:border-[#f59e0b]/40 transition-all flex flex-col gap-3 md:gap-4"
                >
                  <div className="aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    <img src={sPost.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-[#f59e0b] uppercase tracking-widest mb-1 block">{sPost.tags[0]}</span>
                    <h4 className="text-[15px] md:text-lg font-black text-white leading-tight group-hover:text-[#f59e0b] transition-colors">{sPost.title}</h4>
                    <button className="mt-3 md:mt-4 flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-all">
                      Read Insight <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'resume':
        return <Resume />;
      case 'library':
        if (selectedPostSlug) return renderBlogDetail();
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-3xl mb-10 md:mb-16">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 md:mb-6">NeuralPath Library</h1>
              <p className="text-gray-400 text-[14px] md:text-[16px] leading-relaxed font-medium">
                Daily breakthroughs in AI, Data Science, and Agentic Workflows.
                Explore our high-signal library of technical insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pb-20">
              {POSTS.map((post) => (
                <div 
                  key={post.slug}
                  onClick={() => handleOpenPost(post.slug)}
                  className="group cursor-pointer space-y-3 md:space-y-4"
                >
                  <div className="aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden border border-[#222] bg-[#121212]">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 px-1">
                    <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-black text-[#f59e0b] uppercase tracking-widest">
                      <span>{post.tags[0]}</span>
                      <span className="w-1 h-1 bg-[#333] rounded-full"></span>
                      <span className="text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-black text-white group-hover:text-[#f59e0b] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-[12px] md:text-[13px] line-clamp-2 leading-relaxed font-medium">
                      {post.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-3 md:gap-4 mb-10 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Get in Touch</h1>
              <p className="text-gray-400 font-medium max-w-xl text-sm md:text-base">Have a project in mind or just want to chat? Drop a message below and I'll get back to you as soon as possible.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#121212] p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-[#222] shadow-xl overflow-hidden">
                  <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-[0.2em] mb-6 md:mb-8 flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#f59e0b] rounded-full"></span>
                    Contact Information
                  </h3>
                  <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center gap-4 md:gap-5 group cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-[#f59e0b] border border-[#252525] group-hover:border-[#f59e0b]/50 transition-all flex-shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">Location</p>
                        <p className="text-[12px] md:text-[13px] text-gray-300 font-bold group-hover:text-white transition-colors break-words">Pune, Maharashtra, India</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-5 group cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-[#f59e0b] border border-[#252525] group-hover:border-[#f59e0b]/50 transition-all flex-shrink-0">
                        <Mail size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">Email</p>
                        <p className="text-[12px] md:text-[13px] text-gray-300 font-bold group-hover:text-white transition-colors break-all">milansharma942105@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-[#252525]">
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.4em] mb-4 md:mb-6">Social Networks</p>
                    <div className="flex flex-col gap-2.5 md:gap-3">
                      <a href="https://linkedin.com/in/milansharma01" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 md:p-4 bg-[#1a1a1a] rounded-xl md:rounded-2xl border border-[#252525] hover:border-[#f59e0b]/30 group transition-all">
                        <span className="text-[11px] md:text-xs font-bold text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
                        <ExternalLink size={14} className="text-gray-600 group-hover:text-[#f59e0b]" />
                      </a>
                      <a href="https://github.com/MilannSharma" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 md:p-4 bg-[#1a1a1a] rounded-xl md:rounded-2xl border border-[#252525] hover:border-[#f59e0b]/30 group transition-all">
                        <span className="text-[11px] md:text-xs font-bold text-gray-400 group-hover:text-white transition-colors">GitHub</span>
                        <ExternalLink size={14} className="text-gray-600 group-hover:text-[#f59e0b]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-[#121212] p-6 md:p-10 rounded-[24px] md:rounded-[40px] border border-[#222] shadow-2xl relative overflow-hidden">
                  {formState === 'success' ? (
                    <div className="py-10 md:py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 mb-5 md:mb-6">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">Message Received!</h3>
                      <p className="text-gray-400 max-w-xs text-[13px] md:text-sm">Thanks for reaching out, Milan. I'll get back to you shortly.</p>
                      <button 
                        onClick={() => setFormState('idle')}
                        className="mt-8 md:mt-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#f59e0b] hover:underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Full Name</label>
                          <input 
                            required
                            type="text" 
                            placeholder="e.g. John Doe"
                            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-xl md:rounded-2xl px-4 md:px-5 py-3.5 md:py-4 text-sm font-medium text-white focus:outline-none focus:border-[#f59e0b]/50 transition-all placeholder:text-gray-600"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Email Address</label>
                          <input 
                            required
                            type="email" 
                            placeholder="e.g. john@example.com"
                            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-xl md:rounded-2xl px-4 md:px-5 py-3.5 md:py-4 text-sm font-medium text-white focus:outline-none focus:border-[#f59e0b]/50 transition-all placeholder:text-gray-600"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Subject</label>
                        <input 
                          required
                          type="text" 
                          placeholder="What is this about?"
                          className="w-full bg-[#1a1a1a] border border-[#252525] rounded-xl md:rounded-2xl px-4 md:px-5 py-3.5 md:py-4 text-sm font-medium text-white focus:outline-none focus:border-[#f59e0b]/50 transition-all placeholder:text-gray-600"
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">Your Message</label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="Write your message here..."
                          className="w-full bg-[#1a1a1a] border border-[#252525] rounded-xl md:rounded-2xl px-4 md:px-5 py-3.5 md:py-4 text-sm font-medium text-white focus:outline-none focus:border-[#f59e0b]/50 transition-all placeholder:text-gray-600 resize-none"
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={formState === 'loading'}
                        className="w-full bg-[#f59e0b] text-black py-4 md:py-5 rounded-xl md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 mt-2 md:mt-4 shadow-xl shadow-[#f59e0b]/10"
                      >
                        {formState === 'loading' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'about':
      default:
        return (
          <div className="space-y-16 md:space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section id="about">
              <div className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-sm">
                <span className="text-[#f59e0b] font-bold text-base">$</span>
                <h2 className="text-gray-200 font-bold flex items-center gap-2">ls -al V56 📊</h2>
              </div>
              <div className="space-y-4 md:space-y-6 text-gray-400 leading-relaxed text-[15px] md:text-[16px] font-medium max-w-3xl">
                <p>
                  I am a Python Developer and Data Engineer with a passion for building scalable solutions and solving real-world 
                  problems. My expertise spans Python development, Data Science, Backend APIs, and Data Analysis.
                </p>
                <p>
                  Self-motivated, Problem solver, Tech enthusiast, Passionate coder 💻
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-sm">
                <span className="text-[#f59e0b] font-bold text-base">$</span>
                <h2 className="text-gray-200 font-bold">ls -al Coding Stats</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div className="bg-[#121212] rounded-2xl pt-6 md:pt-8 pb-4 md:pb-6 px-6 md:px-8 border border-[#222] shadow-xl overflow-hidden relative glowing-border flex flex-col justify-center h-[180px] md:h-[220px]">
                  <div className="flex items-center gap-3 text-white mb-6 md:mb-8">
                    <Zap size={18} className="text-[#f59e0b]" />
                    <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">Tech Stacks</span>
                  </div>
                  <div className="relative w-full h-16 md:h-24 marquee-mask flex items-center overflow-hidden">
                    <div className="animate-marquee-ltr flex items-center">
                      {[...techStackIcons, ...techStackIcons].map((url, i) => (
                        <div key={`stack-${i}`} className="mx-6 md:mx-10 shrink-0 flex items-center justify-center">
                           <img src={url} className="h-10 w-10 md:h-14 md:w-14 object-contain transition-all hover:scale-125" alt="tech" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#121212] rounded-2xl border border-[#222] shadow-xl overflow-hidden relative flex flex-col glowing-border h-[180px] md:h-[220px]">
                  <div className="flex items-center gap-2 text-white p-4 md:p-5 z-20 absolute top-0 left-0 w-full pointer-events-none">
                    <MapPin size={18} className="text-[#f59e0b]" />
                    <h2 className="text-[10px] md:text-xs font-black tracking-widest uppercase whitespace-nowrap">Pune, India</h2>
                  </div>
                  <div className="w-full h-full flex items-center justify-center scale-[1.1] md:scale-[1.25] translate-y-2 md:translate-y-4">
                     <Globe />
                  </div>
                </div>
              </div>
            </section>

            <section id="skills">
              <div className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-sm">
                <span className="text-[#f59e0b] font-bold text-base">$</span>
                <h2 className="text-gray-200 font-bold">ls -al Skills</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {SKILLS.map((skill, idx) => (
                  <SkillCard key={idx} {...skill} />
                ))}
              </div>
            </section>

            <section id="projects">
              <div className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-sm">
                <span className="text-[#f59e0b] font-bold text-base">$</span>
                <h2 className="text-gray-200 font-bold">ls -al Featured Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </section>

            <section id="certifications">
              <div className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-sm">
                <span className="text-[#f59e0b] font-bold text-base">$</span>
                <h2 className="text-gray-200 font-bold">ls -al Certifications</h2>
              </div>
              <div className="space-y-10 md:space-y-12">
                {CERTIFICATIONS.map((category, idx) => (
                  <div key={idx} className="space-y-4 md:space-y-6">
                    <h3 className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] ml-1">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {category.items.map((cert, cIdx) => (
                        <CertificationCard key={cIdx} {...cert} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="lifestyle">
              <div className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-sm">
                <span className="text-[#f59e0b] font-bold text-base">$</span>
                <h2 className="text-gray-200 font-bold">ls -al Life Style</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {LIFESTYLE.map((item, idx) => (
                  <LifeStyleCard key={idx} {...item} />
                ))}
              </div>
            </section>

            <section id="newsletter-cta" className="pb-12 md:pb-16">
               <div className="bg-[#121212] rounded-[24px] md:rounded-[32px] p-6 md:p-12 border border-[#222] relative overflow-hidden group hover:border-[#f59e0b]/40 transition-all shadow-2xl main-card-shadow">
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
                    <div className="flex-1 space-y-3 md:space-y-4 text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#1a1a1a] flex items-center justify-center border border-[#252525]">
                          {/* Fix: Removed non-existent md:size prop and consolidated to a standard size={24} */}
                          <Newspaper className="text-[#f59e0b]" size={24} />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Newsletter</span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                        SUBSCRIBE <span className="text-[#f59e0b]">TECH</span> NEWSLETTER
                      </h3>
                      <p className="text-gray-400 text-[14px] md:text-[15px] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Join NeuralPath to receive daily updates on AI breakthroughs and high-signal tech insights directly.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-auto">
                      <button
                        onClick={() => navigateToTab('library')}
                        className="flex items-center justify-center gap-3 md:gap-4 bg-[#1a1a1a] text-white px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[12px] md:text-sm uppercase tracking-widest border border-[#333] hover:border-[#f59e0b]/50 transition-all shadow-xl"
                      >
                        Open Library
                        <BookOpen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsSubscribeOpen(true)}
                        className="flex items-center justify-center gap-3 md:gap-4 bg-[#f59e0b] text-black px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[12px] md:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl"
                      >
                        Subscribe
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
               </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090909] text-gray-300 p-3 sm:p-6 md:p-10 lg:p-16 font-sans selection:bg-[#f59e0b] selection:text-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-10 items-start relative z-10">
        <Sidebar />
        <main className="flex-1 bg-[#1a1a1a] rounded-[32px] md:rounded-[48px] border border-[#222] p-6 sm:p-10 md:p-14 main-card-shadow relative overflow-hidden mb-24 lg:mb-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 md:mb-16 relative z-10">
            <div className="flex flex-col gap-2 mb-6 md:mb-0 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter flex items-center justify-center md:justify-start gap-3 md:gap-4 whitespace-nowrap">
                Milan Sharma <span className="text-3xl md:text-4xl">💻</span>
              </h1>
              <div className="w-12 md:w-16 h-1.5 bg-[#f59e0b] rounded-full mt-1 shadow-[0_0_15px_rgba(245,158,11,0.4)] mx-auto md:mx-0"></div>
            </div>
            
            <div className="bg-[#121212] px-4 md:px-8 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl border border-[#222]">
              <nav className="flex flex-nowrap gap-x-6 md:gap-x-10 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-gray-500 overflow-x-auto no-scrollbar justify-center">
                <button onClick={() => navigateToTab('about')} className={`${activeTab === 'about' ? 'text-[#f59e0b]' : 'hover:text-white'} transition-colors whitespace-nowrap`}>
                  About
                </button>
                <button onClick={() => navigateToTab('resume')} className={`${activeTab === 'resume' ? 'text-[#f59e0b]' : 'hover:text-white'} transition-colors whitespace-nowrap`}>
                  Resume
                </button>
                <button onClick={() => navigateToTab('library')} className={`${activeTab === 'library' ? 'text-[#f59e0b]' : 'hover:text-white'} transition-colors whitespace-nowrap`}>
                  Library
                </button>
                <button onClick={() => navigateToTab('contact')} className={`${activeTab === 'contact' ? 'text-[#f59e0b]' : 'hover:text-white'} transition-colors whitespace-nowrap`}>
                  Contact
                </button>
              </nav>
            </div>
          </div>

          <div className="relative z-10">
            {renderContent()}
          </div>
        </main>
      </div>

      <div className={`fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 transform ${showFloatingNav ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'} w-full px-4 md:px-6 max-w-sm md:max-w-md`}>
        <div className="bg-[#121212]/30 backdrop-blur-[28px] border border-white/10 px-6 md:px-10 py-4 md:py-5 rounded-[24px] md:rounded-[36px] flex items-center justify-between shadow-[0_25px_60px_rgba(0,0,0,0.6)] mobile-nav-shadow">
          <button onClick={() => navigateToTab('about')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'about' ? 'text-[#f59e0b] scale-110' : 'text-gray-500 hover:text-white'}`}>
            {/* Fix: Removed non-existent md:size prop and consolidated to a standard size={24} */}
            <User size={24} strokeWidth={2.5} />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Bio</span>
          </button>
          <button onClick={() => navigateToTab('resume')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'resume' ? 'text-[#f59e0b] scale-110' : 'text-gray-500 hover:text-white'}`}>
            {/* Fix: Removed non-existent md:size prop and consolidated to a standard size={24} */}
            <FileText size={24} strokeWidth={2.5} />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Work</span>
          </button>
          <button onClick={() => navigateToTab('library')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'library' ? 'text-[#f59e0b] scale-110' : 'text-gray-500 hover:text-white'}`}>
            {/* Fix: Removed non-existent md:size prop and consolidated to a standard size={24} */}
            <BookOpen size={24} strokeWidth={2.5} />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Read</span>
          </button>
          <button onClick={() => navigateToTab('contact')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'contact' ? 'text-[#f59e0b] scale-110' : 'text-gray-500 hover:text-white'}`}>
            {/* Fix: Removed non-existent md:size prop and consolidated to a standard size={24} */}
            <MessageSquare size={24} strokeWidth={2.5} />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Talk</span>
          </button>
        </div>
      </div>

      <SubscribeModal 
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />
    </div>
  );
};

export default App;