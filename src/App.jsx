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
import Journey from "./components/Journey/Journey";
import Card3DViewer from "./components/Card3DViewer/Card3DViewer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from "framer-motion";
import { RiGraduationCapFill, RiVerifiedBadgeFill, RiArrowRightLine, RiExternalLinkLine, RiMailSendLine, RiMapPinLine } from "react-icons/ri";

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

  // Removed redundant reload/redirect logic to improve performance

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
      duration: 600, // Faster animations for better feel
      once: true,
      easing: 'ease-out',
      offset: 50, // Trigger earlier
      delay: 0,
    });

    return () => observer.disconnect();
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          <div className="hero grid md:grid-cols-2 flex-col items-center pt-24 gap-8 md:gap-16">
            {/* Left Col (Desktop) / Main Container (Mobile) */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left animate__animated animate__fadeInUp animate__delay-3s order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <ShinyText text="Hi I'm Haniif Satria Wardana" disabled={false} speed={3} className='custom-class' />
              </h1>
              
              <div className="md:hidden w-full flex justify-center mb-8 animate__animated animate__zoomIn animate__delay-1s">
                <div className="relative w-fit">
                  <ProfileCard
                    name="Haniif Satria W"
                    title="Full Stack Developer / AI Enthusiast"
                    handle="haniifwardana"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="/assets/Haniif.png"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={true}
                    onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  />
                </div>
              </div>

              <BlurText
                text="Bridging the world of Artificial Intelligence and Full-Stack Development. Dual-enrolled at Binus International & RMIT Melbourne. I thrive on turning heavy data into seamless user experiences."
                delay={100}
                animateBy="words"
                direction="top"
                className="mb-8 opacity-80"
              />
              
              <div className="flex flex-col sm:flex-row items-center sm:gap-4 gap-4 w-full sm:w-auto mt-4">
                <a 
                  href="/assets/CV.pdf" 
                  download="Haniif_Satria_Wardana_CV.pdf" 
                  className="w-full sm:w-auto text-center font-semibold bg-[#1a1a1a] p-4 px-8 rounded-full border border-gray-700 hover:bg-[#222] hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300"
                >
                  <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
                </a>

                <a href="#project" className="w-full sm:w-auto text-center font-semibold bg-[#1a1a1a] p-4 px-8 rounded-full border border-gray-700 hover:bg-[#222] hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300">
                  <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
                </a>
              </div>
            </div>

            {/* Right Col (Desktop) / Hidden on Mobile */}
            <div className="hidden md:flex justify-center items-center md:ml-auto animate__animated animate__fadeInUp animate__delay-4s order-2">
              <div className="relative w-full max-w-[420px]">
                <ProfileCard
                  name="Haniif Satria W"
                  title="Full Stack Developer / AI Enthusiast"
                  handle="haniifwardana"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/assets/Haniif.png"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => console.log('Contact clicked')}
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-32 mx-auto w-full max-w-[1600px] rounded-[32px] border border-white/5 bg-zinc-900/40 backdrop-blur-2xl shadow-2xl p-4 sm:p-12 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-700" id="about">
            {/* Background Glows for large card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-colors" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12 pt-0 px-2 sm:px-8 relative z-10" data-aos="fade-up">
              <div className="basis-full md:basis-5/12 pr-0 md:pr-8 border-none md:border-b-0 md:border-r md:border-emerald-500/20 overflow-visible max-w-full flex justify-center py-0 sm:py-0 min-h-[400px] md:min-h-0">
                {isMobile ? (
                  <Card3DViewer />
                ) : (
                  <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
                )}
              </div>

              <div className="basis-full md:basis-7/12 pl-0 md:pl-8 py-4 sm:py-0">
                <div className="flex-1 text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
                    <ShinyText text="About Me" speed={3} />
                  </h2>

                  <BlurText
                    text="Yo, I’m Haniif Satria Wardana! Currently pulling a Double Degree in Computer Science at Binus International and AI at RMIT Melbourne. I’m basically obsessed with learning new tech stacks and bridging the gap between heavy-duty backend models and those clean, aesthetic frontend designs. If it’s new, I’m probably already learning it. Driven by precision, powered by AI, and low-key addicted to writing clean, scalable code."
                    delay={50}
                    animateBy="words"
                    direction="top"
                    className="text-sm sm:text-base md:text-lg leading-relaxed mb-10 text-gray-300"
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

        <Journey />

        {/* Full-width sections start here */}
        
        {/* Tools Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tools mt-10">
            <h1 className="text-4xl font-bold mb-4 tracking-tight" data-aos="fade-up">
              <ShinyText text="Tools & Technologies" speed={3} />
            </h1>
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
                          className="flex items-center gap-5 p-5 border border-white/5 rounded-[24px] bg-zinc-900/40 backdrop-blur-xl hover:bg-zinc-800/60 transition-all duration-500 group shadow-2xl relative overflow-hidden"
                        >
                          {/* Hover Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="relative z-10 w-12 h-12 bg-zinc-950/50 p-2.5 rounded-2xl border border-white/5 group-hover:border-emerald-500/30 transition-all duration-500 flex items-center justify-center">
                            <img
                              src={tool.gambar}
                              alt={tool.nama}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="relative z-10 flex flex-col overflow-hidden">
                            <div className="truncate">
                              <ShinyText text={tool.nama} speed={3} className="text-lg font-bold block" />
                            </div>
                            <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase tracking-widest font-black leading-tight">{tool.ket}</p>
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
            <h1 className="text-4xl font-bold mb-12 tracking-tight" data-aos="fade-up">
              <ShinyText text="Certificates & Publications" speed={3} />
            </h1>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Publications Side */}
              <div className="flex flex-col gap-8">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-2xl font-bold text-emerald-400 flex items-center gap-3"
                >
                  <RiGraduationCapFill className="w-8 h-8" />
                  Academic Publications
                </motion.h3>
                <div className="flex flex-col gap-6">
                  {listAchievements.filter(a => a.type === "publication").map((pub, idx) => (
                    <motion.div 
                      key={pub.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-[24px] bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden shadow-2xl"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10 group-hover:bg-emerald-500/10 transition-colors" />
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full border border-emerald-500/20">
                          {pub.journal}
                        </span>
                        <span className="text-sm text-zinc-600 font-mono font-bold tracking-tighter">{pub.date}</span>
                      </div>
                      <h4 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight uppercase line-clamp-2">{pub.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-medium italic line-clamp-2">"{pub.description}"</p>
                      <a 
                        href={pub.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-emerald-500 font-black text-xs tracking-widest hover:gap-5 transition-all group/link"
                      >
                        ACCESS RESEARCH <RiArrowRightLine className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certificates Side */}
              <div className="flex flex-col gap-8">
                <motion.h3 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-2xl font-bold text-emerald-400 flex items-center gap-3"
                >
                  <RiVerifiedBadgeFill className="w-8 h-8" />
                  Professional Certifications
                </motion.h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {listAchievements.filter(a => a.type === "certificate").map((cert, idx) => (
                    <motion.div 
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10, rotateZ: idx % 2 === 0 ? 1 : -1 }}
                      className="group relative flex flex-col h-full rounded-2xl bg-zinc-900/20 border border-white/5 overflow-hidden hover:border-emerald-500/40 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500"
                    >
                      {/* Badge Ribbon */}
                      <div className="absolute top-4 right-4 z-20">
                         <div className="bg-emerald-500 text-black text-[8px] font-black px-2 py-0.5 rounded shadow-lg transform rotate-12">VERIFIED</div>
                      </div>

                      <div className="h-44 w-full relative overflow-hidden bg-zinc-800/10">
                        {cert.image && (
                          <img 
                            src={cert.image} 
                            alt={cert.title} 
                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                      </div>

                      <div className="p-6 flex flex-col flex-grow relative -mt-8 bg-zinc-900/80 backdrop-blur-md rounded-t-3xl">
                        <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-2">{cert.issuer}</div>
                        <h4 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors leading-tight mb-6">{cert.title}</h4>
                        
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[11px] text-zinc-600 font-mono">{cert.date}</span>
                          <a 
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-zinc-300 font-bold hover:text-emerald-400 transition-colors flex items-center gap-1 group/btn"
                          >
                            CREDENTIAL <RiExternalLinkLine className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
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
        <div className="mt-10 w-full overflow-hidden" data-aos="fade-up">
          <ScrollVelocity />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Section */}
          <div className="kontak mt-16 pb-20 relative" id="contact">
            {/* Background Glows */}
            <div className="absolute -top-40 left-0 w-72 h-72 bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[150px] rounded-full -z-10" />
            
            <div className="text-center mb-10" data-aos="fade-up">
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic uppercase">
                Let's Build Something <span className="text-emerald-500 not-italic">Epic</span>.
              </h2>
              <div className="max-w-2xl mx-auto px-4">
                <BlurText 
                  text="Have a concept that needs to come alive? Or maybe you just want to say hi? My inbox is always open. Let's create the future together."
                  delay={40}
                  animateBy="words"
                  direction="top"
                  className="text-zinc-400 text-lg sm:text-xl font-medium leading-relaxed"
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="flex flex-col gap-12">
                {/* Advanced Form */}
                <div className="" data-aos="fade-up">
                  <div className="bg-zinc-900/60 backdrop-blur-3xl p-8 md:p-12 w-full rounded-[40px] shadow-2xl border border-emerald-500/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                    
                    <form action="https://formsubmit.co/niifw39@gmail.com" method="POST" className="relative z-10 flex flex-col gap-10">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                          <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] ml-2">WHO ARE YOU?</label>
                          <input 
                            type="text" 
                            name="Name" 
                            placeholder="Ex: Haniif Wardana" 
                            className="bg-black/40 border border-zinc-800 p-5 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 outline-none text-white transition-all placeholder:text-zinc-700" 
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] ml-2">WHERE TO REPLY?</label>
                          <input 
                            type="email" 
                            name="Email" 
                            placeholder="Ex: hello@company.com" 
                            className="bg-black/40 border border-zinc-800 p-5 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 outline-none text-white transition-all placeholder:text-zinc-700" 
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] ml-2">TELL ME EVERYTHING</label>
                        <textarea 
                          name="message" 
                          rows="6" 
                          placeholder="I'm looking for a developer who can..." 
                          className="bg-black/40 border border-zinc-800 p-5 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 outline-none text-white transition-all resize-none placeholder:text-zinc-700" 
                          required
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        className="group/btn relative font-black text-xs sm:text-sm uppercase tracking-widest bg-emerald-500 p-4 md:p-6 rounded-2xl w-full overflow-hidden transition-all duration-500 hover:shadow-[0_15px_40px_rgba(16,185,129,0.3)] text-black flex items-center justify-center gap-4"
                      >
                        <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                        SEND TRANSMISSION
                        <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-black/10 flex items-center justify-center group-hover/btn:translate-x-2 transition-transform">
                          <RiMailSendLine className="w-3 md:w-4 h-3 md:h-4" />
                        </div>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Integrated ChatRoom below the form for a cleaner look */}
                <div className="w-full" data-aos="fade-up">
                  <ChatRoom />
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
