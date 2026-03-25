import React, { Suspense, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

const RobotCursor = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const removeSplineLogo = () => {
      if (!containerRef.current) return;
      const shadowHost = containerRef.current.querySelector('div');
      const shadowRoot = shadowHost?.shadowRoot;
      const logo = shadowRoot?.querySelector('#logo') || 
                   document.querySelector('a[href*="spline.design"]');
      
      if (logo) {
        logo.style.display = 'none';
        logo.style.visibility = 'hidden';
      }
    };

    const interval = setInterval(removeSplineLogo, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none" ref={containerRef}>
        <div className="absolute top-0 h-full w-[150%] left-[-55%]">
          <Spline 
            scene="https://prod.spline.design/4H8QVfoPEgyizYn3/scene.splinecode"
            className="w-full h-full"
          />
        </div>
    </div>
  );
};

export default RobotCursor;
