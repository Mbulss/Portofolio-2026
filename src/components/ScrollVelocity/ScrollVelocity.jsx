import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import "./ScrollVelocity.css";

// Custom wrap function to replace @motionone/utils
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic number for the text wrapping.
   * Adjust this based on your text length.
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -90, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll based on
     * the scroll velocity.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times the text repeats, adjust as needed.
   */
  return (
    <div className="parallax" style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)' }}>
      <motion.div className="scroller" style={{ x, display: 'flex', whiteSpace: 'nowrap' }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity() {
  return (
    <section
      className="scroll-velocity-container"
      style={{ width: '100%', overflow: 'hidden' }}
    >
      <ParallaxText baseVelocity={-1}>REACH OUT TODAY! ♦ LET'S WORK TOGETHER! ♦</ParallaxText>
      <ParallaxText baseVelocity={1}>LET'S WORK TOGETHER! ♦ REACH OUT TODAY!</ParallaxText>
    </section>
  );
}
