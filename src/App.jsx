import { useRef, useState, useEffect, lazy, Suspense, memo } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import { listTools, listProyek, listAchievements } from "./data";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Journey from "./components/Journey/Journey";
import CountUp from "./components/CountUp/CountUp";
import { motion, AnimatePresence } from "framer-motion";
import { RiGraduationCapFill, RiVerifiedBadgeFill, RiArrowRightLine, RiExternalLinkLine, RiMailSendLine } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lazy load heavy components
import Lanyard from "./components/Lanyard/Lanyard";
import Card3DViewer from "./components/Card3DViewer/Card3DViewer";
const Aurora = lazy(() => import("./components/Aurora/Aurora"));
const ChromaGrid = lazy(() => import("./components/ChromaGrid/ChromaGrid"));
const ProjectModal = lazy(() => import("./components/ProjectModal/ProjectModal"));
const ChatRoom = lazy(() => import("./components/ChatRoom"));
const CursorFollower = lazy(() => import("./components/CursorFollower"));
const ScrollVelocity = lazy(() => import("./components/ScrollVelocity/ScrollVelocity"));

gsap.registerPlugin(ScrollTrigger);

// Memoized Components to prevent unnecessary re-renders
const MemoizedProfileCard = memo(ProfileCard);
const MemoizedShinyText = memo(ShinyText);
const MemoizedBlurText = memo(BlurText);

