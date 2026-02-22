import { motion } from "framer-motion";
import { Brain, HeartPulse, BarChart3 } from "lucide-react";

const highlights = [
  {
    icon: HeartPulse,
    title: "Clinical Rehabilitation",
    kpi: "95%+",
    kpiLabel: "Patient Satisfaction",
    description: "5+ years delivering evidence-based therapy across musculoskeletal & neuromuscular cases with consistently high recovery outcomes.",
  },
  {
    icon: Brain,
    title: "Healthcare AI",
    kpi: "ML-Driven",
    kpiLabel: "Predictive Models",
    description: "Building scikit-learn models to forecast patient outcomes and enable data-driven triage — reducing misdiagnosis risk through intelligent analytics.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    kpi: "15%",
    kpiLabel: "Efficiency Gain",
    description: "Translating raw healthcare data into Power BI dashboards that consolidate 5+ sources for informed, real-time decision-making.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">About Me</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-navy">
            Where <span className="gradient-text">Health</span> Meets <span className="gradient-accent-text">Technology</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14">
            Licensed physical therapist with 5+ years of clinical experience, now leveraging Python,
            SQL, and machine learning to transform healthcare delivery. I combine frontline patient
            empathy with analytical rigor — because better data means better care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-card border border-border rounded-xl p-7 hover:glow-border transition-all duration-500"
              style={{ boxShadow: 'var(--shadow-card)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-1 text-navy">{item.title}</h3>
              <div className="mb-3">
                <span className="kpi-highlight text-2xl">{item.kpi}</span>
                <span className="text-muted-foreground text-xs ml-1.5">{item.kpiLabel}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;