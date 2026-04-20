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
        className={`bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl shadow-sky-500/10 w-full max-w-[440px] max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ${isClosing ? 'animate-out' : 'animate-in'}`}
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain bg-black"
                />
              </AnimatePresence>
              
              {/* Carousel Controls */}
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImg}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-sky-500 text-white p-1.5 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden sm:block z-10"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImg}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-sky-500 text-white p-1.5 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden sm:block z-10"
                  >
                    <FiChevronRight size={20} />
                  </button>
                  
                  {/* Indicators / Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImgIndex(i);
                        }}
                        className={`h-1 rounded-full transition-all duration-300 ${i === currentImgIndex ? 'w-4 bg-sky-500' : 'w-1.5 bg-white/30'}`}
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
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl text-white p-2 rounded-full hover:bg-sky-500 transition-all z-20 border border-white/10 shadow-lg"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* --- CONTENT --- */}
        <div className="p-6 sm:p-5 flex-grow overflow-y-auto project-modal-scroll">
          <div className="flex flex-col gap-4">
            <h2 className="text-[1.5rem] sm:text-[1.1rem] font-bold text-white leading-tight">
              {project.title}
            </h2>

            <p className="text-zinc-400 text-[14px] sm:text-[12px] leading-relaxed font-normal">
              {project.fullDescription}
            </p>

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5 sm:border-t-0 sm:pt-0 sm:flex-row">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-[1.5] inline-flex items-center justify-center gap-2 font-bold bg-sky-500 text-black py-3 sm:py-2 rounded-xl sm:rounded-lg hover:bg-sky-400 transition-all duration-300 text-sm sm:text-[11px]"
                >
                  <FiExternalLink size={16} className="sm:size-[12px]" />
                  <span className="whitespace-nowrap italic">Live Demo</span>
                </a>
              )}
              
              <div className="flex flex-row gap-2 flex-grow">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 inline-flex items-center justify-center gap-2 font-bold bg-zinc-900 text-white py-3 sm:py-2 rounded-xl sm:rounded-lg border border-white/10 hover:bg-zinc-800 transition-all duration-300 text-sm sm:text-[11px] ${!project.url ? 'flex-[2]' : ''}`}
                  >
                    <FiGithub size={16} className="sm:size-[12px]" />
                    <span className="whitespace-nowrap">Code</span>
                  </a>
                )}

                {project.paperUrl && (
                  <a
                    href={project.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 font-bold bg-white/5 text-zinc-300 py-3 sm:py-2 rounded-xl sm:rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 text-sm sm:text-[11px]"
                  >
                    <FiFileText size={16} className="sm:size-[12px]" />
                    <span className="whitespace-nowrap">Paper</span>
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
