import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = ({ hidden = false }) => {
  if (hidden) return null;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#project" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <style>
        {`
          .fixed-nav-forced {
            z-index: 1000 !important;
          }
        `}
      </style>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed-nav-forced fixed top-0 left-0 right-0 transition-all duration-500 flex justify-center p-6 ${
          scrolled ? "py-4" : "py-8"
        }`}
      >
        <div 
          className={`flex items-center justify-between px-3 sm:px-10 py-2 sm:py-3 rounded-full border transition-all duration-500 w-auto max-w-[96vw] shadow-2xl ${
            scrolled 
              ? "bg-black/90 backdrop-blur-3xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]" 
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Navigation Menu */}
          <ul className="flex items-center gap-2 sm:gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-[10px] sm:text-sm font-semibold text-gray-400 hover:text-emerald-400 transition-colors relative group tracking-tight whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </a>
              </li>
            ))}
            {/* Integrated CTA Link */}
            <li>
              <a 
                href="#contact" 
                className="text-[10px] sm:text-sm font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full hover:bg-emerald-500 hover:text-black transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/10 whitespace-nowrap"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
