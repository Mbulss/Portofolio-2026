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
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
            {c.location && <span className="location">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
