import { motion } from "framer-motion";
import { memo } from "react";
import { Download, Mail, Linkedin, Github, ChevronDown } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import LiquidEther from "@/components/LiquidEther.jsx";

const LIQUID_COLORS = ["#a57b5f", "#7a5a44", "#3a2a20"];

const HeroBackground = memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
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

const heroKpis = [
  { value: "300+", label: "Patients managed" },
  { value: "22%", label: "Faster recovery ID" },
  { value: "20+ hrs", label: "Saved weekly" },
];

const HeroSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <>
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <HeroBackground />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 0.5px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--background) / 0.20) 0%, hsl(var(--background) / 0.04) 40%, hsl(var(--background) / 0.55) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
          {/* Section marker */}
          <div className="flex items-center justify-between mb-10">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              01 — Introduction
            </span>
            <span className="hidden md:inline font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
              Cairo · EG
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: text */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-primary/90 mb-6"
              >
                Healthcare Data Analyst · ML Engineer · BI Architect
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`text-6xl md:text-7xl lg:text-[6.5rem] font-extrabold tracking-tight leading-[0.92] text-foreground ${isRTL ? "font-arabic" : "font-heading"}`}
                aria-label="Mohamed Mahmoud Seliem"
              >
                {t("hero.name.first")}
                <br />
                <span className="italic font-normal gradient-text">
                  {t("hero.name.last")}
                </span>
                <span className="text-primary">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className={`mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed ${isRTL ? "font-arabic" : ""}`}
              >
                {t("hero.description")}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href="/Mohamed_Mahmoud_Seliem_CV.pdf"
                  download
                  onClick={() =>
                    trackEvent({ action: "cv_download", category: "hero", label: "hero_cv" })
                  }
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold bg-primary text-primary-foreground transition-all hover:shadow-lg"
                  style={{ boxShadow: "var(--shadow-glow)" }}
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  {t("hero.download")}
                </a>
                <a
                  href="#contact"
                  onClick={() =>
                    trackEvent({ action: "contact_click", category: "hero", label: "hero_cta" })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold border border-border bg-card/60 text-foreground hover:border-primary/40 hover:text-primary transition-all"
                >
                  <Mail className="w-4 h-4" />
                  {t("nav.contact")}
                </a>

                {/* Divider */}
                <span className="hidden sm:inline h-6 w-px bg-border/70" aria-hidden />

                <div className="flex items-center gap-1">
                  <a
                    href="https://www.linkedin.com/in/sleemisme"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    onClick={() =>
                      trackEvent({ action: "linkedin_click", category: "hero", label: "hero_linkedin" })
                    }
                    className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-card transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/Sleem13"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-card transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: portrait card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="relative w-64 md:w-[380px] aspect-[4/5]">
                {/* Top-left terracotta rule */}
                <div className="absolute -top-3 -left-3 flex flex-col gap-1.5 z-20">
                  <span className="block h-[2px] w-14 bg-primary" />
                  <span className="block h-[2px] w-8 bg-primary/50" />
                </div>

                <div
                  className="relative w-full h-full overflow-hidden rounded-sm border border-border bg-card"
                  style={{ boxShadow: "0 30px 60px -20px hsl(var(--primary) / 0.25)" }}
                >
                  <img
                    src={profileImg}
                    alt="Mohamed Mahmoud Seliem — Healthcare Data Analyst"
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, hsl(var(--background) / 0.75) 100%)",
                    }}
                  />

                  {/* Availability tag pinned bottom-left */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur border border-border font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available · Cairo / Remote
                    </span>
                  </div>
                </div>

                {/* Bottom-right serial */}
                <span className="absolute -bottom-6 right-0 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  MMS · 2020 → 2026
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
        </motion.div>
      </section>

      {/* Hairline KPI band — sits directly under the hero */}
      <section
        aria-label="Impact highlights"
        className="border-y border-border/70 bg-background/60 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6">
          <dl className="grid grid-cols-3 divide-x divide-border/70">
            {heroKpis.map((k) => (
              <div key={k.label} className="py-6 md:py-8 px-4 text-center">
                <dt
                  className={`text-3xl md:text-5xl font-extrabold text-primary leading-none ${isRTL ? "font-arabic" : "font-heading"}`}
                >
                  {k.value}
                </dt>
                <dd className="mt-2 font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                  {k.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