function App() {
  const aboutRef = useRef(null);
  const toolsRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchSource, setSearchSource] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isToolsExpanded, setIsToolsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Simple heuristic for low power/perf: very small screens or older browsers
      setIsLowPower(mobile && window.devicePixelRatio < 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProjectClick = (project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Entrance Animation
      const heroTl = gsap.timeline();
      heroTl.from(".hero-content > *", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      })
      .from(".hero-profile", {
        scale: 0.95,
        autoAlpha: 0,
        duration: 0.8,
        ease: "back.out(1.2)"
      }, "-=0.4");

      // Scroll Reveals - Optimized with will-change
      const revealElements = gsap.utils.toArray('[data-gsap="reveal"]');
      revealElements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          y: 20,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => { el.style.willChange = "transform, opacity"; },
          onComplete: () => { el.style.willChange = "auto"; }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Performance optimized background & blur styles
  const blurClass = isMobile ? "backdrop-blur-lg" : "backdrop-blur-3xl";
  const cardBgClass = "bg-zinc-900/40 border border-white/5";

  return (
    <div className="relative selection:bg-sky-500/30 selection:text-sky-200">
      {!isMobile && (
        <Suspense fallback={null}>
          <CursorFollower />
        </Suspense>
      )}

      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050505]">
        {!isLowPower && (
          <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
            <Aurora
              colorStops={["#A2CFFE", "#B2FFFF", "#89CFF0"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.4}
            />
          </Suspense>
        )}
      </div>
      
      <main className="w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero grid md:grid-cols-2 flex-col items-center pt-24 gap-8 md:gap-16">
            <div className="hero-content flex flex-col items-center md:items-start text-center md:text-left order-1">
              <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase">
                Hi I'm Haniif Satria Wardana
              </h1>
              
              <div className="md:hidden w-full flex justify-center mb-8">
                <div className="relative w-fit hero-profile">
                  <MemoizedProfileCard
                    name="Haniif Satria W"
                    title="Full Stack Developer / AI Enthusiast"
                    handle="haniifwardana"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="/assets/Haniif.png"
                    showUserInfo={true}
                    enableTilt={!isMobile}
                    enableMobileTilt={false}
                    onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  />
                </div>
              </div>

              <MemoizedBlurText
                text="Bridging the world of Artificial Intelligence and Full-Stack Development. Dual-enrolled at Binus International & RMIT Melbourne. I thrive on turning heavy data into seamless user experiences."
                delay={80}
                animateBy="words"
                direction="top"
                className="mb-8 opacity-80"
              />
              
              <div className="flex flex-col sm:flex-row items-center sm:gap-4 gap-4 w-full sm:w-auto mt-4">
                <a href="/assets/CV.pdf" download className="w-full sm:w-auto text-center font-semibold bg-[#1a1a1a] p-4 px-8 rounded-full border border-gray-700 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(137,207,240,0.2)] transition-all duration-300">
                  <MemoizedShinyText text="Download CV" speed={3} />
                </a>
                <a href="#project" className="w-full sm:w-auto text-center font-semibold bg-[#1a1a1a] p-4 px-8 rounded-full border border-gray-700 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(137,207,240,0.2)] transition-all duration-300">
                  <MemoizedShinyText text="Explore My Projects" speed={3} />
                </a>
              </div>
            </div>

            <div className="hidden md:flex justify-center items-center md:ml-auto order-2">
              <div className="relative w-full max-w-[420px] hero-profile">
                <MemoizedProfileCard
                  name="Haniif Satria W"
                  title="Full Stack Developer / AI Enthusiast"
                  handle="haniifwardana"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/assets/Haniif.png"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className={`mt-32 mx-auto w-full max-w-[1600px] rounded-[32px] ${cardBgClass} ${blurClass} shadow-2xl p-4 sm:p-12 relative overflow-hidden group hover:border-sky-500/20 transition-all duration-700`} id="about">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full group-hover:bg-sky-500/10 transition-colors" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12 pt-0 px-2 sm:px-8 relative z-10" data-gsap="reveal">
              <div className="basis-full md:basis-5/12 pr-0 md:pr-8 border-none md:border-b-0 md:border-r md:border-sky-500/20 overflow-visible max-w-full flex justify-center py-0 sm:py-0 min-h-[400px] md:min-h-0 relative">
                {/* Interactive Hint for Lanyard */}
                {!isMobile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                  >
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-black/60 backdrop-blur-xl border border-sky-500/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                    >
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em] whitespace-nowrap">Interactive: Drag Me</span>
                    </motion.div>
                  </motion.div>
                )}
                
                {isMobile ? <Card3DViewer /> : <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />}
              </div>

              <div className="basis-full md:basis-7/12 pl-0 md:pl-8 py-4 sm:py-0">
                <div className="flex-1 text-left">
                  <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase">
                    About Me
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-10 text-gray-300">
                    Yo, I’m Haniif Satria Wardana! Currently pulling a Double Degree in Computer Science at Binus International and AI at RMIT Melbourne. I’m basically obsessed with learning new tech stacks and bridging the gap between heavy-duty backend models and those clean, aesthetic frontend designs.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 w-full">
                    {[
                      { val: 30, suffix: "+", label: "Project Finished" },
                      { val: 3, suffix: "+", label: "Years of Experience" },
                      { val: 3.57, suffix: "/4.00", label: "GPA" }
                    ].map((stat, i) => (
                      <div 
                        key={i}
                        className="flex flex-col items-center p-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all duration-300 group/stat"
                      >
                        <h1 className="text-2xl md:text-3xl font-black mb-1 mt-0 group-hover:scale-105 transition-transform flex items-baseline whitespace-nowrap">
                          <CountUp
                            to={stat.val}
                            duration={2}
                            decimals={stat.val % 1 !== 0 ? 2 : 0}
                            separator=","
                          />
                          <span className="text-sky-500 text-base md:text-xl ml-1">{stat.suffix}</span>
                        </h1>
                        <p className="m-0 opacity-40 text-[10px] uppercase tracking-[0.2em] font-bold group-hover:opacity-80 transition-opacity text-center leading-tight">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Journey />

        {/* Tools Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tools mt-10">
            <h1 ref={toolsRef} className="text-3xl md:text-4xl font-black mb-6 tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase scroll-mt-32" data-gsap="reveal">
              Tools & Technologies
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10" data-gsap="reveal">
              <p className="w-full md:w-2/5 text-base opacity-50">My Professional Skills & Technical Arsenal</p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <select onChange={(e) => setSelectedCategory(e.target.value)} className="w-full sm:w-48 bg-zinc-900/50 border border-zinc-800 p-3 px-4 rounded-xl outline-none text-white transition-all appearance-none cursor-pointer">
                  <option value="All">All Categories</option>
                  <option value="lang">Programming</option>
                  <option value="ai">AI / Data Science</option>
                  <option value="web">Web Development</option>
                  <option value="dev">DevOps / Tools</option>
                </select>
                <div className="relative w-full sm:w-64">
                  <input type="text" placeholder="Search tools..." value={searchSource} onChange={(e) => setSearchSource(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 pl-10 rounded-xl outline-none text-white focus:ring-1 focus:ring-sky-500/50" />
                  <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
            </div>

            {(() => {
              const allFiltered = listTools.filter(item => {
                const matchesSearch = item.nama.toLowerCase().includes(searchSource.toLowerCase());
                let matchesCategory = true;
                if (selectedCategory !== "All") {
                  if (selectedCategory === "lang") matchesCategory = item.id <= 6;
                  else if (selectedCategory === "ai") matchesCategory = (item.id > 6 && item.id <= 14) || [34, 35].includes(item.id);
                  else if (selectedCategory === "web") matchesCategory = item.id > 14 && item.id <= 26;
                  else if (selectedCategory === "dev") matchesCategory = (item.id > 26 && ! [34, 35].includes(item.id));
                }
                return matchesSearch && matchesCategory;
              });

              const limit = 12;
              const hasMoreTools = allFiltered.length > limit;
              const toolsToShow = (searchSource || isToolsExpanded || selectedCategory !== "All") ? allFiltered : allFiltered.slice(0, limit);

              return (
                <div className="flex flex-col items-center gap-12">
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
                    {toolsToShow.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                        viewport={{ once: true }}
                        className={`tool-card flex items-center gap-5 p-5 ${cardBgClass} ${blurClass} rounded-[24px] hover:bg-zinc-800/60 transition-all duration-300 group relative`}
                      >
                        <div className="w-12 h-12 bg-zinc-950/50 p-2.5 rounded-2xl border border-white/5 flex items-center justify-center">
                          <img src={tool.gambar} alt={tool.nama} className="w-full h-full object-contain" loading="lazy" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <MemoizedShinyText text={tool.nama} speed={3} className="text-lg font-bold block" />
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black leading-tight">{tool.ket}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {!searchSource && selectedCategory === "All" && hasMoreTools && (
                    <button 
                      onClick={() => {
                        if (isToolsExpanded) {
                          toolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        setIsToolsExpanded(!isToolsExpanded);
                      }} 
                      className="bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 p-3 px-8 rounded-full text-sky-500 font-semibold transition-all duration-300 flex items-center gap-2"
                    >
                      <span>{isToolsExpanded ? "Show Less" : "Show All"}</span>
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
          
          {/* Achievements Section - OPTIMIZED FOR 3 CERTIFICATES */}
          <div className="mt-40 px-4 max-w-7xl mx-auto">
            {/* Main Section Title */}
            <h1 className="text-3xl md:text-4xl font-black mb-16 tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase text-left" data-gsap="reveal">
              Certificates & Publications
            </h1>

            <div className="flex flex-col gap-16">
              
              {/* Academic Publications Section: Adjusted to 2-Column Grid */}
              <div data-gsap="reveal">
                <div className="flex items-center gap-3 mb-8">
                  <RiGraduationCapFill className="text-sky-400 text-2xl" />
                  <h2 className="text-lg md:text-xl font-black tracking-tight text-sky-400 uppercase">
                    Academic Publications
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listAchievements.filter(a => a.type === "publication").map(pub => (
                    <motion.div
                      key={pub.id}
                      whileHover={{ y: -5 }}
                      className="bg-[#0c0c0c] border border-white/5 p-7 rounded-[32px] relative overflow-hidden group flex flex-col justify-between h-full hover:border-sky-500/30 transition-all duration-500 shadow-2xl"
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-sky-500/10 text-sky-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-sky-500/20">
                            {pub.journal || "Publication"}
                          </div>
                          <div className="text-white/20 font-black text-[10px] uppercase tracking-widest mt-1">
                            {pub.date}
                          </div>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-black text-white mb-4 leading-tight uppercase tracking-tight group-hover:text-sky-400 transition-colors line-clamp-2">
                          {pub.title}
                        </h3>
                        
                        <p className="text-zinc-500 text-xs md:text-sm mb-6 leading-relaxed italic line-clamp-3">
                          "{pub.description}"
                        </p>
                      </div>
                      
                      <div className="relative z-10 pt-6 border-t border-white/5 mt-auto">
                        <a 
                          href={pub.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group/btn relative w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl overflow-hidden transition-all duration-500"
                        >
                          {/* Animated Shimmer Background */}
                          <div className="absolute inset-0 bg-sky-500/5 group-hover/btn:bg-sky-500 transition-colors duration-500" />
                          <div className="absolute inset-0 border border-sky-500/20 group-hover/btn:border-sky-500/50 rounded-2xl transition-colors duration-500 shadow-[0_0_20px_rgba(14,165,233,0)] group-hover/btn:shadow-[0_0_20px_rgba(14,165,233,0.3)]" />
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] text-sky-400 group-hover/btn:text-black transition-colors duration-500">
                            {pub.buttonText || "ACCESS DETAILS"}
                          </span>
                          <RiArrowRightLine className="relative z-10 text-sky-400 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all duration-500" />
                        </a>
                      </div>

                      {/* Subtle Ambient Glow */}
                      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full group-hover:bg-sky-500/10 transition-all duration-700" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Professional Certifications Section: Project-Style Cards */}
              <div data-gsap="reveal">
                <div className="flex items-center gap-3 mb-10">
                   <RiVerifiedBadgeFill className="text-sky-400 text-2xl" />
                   <h2 className="text-lg md:text-xl font-black tracking-tight text-sky-400 uppercase">
                    Professional Certifications
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listAchievements.filter(a => a.type === "certificate").map(cert => (
                    <motion.div 
                      key={cert.id}
                      whileHover={{ y: -8 }}
                      className="group relative flex flex-col bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden hover:border-sky-500/30 transition-all duration-500 h-full shadow-2xl"
                    >
                      {/* Image Section - Top */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-60" />
                        
                        <div className="absolute top-4 right-4 bg-sky-500 text-black text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          Verified
                        </div>
                      </div>

                      {/* Content Section - Bottom */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em]">
                            {cert.issuer}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">
                            {cert.date}
                          </span>
                        </div>
                        
                        <h4 className="text-sm md:text-base font-bold text-white mb-6 leading-snug group-hover:text-sky-400 transition-colors line-clamp-2">
                          {cert.title}
                        </h4>

                        {/* Action Button - EYE CATCHING STYLE */}
                        <div className="mt-auto">
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group/btn relative w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg"
                          >
                            {/* Button Background & Glow */}
                            <div className="absolute inset-0 bg-white/5 group-hover/btn:bg-sky-500 transition-colors duration-500" />
                            <div className="absolute inset-0 border border-white/10 group-hover/btn:border-sky-500/50 rounded-2xl transition-colors duration-500" />
                            
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                            <RiExternalLinkLine className="relative z-10 text-white group-hover/btn:text-black transition-colors duration-500" />
                            <span className="relative z-10 text-[10px] font-black text-white group-hover/btn:text-black uppercase tracking-[0.25em] transition-colors duration-500">
                              View Credential
                            </span>
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
            <div className="text-center mb-16" data-gsap="reveal">
              <h1 className="text-3xl md:text-4xl font-black mb-8 tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase">
                Selected Projects
              </h1>
            </div>

            <Suspense fallback={<div className="h-96 flex items-center justify-center text-zinc-500">Loading Grid...</div>}>
              <ChromaGrid items={listProyek} onItemClick={handleProjectClick} radius={isMobile ? 300 : 500} damping={0.45} fadeOut={0.6} />
            </Suspense>
          </div>
        </div>

        <div className="mt-10 w-full overflow-hidden" data-gsap="reveal">
          <Suspense fallback={null}>
            <ScrollVelocity />
          </Suspense>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="kontak mt-16 pb-20 relative" id="contact">
            <div className="text-center mb-10" data-gsap="reveal">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase">
                Let's Build Something <span className="text-sky-500 not-italic">Epic</span>.
              </h2>
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="flex flex-col gap-12">
                <div data-gsap="reveal">
                  <div className={`${cardBgClass} ${blurClass} p-8 md:p-12 w-full rounded-[40px] shadow-2xl relative overflow-hidden group`}>
                    <form action="https://formsubmit.co/niifw39@gmail.com" method="POST" className="flex flex-col gap-10">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                          <label className="text-[10px] font-black text-sky-500 uppercase tracking-widest ml-2">WHO ARE YOU?</label>
                          <input type="text" name="Name" placeholder="Ex: Haniif Wardana" className="bg-black/40 border border-zinc-800 p-5 rounded-2xl outline-none text-white focus:border-sky-500/50" required />
                        </div>
                        <div className="flex flex-col gap-4">
                          <label className="text-[10px] font-black text-sky-500 uppercase tracking-widest ml-2">WHERE TO REPLY?</label>
                          <input type="email" name="Email" placeholder="Ex: hello@company.com" className="bg-black/40 border border-zinc-800 p-5 rounded-2xl outline-none text-white focus:border-sky-500/50" required />
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <label className="text-[10px] font-black text-sky-500 uppercase tracking-widest ml-2">TELL ME EVERYTHING</label>
                        <textarea name="message" rows="6" placeholder="I'm looking for a developer who can..." className="bg-black/40 border border-zinc-800 p-5 rounded-2xl outline-none text-white resize-none focus:border-sky-500/50" required></textarea>
                      </div>
                      <button type="submit" className="bg-sky-500 p-5 rounded-2xl w-full text-black font-black uppercase tracking-widest hover:shadow-[0_15px_40px_rgba(137,207,240,0.3)] transition-all flex items-center justify-center gap-4">
                        SEND TRANSMISSION
                      </button>
                    </form>
                  </div>
                </div>

                <Suspense fallback={null}>
                  <div className="w-full" data-gsap="reveal">
                    <ChatRoom />
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <ProjectModal isOpen={!!selectedProject} onClose={handleCloseModal} project={selectedProject} />
      </Suspense>
      <Footer />
      <Navbar />
    </div>
  );
}

export default App;
