import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { listJourney } from "../../data";
import { RiGraduationCapFill, RiBriefcase4Fill } from "react-icons/ri";
import ShinyText from "../ShinyText/ShinyText";
import "./Journey.css";

const JourneyItem = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 90%", "start 50%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const connectorWidth = useSpring(useTransform(scrollYProgress, [0.3, 0.8], ["0%", "100%"]), { stiffness: 50, damping: 20 });
  
  return (
    <div className={`journey-item ${isEven ? "left" : "right"}`} ref={itemRef}>
      {/* Laser Connector (Desktop only): Adjusted vertical alignment with 0.1px translate fix */}
      <div className={`hidden md:block absolute top-[50.2%] -translate-y-1/2 w-[calc(50%-42px)] h-[1px] ${isEven ? 'left-[42px] origin-left' : 'right-[42px] origin-right'}`}>
         <motion.div 
            className="w-full h-full bg-sky-500 shadow-[0_0_15px_#0ea5e9]"
            style={{ scaleX: connectorWidth }}
         />
      </div>

      <div className="journey-line-marker">
        <motion.div 
           className="journey-dot relative group"
           style={{ 
             scale: useTransform(scrollYProgress, [0.4, 0.7, 1], [0.8, 1.25, 1.25]),
             borderColor: useTransform(scrollYProgress, [0.4, 0.7, 1], ["rgba(14,165,233,0.2)", "#0ea5e9", "#0ea5e9"]),
             boxShadow: useTransform(scrollYProgress, [0.4, 0.7, 1], ["0 0 0px #0ea5e9", "0 0 20px #0ea5e9", "0 0 20px #0ea5e9"])
           }}
        >
          {/* Animated Ring */}
          <motion.div 
            className="absolute inset-[-6px] border border-sky-500/30 rounded-full z-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {item.icon === "education" ? <RiGraduationCapFill className="journey-icon" /> : <RiBriefcase4Fill className="journey-icon" />}
        </motion.div>
      </div>

      <motion.div
        style={{ 
          opacity, 
          scale,
          perspective: "1000px"
        }}
        className="journey-card group"
      >
        <div className="journey-card-glow text-left"></div>
        <div className="journey-card-inner text-left">
          <div className="journey-card-header flex justify-between items-start mb-4">
             <div className="flex flex-col gap-1">
                <span className="journey-date font-mono text-[10px] sm:text-xs opacity-60 uppercase tracking-tighter">{item.date}</span>
                <span className="journey-category text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-sky-400 bg-sky-400/10 px-2 py-1 rounded-md inline-block w-fit">{item.category}</span>
             </div>
             {item.logo && (
               <div className="w-10 h-10 bg-white p-1.5 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                 <img src={item.logo} alt="Logo" className="w-full h-full object-contain" />
               </div>
             )}
          </div>
          <h3 className="journey-title text-xl sm:text-2xl font-black mb-2 group-hover:text-sky-400 transition-colors uppercase leading-tight">{item.title}</h3>
          <p className="journey-location text-sky-500/80 font-bold mb-4 text-xs sm:text-sm italic">{item.location}</p>
          <p className="journey-description text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">{item.description}</p>
        </div>
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </div>
  );
};

const Journey = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="journey-section pt-32 pb-20 relative perspective-normal overflow-x-clip" id="journey" ref={containerRef}>
      <div className="journey-container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Evolution
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase">
            My Journey
          </h2>
        </div>
        
        <div className="journey-timeline relative min-h-[800px]" ref={timelineRef}>
          {/* SVG Progress Path - Double Neon Line */}
          <div className="absolute left-[50%] -translate-x-1/2 top-0 bottom-0 w-[4px] bg-white/10 h-full rounded-full overflow-hidden">
             <motion.div 
                className="w-full bg-sky-500 origin-top shadow-[0_0_25px_#0ea5e9]"
                style={{ scaleY: pathLength, height: '100%' }}
             />
             
             {/* Traveling light beam (Pulse) */}
             <motion.div 
                className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-white to-transparent z-50 blur-[4px] opacity-80"
                style={{ top: useTransform(pathLength, [0, 1], ["-15%", "115%"]) }}
             />
          </div>

          <div className="flex flex-col gap-40 relative">
            {listJourney.map((item, index) => (
              <JourneyItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
