import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef } from "react";

const projectTools = [
  ["Python", "scikit-learn", "Pandas", "SQL"],
  ["Power BI", "SQL", "Excel", "DAX"],
  ["Python", "Tableau", "SQL", "Pandas"],
];

const sectionIcon = (Icon: typeof Target) => (
  <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
    <Icon className="w-3.5 h-3.5 text-cyan-400" />
  </div>
);

// Particle canvas for the background
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 220, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

const GlassCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    className="group relative rounded-2xl p-[1px] overflow-hidden"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -8, transition: { duration: 0.35, ease: "easeOut" } }}
  >
    {/* Animated neon border */}
    <div
      className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "conic-gradient(from var(--border-angle, 0deg), transparent 30%, #06b6d4 45%, #8b5cf6 55%, #3b82f6 65%, transparent 80%)",
        animation: "borderSpin 4s linear infinite",
      }}
    />

    {/* Glass inner */}
    <div
      className="relative rounded-2xl p-7 md:p-9 overflow-hidden"
      style={{
        background: "rgba(10, 15, 30, 0.7)",
        backdropFilter: "blur(24px) saturate(1.2)",
        boxShadow:
          "0 0 0 1px rgba(100, 200, 255, 0.08) inset, 0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(6, 182, 212, 0.1)",
      }}
    >
      {/* Inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();

  const projects = [0, 1, 2].map((i) => ({
    title: t(`proj.${i}.title`),
    tagline: t(`proj.${i}.tagline`),
    challenge: t(`proj.${i}.challenge`),
    solution: t(`proj.${i}.solution`),
    impact: [0, 1].map((j) => ({
      kpi: t(`proj.${i}.impact.${j}.kpi`),
      label: t(`proj.${i}.impact.${j}.label`),
    })),
    tools: projectTools[i],
  }));

  return (
    <section id="projects" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060a18 0%, #0a0f24 50%, #060a18 100%)" }}>
      {/* Keyframes */}
      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes borderSpin {
          to { --border-angle: 360deg; }
        }
      `}</style>

      <ParticleBackground />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className={`text-cyan-400 font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>
              {t("proj.label")}
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("proj.title1")}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6, #3b82f6)" }}>
                {t("proj.title2")}
              </span>
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)" }} />
              <span className="text-cyan-400/50 text-lg">◆</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)" }} />
            </div>
            <p className={`text-gray-400 max-w-2xl text-lg leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
              {t("proj.description")}
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <GlassCard key={i} delay={i * 0.12}>
                <div className="mb-6">
                  <h3 className={`text-xl md:text-2xl font-bold text-white mb-1 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                    {project.title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">{project.tagline}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-3">
                    {sectionIcon(Target)}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        {t("proj.challenge")}
                      </p>
                      <p className={`text-sm text-gray-300 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{project.challenge}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {sectionIcon(Lightbulb)}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        {t("proj.solution")}
                      </p>
                      <p className={`text-sm text-gray-300 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{project.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-5 border-t border-white/5">
                  <div className="flex gap-3 flex-1">
                    {sectionIcon(TrendingUp)}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        {t("proj.impact")}
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        {project.impact.map((item) => (
                          <div key={item.label} className="flex items-baseline gap-1.5">
                            <AnimatedKpi value={item.kpi} className="text-xl font-bold font-heading bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }} />
                            <span className="text-gray-500 text-xs">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {sectionIcon(Wrench)}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        {t("proj.tools")}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 rounded-md text-xs font-medium text-cyan-300 border border-cyan-400/20"
                            style={{ background: "rgba(6, 182, 212, 0.08)" }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
