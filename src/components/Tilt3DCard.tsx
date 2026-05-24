import { useRef, useState, ReactNode } from "react";

/**
 * Lightweight CSS 3D tilt wrapper.
 * Tracks pointer relative to the element and applies perspective + rotateX/Y.
 * No external libs.
 */
export default function Tilt3DCard({
  children,
  className = "",
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
    active: false,
  });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const ry = (x - 0.5) * 2 * max;
    const rx = (0.5 - y) * 2 * max;
    setTilt({ rx, ry, gx: x * 100, gy: y * 100, active: true });
  };

  const handleLeave = () =>
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  return (
    <div
      style={{ perspective: "1100px" }}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={ref}
        className="relative w-full h-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.active ? 1.015 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: tilt.active ? 0.35 : 0,
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, hsla(0,0%,100%,0.25), transparent 45%)`,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
}
