import { motion } from "framer-motion";
import { memo, useMemo, useState, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import LiquidEther from "@/components/LiquidEther.jsx";

const useTypingAnimation = (words: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

const LIQUID_COLORS = ["#00D4FF", "#0077FF", "#1A4A6E"];

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
      takeoverDuration={0.2}
      autoResumeDelay={4000}
      autoRampDuration={0.8}
    />
  </div>
));

const HeroSection = () => {
  const { t, isRTL, lang } = useLanguage();

  const typingWordsEn = ["Healthcare Data Analyst", "ML Engineer", "BI Architect", "Clinical Insight Builder"];
  const typingWordsAr = ["محلل بيانات صحية", "مهندس تعلم آلي", "معماري ذكاء أعمال", "صانع رؤى سريرية"];
  const typingText = useTypingAnimation(lang === "ar" ? typingWordsAr : typingWordsEn, 80, 50, 2000);

  const triadEn = ["Analytics", "AI", "Healthcare"];
  const triadAr = ["تحليلات", "ذكاء اصطناعي", "رعاية صحية"];
  const triad = useMemo(() => (lang === "ar" ? triadAr : triadEn), [lang]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* LiquidEther background */}
      <HeroBackground />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 0.5px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(180deg, hsl(var(--background) / 0.18) 0%, hsl(var(--background) / 0.04) 36%, hsl(var(--background) / 0.28) 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-24">
        {/* Left: Text content */}
        <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mb-5"
          >
            <p className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 font-heading text-sm md:text-base tracking-[0.25em] uppercase ${isRTL ? 'font-arabic' : ''}`}>
              {triad.map((word, i) => (
                <span key={word} className="inline-flex items-center gap-3">
                  <span className="text-foreground/80">{word}</span>
                  {i < triad.length - 1 && <span className="text-primary/60">·</span>}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.h1
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t("hero.name.first")}{" "}
            <span className="gradient-text">{t("hero.name.last")}</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            className="mb-6 h-10 md:h-12 flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <span className={`text-xl md:text-2xl font-heading font-semibold text-primary ${isRTL ? 'font-arabic' : ''}`}>
              {typingText}
            </span>
            <motion.span
              className="inline-block w-0.5 h-6 md:h-7 bg-primary ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>

          <motion.p
            className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed ${isRTL ? 'font-arabic' : 'font-body'}`}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            {t("hero.description")}
          </motion.p>

          {/* Skills pills */}
          <motion.div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}>
            {["Python", "SQL", "Power BI", "Machine Learning", "Tableau", "ETL Pipelines", "scikit-learn", "Data Analytics"].map((skill) => (
              <span key={skill}
                className="text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/30 hover:text-primary hover:shadow-sm transition-all duration-300">
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="/Mohamed_Mahmoud_Seliem_CV.pdf" download
              className="group w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:shadow-lg"
              style={{ boxShadow: "var(--shadow-glow)" }}>
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              {t("hero.download")}
            </a>
            <a href="#contact"
              className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-semibold border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
              onClick={() => trackEvent({ action: "contact_click", category: "hero", label: "hero_cta" })}
            >
              {t("nav.contact")}
            </a>
          </motion.div>
        </div>

        {/* Right: Profile image — aligned with the name, not above it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Soft ambient background accents */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* Main composition */}
            <div className="relative z-10">
              {/* Back decorative card */}
              <div className="absolute inset-0 bg-card/40 border border-border rounded-[70px] rotate-6 scale-105 transition-transform duration-700 group-hover:rotate-3" />

              {/* Image container */}
              <div className="relative w-72 h-[420px] md:w-80 md:h-[460px] rounded-[64px] bg-card shadow-[0_40px_80px_-15px_hsl(var(--primary)/0.25)] overflow-hidden border-8 border-card">
                <img
                  src={profileImg}
                  alt="Mohamed Mahmoud Seliem"
                  loading="eager"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
              </div>

              {/* Floating tag: Origin */}
              <div className="absolute -right-6 md:-right-12 top-1/4 bg-card/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-border">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">Origin</span>
                  <span className="text-sm text-foreground font-medium">Physical Therapist</span>
                </div>
              </div>

              {/* Floating tag: Current */}
              <div className="absolute -left-6 md:-left-16 bottom-1/4 bg-card/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-border">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold tracking-widest text-primary uppercase">Current</span>
                  <span className="text-sm text-foreground font-medium">Healthcare Data Analyst</span>
                </div>
              </div>

              {/* Minimalist data motif */}
              <div className="absolute -bottom-6 right-4 flex gap-1 items-end">
                <div className="w-1.5 h-6 bg-primary/30 rounded-full" />
                <div className="w-1.5 h-10 bg-primary rounded-full" />
                <div className="w-1.5 h-4 bg-primary/20 rounded-full" />
                <div className="w-1.5 h-8 bg-muted rounded-full" />
              </div>
            </div>

            {/* Decorative typography */}
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-max hidden md:block">
              <span className="text-3xl text-muted-foreground/30 italic select-none font-serif">Human-centric data</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
