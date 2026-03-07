import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EducationSection = () => {
  const { t, isRTL } = useLanguage();

  const education = [0, 1].map((i) => ({
    degree: t(`edu.${i}.degree`),
    institution: t(`edu.${i}.institution`),
    period: t(`edu.${i}.period`),
    details: t(`edu.${i}.details`),
  }));

  return (
    <section id="education" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060a18 0%, #0a0f24 50%, #060a18 100%)" }}>
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
            <p className={`text-blue-400 font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("edu.label")}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("edu.title1")} <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}>
                {t("edu.title2")}
              </span>
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)" }} />
              <span className="text-blue-400/50 text-lg">◆</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)" }} />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                className="group relative rounded-2xl p-[1px] overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: "easeOut" } }}
              >
                {/* Animated neon border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "conic-gradient(from var(--border-angle, 0deg), transparent 30%, #3b82f6 45%, #06b6d4 55%, #8b5cf6 65%, transparent 80%)",
                    animation: "borderSpin 4s linear infinite",
                  }}
                />

                {/* Glass inner */}
                <div
                  className="relative rounded-2xl p-7 overflow-hidden"
                  style={{
                    background: "rgba(10, 15, 30, 0.7)",
                    backdropFilter: "blur(24px) saturate(1.2)",
                    boxShadow:
                      "0 0 0 1px rgba(59, 130, 246, 0.12) inset, 0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(59, 130, 246, 0.1)",
                  }}
                >
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-lg bg-blue-500/15 flex items-center justify-center mb-5 border border-blue-400/20">
                      <GraduationCap className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className={`text-lg font-semibold mb-1 text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>{edu.degree}</h3>
                    <p className="text-blue-300 text-sm mb-1">{edu.institution}</p>
                    <p className="text-gray-400 text-xs mb-3 font-medium">{edu.period}</p>
                    <p className={`text-gray-300 text-sm leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{edu.details}</p>
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

export default EducationSection;