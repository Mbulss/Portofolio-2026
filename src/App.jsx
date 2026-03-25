import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek, listAchievements } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import ChatRoom from "./components/ChatRoom";
import CursorFollower from "./components/CursorFollower";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchSource, setSearchSource] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      const baseUrl = window.location.origin + "/portofolio/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <CursorFollower />
      <div className="fixed top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      <main className="w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero grid md:grid-cols-2 items-center pt-24 xl:gap-0 gap-6 grid-cols-1">
            <div className="animate__animated animate__fadeInUp animate__delay-3s">
              <h1 className="text-5xl font-bold mb-6">
                <ShinyText text="Hi I'm Haniif Satria Wardana" disabled={false} speed={3} className='custom-class' />
              </h1>
              <BlurText
                text="Bridging the world of Artificial Intelligence and Full-Stack Development. Dual-enrolled at Binus International & RMIT Melbourne. I thrive on turning heavy data into seamless user experiences. If it can be optimized with AI, I’m probably already working on it."
                delay={100}
                animateBy="words"
                direction="top"
                className=" mb-6"
              />
              <div className="flex items-center sm:gap-4 gap-2">
                <a 
                  href="./assets/CV.pdf" 
                  download="Haniif_Satria_Wardana_CV.pdf" 
                  className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300"
                >
                  <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
                </a>

                <a href="#project" className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300">
                  <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
                </a>
              </div>
            </div>
            <div className="md:ml-auto animate__animated animate__fadeInUp animate__delay-4s">
              <ProfileCard
                name="Haniif Satria W"
                title="Full Stack Developer / AI Enthusiast"
                handle="haniifwardana"
                status="Online"
                contactText="Contact Me"
                avatarUrl="./assets/Haniif.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
              />
            </div>
          </div>

          {/* About Section */}
          <div className="mt-32 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6" id="about">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8" data-aos="fade-up">
              <div className="basis-full md:basis-5/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-emerald-500/20 overflow-hidden max-w-full flex justify-center ">
                <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
              </div>

              <div className="basis-full md:basis-7/12 pl-0 md:pl-8">
                <div className="flex-1 text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                    About Me
                  </h2>

                  <BlurText
                    text="Yo, I’m Haniif Satria Wardana! Currently pulling a Double Degree in Computer Science at Binus International and AI at RMIT Melbourne. I’m basically obsessed with learning new tech stacks and bridging the gap between heavy-duty backend models and those clean, aesthetic frontend designs. If it’s new, I’m probably already learning it. Driven by precision, powered by AI, and low-key addicted to writing clean, scalable code."
                    delay={50}
                    animateBy="words"
                    direction="top"
                    className="text-base md:text-lg leading-relaxed mb-10 text-gray-300"
                  />

                  <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full">
                    <div>
                      <h1 className="text-3xl md:text-4xl mb-1 mt-0">
                        30<span className="text-emerald-500">+</span>
                      </h1>
                      <p className="m-0">Project Finished</p>
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl mb-1 mt-0">
                        3<span className="text-emerald-500">+</span>
                      </h1>
                      <p className="m-0">Years of Experience</p>
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl mb-1 mt-0">
                        3.57<span className="text-emerald-500">/4.00</span>
                      </h1>
                      <p className="m-0">GPA</p>
                    </div>
                  </div>

                  <ShinyText
                    text="Working with heart, creating with mind."
                    disabled={false}
                    speed={3}
                    className="text-sm md:text-base text-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width sections start here */}
        
        {/* Tools Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tools mt-32">
            <h1 className="text-4xl font-bold mb-4" data-aos="fade-up">Tools & Technologies</h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10" data-aos="fade-up">
              <p className="w-full md:w-2/5 text-base opacity-50">My Professional Skills & Technical Arsenal</p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Category Dropdown */}
                <div className="relative group w-full sm:w-48">
                  <select 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 p-3 px-4 rounded-xl focus:ring-2 focus:ring-emerald-500/50 outline-none text-white transition-all hover:border-zinc-700 appearance-none cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="lang">Programming</option>
                    <option value="ai">AI / Data Science</option>
                    <option value="web">Web Development</option>
                    <option value="dev">DevOps / Tools</option>
                  </select>
                  <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Search Bar */}
                <div className="relative group w-full sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Search tools..." 
                    value={searchSource}
                    onChange={(e) => setSearchSource(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-emerald-500/50 outline-none text-white transition-all hover:border-zinc-700"
                  />
                  <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtered Unified List */}
            {(() => {
              const allFiltered = listTools.filter(item => {
                const matchesSearch = item.nama.toLowerCase().includes(searchSource.toLowerCase()) || 
                                     item.ket.toLowerCase().includes(searchSource.toLowerCase());
                
                let matchesCategory = true;
                if (selectedCategory !== "All") {
                  if (selectedCategory === "lang") matchesCategory = item.id <= 6;
                  else if (selectedCategory === "ai") matchesCategory = item.id > 6 && item.id <= 14;
                  else if (selectedCategory === "web") matchesCategory = item.id > 14 && item.id <= 26;
                  else if (selectedCategory === "dev") matchesCategory = item.id > 26;
                }

                return matchesSearch && matchesCategory;
              });

              const [isToolsExpanded, setIsToolsExpanded] = useState(false);
              const limit = 12;
              const hasMoreTools = allFiltered.length > limit;
              const toolsToShow = (searchSource || isToolsExpanded || selectedCategory !== "All") ? allFiltered : allFiltered.slice(0, limit);

              return (
                <div className="flex flex-col items-center gap-12">
                  <motion.div 
                    layout="position"
                    className="tools-box grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full"
                  >
                    <AnimatePresence mode="popLayout">
                      {toolsToShow.map((tool, index) => (
                        <motion.div
                          layout
                          key={tool.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                              delay: (index % 4) * 0.05,
                              type: "spring",
                              stiffness: 100,
                              damping: 15
                            }
                          }}
                          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                          className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
                        >
                          <img
                            src={tool.gambar}
                            alt={tool.nama}
                            className="w-10 h-10 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                          />
                          <div className="flex flex-col overflow-hidden">
                            <div className="truncate">
                              <ShinyText text={tool.nama} speed={3} className="text-lg font-semibold block" />
                            </div>
                            <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Empty State */}
                  {allFiltered.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800 w-full"
                    >
                      <p className="text-xl text-zinc-500 italic">"Oops, Haniif hasn't learned that one yet (but he probably will tomorrow!)"</p>
                    </motion.div>
                  )}

                  {/* Center Show More Button */}
                  {!searchSource && selectedCategory === "All" && hasMoreTools && (
                    <button 
                      onClick={() => setIsToolsExpanded(!isToolsExpanded)}
                      className="bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 p-3 px-8 rounded-full text-emerald-500 font-semibold shadow-xl transition-all duration-300 hover:shadow-emerald-500/20 active:scale-95 flex items-center gap-2 group"
                    >
                      <span>{isToolsExpanded ? "Show Less" : `Show All (${allFiltered.length - limit} more)`}</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 ${isToolsExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Achievements & Publications Section */}
          <div className="achievements mt-32" id="achievements">
            <h1 className="text-4xl font-bold mb-4" data-aos="fade-up">Certificates & Publications</h1>
            <p className="text-base opacity-50 mb-12" data-aos="fade-up">Formal Recognition & Academic Research</p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Publications Side */}
              <div className="flex flex-col gap-6" data-aos="fade-right">
                <h3 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Academic Publications
                </h3>
                {listAchievements.filter(a => a.type === "publication").map(pub => (
                  <div key={pub.id} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
                        {pub.journal}
                      </span>
                      <span className="text-sm text-zinc-500 font-mono">{pub.date}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{pub.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 italic">"{pub.description}"</p>
                    <a 
                      href={pub.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-500 font-semibold hover:gap-3 transition-all underline decoration-emerald-500/30 underline-offset-4"
                    >
                      Read Publication <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  </div>
                ))}
              </div>

              {/* Certificates Side */}
              <div className="flex flex-col gap-6" data-aos="fade-left">
                <h3 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Professional Certificates
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {listAchievements.filter(a => a.type === "certificate").map(cert => (
                    <div key={cert.id} className="group relative overflow-hidden rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-emerald-500/50 transition-all flex flex-col h-full shadow-lg">
                      {/* Thumbnail Preview Area */}
                      <div className="h-32 w-full overflow-hidden bg-zinc-800/20 relative">
                        {cert.image ? (
                          <img 
                            src={cert.image} 
                            alt={cert.title} 
                            onError={(e) => {
                              e.target.style.display = 'none'; // Sembunyikan kalau 404
                              e.target.nextSibling.style.display = 'flex'; // Munculkan fallback icon
                            }}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                          />
                        ) : null}
                        {/* Fallback Icon (Awalnya tersembunyi kalau ada foto, tapi muncul kalau foto 404 atau emang kosong) */}
                        <div className={`w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-800/20 ${cert.image ? 'hidden' : 'flex'}`}>
                           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">{cert.issuer}</div>
                        <h4 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors leading-tight mb-4">{cert.title}</h4>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-[10px] text-zinc-600 font-mono italic">{cert.date}</span>
                          <a 
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-zinc-400 group-hover:text-emerald-400 transition-colors uppercase font-black tracking-tighter flex items-center gap-1"
                          >
                            VERIFY <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Section */}
          <div className="proyek mt-40 py-10 relative" id="project">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-emerald-500/5 blur-[150px] rounded-full -z-10" />
            
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <ShinyText text="Selected Projects" speed={3} />
              </h2>
            </div>

            <div style={{ height: 'auto', position: 'relative' }} data-aos="zoom-in" data-aos-delay="200">
              <ChromaGrid items={listProyek} onItemClick={handleProjectClick} radius={500} damping={0.45} fadeOut={0.6} ease="power3.out"/>
            </div>
          </div>
        </div>

        {/* Scroll Velocity Animation - TRULY OUTSIDE ANY CONTAINER - DIRECT UNDER MAIN */}
        <div className="mt-20 w-full overflow-hidden" data-aos="fade-up">
          <ScrollVelocity />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Section */}
          <div className="kontak mt-40 sm:p-10 p-0 relative" id="contact">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
            
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                <ShinyText text="Get in Touch" speed={3} />
              </h2>
              <div className="max-w-2xl mx-auto">
                <BlurText 
                  text="Join the community chat or drop me a private message below. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
                  delay={50}
                  animateBy="words"
                  direction="top"
                  className="text-gray-400 text-lg leading-relaxed"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1" data-aos="fade-up">
                <ChatRoom />
              </div>
              <div className="flex-1" data-aos="fade-up">
                <div className="bg-zinc-900/50 backdrop-blur-xl p-8 md:p-10 w-full rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <form action="https://formsubmit.co/niifw39@gmail.com" method="POST" className="relative z-10">
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-sm text-emerald-400 uppercase tracking-widest pl-1">Your Name</label>
                        <input 
                          type="text" 
                          name="Name" 
                          placeholder="What should I call you?" 
                          className="bg-zinc-800/50 border border-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 outline-none text-white transition-all placeholder:text-zinc-600 hover:border-white/10" 
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-sm text-emerald-400 uppercase tracking-widest pl-1">Email Address</label>
                        <input 
                          type="email" 
                          name="Email" 
                          placeholder="Where can I reach you back?" 
                          className="bg-zinc-800/50 border border-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 outline-none text-white transition-all placeholder:text-zinc-600 hover:border-white/10" 
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-sm text-emerald-400 uppercase tracking-widest pl-1">Message</label>
                        <textarea 
                          name="message" 
                          rows="5" 
                          placeholder="How can I help you today?" 
                          className="bg-zinc-800/50 border border-white/5 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 outline-none text-white transition-all resize-none placeholder:text-zinc-600 hover:border-white/10" 
                          required
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        className="group/btn relative font-bold bg-emerald-600 p-4 rounded-2xl w-full overflow-hidden transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] text-white"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Send Message
                          <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProjectModal isOpen={!!selectedProject} onClose={handleCloseModal} project={selectedProject} />
      <Footer />
      <Navbar />
    </div>
  );
}

export default App;
