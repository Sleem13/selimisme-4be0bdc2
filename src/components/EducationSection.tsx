import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Bachelor's Degree in Physical Therapy",
    institution: "Kafr El-Sheikh University",
    period: "Aug 2015 – Sep 2020",
    details: "Coursework in physical medicine & rehabilitation. Thesis on AI applications in mechatronics and therapy.",
  },
  {
    degree: "Diploma in Applied AI & Data Analytics",
    institution: "Egyptian Military Academy",
    period: "Dec 2025 – Aug 2026",
    details: "Focused on integrating AI into healthcare systems.",
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">Education</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-14">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="bg-card border border-border rounded-lg p-7 hover:glow-border transition-shadow duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-1">{edu.degree}</h3>
              <p className="text-primary text-sm mb-1">{edu.institution}</p>
              <p className="text-muted-foreground text-xs mb-3">{edu.period}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
