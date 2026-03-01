import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const projectTools = [
  ["Python", "scikit-learn", "Pandas", "SQL"],
  ["Power BI", "SQL", "Excel", "DAX"],
  ["Python", "Tableau", "SQL", "Pandas"],
];

const sectionIcon = (Icon: typeof Target) => (
  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
    <Icon className="w-3.5 h-3.5 text-primary" />
  </div>
);

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();

  const projects = [0, 1, 2].map((i) => ({
    title: t(`proj.${i}.title`),
    tagline: t(`proj.${i}.tagline`),
    challenge: t(`proj.${i}.challenge`),
    solution: t(`proj.${i}.solution`),
    impact: [0, 1].map((j) => ({
      kpi: t(`proj.${i}.impact.${j}.kpi`),
      label: t(`proj.${i}.impact.${j}.label`),
    })),
    tools: projectTools[i],
  }));

  return (
    <section id="projects" className="section-padding bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>
            {t("proj.label")}
          </p>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-navy ${isRTL ? 'font-arabic' : 'font-heading'}`}>
            {t("proj.title1")} <span className="gradient-text">{t("proj.title2")}</span>
          </h2>
          <div className="arabic-divider mb-4">
            <span className="arabic-ornament">✦</span>
          </div>
          <p className={`text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14 ${isRTL ? 'font-arabic' : ''}`}>
            {t("proj.description")}
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="bg-background border border-border rounded-xl p-7 md:p-9 hover:glow-border transition-all duration-500"
              style={{ boxShadow: "var(--shadow-card)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="mb-6">
                <h3 className={`text-xl md:text-2xl font-bold text-navy mb-1 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                  {project.title}
                </h3>
                <p className="text-primary text-sm font-medium">{project.tagline}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex gap-3">
                  {sectionIcon(Target)}
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                      {t("proj.challenge")}
                    </p>
                    <p className={`text-sm text-foreground/80 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{project.challenge}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {sectionIcon(Lightbulb)}
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                      {t("proj.solution")}
                    </p>
                    <p className={`text-sm text-foreground/80 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{project.solution}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-5 border-t border-border">
                <div className="flex gap-3 flex-1">
                  {sectionIcon(TrendingUp)}
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                      {t("proj.impact")}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      {project.impact.map((item) => (
                        <div key={item.label} className="flex items-baseline gap-1.5">
                          <span className="kpi-highlight text-xl">{item.kpi}</span>
                          <span className="text-muted-foreground text-xs">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {sectionIcon(Wrench)}
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                      {t("proj.tools")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span key={tool} className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
