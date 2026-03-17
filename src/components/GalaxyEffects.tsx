import { useEffect, useRef } from "react";

const GalaxyEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastStarTime = 0;

    // Shooting stars
    const shootingStars: {
      x: number; y: number; length: number; speed: number;
      angle: number; opacity: number; life: number; maxLife: number;
    }[] = [];

    // Twinkling stars
    type TwinkleStar = { x: number; y: number; radius: number; phase: number; speed: number; baseAlpha: number };
    let twinkleStars: TwinkleStar[] = [];

    const generateTwinkleStars = (w: number, h: number) => {
      const count = Math.floor((w * h) / 8000); // density based on screen size
      twinkleStars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 1.5,
        baseAlpha: 0.15 + Math.random() * 0.55,
      }));
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      canvas.width = w;
      canvas.height = h;
      generateTwinkleStars(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnStar = () => {
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6);
      const side = Math.random();
      let x: number, y: number;
      if (side < 0.5) {
        x = Math.random() * canvas.width;
        y = -20;
      } else {
        x = -20;
        y = Math.random() * canvas.height * 0.6;
      }
      shootingStars.push({
        x, y,
        length: 80 + Math.random() * 120,
        speed: 12 + Math.random() * 8,
        angle,
        opacity: 0.7 + Math.random() * 0.3,
        life: 0,
        maxLife: 40 + Math.random() * 30,
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      const t = time * 0.001;
      for (const s of twinkleStars) {
        const alpha = s.baseAlpha * (0.4 + 0.6 * ((Math.sin(t * s.speed + s.phase) + 1) / 2));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
        ctx.fill();
      }

      // Spawn shooting star every 15-20 seconds
      if (time - lastStarTime > (15000 + Math.random() * 5000)) {
        spawnStar();
        lastStarTime = time;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) / 0.3 : 1;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.7, `rgba(200, 220, 255, ${alpha * s.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${alpha * s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * s.opacity})`;
        ctx.fill();

        if (s.life >= s.maxLife) shootingStars.splice(i, 1);
      }

      animationId = requestAnimationFrame(draw);
    };

    setTimeout(() => { spawnStar(); lastStarTime = performance.now(); }, 3000);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* Nebula clouds - scattered morphing blobs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div className="nebula-blob nebula-blob-1" />
        <div className="nebula-blob nebula-blob-2" />
        <div className="nebula-blob nebula-blob-3" />
        <div className="nebula-blob nebula-blob-4" />
        <div className="nebula-blob nebula-blob-5" />
      </div>

      {/* Aurora Borealis - top of page, behind hero */}
      <div
        className="aurora-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60vh",
          zIndex: -1,
          overflow: "hidden",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <div className="aurora-layer aurora-layer-1" />
        <div className="aurora-layer aurora-layer-2" />
        <div className="aurora-layer aurora-layer-3" />
      </div>

      {/* Shooting stars canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default GalaxyEffects;
