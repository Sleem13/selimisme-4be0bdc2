import { motion } from "framer-motion";
import { Brain, HeartPulse, BarChart3 } from "lucide-react";

const highlights = [
  {
    icon: HeartPulse,
    title: "Physical Therapy",
    description: "Licensed therapist specializing in musculoskeletal & neuromuscular rehabilitation.",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description: "Applying AI to healthcare systems for predictive modeling & better outcomes.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transforming healthcare data into actionable insights for operational efficiency.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">About Me</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Where <span className="gradient-text">Health</span> Meets <span className="gradient-accent-text">Technology</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-14">
            Motivated licensed physical therapist with a strong foundation in rehabilitation sciences,
            expanding into AI and Data Analytics. My journey reflects a passion for bridging healthcare
            and technology for smarter patient care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-card border border-border rounded-lg p-7 hover:glow-border transition-shadow duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
