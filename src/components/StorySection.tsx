import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Stethoscope,
  Database,
  BrainCircuit,
  LineChart,
  Sparkles,
  Wrench,
} from "lucide-react";

const ThenNowChip = ({
  icon: Icon,
  label,
  tone,
}: {
  icon: any;
  label: string;
  tone: "muted" | "primary";
}) => (
  <div
    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-medium border whitespace-nowrap ${
      tone === "primary"
        ? "bg-primary/10 text-primary border-primary/30"
        : "bg-card text-muted-foreground border-border"
    }`}
  >
    <Icon className="w-3.5 h-3.5" />
    {label}
  </div>
);

const StorySection = () => {
  const { t, isRTL } = useLanguage();

  const thenItems = [
    { icon: Stethoscope, key: "story.then.0" },
    { icon: Stethoscope, key: "story.then.1" },
    { icon: LineChart, key: "story.then.2" },
    { icon: Database, key: "story.then.3" },
  ];
  const nowItems = [
    { icon: BrainCircuit, key: "story.now.0" },
    { icon: Sparkles, key: "story.now.1" },
    { icon: Wrench, key: "story.now.2" },
    { icon: LineChart, key: "story.now.3" },
  ];

  return (
    <section id="story" className="relative">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className={`text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 ${isRTL ? "font-arabic" : ""}`}
            >
              {t("story.label")}
            </p>
            <h2
              className={`text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight ${isRTL ? "font-arabic" : "font-heading"}`}
            >
              {t("story.title")}
            </h2>
            <div className="arabic-divider mb-8">
              <span className="arabic-ornament">◆</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-14">
            {[0, 1, 2].map((i) => (
              <motion.p
                key={i}
                className={`text-muted-foreground text-base md:text-lg leading-relaxed ${isRTL ? "font-arabic" : ""} ${
                  i === 2 ? "md:col-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {t(`story.p${i}`)}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-10"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <p
              className={`text-center text-2xl md:text-3xl font-heading font-semibold mb-10 ${isRTL ? "font-arabic" : ""}`}
            >
              <span className="text-muted-foreground">
                "{t("story.quote.1")}{" "}
              </span>
              <span className="gradient-text">{t("story.quote.2")}</span>
              <span className="text-muted-foreground">"</span>
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* THEN */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs tracking-[0.3em] font-heading text-muted-foreground uppercase">
                    {t("story.then")}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {thenItems.map((item) => (
                    <ThenNowChip
                      key={item.key}
                      icon={item.icon}
                      label={t(item.key)}
                      tone="muted"
                    />
                  ))}
                </div>
              </div>

              {/* NOW */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs tracking-[0.3em] font-heading text-primary uppercase">
                    {t("story.now")}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {nowItems.map((item) => (
                    <ThenNowChip
                      key={item.key}
                      icon={item.icon}
                      label={t(item.key)}
                      tone="primary"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
