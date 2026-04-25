import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedKpi } from "@/components/AnimatedKpi";
import Tilt3DCard from "@/components/Tilt3DCard";

const projectTools = [
  ["Python", "scikit-learn", "Pandas", "SQL"],
  ["Power BI", "SQL", "Excel", "DAX"],
  ["Python", "Tableau", "SQL", "Pandas"],
];

const sectionIcon = (Icon: typeof Target, color: string) => (
  <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center shrink-0 mt-0.5`}>
    <Icon className="w-3.5 h-3.5" />
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
    <section id="projects" className="bg-secondary/30">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? 'font-arabic' : ''}`}>
              {t("proj.label")}
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}>
              {t("proj.title1")}{" "}
              <span className="gradient-text">{t("proj.title2")}</span>
            </h2>
            <div className="arabic-divider mb-6">
              <span className="arabic-ornament">◆</span>
            </div>
            <p className={`text-muted-foreground max-w-2xl text-lg leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
              {t("proj.description")}
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
              <Tilt3DCard className="block" max={5}>
              <div
                className="group rounded-2xl bg-card border border-border p-7 md:p-9 transition-all duration-500 hover:border-primary/30"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="mb-6">
                  <h3 className={`text-xl md:text-2xl font-bold text-foreground mb-1 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                    {project.title}
                  </h3>
                  <p className="text-primary text-sm font-medium">{project.tagline}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex gap-3">
                    {sectionIcon(Target, "bg-coral/10 text-coral")}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        {t("proj.challenge")}
                      </p>
                      <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{project.challenge}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {sectionIcon(Lightbulb, "bg-primary/10 text-primary")}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        {t("proj.solution")}
                      </p>
                      <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{project.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-5 border-t border-border">
                  <div className="flex gap-3 flex-1">
                    {sectionIcon(TrendingUp, "bg-gold/15 text-gold")}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        {t("proj.impact")}
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        {project.impact.map((item) => (
                          <div key={item.label} className="flex items-baseline gap-1.5">
                            <AnimatedKpi value={item.kpi} className="text-xl font-bold font-heading text-primary" />
                            <span className="text-muted-foreground text-xs">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {sectionIcon(Wrench, "bg-muted text-muted-foreground")}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                        {t("proj.tools")}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool) => (
                          <span key={tool} className="px-2.5 py-1 rounded-lg text-xs font-medium text-primary bg-primary/8 border border-primary/15 transition-all duration-300 hover:shadow-sm">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Tilt3DCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
