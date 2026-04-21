import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = ({ hidden = false }) => {
  if (hidden) return null;

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Control background style
      setScrolled(currentScrollY > 50);
      
      // Control visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // Sembunyi saat scroll ke bawah
      } else {
        setVisible(true); // Muncul saat scroll ke atas
      }
      
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#project" },
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
        animate={{ y: visible ? 0 : -120 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed-nav-forced fixed top-0 left-0 right-0 flex justify-center p-4 sm:p-6`}
      >
        <div 
          className={`flex items-center justify-between px-3 sm:px-10 py-2 sm:py-3 rounded-full border transition-all duration-500 w-auto max-w-[96vw] shadow-2xl ${
            scrolled 
              ? "bg-black/90 backdrop-blur-3xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]" 
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Navigation Menu */}
          <ul className="flex items-center gap-4 sm:gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-xs sm:text-sm font-semibold text-gray-400 hover:text-sky-400 transition-colors relative group tracking-tight whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(137,207,240,0.8)]" />
                </a>
              </li>
            ))}
            {/* Integrated CTA Link */}
            <li>
              <a 
                href="#contact" 
                className="text-[11px] sm:text-sm font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-sky-500 hover:text-black transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/10 whitespace-nowrap"
              >
                Contact Me
              </a>
            </li>
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
