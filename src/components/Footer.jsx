import { useEffect, useRef } from "react";
import "remixicon/fonts/remixicon.css";
import RobotCursor from "./RobotCursor";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Footer = () => {
  return (
    <div className="mt-32 pb-16 flex flex-col items-center relative z-10 w-full overflow-hidden">
      {/* Massive Name Display with Robot Full Width */}
      <div className="relative w-full flex flex-col md:flex-row justify-center md:justify-end items-center py-10 md:py-20 min-h-[40vh] px-[5vw] md:px-[10vw] gap-0 md:gap-0">
        {/* Mobile Robot Container (Top) */}
        <div className="relative md:absolute md:inset-0 w-full h-[30vh] md:h-full pointer-events-none z-20">
          <RobotCursor />
        </div>
        
        <h1 
          className="text-[clamp(3.5rem,18vw,22rem)] font-black leading-none tracking-tighter text-white opacity-95 select-none text-center z-10 translate-y-[-2vh] md:translate-y-0"
        >
          HANIIF
        </h1>
      </div>

      {/* Tidy Footer Footer info */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 mt-10 border-t border-white/10 pt-12 px-6">
        
        {/* Social Icons - Centered */}
        <div className="flex gap-8">
          <a href="https://github.com/Mbulss/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 hover:drop-shadow-[0_0_12px_rgba(137,207,240,0.5)] transition-all duration-300 transform hover:scale-110">
            <i className="ri-github-fill text-3xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/haniif-satria-wardana/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 hover:drop-shadow-[0_0_12px_rgba(137,207,240,0.5)] transition-all duration-300 transform hover:scale-110">
            <i className="ri-linkedin-box-fill text-3xl"></i>
          </a>
          <a href="https://www.instagram.com/haniifsatria/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-sky-400 hover:drop-shadow-[0_0_12px_rgba(137,207,240,0.5)] transition-all duration-300 transform hover:scale-110">
            <i className="ri-instagram-fill text-3xl"></i>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Footer;
