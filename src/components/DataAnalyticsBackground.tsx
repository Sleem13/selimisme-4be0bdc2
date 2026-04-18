import { useEffect, useRef, useState } from "react";

/**
 * DataAnalyticsBackground
 * Theme-aware canvas-based animated background visualizing data analytics:
 * - Floating data nodes
 * - Connecting network lines (proximity-based)
 * - Subtle floating tool labels (Power BI, SQL, Python, Tableau, Excel)
 *
 * Adapts to light/dark/galaxy themes:
 * - Dark/Galaxy: Glowing neon-blue nodes and lines on deep navy/purple base
 * - Light: Charcoal/slate nodes and lines on soft off-white base (no glow)
 *
 * Optimized: single rAF loop, capped DPR, pauses when tab hidden.
 */
const TOOL_LABELS = ["Power BI", "SQL", "Python", "Tableau", "Excel", "ML", "ETL"];

type ThemeMode = "light" | "dark";

const DataAnalyticsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<ThemeMode>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  // Watch for theme changes on <html>
  useEffect(() => {
    const update = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.classList.contains("galaxy");
      setTheme(isDark ? "dark" : "light");
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

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

    // Theme-driven palette
    const isDark = theme === "dark";
    const palette = isDark
      ? {
          lineColor: (a: number) => `hsla(195, 95%, 65%, ${a})`,
          glowColor: (a: number) => `hsla(265, 90%, 70%, ${a})`,
          coreColor: (a: number) => `hsla(195, 100%, 80%, ${a})`,
          labelColor: (a: number) => `hsla(195, 100%, 85%, ${a})`,
          lineMul: 1,
          glowMul: 1,
          labelMaxAlpha: 0.18,
          labelMinAlpha: 0.04,
        }
      : {
          // Charcoal / slate gray for light mode — no glow
          lineColor: (a: number) => `hsla(215, 35%, 30%, ${a})`,
          glowColor: (a: number) => `hsla(215, 50%, 40%, ${a})`,
          coreColor: (a: number) => `hsla(215, 45%, 25%, ${a})`,
          labelColor: (a: number) => `hsla(215, 35%, 25%, ${a})`,
          lineMul: 0.9,
          glowMul: 0, // disable glow halo in light mode
          labelMaxAlpha: 0.32,
          labelMinAlpha: 0.1,
        };

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
        alpha: palette.labelMinAlpha + Math.random() * (palette.labelMaxAlpha - palette.labelMinAlpha) * 0.6,
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

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.pulse += 0.015;
      }

      // Connection lines
      ctx.lineWidth = isDark ? 0.6 : 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < MAX_DIST_SQ) {
            const alpha = (1 - dSq / MAX_DIST_SQ) * 0.35 * palette.lineMul;
            ctx.strokeStyle = palette.lineColor(alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes (glow only in dark mode)
      for (const n of nodes) {
        const pulse = 0.6 + 0.4 * Math.sin(n.pulse);
        const r = n.r * (0.9 + pulse * 0.3);

        if (palette.glowMul > 0) {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
          grad.addColorStop(0, palette.glowColor(0.5 * pulse * palette.glowMul));
          grad.addColorStop(1, palette.glowColor(0));
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        ctx.fillStyle = palette.coreColor(0.8 * pulse + 0.2);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floating tool labels
      ctx.font = `${isDark ? 500 : 600} 11px ui-sans-serif, system-ui, -apple-system, sans-serif`;
      ctx.textBaseline = "middle";
      for (const l of labels) {
        l.x += l.vx;
        l.y += l.vy;
        if (l.x < 0 || l.x > width) l.vx *= -1;
        if (l.y < 0 || l.y > height) l.vy *= -1;
        l.alpha += l.alphaDir * 0.0015;
        if (l.alpha > palette.labelMaxAlpha) l.alphaDir = -1;
        if (l.alpha < palette.labelMinAlpha) l.alphaDir = 1;

        ctx.fillStyle = palette.labelColor(l.alpha);
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
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Theme-aware gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 20% 10%, hsl(265 60% 12% / 1) 0%, transparent 60%), radial-gradient(ellipse at 80% 90%, hsl(220 70% 10% / 1) 0%, transparent 60%), linear-gradient(180deg, hsl(230 40% 5%) 0%, hsl(240 50% 3%) 100%)"
            : "radial-gradient(ellipse at 20% 10%, hsl(215 60% 96% / 1) 0%, transparent 60%), radial-gradient(ellipse at 80% 90%, hsl(220 50% 95% / 1) 0%, transparent 60%), linear-gradient(180deg, hsl(40 20% 98%) 0%, hsl(215 25% 95%) 100%)",
        }}
      />
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Theme-aware overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(180deg, hsl(0 0% 0% / 0.35) 0%, hsl(0 0% 0% / 0.55) 100%)"
            : "linear-gradient(180deg, hsl(0 0% 100% / 0.55) 0%, hsl(0 0% 100% / 0.7) 100%)",
        }}
      />
    </div>
  );
};

export default DataAnalyticsBackground;
