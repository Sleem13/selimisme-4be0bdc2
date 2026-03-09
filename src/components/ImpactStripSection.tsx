import { motion } from "framer-motion";
import { AnimatedKpi } from "@/components/AnimatedKpi";
import { useLanguage } from "@/contexts/LanguageContext";

const ImpactStripSection = () => {
  const { t, isRTL } = useLanguage();

  const metrics = [
    {
      kpi: "300+",
      label: t("impact.patients"),
      description: t("impact.patientsDesc"),
    },
    {
      kpi: "22%",
      label: t("impact.recovery"),
      description: t("impact.recoveryDesc"),
    },
    {
      kpi: "15%",
      label: t("impact.efficiency"),
      description: t("impact.efficiencyDesc"),
    },
    {
      kpi: "20+",
      label: t("impact.hours"),
      description: t("impact.hoursDesc"),
    },
  ];

  return (
    <section className="bg-gradient-to-r from-primary/5 via-transparent to-accent/5 border-y border-border">
      <div className="section-padding py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <AnimatedKpi
                  value={metric.kpi}
                  className="text-3xl md:text-4xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                />
                <p className={`text-sm md:text-base font-semibold text-foreground mt-1 ${isRTL ? 'font-arabic' : 'font-heading'}`}>
                  {metric.label}
                </p>
                <p className={`text-xs md:text-sm text-muted-foreground mt-1.5 leading-snug ${isRTL ? 'font-arabic' : ''}`}>
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStripSection;
