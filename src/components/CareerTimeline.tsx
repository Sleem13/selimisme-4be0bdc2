import { motion } from "framer-motion";
import { GraduationCap, Stethoscope, BarChart3, BrainCircuit, Rocket, Activity, Database, LineChart } from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  company: string;
  icon: typeof GraduationCap;
  detail: string;
  metric: string;
  metricLabel: string;
  color: string;
};

const milestones: Milestone[] = [
  {
    year: "2018 — 2023",
    title: "B.Sc. Physical Therapy",
    company: "Cairo University · Faculty of Physical Therapy",
    icon: GraduationCap,
    detail: "Five years grounded in anatomy, neuroscience, and evidence-based practice — the foundation for reading the human system as data.",
    metric: "5 yrs",
    metricLabel: "academic training",
    color: "hsl(var(--primary))",
  },
  {
    year: "Jul 2021 — Sep 2021",
    title: "Clinical Intern · Outpatient Rehab",
    company: "Kasr Al Ainy Teaching Hospital",
    icon: Activity,
    detail: "Rotated through musculoskeletal and neuro units. First exposure to messy clinical record-keeping that would later define my analytics work.",
    metric: "120+",
    metricLabel: "patient sessions",
    color: "hsl(var(--coral))",
  },
  {
    year: "2022 — 2023",
    title: "Physical Therapist (Part-time)",
    company: "Private Rehabilitation Center, Cairo",
    icon: Stethoscope,
    detail: "Treated musculoskeletal, neuromuscular, and pediatric cases. Started tracking outcomes in spreadsheets — the seed of every dashboard since.",
    metric: "300+",
    metricLabel: "patients treated",
    color: "hsl(var(--coral))",
  },
  {
    year: "2023",
    title: "Self-Taught Data Analyst",
    company: "Independent · Python · SQL · Power BI",
    icon: BarChart3,
    detail: "Built first KPI dashboards for a small clinic. Recovery-time tracking exposed bottlenecks invisible to the human eye.",
    metric: "22%",
    metricLabel: "recovery uplift",
    color: "hsl(var(--gold))",
  },
  {
    year: "2024",
    title: "Data Analyst · Healthcare",
    company: "Freelance & Clinical Consulting",
    icon: Database,
    detail: "Designed ETL pipelines and Power BI dashboards for outpatient clinics. Standardized intake → outcome reporting end-to-end.",
    metric: "20+",
    metricLabel: "hours saved / week",
    color: "hsl(var(--soft-green))",
  },
  {
    year: "2024 — 2025",
    title: "ML Engineer · Clinical Predictive Models",
    company: "Independent Projects",
    icon: BrainCircuit,
    detail: "scikit-learn classifiers for readmission risk and recovery trajectories. Shipped models with clinician-readable explanations.",
    metric: "0.87",
    metricLabel: "ROC-AUC peak",
    color: "hsl(var(--primary))",
  },
  {
    year: "2025",
    title: "BI Architect · Cross-Domain Analytics",
    company: "Contract Engagements",
    icon: LineChart,
    detail: "Tableau + Power BI architectures for healthcare and ops clients. Translated KPIs into decisions, not just charts.",
    metric: "8",
    metricLabel: "production dashboards",
    color: "hsl(var(--gold))",
  },
  {
    year: "Now",
    title: "Healthcare Data Analyst & ML Engineer",
    company: "Open to roles · Remote / Cairo",
    icon: Rocket,
    detail: "Bridging clinicians and data with measurable impact. Turning chaos into clarity, one pipeline at a time.",
    metric: "∞",
    metricLabel: "what's next",
    color: "hsl(var(--accent))",
  },
];

const CareerTimeline = () => {
  return (
    <section className="bg-background relative overflow-hidden">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3">The Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground font-heading">
              From clinic to <span className="gradient-text">code</span>
            </h2>
            <div className="arabic-divider">
              <span className="arabic-ornament">◆</span>
            </div>
          </motion.div>

          <div className="relative">
            {/* Animated central spine */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent" />
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 w-px md:-translate-x-1/2 origin-top"
              style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--gold)), hsl(var(--soft-green)))" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              <div className="h-full" />
            </motion.div>

            <div className="space-y-10 md:space-y-16">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    className="relative md:grid md:grid-cols-2 md:gap-12 items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {/* Dot on spine */}
                    <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-background"
                        style={{ background: m.color, boxShadow: `0 0 0 4px hsl(var(--background)), 0 0 20px ${m.color}` }}
                        whileInView={{ scale: [0, 1.4, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      />
                    </div>

                    {/* Card */}
                    <div className={`pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                      <div
                        className="inline-block text-[11px] font-heading tracking-[0.25em] uppercase font-bold mb-2 px-2.5 py-1 rounded-full border"
                        style={{ color: m.color, borderColor: `${m.color.replace("hsl(", "hsla(").replace(")", ", 0.3)")}`, background: `${m.color.replace("hsl(", "hsla(").replace(")", ", 0.08)")}` }}
                      >
                        {m.year}
                      </div>

                      <div
                        className="rounded-2xl bg-card border border-border p-5 md:p-6 transition-all duration-500 hover:border-primary/30"
                        style={{ boxShadow: "var(--shadow-card)" }}
                      >
                        <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${m.color.replace("hsl(", "hsla(").replace(")", ", 0.12)")}` }}
                          >
                            <m.icon className="w-5 h-5" style={{ color: m.color }} />
                          </div>
                          <h3 className="text-base md:text-lg font-heading font-bold text-foreground leading-tight">{m.title}</h3>
                        </div>
                        <p className={`text-xs uppercase tracking-[0.18em] text-muted-foreground/80 mb-3 ${isLeft ? "md:text-right" : ""}`}>
                          {m.company}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{m.detail}</p>
                        <div className={`flex items-baseline gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                          <span className="text-2xl md:text-3xl font-heading font-bold" style={{ color: m.color }}>{m.metric}</span>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">{m.metricLabel}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
