import { motion } from "framer-motion";
import { Briefcase, Code2, MapPin, Clock, Languages } from "lucide-react";

const rows = [
  {
    icon: Briefcase,
    label: "Role fit",
    value: "Data Analyst · ML Engineer · Healthcare Analytics",
  },
  {
    icon: Code2,
    label: "Stack",
    value: "Python · SQL · Power BI · scikit-learn · Pandas",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cairo, Egypt · Open to remote & hybrid",
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Immediate · Typically replies within 24h",
  },
  {
    icon: Languages,
    label: "Languages",
    value: "English (Professional) · Arabic (Native)",
  },
];

const RecruiterSnapshot = () => (
  <section
    id="snapshot"
    aria-label="Recruiter snapshot"
    className="bg-background border-y border-border/60"
  >
    <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-6"
      >
        <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase">
          Recruiter Snapshot
        </p>
        <p className="text-xs text-muted-foreground">
          Everything you need in 30 seconds
        </p>
      </motion.div>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
        {rows.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-start gap-4 py-3 border-b border-border/40 last:border-b-0"
            >
              <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-heading font-semibold mb-0.5">
                  {r.label}
                </dt>
                <dd className="text-sm md:text-base text-foreground/90 font-medium">
                  {r.value}
                </dd>
              </div>
            </motion.div>
          );
        })}
      </dl>
    </div>
  </section>
);

export default RecruiterSnapshot;
