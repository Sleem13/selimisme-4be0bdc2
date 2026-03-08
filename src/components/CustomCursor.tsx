import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isData, setIsData] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Don't show on mobile/touch devices
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check what's under cursor
      const target = e.target as HTMLElement;
      const isBtn = !!target.closest("button, a, [role='button']");
      const isDataEl = !!target.closest("[data-kpi], .kpi-highlight, [data-counter]");
      const isCard = !!target.closest("[data-glass-card]");

      setIsButton(isBtn);
      setIsData(isDataEl);
      setIsHovering(isBtn || isDataEl || isCard);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) return null;

  const size = isData ? 50 : isButton ? 40 : isHovering ? 35 : 20;
  const opacity = isHovering ? 0.25 : 0.15;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-screen"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isButton ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400" style={{
          boxShadow: "0 0 8px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.4)",
        }} />
      </motion.div>

      {/* Outer ring / glow */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border"
        animate={{
          x: pos.x - size / 2,
          y: pos.y - size / 2,
          width: size,
          height: size,
          opacity,
          borderColor: isData
            ? "rgba(139, 92, 246, 0.6)"
            : isButton
            ? "rgba(6, 182, 212, 0.8)"
            : "rgba(6, 182, 212, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
        style={{
          background: isData
            ? "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)"
            : isButton
            ? "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)"
            : "transparent",
          backdropFilter: isData ? "blur(2px)" : "none",
        }}
      />
    </>
  );
};

export default CustomCursor;
