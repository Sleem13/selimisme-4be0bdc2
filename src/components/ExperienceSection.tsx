import { motion } from "framer-motion";
import { Briefcase, TrendingUp } from "lucide-react";

const experiences = [
  {
    role: "Data Analyst",
    company: "Digilians, MTC & MCIT",
    period: "Nov 2025 – Present",
    challenge: "Manual healthcare reporting consuming 20+ hrs/week with fragmented data sources.",
    solution: "Built Python & SQL automation pipelines; designed predictive ML models with scikit-learn.",
    impact: "15% efficiency gain, improved triage accuracy, 5+ data sources consolidated into Power BI dashboards.",
    tools: ["Python", "SQL", "Power BI", "scikit-learn"],
  },
  {
    role: "Physical Therapist",
    company: "Ministry of Health & Population",
    period: "Sep 2020 – Present",
    challenge: "Managing high patient volumes while maintaining personalized care quality.",
    solution: "Implemented evidence-based, structured treatment protocols with measurable milestone tracking.",
    impact: "300+ patient cases annually, 95%+ satisfaction rate through personalized rehabilitation.",
    tools: ["Clinical Assessment", "Rehabilitation Protocols", "Patient Outcomes Tracking"],
  },
  {
    role: "Sports Injury Therapist",
    company: "N.E.C for Physical Therapy",
    period: "Sep 2021 – Apr 2023",
    challenge: "Athletes needed faster recovery without compromising long-term health.",
    solution: "Designed structured recovery programs with performance benchmarking at each stage.",
    impact: "Reduced return-to-play timelines through data-informed rehabilitation milestones.",
    tools: ["Sports Rehabilitation", "Performance Benchmarking"],
  },
  {
    role: "Pediatric Therapist",
    company: "Nour Elhayat Oasis",
    period: "May 2020 – Mar 2021",
    challenge: "Children with cerebral palsy needed consistent developmental progress tracking.",
    solution: "Delivered habilitation services with measurable developmental KPIs for each child.",
    impact: "Improved tracking of developmental milestones, enabling more targeted interventions.",
    tools: ["Pediatric Habilitation", "Developmental KPI Tracking"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">Experience</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-14 text-navy">
            Professional <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="relative pl-8 md:pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-1 w-3 h-3 -translate-x-[6px] rounded-full bg-primary shadow-[0_0_10px_hsl(195_56%_45%/0.4)]" />

                <div className="bg-card border border-border rounded-xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-navy flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        {exp.role}
                      </h3>
                      <p className="text-primary text-sm">{exp.company}</p>
                    </div>
                    <span className="text-muted-foreground text-sm mt-1 md:mt-0 font-medium">{exp.period}</span>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-navy">Challenge:</span> {exp.challenge}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-navy">Solution:</span> {exp.solution}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-start gap-1.5">
                      <TrendingUp className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold text-coral">Impact:</span> {exp.impact}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;