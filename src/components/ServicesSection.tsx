import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  LayoutDashboard,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import EtlPipelineFlow from "@/components/EtlPipelineFlow";

const ServicesSection = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: BrainCircuit,
      titleKey: "svc.0.title",
      flow: ["svc.0.s1", "svc.0.s2", "svc.0.s3"],
    },
    {
      icon: LayoutDashboard,
      titleKey: "svc.1.title",
      flow: ["svc.1.s1", "svc.1.s2", "svc.1.s3"],
    },
    {
      icon: GraduationCap,
      titleKey: "svc.2.title",
      flow: ["svc.2.s1", "svc.2.s2", "svc.2.s3"],
    },
    {
      icon: BarChart3,
      titleKey: "svc.3.title",
      flow: ["svc.3.s1", "svc.3.s2", "svc.3.s3"],
    },
  ];

  return (
    <section id="services" className="relative">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? "font-arabic" : ""}`}
            >
              {t("svc.label")}
            </p>
            <h2
              className={`text-3xl md:text-5xl font-bold text-foreground leading-tight ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("svc.title.1")}{" "}
              <span className="gradient-text">{t("svc.title.2")}</span>
            </h2>
            <p
              className={`text-muted-foreground text-lg mt-4 max-w-2xl ${isRTL ? "font-arabic" : ""}`}
            >
              {t("svc.subtitle")}
            </p>
          </motion.div>

          {/* ETL Pipeline visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <EtlPipelineFlow />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "var(--shadow-card-hover)" }}
                className="group rounded-2xl bg-card border border-border p-7 transition-all duration-500 hover:border-primary/30"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3
                  className={`text-xl md:text-2xl font-bold text-foreground mb-6 ${isRTL ? "font-arabic" : "font-heading"}`}
                >
                  {t(s.titleKey)}
                </h3>

                <div
                  className={`flex items-center gap-2 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {s.flow.map((step, idx) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-secondary text-foreground border border-border font-medium whitespace-nowrap">
                        {t(step)}
                      </span>
                      {idx < s.flow.length - 1 && (
                        <ArrowRight
                          className={`w-3.5 h-3.5 text-primary/60 ${isRTL ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
