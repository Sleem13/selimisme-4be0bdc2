import { motion } from "framer-motion";
import { Briefcase, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const experienceTools = [
  ["Python", "SQL", "Power BI", "scikit-learn"],
  ["Clinical Assessment", "Rehabilitation Protocols", "Patient Outcomes Tracking"],
  ["Sports Rehabilitation", "Performance Benchmarking"],
  ["Pediatric Habilitation", "Developmental KPI Tracking"],
];

const ExperienceSection = () => {
  const { t, isRTL } = useLanguage();

  const experiences = Array.from({ length: 4 }, (_, i) => ({
    role: t(`exp.${i}.role`),
    company: t(`exp.${i}.company`),
    period: t(`exp.${i}.period`),
    challenge: t(`exp.${i}.challenge`),
    solution: t(`exp.${i}.solution`),
    impact: t(`exp.${i}.impact`),
    tools: experienceTools[i],
  }));

  return (
    <section id="experience" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0f24 0%, #060a18 50%, #0a0f24 100%)" }}>
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

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("exp.label")}</p>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>
            {t("exp.title1")} <span className="gradient-text">{t("exp.title2")}</span>
          </h2>
          <div className="arabic-divider mb-14">
            <span className="arabic-ornament">✦</span>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute ${isRTL ? 'right-0 md:right-8' : 'left-0 md:left-8'} top-0 bottom-0 w-px bg-border`} />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className={`relative ${isRTL ? 'pr-8 md:pr-20' : 'pl-8 md:pl-20'}`}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div className={`absolute ${isRTL ? 'right-0 md:right-8 translate-x-[6px]' : 'left-0 md:left-8 -translate-x-[6px]'} top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(215_65%_42%/0.4)]`} />

                <div className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className={`text-lg font-semibold text-navy flex items-center gap-2 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        <Briefcase className="w-4 h-4 text-primary" />
                        {exp.role}
                      </h3>
                      <p className="text-primary text-sm">{exp.company}</p>
                    </div>
                    <span className="text-muted-foreground text-sm mt-1 md:mt-0 font-medium">{exp.period}</span>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    <p className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                      <span className="font-semibold text-navy">{t("exp.challenge")}</span> {exp.challenge}
                    </p>
                    <p className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                      <span className="font-semibold text-navy">{t("exp.solution")}</span> {exp.solution}
                    </p>
                    <p className={`text-sm text-muted-foreground flex items-start gap-1.5 ${isRTL ? 'font-arabic' : ''}`}>
                      <TrendingUp className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold text-gold">{t("exp.impact")}</span> {exp.impact}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tools.map((tool) => (
                      <span key={tool} className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
