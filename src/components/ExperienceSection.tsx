import { motion } from "framer-motion";
import { Briefcase, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const experienceTools = [
  ["Python", "SQL", "Power BI", "scikit-learn", "Pandas", "ETL"],
  [
    "Evidence-Based Protocols",
    "Milestone Tracking",
    "Team Mentorship",
    "KPI Reporting",
  ],
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
    <section id="experience" className="bg-background">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p
              className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? "font-arabic" : ""}`}
            >
              {t("exp.label")}
            </p>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-3 text-foreground ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("exp.title1")}{" "}
              <span className="gradient-text">{t("exp.title2")}</span>
            </h2>
            <div className="arabic-divider">
              <span className="arabic-ornament">◆</span>
            </div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className={`absolute ${isRTL ? "right-0 md:right-6" : "left-0 md:left-6"} top-0 bottom-0 w-px bg-border`}
            />

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  className={`relative ${isRTL ? "pr-8 md:pr-16" : "pl-8 md:pl-16"}`}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute ${isRTL ? "right-0 md:right-6 translate-x-[5px]" : "left-0 md:left-6 -translate-x-[5px]"} top-2 w-3 h-3 rounded-full bg-primary border-2 border-background`}
                    style={{ boxShadow: "var(--shadow-glow)" }}
                  />

                  {/* Card */}
                  <motion.div
                    className="rounded-2xl bg-card border border-border p-6 transition-all duration-400 hover:border-primary/30"
                    style={{ boxShadow: "var(--shadow-card)" }}
                    whileHover={{ boxShadow: "var(--shadow-card-hover)" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3
                          className={`text-lg font-semibold text-foreground flex items-center gap-2 ${isRTL ? "font-arabic" : "font-heading"}`}
                        >
                          <Briefcase className="w-4 h-4 text-primary" />
                          {exp.role}
                        </h3>
                        <p className="text-primary/80 text-sm">{exp.company}</p>
                      </div>
                      <span className="text-muted-foreground text-sm mt-1 md:mt-0 font-medium px-3 py-1 rounded-full bg-secondary text-xs">
                        {exp.period}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p
                        className={`text-sm text-muted-foreground ${isRTL ? "font-arabic" : ""}`}
                      >
                        <span className="font-semibold text-foreground">
                          {t("exp.challenge")}
                        </span>{" "}
                        {exp.challenge}
                      </p>
                      <p
                        className={`text-sm text-muted-foreground ${isRTL ? "font-arabic" : ""}`}
                      >
                        <span className="font-semibold text-primary">
                          {t("exp.solution")}
                        </span>{" "}
                        {exp.solution}
                      </p>
                      <p
                        className={`text-sm text-muted-foreground flex items-start gap-1.5 ${isRTL ? "font-arabic" : ""}`}
                      >
                        <TrendingUp className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>
                          <span className="font-semibold text-gold">
                            {t("exp.impact")}
                          </span>{" "}
                          {exp.impact}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 text-xs rounded-lg text-primary bg-primary/8 border border-primary/15 font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
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
