import { motion } from "framer-motion";
import { Target, Lightbulb, ArrowRight, Quote, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedKpi } from "@/components/AnimatedKpi";

const projectTools = [
  ["PyTorch", "Reinforcement Learning", "DQN", "Streamlit", "Gym", "NumPy"],
  ["Python", "scikit-learn", "Pandas", "SHAP", "SQL"],
  ["Power BI", "SQL", "DAX", "Azure Data Factory", "Excel"],
  ["Python", "Tableau", "SQL", "Pandas", "Statsmodels"],
];

const projectLinks: (string | null)[] = [
  "https://github.com/Sleem13/rehab_rl",
  null,
  null,
  null,
];

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();

  const projects = [0, 1, 2, 3].map((i) => ({
    title: t(`proj.${i}.title`),
    tagline: t(`proj.${i}.tagline`),
    role: t(`proj.${i}.role`),
    timeline: t(`proj.${i}.timeline`),
    context: t(`proj.${i}.context`),
    challenge: t(`proj.${i}.challenge`),
    solution: t(`proj.${i}.solution`),
    approach: [0, 1, 2, 3].map((j) => t(`proj.${i}.approach.${j}`)),
    impact: [0, 1].map((j) => ({
      kpi: t(`proj.${i}.impact.${j}.kpi`),
      label: t(`proj.${i}.impact.${j}.label`),
    })),
    outcomes: [0, 1, 2].map((j) => t(`proj.${i}.outcomes.${j}`)),
    learnings: t(`proj.${i}.learnings`),
    tools: projectTools[i],
    link: projectLinks[i],
  }));

  return (
    <section id="projects" className="bg-background relative overflow-hidden">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section header — oversized editorial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 md:mb-28"
          >
            <span
              className={`text-primary uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5 block ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("proj.label")}
            </span>
            <h2
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-foreground tracking-tighter leading-[0.95] ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("proj.title1")}{" "}
              <span className="text-primary">{t("proj.title2")}</span>
            </h2>
            <p
              className={`mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed ${isRTL ? "font-arabic" : ""}`}
            >
              {t("proj.description")}
            </p>
          </motion.div>

          {/* Case studies */}
          <div className="space-y-32 md:space-y-40">
            {projects.map((project, i) => {
              const nextProject = projects[i + 1];
              return (
                <motion.article
                  key={i}
                  id={`case-study-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="relative"
                >
                  {/* Background oversized index number */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-10 md:-top-16 ${isRTL ? "-right-4 md:-right-8" : "-left-4 md:-left-8"} text-[8rem] md:text-[12rem] font-extrabold text-foreground/[0.04] leading-none select-none ${isRTL ? "font-arabic" : "font-heading"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 grid grid-cols-12 gap-8 md:gap-12">
                    {/* Left column: context & metadata */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-10">
                      <div>
                        <h3
                          className={`text-3xl md:text-5xl font-extrabold text-foreground leading-[1.05] mb-3 tracking-tight ${isRTL ? "font-arabic" : "font-heading"}`}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={`text-primary text-base md:text-xl font-medium ${isRTL ? "font-arabic" : ""}`}
                        >
                          {project.tagline}
                        </p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl border border-primary/30 bg-primary/5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
                          >
                            <Github className="w-4 h-4" />
                            View on GitHub
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-x-8 gap-y-4">
                        {[
                          {
                            label: t("proj.role") ?? "Role",
                            value: project.role,
                          },
                          {
                            label: t("proj.timeline") ?? "Timeline",
                            value: project.timeline,
                          },
                        ].map((meta) => (
                          <div key={meta.label} className="flex flex-col">
                            <span
                              className={`text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1.5 ${isRTL ? "font-arabic" : "font-heading"}`}
                            >
                              {meta.label}
                            </span>
                            <span
                              className={`text-foreground/90 font-semibold text-sm ${isRTL ? "font-arabic" : ""}`}
                            >
                              {meta.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Context paragraph (short, always shown) */}
                      <p
                        className={`text-sm md:text-base text-foreground/75 leading-relaxed ${isRTL ? "font-arabic" : ""}`}
                      >
                        {project.context}
                      </p>

                      {/* Stack / Tools */}
                      <div>
                        <span
                          className={`text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-4 block ${isRTL ? "font-arabic" : "font-heading"}`}
                        >
                          {t("proj.tools")}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-4 py-1.5 rounded-full border border-border bg-secondary text-xs font-semibold text-foreground/85"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right column: oversized KPIs + content */}
                    <div className="col-span-12 lg:col-span-7 space-y-8">
                      {/* Hero KPIs */}
                      <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {project.impact.map((item, idx) => {
                          const featured = idx === 0;
                          return (
                            <div
                              key={item.label}
                              className={`p-6 md:p-8 rounded-3xl flex flex-col items-center justify-center text-center border ${
                                featured
                                  ? "bg-primary/5 border-primary/20"
                                  : "bg-card border-border"
                              }`}
                              style={
                                featured
                                  ? { boxShadow: "var(--shadow-glow)" }
                                  : { boxShadow: "var(--shadow-card)" }
                              }
                            >
                              <AnimatedKpi
                                value={item.kpi}
                                className={`text-4xl md:text-6xl font-extrabold mb-2 leading-none ${
                                  featured ? "text-primary" : "text-foreground"
                                } ${isRTL ? "font-arabic" : "font-heading"}`}
                              />
                              <span
                                className={`text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground ${isRTL ? "font-arabic" : ""}`}
                              >
                                {item.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Read case study — collapsed deep narrative */}
                      <details className="group rounded-2xl border border-border bg-card/40 open:bg-card/60 transition-colors">
                        <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 rounded-2xl select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                          <span
                            className={`uppercase tracking-[0.2em] text-[11px] font-bold text-primary ${isRTL ? "font-arabic" : "font-heading"}`}
                          >
                            Read case study
                          </span>
                          <span className="text-primary text-lg leading-none transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>

                        <div className="px-5 pb-6 pt-2 space-y-8">
                          {/* Challenge & Solution */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                                  <Target className="w-4 h-4 text-coral" />
                                </div>
                                <h4
                                  className={`uppercase tracking-[0.2em] text-[11px] font-bold text-muted-foreground ${isRTL ? "font-arabic" : "font-heading"}`}
                                >
                                  {t("proj.challenge")}
                                </h4>
                              </div>
                              <p
                                className={`text-sm md:text-base text-foreground/80 leading-relaxed ${isRTL ? "font-arabic" : ""}`}
                              >
                                {project.challenge}
                              </p>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                                  <Lightbulb className="w-4 h-4 text-primary" />
                                </div>
                                <h4
                                  className={`uppercase tracking-[0.2em] text-[11px] font-bold text-muted-foreground ${isRTL ? "font-arabic" : "font-heading"}`}
                                >
                                  {t("proj.solution")}
                                </h4>
                              </div>
                              <p
                                className={`text-sm md:text-base text-foreground/80 leading-relaxed ${isRTL ? "font-arabic" : ""}`}
                              >
                                {project.solution}
                              </p>
                            </div>
                          </div>

                          {/* Outcomes */}
                          <div className="space-y-3">
                            <h4
                              className={`uppercase tracking-[0.2em] text-[11px] font-bold text-muted-foreground ${isRTL ? "font-arabic" : "font-heading"}`}
                            >
                              {t("proj.outcomes") ?? "Outcomes"}
                            </h4>
                            <ul className="grid sm:grid-cols-3 gap-3">
                              {project.outcomes.map((outcome, idx) => (
                                <li
                                  key={idx}
                                  className="rounded-2xl bg-secondary/40 border border-border p-4 text-sm text-foreground/85 leading-relaxed flex gap-3"
                                >
                                  <span className="text-primary font-bold text-xs mt-0.5 shrink-0">
                                    ✦
                                  </span>
                                  <span className={isRTL ? "font-arabic" : ""}>
                                    {outcome}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Methodology */}
                          <div className="space-y-4">
                            <h4
                              className={`uppercase tracking-[0.2em] text-[11px] font-bold text-muted-foreground ${isRTL ? "font-arabic" : "font-heading"}`}
                            >
                              {t("proj.approach")}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {project.approach.map((step, idx) => (
                                <div
                                  key={idx}
                                  className={`relative p-4 ${isRTL ? "border-r-2 pr-4" : "border-l-2 pl-4"} border-border`}
                                >
                                  {idx === 0 && (
                                    <div
                                      className={`absolute ${isRTL ? "-right-[3px]" : "-left-[3px]"} top-0 h-5 w-1 bg-primary rounded-full`}
                                    />
                                  )}
                                  <span
                                    className={`block font-bold text-sm mb-1.5 ${idx === 0 ? "text-primary" : "text-muted-foreground"} ${isRTL ? "font-arabic" : "font-heading"}`}
                                  >
                                    {String(idx + 1).padStart(2, "0")}
                                  </span>
                                  <span
                                    className={`text-foreground/90 text-xs md:text-sm font-semibold leading-snug block ${isRTL ? "font-arabic" : ""}`}
                                  >
                                    {step}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Learnings */}
                          <div
                            className="p-5 bg-card border border-border rounded-2xl"
                            style={{ boxShadow: "var(--shadow-card)" }}
                          >
                            <Quote className="w-5 h-5 text-primary/60 mb-3" />
                            <p
                              className={`text-sm md:text-base text-foreground/80 italic leading-relaxed ${isRTL ? "font-arabic" : ""}`}
                            >
                              {project.learnings}
                            </p>
                            <div className="mt-4 h-1 w-12 bg-primary rounded-full" />
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>

                  {/* Up Next connector */}
                  {nextProject && (
                    <a
                      href={`#case-study-${i + 1}`}
                      className="group mt-24 md:mt-32 pt-12 border-t border-border flex items-center justify-between gap-6 transition-colors"
                    >
                      <div>
                        <span
                          className={`text-muted-foreground text-xs md:text-sm font-bold uppercase tracking-[0.25em] ${isRTL ? "font-arabic" : "font-heading"}`}
                        >
                          {t("proj.upNext") ?? "Up Next"}
                        </span>
                        <h4
                          className={`text-2xl md:text-4xl font-extrabold text-foreground/40 group-hover:text-foreground transition-colors duration-300 mt-2 ${isRTL ? "font-arabic" : "font-heading"}`}
                        >
                          {nextProject.title}
                        </h4>
                      </div>
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300 shrink-0">
                        <ArrowRight
                          className={`w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 ${isRTL ? "rotate-180" : ""}`}
                        />
                      </div>
                    </a>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
