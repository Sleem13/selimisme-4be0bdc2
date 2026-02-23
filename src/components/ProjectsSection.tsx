import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Wrench } from "lucide-react";

const projects = [
  {
    title: "Patient Outcome Prediction Engine",
    tagline: "ML-powered triage for smarter clinical decisions",
    challenge:
      "Clinicians relied on subjective assessments for patient triage, leading to inconsistent recovery timelines and resource misallocation across 300+ annual cases.",
    solution:
      "Built a supervised ML pipeline using scikit-learn to predict patient recovery trajectories from intake data — enabling data-driven triage prioritization.",
    impact: [
      { kpi: "22%", label: "Faster Recovery Identification" },
      { kpi: "18%", label: "Reduction in Misdiagnosis" },
    ],
    tools: ["Python", "scikit-learn", "Pandas", "SQL"],
  },
  {
    title: "Healthcare Operations Dashboard",
    tagline: "Unified analytics across 5+ clinical data sources",
    challenge:
      "Hospital management lacked visibility into department-level performance — data was siloed across spreadsheets, EMRs, and manual logs with no single source of truth.",
    solution:
      "Designed an automated ETL pipeline and interactive Power BI dashboard consolidating patient flow, staff utilization, and KPI tracking into a real-time decision hub.",
    impact: [
      { kpi: "15%", label: "Operational Efficiency Gain" },
      { kpi: "20+ hrs", label: "Weekly Time Saved" },
    ],
    tools: ["Power BI", "SQL", "Excel", "DAX"],
  },
  {
    title: "Rehabilitation Progress Tracker",
    tagline: "Data-driven therapy planning & outcome visualization",
    challenge:
      "Therapists tracked patient progress manually with inconsistent metrics, making it difficult to adjust treatment plans or demonstrate outcomes to stakeholders.",
    solution:
      "Created an automated tracking system with standardized KPIs and visual progress reports — enabling evidence-based therapy adjustments and transparent reporting.",
    impact: [
      { kpi: "95%+", label: "Patient Satisfaction" },
      { kpi: "30%", label: "Faster Plan Adjustments" },
    ],
    tools: ["Python", "Tableau", "SQL", "Pandas"],
  },
];

const sectionIcon = (Icon: typeof Target) => (
  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
    <Icon className="w-3.5 h-3.5 text-primary" />
  </div>
);

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">
            Projects
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-navy">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14">
            Real-world projects where clinical insight meets analytical execution
            — each following a structured approach to measurable impact.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="bg-background border border-border rounded-xl p-7 md:p-9 hover:glow-border transition-all duration-500"
              style={{ boxShadow: "var(--shadow-card)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-navy mb-1">
                  {project.title}
                </h3>
                <p className="text-primary text-sm font-medium">
                  {project.tagline}
                </p>
              </div>

              {/* Content grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Challenge */}
                <div className="flex gap-3">
                  {sectionIcon(Target)}
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Challenge
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="flex gap-3">
                  {sectionIcon(Lightbulb)}
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Solution
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Impact + Tools row */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-5 border-t border-border">
                {/* Impact KPIs */}
                <div className="flex gap-3 flex-1">
                  {sectionIcon(TrendingUp)}
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Impact
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      {project.impact.map((item) => (
                        <div key={item.label} className="flex items-baseline gap-1.5">
                          <span className="kpi-highlight text-xl">
                            {item.kpi}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tools */}
                <div className="flex gap-3">
                  {sectionIcon(Wrench)}
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Tools
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                        >
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
