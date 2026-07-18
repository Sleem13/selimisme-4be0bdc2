import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const experienceTools = [
  ["Python", "SQL", "Power BI", "scikit-learn", "Pandas", "ETL"],
  ["Evidence-Based Protocols", "Milestone Tracking", "Team Mentorship", "KPI Reporting"],
  ["Sports Rehab", "Performance Benchmarking", "Data-Driven Recovery"],
  ["Pediatric Habilitation", "Developmental KPIs", "Family-Centered Care"],
];

// Rough year extraction for the rail marker
const yearOf = (period: string) => {
  const m = period.match(/(20\d{2})/);
  return m ? m[1] : "—";
};

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
          {/* Section marker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 md:mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                03 — Work
              </span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
            <h2
              className={`text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.02] ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("exp.title1")}{" "}
              <span className="italic font-normal gradient-text">
                {t("exp.title2")}
              </span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Rail */}
            <div
              className={`absolute top-0 bottom-0 w-px bg-border/70 ${isRTL ? "right-[72px] md:right-[100px]" : "left-[72px] md:left-[100px]"}`}
              aria-hidden
            />

            <ol className="space-y-16 md:space-y-20">
              {experiences.map((exp, i) => (
                <motion.li
                  key={i}
                  className="relative grid grid-cols-[72px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Year rail */}
                  <div className={`relative ${isRTL ? "order-2 text-left" : "text-right"} pr-2`}>
                    <span
                      className={`block font-heading text-2xl md:text-3xl font-extrabold text-primary leading-none ${isRTL ? "text-left pl-0" : ""}`}
                    >
                      {yearOf(exp.period)}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {exp.period.replace(/^\s*20\d{2}\s*[–-]?\s*/, "").trim() ||
                        "present"}
                    </span>

                    {/* Node dot on the rail */}
                    <span
                      className={`absolute top-2 w-3 h-3 rounded-full bg-primary border-2 border-background ${isRTL ? "-left-[7px]" : "-right-[7px]"}`}
                      style={{ boxShadow: "0 0 0 4px hsl(var(--background))" }}
                      aria-hidden
                    />
                  </div>

                  {/* Entry */}
                  <div className={isRTL ? "order-1" : ""}>
                    <h3
                      className={`text-xl md:text-2xl font-extrabold text-foreground tracking-tight ${isRTL ? "font-arabic" : "font-heading"}`}
                    >
                      {exp.role}
                    </h3>
                    <p className="mt-1 font-mono text-xs tracking-[0.15em] uppercase text-primary/90">
                      {exp.company}
                    </p>

                    {/* Outcome bullets — impact leads */}
                    <ul className="mt-5 space-y-2.5">
                      <li className={`flex gap-3 text-sm md:text-[15px] leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                        <span className="text-foreground/90">
                          <span className="font-semibold text-gold">
                            {t("exp.impact")}{" "}
                          </span>
                          {exp.impact}
                        </span>
                      </li>
                      <li className={`flex gap-3 text-sm md:text-[15px] leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                        <span className="text-foreground/80">
                          <span className="font-semibold text-primary">
                            {t("exp.solution")}{" "}
                          </span>
                          {exp.solution}
                        </span>
                      </li>
                      <li className={`flex gap-3 text-sm md:text-[15px] leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" aria-hidden />
                        <span className="text-muted-foreground">
                          <span className="font-semibold text-foreground/80">
                            {t("exp.challenge")}{" "}
                          </span>
                          {exp.challenge}
                        </span>
                      </li>
                    </ul>

                    {/* Stack chips */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 text-[11px] rounded-full font-mono uppercase tracking-wider text-foreground/80 bg-secondary/60 border border-border"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
