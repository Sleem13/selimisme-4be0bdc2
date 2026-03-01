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

const SkillsSection = () => {
  const { t, isRTL, lang } = useLanguage();

  return (
    <section id="skills" className="section-padding bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("skills.label")}</p>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>
            {t("skills.title1")} <span className="gradient-accent-text">{t("skills.title2")}</span>
          </h2>
          <div className="arabic-divider mb-14">
            <span className="arabic-ornament">✦</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Technical Skills */}
          <motion.div className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-5">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className={`text-base font-semibold text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.technical")}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 text-xs rounded-md border border-primary/20 bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Clinical Skills */}
          <motion.div className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
            <div className="flex items-center gap-2 mb-5">
              <Stethoscope className="w-5 h-5 text-soft-green" />
              <h3 className={`text-base font-semibold text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.clinical")}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {clinicalSkills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 text-xs rounded-md border border-soft-green/20 bg-soft-green/5 text-soft-green font-medium hover:bg-soft-green/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-5 h-5 text-accent" />
              <h3 className={`text-base font-semibold text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.certifications")}</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Languages */}
          <motion.div className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <div className="flex items-center gap-2 mb-5">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className={`text-base font-semibold text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>{t("skills.languages")}</h3>
            </div>
            <div className="space-y-3">
              {languages.map((l) => (
                <div key={l.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-foreground font-medium">{lang === "ar" ? l.nameAr : l.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{lang === "ar" ? l.levelAr : l.level}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
