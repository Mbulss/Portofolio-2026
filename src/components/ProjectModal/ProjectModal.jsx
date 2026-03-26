import React, { useState, useEffect } from 'react';
import { FiX, FiExternalLink, FiGithub, FiPlayCircle } from 'react-icons/fi';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
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
        className={`bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl shadow-emerald-500/10 w-full max-w-[440px] max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        {/* --- HEADER MEDIA --- */}
        <div className="relative w-full aspect-video flex-shrink-0 bg-zinc-900 overflow-hidden border-b border-white/5">
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
          ) : (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          )}
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl text-white p-2 rounded-full hover:bg-emerald-500 transition-all z-20 border border-white/10 shadow-lg"
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

            <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-white/5 sm:border-t-0 sm:pt-0 sm:flex-row sm:gap-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 font-bold bg-emerald-500 text-black py-4 sm:py-2 rounded-xl sm:rounded-lg hover:bg-emerald-400 transition-all duration-300 text-base sm:text-[11px]"
              >
                <FiExternalLink size={18} className="sm:size-[13px]" />
                <span>Live Demo</span>
              </a>
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 font-bold bg-zinc-900 text-white py-4 sm:py-2 rounded-xl sm:rounded-lg border border-white/10 hover:bg-zinc-800 transition-all duration-300 text-base sm:text-[11px]"
                >
                  <FiGithub size={18} className="sm:size-[13px]" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
       {/* UI Customizations */}
      <style>{`
        .project-modal-scroll {
           scrollbar-width: thin;
           scrollbar-color: rgba(16, 185, 129, 0.3) transparent;
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
