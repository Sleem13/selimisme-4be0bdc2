import { motion } from "framer-motion";
import { Briefcase, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const experienceTools = [
  ["Python", "SQL", "Power BI", "scikit-learn", "Pandas", "ETL"],
  ["Evidence-Based Protocols", "Milestone Tracking", "Team Mentorship", "KPI Reporting"],
  ["Sports Rehab", "Performance Benchmarking", "Data-Driven Recovery"],
  ["Pediatric Habilitation", "Developmental KPIs", "Family-Centered Care"],
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
            className="mb-14"
          >
            <p className={`text-purple-400 font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("exp.label")}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("exp.title1")} <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
                {t("exp.title2")}
              </span>
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)" }} />
              <span className="text-purple-400/50 text-lg">◆</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)" }} />
            </div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute ${isRTL ? 'right-0 md:right-8' : 'left-0 md:left-8'} top-0 bottom-0 w-px bg-gradient-to-b from-purple-400/50 to-transparent`} />

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
                  <div className={`absolute ${isRTL ? 'right-0 md:right-8 translate-x-[6px]' : 'left-0 md:left-8 -translate-x-[6px]'} top-1 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]`} />

                  {/* Glass card */}
                  <div className="group relative rounded-2xl p-[1px] overflow-hidden">
                    {/* Animated neon border */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "conic-gradient(from var(--border-angle, 0deg), transparent 30%, #8b5cf6 45%, #3b82f6 55%, #06b6d4 65%, transparent 80%)",
                        animation: "borderSpin 4s linear infinite",
                      }}
                    />
                    
                    {/* Glass inner */}
                    <div
                      className="relative rounded-2xl p-6 overflow-hidden"
                      style={{
                        background: "rgba(10, 15, 30, 0.7)",
                        backdropFilter: "blur(24px) saturate(1.2)",
                        boxShadow: "0 0 0 1px rgba(139, 92, 246, 0.15) inset, 0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(139, 92, 246, 0.1)",
                      }}
                    >
                      {/* Inner glow on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                          background: "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)",
                        }}
                      />

                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className={`text-lg font-semibold text-white flex items-center gap-2 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                              <Briefcase className="w-4 h-4 text-purple-400" />
                              {exp.role}
                            </h3>
                            <p className="text-purple-300 text-sm">{exp.company}</p>
                          </div>
                          <span className="text-gray-400 text-sm mt-1 md:mt-0 font-medium">{exp.period}</span>
                        </div>

                        <div className="space-y-2.5 mb-4">
                          <p className={`text-sm text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                            <span className="font-semibold text-purple-300">{t("exp.challenge")}</span> {exp.challenge}
                          </p>
                          <p className={`text-sm text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                            <span className="font-semibold text-blue-300">{t("exp.solution")}</span> {exp.solution}
                          </p>
                          <p className={`text-sm text-gray-300 flex items-start gap-1.5 ${isRTL ? 'font-arabic' : ''}`}>
                            <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span><span className="font-semibold text-cyan-400">{t("exp.impact")}</span> {exp.impact}</span>
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {exp.tools.map((tool) => (
                            <span key={tool} className="px-2.5 py-1 text-xs rounded-md text-purple-300 border border-purple-400/30 font-medium" style={{ background: "rgba(168, 85, 247, 0.08)" }}>
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;