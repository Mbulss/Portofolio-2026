import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import "./ChromaGrid.css";

// Sub-komponen untuk preview proyek yang "gerak-gerak" (slideshow cepat)
const ProjectPreview = ({ c }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (c.images && c.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % c.images.length);
      }, 3000); // 3s interval for a much calmer pacing
      return () => clearInterval(interval);
    }
  }, [c.images]);

  if (c.video) {
    return (
      <video 
        src={c.video} 
        autoPlay 
        muted 
        loop 
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    );
  }

  if (c.images && c.images.length > 0) {
    return (
      <div className="relative w-full h-full bg-black overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={c.images[currentIndex]}
            alt={c.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain" 
          />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <img 
      src={c.image} 
      alt={c.title} 
      loading="lazy" 
      className="w-full h-full object-cover" 
    />
  );
};

// Terima `onItemClick` di props
export const ChromaGrid = ({
  items,
  onItemClick, // Fungsi handler dari App.jsx
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  // Gunakan `items` yang di-pass dari App.jsx, bukan data demo
  const data = items?.length ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--cols": columns,
          "--rows": rows,
        }
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          // Panggil `onItemClick` saat kartu diklik dan kirim datanya
          onClick={() => onItemClick(c)}
          style={
            {
              "--card-border": c.borderColor || "transparent",
              "--card-gradient": c.gradient,
              cursor: "pointer", // Selalu pointer karena akan membuka modal
            }
          }
        >
            <div className="chroma-img-wrapper">
               <ProjectPreview c={c} />
            </div>
          <footer className="chroma-info flex flex-col h-full">
            <div className="flex flex-col">
              {/* Fixed height title wrapper so 1-line and 2-line titles take the same space */}
              <div className="h-[60px] flex items-start">
                <h3 className="name line-clamp-2">{c.title}</h3>
              </div>
              
              {c.handle && <span className="handle">{c.handle}</span>}
              
              {/* Fixed height sub-title wrapper so it's uniform (fits up to 2 lines) */}
              <div className="h-[44px] mt-1 mb-2">
                <p className="role text-sky-400/80 font-medium line-clamp-2">{c.subtitle}</p>
              </div>

              {c.location && <span className="location">{c.location}</span>}
              
              {/* Fixed height description wrapper so it's exactly 4 lines tall always */}
              <div className="h-[84px] mb-4">
                <p className="full-desc text-zinc-400 text-[13px] leading-relaxed line-clamp-4">
                  {c.fullDescription}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/5">
              {c.url && (
                <a 
                  href={c.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex justify-center items-center bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-black border border-sky-500/20 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 group/btn"
                >
                  Live Demo
                </a>
              )}
              {c.githubUrl && (
                <a 
                  href={c.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex justify-center items-center bg-zinc-800/50 hover:bg-zinc-700 text-white border border-white/5 hover:border-white/20 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300"
                >
                  GitHub
                </a>
              )}
            </div>
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
