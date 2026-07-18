import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedKpi } from "@/components/AnimatedKpi";

const projectTools = [
  ["PyTorch", "Reinforcement Learning", "DQN", "Streamlit"],
  ["Python", "scikit-learn", "Pandas", "SHAP"],
  ["Power BI", "SQL", "DAX", "Azure DF"],
  ["Python", "Tableau", "SQL", "Statsmodels"],
];

const projectLinks: (string | null)[] = [
  "https://github.com/Sleem13/rehab_rl",
  null,
  null,
  null,
];

const projectCategory: ("ML" | "Analytics" | "Clinical")[] = [
  "ML",
  "ML",
  "Analytics",
  "Clinical",
];

const filters: ("All" | "ML" | "Analytics" | "Clinical")[] = [
  "All",
  "ML",
  "Analytics",
  "Clinical",
];

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const projects = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        idx: i,
        title: t(`proj.${i}.title`),
        tagline: t(`proj.${i}.tagline`),
        role: t(`proj.${i}.role`),
        timeline: t(`proj.${i}.timeline`),
        context: t(`proj.${i}.context`),
        impact: [0, 1].map((j) => ({
          kpi: t(`proj.${i}.impact.${j}.kpi`),
          label: t(`proj.${i}.impact.${j}.label`),
        })),
        tools: projectTools[i],
        link: projectLinks[i],
        category: projectCategory[i],
      })),
    [t],
  );

  const featured = projects[0];
  const secondary = projects.slice(1);
  const visibleSecondary = secondary.filter(
    (p) => active === "All" || p.category === active,
  );
  const showFeatured = active === "All" || featured.category === active;

  return (
    <section id="projects" className="bg-background relative overflow-hidden">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
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
                02 — Case studies
              </span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.0] ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("proj.title1")}{" "}
              <span className="italic font-normal gradient-text">
                {t("proj.title2")}
              </span>
            </h2>
            <p
              className={`mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed ${isRTL ? "font-arabic" : ""}`}
            >
              {t("proj.description")}
            </p>

            {/* Filter chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {filters.map((f) => {
                const isActive = active === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase border transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Featured: RehabRL */}
          {showFeatured && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="mb-20 md:mb-28"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">
                  ★ Featured
                </span>
                <span className="h-px flex-1 bg-border/70" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-t border-border/70 pt-10">
                {/* Left: giant KPI */}
                <div className="lg:col-span-5">
                  <AnimatedKpi
                    value={featured.impact[1].kpi}
                    className={`block text-[6rem] md:text-[9rem] lg:text-[10rem] font-extrabold text-primary leading-[0.85] tracking-tight ${isRTL ? "font-arabic" : "font-heading"}`}
                  />
                  <p className="mt-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                    {featured.impact[1].label}
                  </p>
                  <div className="mt-6 flex items-baseline gap-6">
                    <div>
                      <div className={`text-2xl font-extrabold text-foreground ${isRTL ? "font-arabic" : "font-heading"}`}>
                        {featured.impact[0].kpi}
                      </div>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        {featured.impact[0].label}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: content */}
                <div className="lg:col-span-7">
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                    {featured.role} · {featured.timeline}
                  </p>
                  <h3
                    className={`text-3xl md:text-5xl font-extrabold text-foreground leading-[1.05] tracking-tight mb-4 ${isRTL ? "font-arabic" : "font-heading"}`}
                  >
                    {featured.title}
                  </h3>
                  <p className={`text-primary text-base md:text-lg font-medium mb-5 ${isRTL ? "font-arabic" : ""}`}>
                    {featured.tagline}
                  </p>
                  <p className={`text-sm md:text-base text-foreground/75 leading-relaxed mb-6 ${isRTL ? "font-arabic" : ""}`}>
                    {featured.context}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featured.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 text-[11px] rounded-full font-mono uppercase tracking-wider text-foreground/80 bg-secondary/60 border border-border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`#case-study-${featured.idx}`}
                      className="group inline-flex items-center gap-2 text-sm font-heading font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      Read case study
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    {featured.link && (
                      <a
                        href={featured.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Secondary grid */}
          {visibleSecondary.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 border-t border-border/70 pt-14">
              {visibleSecondary.map((p) => (
                <motion.article
                  key={p.idx}
                  id={`case-study-${p.idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <AnimatedKpi
                      value={p.impact[0].kpi}
                      className={`text-6xl md:text-7xl font-extrabold text-primary leading-none tracking-tight ${isRTL ? "font-arabic" : "font-heading"}`}
                    />
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      {p.category}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                    {p.impact[0].label}
                  </p>

                  <h3
                    className={`text-xl md:text-2xl font-extrabold text-foreground tracking-tight leading-snug mb-2 ${isRTL ? "font-arabic" : "font-heading"}`}
                  >
                    {p.title}
                  </h3>
                  <p className={`text-sm text-primary/90 mb-3 ${isRTL ? "font-arabic" : ""}`}>
                    {p.tagline}
                  </p>
                  <p className={`text-sm text-muted-foreground leading-relaxed mb-4 ${isRTL ? "font-arabic" : ""}`}>
                    {p.context}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 text-[10px] rounded-full font-mono uppercase tracking-wider text-foreground/75 bg-secondary/50 border border-border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {p.role} · {p.timeline}
                    </span>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Repo
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
