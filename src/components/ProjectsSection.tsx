import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Wrench, ListChecks, CheckCircle2, BookOpen, Briefcase, Calendar, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedKpi } from "@/components/AnimatedKpi";
import Tilt3DCard from "@/components/Tilt3DCard";

const projectTools = [
  ["Python", "scikit-learn", "Pandas", "SHAP", "SQL"],
  ["Power BI", "SQL", "DAX", "Azure Data Factory", "Excel"],
  ["Python", "Tableau", "SQL", "Pandas", "Statsmodels"],
];

const SectionLabel = ({
  icon: Icon,
  label,
  color,
  isRTL,
}: {
  icon: typeof Target;
  label: string;
  color: string;
  isRTL: boolean;
}) => (
  <div className="flex items-center gap-2 mb-2">
    <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center shrink-0`}>
      <Icon className="w-3.5 h-3.5" />
    </div>
    <p className={`text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground ${isRTL ? "font-arabic" : "font-heading"}`}>
      {label}
    </p>
  </div>
);

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();

  const projects = [0, 1, 2].map((i) => ({
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
  }));

  return (
    <section id="projects" className="bg-secondary/30">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? "font-arabic" : ""}`}>
              {t("proj.label")}
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-foreground ${isRTL ? "font-arabic" : "font-heading"}`}>
              {t("proj.title1")} <span className="gradient-text">{t("proj.title2")}</span>
            </h2>
            <div className="arabic-divider mb-6">
              <span className="arabic-ornament">◆</span>
            </div>
            <p className={`text-muted-foreground max-w-2xl text-lg leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
              {t("proj.description")}
            </p>
          </motion.div>

          <div className="flex flex-col gap-10 md:gap-12">
            {projects.map((project, i) => (
              <motion.article
                key={i}
                id={`case-study-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <Tilt3DCard className="block" max={3}>
                  <div
                    className="group rounded-3xl bg-card border border-border p-7 md:p-10 transition-all duration-500 hover:border-primary/30"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    {/* Header */}
                    <header className="mb-8 pb-6 border-b border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono text-primary/70 tracking-widest">
                          {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-bold text-foreground mb-2 ${isRTL ? "font-arabic" : "font-heading"}`}>
                        {project.title}
                      </h3>
                      <p className="text-primary text-sm md:text-base font-medium mb-4">{project.tagline}</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-primary" />
                          {project.role}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {project.timeline}
                        </span>
                      </div>
                    </header>

                    {/* Context */}
                    <div className="mb-7">
                      <SectionLabel icon={BookOpen} label={t("proj.context")} color="bg-primary/10 text-primary" isRTL={isRTL} />
                      <p className={`text-sm md:text-base text-foreground/80 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                        {project.context}
                      </p>
                    </div>

                    {/* Challenge + Solution grid */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-7">
                      <div>
                        <SectionLabel icon={Target} label={t("proj.challenge")} color="bg-coral/10 text-coral" isRTL={isRTL} />
                        <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                          {project.challenge}
                        </p>
                      </div>
                      <div>
                        <SectionLabel icon={Lightbulb} label={t("proj.solution")} color="bg-primary/10 text-primary" isRTL={isRTL} />
                        <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Approach */}
                    <div className="mb-7">
                      <SectionLabel icon={ListChecks} label={t("proj.approach")} color="bg-primary/10 text-primary" isRTL={isRTL} />
                      <ol className="grid sm:grid-cols-2 gap-3 mt-3">
                        {project.approach.map((step, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 rounded-xl bg-secondary/50 border border-border p-3.5"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/15 text-primary text-xs font-bold flex items-center justify-center font-heading">
                              {idx + 1}
                            </span>
                            <span className={`text-sm text-foreground/85 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Impact KPIs */}
                    <div className="mb-7 rounded-2xl bg-gradient-to-br from-primary/[0.06] to-transparent border border-primary/15 p-5 md:p-6">
                      <SectionLabel icon={TrendingUp} label={t("proj.impact")} color="bg-gold/15 text-gold" isRTL={isRTL} />
                      <div className="grid grid-cols-2 gap-6 mb-5">
                        {project.impact.map((item) => (
                          <div key={item.label}>
                            <AnimatedKpi value={item.kpi} className="text-3xl md:text-4xl font-bold font-heading text-primary block leading-none mb-1.5" />
                            <span className="text-muted-foreground text-xs md:text-sm">{item.label}</span>
                          </div>
                        ))}
                      </div>
                      <ul className="space-y-2 pt-4 border-t border-primary/10">
                        {project.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className={`text-sm text-foreground/85 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                              {outcome}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stack + Learnings */}
                    <div className="grid md:grid-cols-[1fr_1fr] gap-6 pt-6 border-t border-border">
                      <div>
                        <SectionLabel icon={Wrench} label={t("proj.tools")} color="bg-muted text-muted-foreground" isRTL={isRTL} />
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium text-primary bg-primary/8 border border-primary/15 transition-all duration-300 hover:shadow-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <SectionLabel icon={Quote} label={t("proj.learnings")} color="bg-gold/15 text-gold" isRTL={isRTL} />
                        <p className={`text-sm text-foreground/80 italic leading-relaxed border-l-2 border-primary/30 pl-3 ${isRTL ? "font-arabic border-l-0 border-r-2 pl-0 pr-3" : ""}`}>
                          {project.learnings}
                        </p>
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
