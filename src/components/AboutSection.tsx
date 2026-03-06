import { motion } from "framer-motion";
import { Brain, HeartPulse, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedKpi } from "@/components/AnimatedKpi";

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
      className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "conic-gradient(from var(--border-angle, 0deg), transparent 30%, #06b6d4 45%, #8b5cf6 55%, #3b82f6 65%, transparent 80%)",
        animation: "borderSpin 4s linear infinite",
      }}
    />
    {/* Glass inner */}
    <div
      className="relative rounded-2xl p-7 overflow-hidden h-full"
      style={{
        background: "rgba(10, 15, 30, 0.7)",
        backdropFilter: "blur(24px) saturate(1.2)",
        boxShadow:
          "0 0 0 1px rgba(100, 200, 255, 0.08) inset, 0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(6, 182, 212, 0.1)",
      }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  </motion.div>
);

const AboutSection = () => {
  const { t, isRTL } = useLanguage();

  const highlights = [
    {
      icon: HeartPulse,
      title: t("about.clinical.title"),
      kpi: t("about.clinical.kpi"),
      kpiLabel: t("about.clinical.kpiLabel"),
      description: t("about.clinical.desc"),
    },
    {
      icon: Brain,
      title: t("about.ai.title"),
      kpi: t("about.ai.kpi"),
      kpiLabel: t("about.ai.kpiLabel"),
      description: t("about.ai.desc"),
    },
    {
      icon: BarChart3,
      title: t("about.data.title"),
      kpi: t("about.data.kpi"),
      kpiLabel: t("about.data.kpiLabel"),
      description: t("about.data.desc"),
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060a18 0%, #0a0f24 50%, #060a18 100%)" }}>
      {/* Reuse the same keyframes from Projects */}
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

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/5 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={`text-cyan-400 font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("about.label")}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("about.title1")}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}>{t("about.health")}</span>{" "}
              {t("about.meets")}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>{t("about.technology")}</span>
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)" }} />
              <span className="text-cyan-400/50 text-lg">◆</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)" }} />
            </div>
            <p className={`text-gray-400 max-w-2xl text-lg leading-relaxed mb-14 ${isRTL ? 'font-arabic' : ''}`}>
              {t("about.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <GlassCard key={item.title} delay={i * 0.15}>
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className={`text-lg font-semibold mb-1 text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>{item.title}</h3>
                <div className="mb-3">
                  <AnimatedKpi value={item.kpi} className="text-2xl font-bold font-heading bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }} />
                  <span className={`text-gray-500 text-xs ${isRTL ? 'mr-1.5' : 'ml-1.5'}`}>{item.kpiLabel}</span>
                </div>
                <p className={`text-gray-400 text-sm leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
