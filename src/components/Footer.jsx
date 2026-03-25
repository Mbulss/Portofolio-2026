import "remixicon/fonts/remixicon.css";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";
import RobotCursor from "./RobotCursor";

const Footer = () => {
  const items = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscAccount size={18} />, label: "About Me", onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscArchive size={18} />, label: "Project", onClick: () => document.getElementById("project")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <div className="mt-32 pb-8 flex flex-col items-center relative z-10 w-full overflow-hidden">
      {/* Massive Name Display with Robot Full Width */}
      <div className="relative w-full flex justify-end items-center py-20 min-h-[40vh] px-[10vw]">
        <h1 className="text-[15vw] md:text-[20vw] font-black leading-none tracking-tighter text-white opacity-95 select-none text-center z-10">
          HANIIF
        </h1>
        {/* Full width robot container restored to avoid clipping and keep Spline logo in corner */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <RobotCursor />
        </div>
      </div>

      {/* Grid container for other footer info */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-10 mt-10 border-t border-white/10 pt-10 px-6">
        
        {/* Social Icons */}
        <div className="flex gap-6 order-2 md:order-none">
          <a href="https://github.com/Mbulss/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-300"><i className="ri-github-fill ri-2x"></i></a>
          <a href="https://www.linkedin.com/in/haniif-satria-wardana/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-300"><i className="ri-linkedin-box-fill ri-2x"></i></a>
          <a href="https://www.instagram.com/haniifsatria/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-300"><i className="ri-instagram-fill ri-2x"></i></a>
        </div>

        {/* Dock */}
        <div className="order-3 md:order-none">
          <Dock 
            items={items}
            panelHeight={30}
            baseItemSize={60}
            magnification={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
