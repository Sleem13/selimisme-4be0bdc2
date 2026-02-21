import { motion } from "framer-motion";

const experiences = [
  {
    role: "Data Analyst",
    company: "Digilians, MTC and MCIT",
    period: "Nov 2025 – Present",
    points: [
      "Applied AI and database theory to healthcare analytics",
      "Designed predictive models for healthcare outcomes using ML concepts",
      "Built automation systems achieving 15% efficiency increase",
    ],
  },
  {
    role: "Physical Therapist",
    company: "Ministry of Health & Population",
    period: "Sep 2020 – Present",
    points: [
      "Specialized in musculoskeletal and neuromuscular rehabilitation",
      "Led therapy programs with consistently high patient satisfaction & recovery outcomes",
    ],
  },
  {
    role: "Sports Injury Therapist",
    company: "N.E.C for Physical Therapy",
    period: "Sep 2021 – Apr 2023",
    points: [
      "Focused on injury recovery and performance optimization for athletes",
    ],
  },
  {
    role: "Pediatric Therapist",
    company: "Nour Elhayat Oasis",
    period: "May 2020 – Mar 2021",
    points: [
      "Delivered habilitation services for children with cerebral palsy",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">Experience</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-14">
            Professional <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
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
                <div className="absolute left-0 md:left-8 top-1 w-3 h-3 -translate-x-[6px] rounded-full bg-primary shadow-[0_0_10px_hsl(174_72%_46%/0.5)]" />

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="font-heading text-lg font-semibold">{exp.role}</h3>
                      <p className="text-primary text-sm">{exp.company}</p>
                    </div>
                    <span className="text-muted-foreground text-sm mt-1 md:mt-0">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
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
