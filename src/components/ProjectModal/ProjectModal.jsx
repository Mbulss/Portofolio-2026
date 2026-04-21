import React, { useState, useEffect } from 'react';
import { FiX, FiExternalLink, FiGithub, FiPlayCircle, FiFileText, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setCurrentImgIndex(0);
    }, 300);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    if (project.images) {
      setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImg = (e) => {
    e.stopPropagation();
    if (project.images) {
      setCurrentImgIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex justify-center items-center z-[100000] p-4 sm:p-6 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl shadow-sky-500/10 w-full max-w-[550px] md:max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        {/* --- HEADER MEDIA (Gallery / Video / Single) --- */}
        <div className="relative w-full aspect-video flex-shrink-0 bg-zinc-900 overflow-hidden border-b border-white/5 group">
          {project.video ? (
            <video 
              src={project.video} 
              autoPlay 
              muted 
              loop 
              controls
              playsInline 
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : project.images && project.images.length > 0 ? (
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIndex}
                  src={project.images[currentImgIndex]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain bg-black"
                />
              </AnimatePresence>
              
              {/* Carousel Controls */}
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImg}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-sky-500 text-white p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block z-10"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImg}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-sky-500 text-white p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block z-10"
                  >
                    <FiChevronRight size={24} />
                  </button>
                  
                  {/* Indicators / Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImgIndex(i);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImgIndex ? 'w-6 bg-sky-500' : 'w-2 bg-white/30'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          )}
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl text-white p-2.5 rounded-full hover:bg-sky-500 transition-all z-20 border border-white/10 shadow-lg"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* --- CONTENT --- */}
        <div className="p-6 md:p-8 overflow-y-auto project-modal-scroll">
          <div className="flex flex-col gap-5">
            <h2 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight">
              {project.title}
            </h2>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
              {project.fullDescription}
            </p>

            <div className="mt-4 pt-6 border-t border-white/5 flex flex-col sm:grid sm:grid-cols-2 gap-4">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 font-black uppercase tracking-widest bg-sky-500 text-black py-4 rounded-xl hover:bg-white transition-all duration-300 text-xs shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                >
                  <FiExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
              )}
              
              <div className={`flex gap-4 ${!project.url ? 'col-span-full' : ''}`}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest bg-zinc-800 text-white border border-white/5 py-4 rounded-xl hover:bg-zinc-700 transition-all duration-300 text-xs"
                  >
                    <FiGithub size={18} />
                    <span>Code Repository</span>
                  </a>
                )}

                {project.paperUrl && (
                  <a
                    href={project.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest bg-white/5 text-zinc-300 border border-white/10 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-xs"
                  >
                    <FiFileText size={18} />
                    <span>Research Paper</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* UI Customizations */}
      <style>{`
        .project-modal-scroll {
           scrollbar-width: thin;
           scrollbar-color: rgba(137, 207, 240, 0.3) transparent;
        }
        .project-modal-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .project-modal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .project-modal-scroll::-webkit-scrollbar-thumb {
          background: rgba(16,185,129,0.3);
          border-radius: 99px;
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
