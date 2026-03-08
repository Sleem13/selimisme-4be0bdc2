import { motion } from "framer-motion";
import { Award, Globe, Code2, Stethoscope } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const technicalSkills = ["Python", "SQL", "Power BI", "Tableau", "scikit-learn", "Machine Learning", "Data Analytics", "Automation"];
const clinicalSkills = ["Clinical Evaluation", "Musculoskeletal Rehab", "Neuromuscular Therapy", "Dry Needling", "Acupuncture"];

const certifications = [
  'Google Data Analytics Professional Certificate — "Foundations: Data, Data, Everywhere"',
  '"Delivering Quality Work with Agility" — Agile & Lean Methodologies',
];

const languages = [
  { name: "English", nameAr: "الإنجليزية", level: "Fluent", levelAr: "طلاقة" },
  { name: "Arabic", nameAr: "العربية", level: "Native", levelAr: "اللغة الأم" },
  { name: "French", nameAr: "الفرنسية", level: "Basic", levelAr: "أساسي" },
];

const GlassCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={`group relative rounded-2xl p-[1px] overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -6, transition: { duration: 0.35, ease: "easeOut" } }}
  >
    <div
      className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          "conic-gradient(from var(--border-angle, 0deg), transparent 30%, #06b6d4 45%, #8b5cf6 55%, #3b82f6 65%, transparent 80%)",
        animation: "borderSpin 4s linear infinite",
      }}
    />
    <div
      className="relative rounded-2xl p-6 overflow-hidden h-full"
      style={{
        background: "rgba(10, 15, 30, 0.7)",
        backdropFilter: "blur(24px) saturate(1.2)",
        boxShadow:
          "0 0 0 1px rgba(100, 200, 255, 0.08) inset, 0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(6, 182, 212, 0.08)",
      }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  </motion.div>
);

const iconColors: Record<string, string> = {
  technical: "text-cyan-400",
  clinical: "text-emerald-400",
  certifications: "text-amber-400",
  languages: "text-violet-400",
};

const SkillsSection = () => {
  const { t, isRTL, lang } = useLanguage();

  return (
    <section id="skills" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060a18 0%, #0a0f24 50%, #060a18 100%)" }}>
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

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/5 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className={`text-cyan-400 font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("skills.label")}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("skills.title1")}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6, #3b82f6)" }}>
                {t("skills.title2")}
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)" }} />
              <span className="text-cyan-400/50 text-lg">◆</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)" }} />
            </div>
          </motion.div>

          {/* Bento Grid - Asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
            {/* Technical Skills - Large card spanning 2 cols */}
            <GlassCard delay={0} className="md:col-span-2 md:row-span-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Code2 className={`w-4 h-4 ${iconColors.technical}`} />
                </div>
                <h3 className={`text-base font-semibold text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.technical")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs rounded-full border border-cyan-400/20 text-cyan-300 font-medium hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                    style={{ background: "rgba(6, 182, 212, 0.08)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Languages - Tall card on the right */}
            <GlassCard delay={0.05} className="md:row-span-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Globe className={`w-4 h-4 ${iconColors.languages}`} />
                </div>
                <h3 className={`text-base font-semibold text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.languages")}</h3>
              </div>
              <div className="space-y-4">
                {languages.map((l) => (
                  <div key={l.name} className="group/lang">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-violet-400" />
                        <span className="text-sm text-white font-medium">{lang === "ar" ? l.nameAr : l.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 px-2 py-0.5 rounded-full border border-violet-400/20" style={{ background: "rgba(139, 92, 246, 0.08)" }}>
                        {lang === "ar" ? l.levelAr : l.level}
                      </span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #8b5cf6, #06b6d4)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: l.level === "Native" || l.levelAr === "اللغة الأم" ? "100%" : l.level === "Fluent" ? "85%" : "35%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Clinical Skills */}
            <GlassCard delay={0.1} className="md:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Stethoscope className={`w-4 h-4 ${iconColors.clinical}`} />
                </div>
                <h3 className={`text-base font-semibold text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.clinical")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {clinicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs rounded-full border border-emerald-400/20 text-emerald-300 font-medium hover:border-emerald-400/50 transition-all duration-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                    style={{ background: "rgba(16, 185, 129, 0.08)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Certifications - Wide card at bottom */}
            <GlassCard delay={0.15} className="md:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Award className={`w-4 h-4 ${iconColors.certifications}`} />
                </div>
                <h3 className={`text-base font-semibold text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.certifications")}</h3>
              </div>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.4)]" />
                    {cert}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
