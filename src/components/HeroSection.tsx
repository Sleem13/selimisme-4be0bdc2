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
            {/* Dynamic Glow Aura */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75 group-hover:scale-110 transition-transform duration-1000" />

            {/* Outer Technical Rings */}
            <div className="absolute -inset-12 border border-primary/10 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="absolute -inset-8 border-2 border-l-primary/40 border-r-primary/10 border-t-transparent border-b-transparent rounded-full animate-[spin_20s_linear_infinite_reverse]" />

            {/* Main Image Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem]">
              {/* Corner Accents (Cyber Brackets) */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)] z-10" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)] z-10" />

              {/* Clipping Frame */}
              <div
                className="w-full h-full rounded-full p-1 bg-gradient-to-br from-primary via-slate-800 to-primary shadow-2xl overflow-hidden relative"
                style={{ boxShadow: "0 20px 40px hsl(var(--primary) / 0.25), 0 8px 20px hsl(0 0% 0% / 0.35)" }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 ring-4 ring-slate-900 relative">
                  <img
                    src={profileImg}
                    alt="Mohamed Mahmoud Seliem"
                    loading="eager"
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110"
                  />

                  {/* HUD Overlay Effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Scanning Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/30 shadow-[0_0_8px_hsl(var(--primary))] animate-[bounce_4s_ease-in-out_infinite]" />
                    {/* Digital Vignette */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "radial-gradient(circle at center, transparent 40%, hsl(var(--background)) 95%)" }}
                    />
                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,hsl(var(--primary)/0.05)_50%)] bg-[length:100%_4px]" />
                  </div>
                </div>
              </div>

              {/* Orbiting Status Node */}
              <div className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />
                <div className="hidden md:flex flex-col">
                  <span className="text-[10px] font-mono text-primary tracking-tighter uppercase">Status</span>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">Online</span>
                </div>
              </div>
            </div>

            {/* Bottom Label */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 whitespace-nowrap">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
              <span className="font-mono text-[11px] text-primary/60 tracking-[0.3em] uppercase">Protocol v4.02</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
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
