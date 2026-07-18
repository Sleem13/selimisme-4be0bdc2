import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SkillsRadarChart from "@/components/SkillsRadarChart";

type Skill = { name: string; level: 1 | 2 | 3 | 4 | 5 };

const matrix: { key: string; label: string; skills: Skill[] }[] = [
  {
    key: "data",
    label: "Data",
    skills: [
      { name: "SQL", level: 5 },
      { name: "Power BI / DAX", level: 5 },
      { name: "Tableau", level: 4 },
      { name: "ETL Pipelines", level: 4 },
      { name: "Statistical Modeling", level: 4 },
    ],
  },
  {
    key: "ml",
    label: "ML / AI",
    skills: [
      { name: "Python", level: 5 },
      { name: "scikit-learn", level: 4 },
      { name: "PyTorch", level: 3 },
      { name: "Reinforcement Learning", level: 3 },
      { name: "SHAP / Explainability", level: 4 },
    ],
  },
  {
    key: "clinical",
    label: "Clinical",
    skills: [
      { name: "Assessment & Triage", level: 5 },
      { name: "Musculoskeletal Rehab", level: 5 },
      { name: "Neuromuscular Therapy", level: 4 },
      { name: "Sports Recovery", level: 4 },
      { name: "Pediatric Habilitation", level: 4 },
    ],
  },
  {
    key: "tools",
    label: "Tools",
    skills: [
      { name: "Git / GitHub", level: 4 },
      { name: "Streamlit", level: 4 },
      { name: "Azure Data Factory", level: 3 },
      { name: "Pandas / NumPy", level: 5 },
      { name: "Excel (Advanced)", level: 5 },
    ],
  },
];

const learning = ["LangGraph", "MLflow", "dbt", "Polars", "FastAPI"];

const Dots = ({ level }: { level: number }) => (
  <span className="inline-flex items-center gap-1" aria-label={`Level ${level} of 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`h-1.5 w-1.5 rounded-full ${
          i <= level ? "bg-primary" : "bg-border"
        }`}
      />
    ))}
  </span>
);

const SkillsSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="skills" className="bg-background">
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
                05 — Toolkit
              </span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
            <h2
              className={`text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.02] ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("skills.title1")}{" "}
              <span className="italic font-normal gradient-text">
                {t("skills.title2")}
              </span>
            </h2>
          </motion.div>

          {/* Matrix + Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-start">
            {/* Proficiency matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {matrix.map((col, ci) => (
                <motion.div
                  key={col.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: ci * 0.05 }}
                  className="border-t border-border/70 pt-4"
                >
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-4">
                    {col.label}
                  </p>
                  <ul className="space-y-3">
                    {col.skills.map((s) => (
                      <li
                        key={s.name}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-sm text-foreground/90 truncate">
                          {s.name}
                        </span>
                        <Dots level={s.level} />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* At-a-glance radar (hidden on mobile) */}
            <div className="hidden lg:block">
              <div className="border-t border-border/70 pt-4">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-4">
                  At a glance
                </p>
                <div className="rounded-2xl bg-card/60 border border-border p-4">
                  <SkillsRadarChart />
                </div>
              </div>
            </div>
          </div>

          {/* Currently learning */}
          <div className="mt-14 md:mt-20 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-t border-border/70 pt-6">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground shrink-0">
              Currently learning
            </span>
            <div className="flex flex-wrap gap-2">
              {learning.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-[11px] rounded-full font-mono uppercase tracking-wider text-foreground/85 bg-secondary/60 border border-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
