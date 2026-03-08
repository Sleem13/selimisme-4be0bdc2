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
    <section id="education" className="bg-secondary/30">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("edu.label")}</p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("edu.title1")}{" "}
              <span className="gradient-text">{t("edu.title2")}</span>
            </h2>
            <div className="arabic-divider">
              <span className="arabic-ornament">◆</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                className="group rounded-2xl bg-card border border-border p-7 transition-all duration-500 hover:border-primary/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className={`text-lg font-semibold mb-1 text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}>{edu.degree}</h3>
                <p className="text-primary/80 text-sm mb-1">{edu.institution}</p>
                <p className="text-muted-foreground text-xs mb-4 font-medium px-2.5 py-0.5 rounded-full bg-secondary inline-block">{edu.period}</p>
                <p className={`text-muted-foreground text-sm leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
