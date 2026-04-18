import { useEffect, useRef } from "react";

/**
 * DataAnalyticsBackground
 * Lightweight canvas-based animated background visualizing data analytics:
 * - Floating data nodes
 * - Connecting network lines (proximity-based)
 * - Subtle floating tool labels (Power BI, SQL, Python, Tableau)
 *
 * Optimized: single rAF loop, capped DPR, pauses when tab hidden.
 */
const TOOL_LABELS = ["Power BI", "SQL", "Python", "Tableau", "ML", "ETL"];

const DataAnalyticsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = true;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number };
    type Label = { text: string; x: number; y: number; vx: number; vy: number; alpha: number; alphaDir: number };

    let nodes: Node[] = [];
    let labels: Label[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with screen area, capped for performance
      const target = Math.min(90, Math.floor((width * height) / 18000));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.8,
        pulse: Math.random() * Math.PI * 2,
      }));

      labels = TOOL_LABELS.map((text) => ({
        text,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: 0.05 + Math.random() * 0.1,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) loop(performance.now());
    };
    document.addEventListener("visibilitychange", onVisibility);

    const MAX_DIST = 130;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

    const loop = (time: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // Update + draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.pulse += 0.015;
      }

      // Connection lines (O(n^2) but n is capped)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < MAX_DIST_SQ) {
            const alpha = (1 - dSq / MAX_DIST_SQ) * 0.35;
            ctx.strokeStyle = `hsla(195, 95%, 65%, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes with glow pulse
      for (const n of nodes) {
        const pulse = 0.6 + 0.4 * Math.sin(n.pulse);
        const r = n.r * (0.9 + pulse * 0.3);

        // Glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        grad.addColorStop(0, `hsla(265, 90%, 70%, ${0.5 * pulse})`);
        grad.addColorStop(1, "hsla(265, 90%, 70%, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(195, 100%, 80%, ${0.8 * pulse + 0.2})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floating tool labels
      ctx.font = "500 11px ui-sans-serif, system-ui, -apple-system, sans-serif";
      ctx.textBaseline = "middle";
      for (const l of labels) {
        l.x += l.vx;
        l.y += l.vy;
        if (l.x < 0 || l.x > width) l.vx *= -1;
        if (l.y < 0 || l.y > height) l.vy *= -1;
        l.alpha += l.alphaDir * 0.0015;
        if (l.alpha > 0.18) l.alphaDir = -1;
        if (l.alpha < 0.04) l.alphaDir = 1;

        ctx.fillStyle = `hsla(195, 100%, 85%, ${l.alpha})`;
        ctx.fillText(l.text, l.x, l.y);
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(loop);
      }
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Dark gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, hsl(265 60% 12% / 1) 0%, transparent 60%), radial-gradient(ellipse at 80% 90%, hsl(220 70% 10% / 1) 0%, transparent 60%), linear-gradient(180deg, hsl(230 40% 5%) 0%, hsl(240 50% 3%) 100%)",
        }}
      />
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Subtle dark overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 0% / 0.35) 0%, hsl(0 0% 0% / 0.55) 100%)",
        }}
      />
    </div>
  );
};

export default DataAnalyticsBackground;
