import { motion } from "framer-motion";
import { Brain, HeartPulse, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <section id="about" className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>{t("about.label")}</p>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>
            {t("about.title1")} <span className="gradient-text">{t("about.health")}</span> {t("about.meets")} <span className="gradient-accent-text">{t("about.technology")}</span>
          </h2>
          <div className="arabic-divider mb-6">
            <span className="arabic-ornament">✦</span>
          </div>
          <p className={`text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14 ${isRTL ? 'font-arabic' : ''}`}>
            {t("about.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-card border border-border rounded-xl p-7 hover:glow-border transition-all duration-500"
              style={{ boxShadow: 'var(--shadow-card)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className={`text-lg font-semibold mb-1 text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>{item.title}</h3>
              <div className="mb-3">
                <span className="kpi-highlight text-2xl">{item.kpi}</span>
                <span className={`text-muted-foreground text-xs ${isRTL ? 'mr-1.5' : 'ml-1.5'}`}>{item.kpiLabel}</span>
              </div>
              <p className={`text-muted-foreground text-sm leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
