import { motion } from "framer-motion";
import { Award, Globe, Code2, Stethoscope } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const technicalSkills = ["Python", "SQL", "Power BI", "Tableau", "scikit-learn", "Pandas", "Machine Learning", "ETL Pipelines", "Data Analytics", "DAX", "Automation", "Statistical Modeling"];
const clinicalSkills = ["Clinical Assessment & Triage", "Musculoskeletal Rehabilitation", "Neuromuscular Therapy", "Sports Injury Recovery", "Dry Needling & Acupuncture", "Pediatric Habilitation"];

const certifications = [
  'Google Data Analytics Professional Certificate — "Foundations: Data, Data, Everywhere"',
  '"Delivering Quality Work with Agility" — Agile & Lean Methodologies',
  'Applied AI & Healthcare Data Integration — Egyptian Military Academy',
];

const languages = [
  { name: "English", nameAr: "الإنجليزية", level: "Fluent", levelAr: "طلاقة", pct: "85%" },
  { name: "Arabic", nameAr: "العربية", level: "Native", levelAr: "اللغة الأم", pct: "100%" },
  { name: "French", nameAr: "الفرنسية", level: "Basic", levelAr: "أساسي", pct: "35%" },
];

const SoftCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={`group rounded-2xl bg-card border border-border p-6 transition-all duration-500 hover:border-primary/30 ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -4 }}
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    {children}
  </motion.div>
);

const skillTagStyle = (variant: "tech" | "clinical") => {
  if (variant === "tech") return "text-primary bg-primary/8 border-primary/15";
  return "text-soft-green bg-soft-green/10 border-soft-green/20";
};

const SkillsSection = () => {
  const { t, isRTL, lang } = useLanguage();

  return (
    <section id="skills" className="bg-background">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("skills.label")}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("skills.title1")}{" "}
              <span className="gradient-text">{t("skills.title2")}</span>
            </h2>
            <div className="arabic-divider">
              <span className="arabic-ornament">◆</span>
            </div>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
            {/* Technical Skills - 2 cols */}
            <SoftCard delay={0} className="md:col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-primary" />
                </div>
                <h3 className={`text-base font-semibold text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.technical")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill) => (
                  <span key={skill} className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-all duration-300 hover:shadow-sm ${skillTagStyle("tech")}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </SoftCard>

            {/* Languages - tall right */}
            <SoftCard delay={0.05} className="md:row-span-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-gold" />
                </div>
                <h3 className={`text-base font-semibold text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.languages")}</h3>
              </div>
              <div className="space-y-5">
                {languages.map((l) => (
                  <div key={l.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground font-medium">{lang === "ar" ? l.nameAr : l.name}</span>
                      <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary border border-border">
                        {lang === "ar" ? l.levelAr : l.level}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: l.pct }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SoftCard>

            {/* Clinical Skills */}
            <SoftCard delay={0.1}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-coral" />
                </div>
                <h3 className={`text-base font-semibold text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.clinical")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {clinicalSkills.map((skill) => (
                  <span key={skill} className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-all duration-300 hover:shadow-sm ${skillTagStyle("clinical")}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </SoftCard>

            {/* Certifications */}
            <SoftCard delay={0.15}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Award className="w-4 h-4 text-gold" />
                </div>
                <h3 className={`text-base font-semibold text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.certifications")}</h3>
              </div>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </SoftCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
