import { motion } from "framer-motion";
import { Award, Globe, Sparkles } from "lucide-react";

const skills = [
  "Python", "SQL", "Power BI", "scikit-learn",
  "Data Analytics", "Machine Learning", "Healthcare AI",
  "Automation", "Teamwork", "Clinical Evaluation",
  "Dry Needling", "Acupuncture",
];

const certifications = [
  'Google Data Analytics Professional Certificate — "Foundations: Data, Data, Everywhere"',
  '"Delivering Quality Work with Agility" — Agile & Lean Methodologies',
];

const languages = ["English", "Arabic", "French"];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">Skills & More</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-14">
            Capabilities & <span className="gradient-accent-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs rounded-full border border-border bg-secondary text-secondary-foreground hover:border-primary/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-5 h-5 text-accent" />
              <h3 className="font-heading text-lg font-semibold">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold">Languages</h3>
            </div>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">{lang}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
