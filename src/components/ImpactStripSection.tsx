import { motion } from "framer-motion";
import { Users, TrendingUp, Gauge, Clock } from "lucide-react";
import { AnimatedKpi } from "@/components/AnimatedKpi";
import { useLanguage } from "@/contexts/LanguageContext";

const ImpactStripSection = () => {
  const { t, isRTL } = useLanguage();

  const metrics = [
    { kpi: "300+", numeric: 300, max: 400, label: t("impact.patients"), description: t("impact.patientsDesc"), icon: Users, color: "hsl(var(--primary))" },
    { kpi: "22%", numeric: 22, max: 30, label: t("impact.recovery"), description: t("impact.recoveryDesc"), icon: TrendingUp, color: "hsl(var(--gold))" },
    { kpi: "15%", numeric: 15, max: 30, label: t("impact.efficiency"), description: t("impact.efficiencyDesc"), icon: Gauge, color: "hsl(var(--coral))" },
    { kpi: "20+", numeric: 20, max: 30, label: t("impact.hours"), description: t("impact.hoursDesc"), icon: Clock, color: "hsl(var(--soft-green))" },
  ];

  return (
    <section className="bg-gradient-to-r from-primary/5 via-transparent to-accent/5 border-y border-border relative overflow-hidden">
      {/* Decorative grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="section-padding py-16 md:py-20 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-2">Impact Dashboard</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Numbers from the field</h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {metrics.map((metric, i) => {
              const pct = Math.min(100, (metric.numeric / metric.max) * 100);
              return (
                <motion.div
                  key={i}
                  className="group relative rounded-2xl bg-card border border-border p-5 md:p-6 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${metric.color.replace("hsl(", "hsla(").replace(")", ", 0.12)")}` }}
                    >
                      <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                    </div>
                    <span className="text-[10px] font-heading uppercase tracking-wider text-muted-foreground">live</span>
                  </div>

                  <AnimatedKpi
                    value={metric.kpi}
                    className="text-3xl md:text-4xl font-bold font-heading text-foreground block leading-none"
                  />
                  <p className={`text-sm font-semibold text-foreground mt-2 ${isRTL ? "font-arabic" : "font-heading"}`}>
                    {metric.label}
                  </p>
                  <p className={`text-xs text-muted-foreground mt-1 leading-snug ${isRTL ? "font-arabic" : ""}`}>
                    {metric.description}
                  </p>

                  {/* Animated bar */}
                  <div className="mt-4 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${metric.color}, ${metric.color.replace("hsl(", "hsla(").replace(")", ", 0.5)")})` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStripSection;
