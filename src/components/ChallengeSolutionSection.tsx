import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ChallengeSolutionSection = () => {
  const { t, isRTL } = useLanguage();

  const rows = [0, 1, 2, 3].map((i) => ({
    problem: t(`cs.${i}.problem`),
    solution: t(`cs.${i}.solution`),
  }));

  return (
    <section id="challenge" className="relative bg-secondary/30">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? "font-arabic" : ""}`}
            >
              {t("cs.label")}
            </p>
            <h2
              className={`text-3xl md:text-5xl font-bold text-foreground leading-tight ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("cs.title.1")}{" "}
              <span className="gradient-text">{t("cs.title.2")}</span>
            </h2>
            <p
              className={`text-muted-foreground text-lg mt-4 max-w-2xl ${isRTL ? "font-arabic" : ""}`}
            >
              {t("cs.subtitle")}
            </p>
          </motion.div>

          {/* Header row */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-6 px-6 mb-3">
            <span className="text-xs tracking-[0.3em] font-heading text-muted-foreground uppercase">
              {t("cs.problem")}
            </span>
            <span className="w-10" />
            <span className="text-xs tracking-[0.3em] font-heading text-primary uppercase">
              {t("cs.solution")}
            </span>
          </div>

          <div className="space-y-3">
            {rows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center rounded-2xl bg-card border border-border p-5 md:p-6 transition-all duration-300 hover:border-primary/30"
                style={{ boxShadow: "var(--shadow-card)" }}
                whileHover={{ y: -2 }}
              >
                <p
                  className={`text-muted-foreground text-base md:text-lg ${isRTL ? "font-arabic" : ""}`}
                >
                  {row.problem}
                </p>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mx-auto md:mx-0">
                  <ArrowRight
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""} group-hover:translate-x-0.5 transition-transform`}
                  />
                </div>
                <p
                  className={`text-foreground text-base md:text-lg font-heading font-semibold ${isRTL ? "font-arabic" : ""}`}
                >
                  {row.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSolutionSection;
