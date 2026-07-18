import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { Download, ChevronDown, Linkedin } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import LiquidEther from "@/components/LiquidEther.jsx";

// (typing animation removed — static tagline is faster to scan for recruiters)

const LIQUID_COLORS = ["#a57b5f", "#7a5a44", "#3a2a20"];

const HeroBackground = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
    <LiquidEther
      colors={LIQUID_COLORS}
      mouseForce={12}
      cursorSize={80}
      resolution={0.35}
      autoDemo
      autoSpeed={0.35}
      autoIntensity={1.4}
      takeoverDuration={1.2}
      autoResumeDelay={4000}
      autoRampDuration={0.8}
    />
  </div>
));

const HeroSection = () => {
  const { t, isRTL, lang } = useLanguage();

  const roleLine = "Healthcare Data Analyst · ML Engineer · BI Architect";

  const triadEn = ["Analytics", "AI", "Healthcare"];
  const triadAr = ["تحليلات", "ذكاء اصطناعي", "رعاية صحية"];
  const triad = useMemo(() => (lang === "ar" ? triadAr : triadEn), [lang]);

  const heroKpis = [
    { value: "300+", label: "patients" },
    { value: "15%", label: "efficiency gain" },
    { value: "22%", label: "faster recovery ID" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* LiquidEther background */}
      <HeroBackground />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 0.5px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.18) 0%, hsl(var(--background) / 0.04) 36%, hsl(var(--background) / 0.28) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-24">
        {/* Left: Text content */}
        <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5"
          >
            <p
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 font-heading text-sm md:text-base tracking-[0.25em] uppercase ${isRTL ? "font-arabic" : ""}`}
            >
              {triad.map((word, i) => (
                <span key={word} className="inline-flex items-center gap-3">
                  <span className="text-foreground/80">{word}</span>
                  {i < triad.length - 1 && (
                    <span className="text-primary/60">·</span>
                  )}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.h1
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight text-foreground ${isRTL ? "font-arabic" : "font-heading"}`}
            aria-label="Mohamed Mahmoud Seliem — Healthcare Data Analyst & ML Engineer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t("hero.name.first")}{" "}
            <span className="gradient-text">{t("hero.name.last")}</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            className="mb-6 h-10 md:h-12 flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <span
              className={`text-xl md:text-2xl font-heading font-semibold text-primary ${isRTL ? "font-arabic" : ""}`}
            >
              {typingText}
            </span>
            <motion.span
              className="inline-block w-0.5 h-6 md:h-7 bg-primary ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          <motion.p
            className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed ${isRTL ? "font-arabic" : "font-body"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            {t("hero.description")}
          </motion.p>

          {/* Skills pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {[
              "Python",
              "SQL",
              "Power BI",
              "Machine Learning",
              "Tableau",
              "ETL Pipelines",
              "scikit-learn",
              "Data Analytics",
            ].map((skill) => (
              <span
                key={skill}
                className="text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/30 hover:text-primary hover:shadow-sm transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="/Mohamed_Mahmoud_Seliem_CV.pdf"
              download
              className="group w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:shadow-lg"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              {t("hero.download")}
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-semibold border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
              onClick={() =>
                trackEvent({
                  action: "contact_click",
                  category: "hero",
                  label: "hero_cta",
                })
              }
            >
              {t("nav.contact")}
            </a>
          </motion.div>
        </div>

        {/* Right: Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Soft ambient glow */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[32px] blur-2xl pointer-events-none" />

            {/* Main Container */}
            <div className="relative w-72 md:w-[420px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_32px_64px_-20px_hsl(var(--primary)/0.22)] border border-border bg-card">
              {/* Subtle top gradient for depth */}
              <div
                className="absolute inset-0 rounded-[24px] pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(var(--background) / 0.15) 0%, transparent 40%, transparent 60%, hsl(var(--background) / 0.35) 100%)",
                }}
              />

              {/* Image */}
              <img
                src={profileImg}
                alt="Mohamed Mahmoud Seliem"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              />

              {/* Floating badges */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none z-10">
                <div className="space-y-3">
                  {/* Origin */}
                  <div className="bg-background/90 backdrop-blur-md border border-border rounded-xl px-4 py-3 max-w-[180px] shadow-sm">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-heading mb-0.5">
                      Origin
                    </span>
                    <h4 className="text-sm font-semibold text-foreground">
                      Physical Therapist
                    </h4>
                  </div>

                  {/* Current */}
                  <div className="bg-primary rounded-xl px-4 py-3 max-w-[220px] shadow-md shadow-primary/15">
                    <span className="block text-[10px] uppercase tracking-widest text-primary-foreground/80 font-heading mb-1">
                      Current Role
                    </span>
                    <h4 className="text-sm font-bold text-primary-foreground">
                      Healthcare Data Analyst
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
