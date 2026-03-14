import { useEffect, useRef, useState } from "react";

const GalaxyEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ w: window.innerWidth, h: window.innerHeight });

  // Shooting stars on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastStarTime = 0;
    const stars: {
      x: number; y: number; length: number; speed: number;
      angle: number; opacity: number; life: number; maxLife: number;
    }[] = [];

    const resize = () => {
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      canvas.width = w;
      canvas.height = h;
      setDimensions({ w, h });
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnStar = () => {
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6); // 30-60 degrees
      const side = Math.random();
      let x: number, y: number;
      if (side < 0.5) {
        x = Math.random() * canvas.width;
        y = -20;
      } else {
        x = -20;
        y = Math.random() * canvas.height * 0.6;
      }
      stars.push({
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

      // Spawn shooting star every 15-20 seconds
      if (time - lastStarTime > (15000 + Math.random() * 5000)) {
        spawnStar();
        lastStarTime = time;
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
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

        // Bright head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * s.opacity})`;
        ctx.fill();

        if (s.life >= s.maxLife) stars.splice(i, 1);
      }

      animationId = requestAnimationFrame(draw);
    };

    // Initial star after 3 seconds
    setTimeout(() => { spawnStar(); lastStarTime = performance.now(); }, 3000);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
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
