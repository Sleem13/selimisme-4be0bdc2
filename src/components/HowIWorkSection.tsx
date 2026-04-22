import { motion } from "framer-motion";
import { Compass, Hammer, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowIWorkSection = () => {
  const { t, isRTL } = useLanguage();

  const steps = [
    { icon: Compass, n: "01", titleKey: "how.1.title", descKey: "how.1.desc" },
    { icon: Hammer, n: "02", titleKey: "how.2.title", descKey: "how.2.desc" },
    { icon: Rocket, n: "03", titleKey: "how.3.title", descKey: "how.3.desc" },
  ];

  return (
    <section id="how" className="relative bg-secondary/30">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? "font-arabic" : ""}`}>
              {t("how.label")}
            </p>
            <h2 className={`text-3xl md:text-5xl font-bold text-foreground leading-tight ${isRTL ? "font-arabic" : "font-heading"}`}>
              {t("how.title.1")} <span className="gradient-text">{t("how.title.2")}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-2xl bg-card border border-border p-7 transition-all duration-500 hover:border-primary/30"
                style={{ boxShadow: "var(--shadow-card)" }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs tracking-[0.3em] font-heading text-muted-foreground uppercase">
                    {t("how.step")} {s.n}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className={`text-xl md:text-2xl font-bold text-foreground mb-3 ${isRTL ? "font-arabic" : "font-heading"}`}>
                  {t(s.titleKey)}
                </h3>
                <p className={`text-muted-foreground leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                  {t(s.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWorkSection;
