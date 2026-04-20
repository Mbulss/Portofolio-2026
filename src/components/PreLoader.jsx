import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aurora from "./Aurora/Aurora";

const greetings = [
  "Hello",      // English
  "こんにちは",  // Japanese
  "안녕하세요",  // Korean
  "Halo",       // Indonesia
  "مرحباً",      // Arabic
  "Hola",       // Spanish
  "Bonjour",    // French
  "你好"        // Chinese
];

const PreLoader = () => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Berganti bahasa setiap 400ms agar lebih terbaca dan tidak 'glitchy'
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 400);

    // Simulasi loading selesai
    const finishTimer = setTimeout(() => {
      setLoading(false);
      clearInterval(timer);
    }, 4000); // Diperpanjang sedikit agar semua bahasa sempat terlihat

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimer);
    };
  }, []);

  // Variant untuk efek melengkung (Curved Pull-up)
  const curveVariants = {
    initial: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    exit: {
      clipPath: [
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 90%, 0% 90%)",
        "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
      ],
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1], // Cubic-bezier untuk rasa 'luxurious'
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader-container"
          variants={curveVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center bg-black z-[99999] overflow-hidden origin-top"
        >
          <div className="absolute inset-0 pointer-events-none">
            <Aurora
              colorStops={["#A2CFFE", "#B2FFFF", "#89CFF0"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center w-full px-10 text-center">
            {/* Teks Greeting dengan Smooth Cross-fade */}
            <div className="h-32 md:h-48 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-white text-5xl md:text-8xl font-black tracking-tight"
                >
                   <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    {greetings[index]}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </div>
            
            {/* Indikator Loading */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex gap-3"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;

