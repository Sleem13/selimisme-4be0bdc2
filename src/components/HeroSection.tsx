import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
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

const LIQUID_COLORS = ["#5227FF", "#FF9FFC", "#B497CF"];

const HeroSection = () => {
  const { t, isRTL, lang } = useLanguage();

  const typingWordsEn = ["Healthcare Data Analyst", "ML Engineer", "BI Architect", "Clinical Insight Builder"];
  const typingWordsAr = ["محلل بيانات صحية", "مهندس تعلم آلي", "معماري ذكاء أعمال", "صانع رؤى سريرية"];
  const typingText = useTypingAnimation(lang === "ar" ? typingWordsAr : typingWordsEn, 80, 50, 2000);

  const triadEn = ["Analytics", "AI", "Healthcare"];
  const triadAr = ["تحليلات", "ذكاء اصطناعي", "رعاية صحية"];
  const triad = lang === "ar" ? triadAr : triadEn;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* LiquidEther background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <LiquidEther
          colors={LIQUID_COLORS}
          mouseForce={20}
          cursorSize={100}
          resolution={0.5}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 0.5px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Soft gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.2), transparent 70%)" }} />

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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <a href="/Mohamed_Mahmoud_Seliem_CV.pdf" download
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:shadow-lg"
              style={{ boxShadow: "var(--shadow-glow)" }}>
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              {t("hero.download")}
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
          <div className="relative">
            {/* Soft glow blending into background */}
            <div
              className="absolute inset-0 -m-10 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.25), transparent 65%)",
                filter: "blur(40px)",
              }}
            />
            {/* Subtle accent ring */}
            <div
              className="absolute inset-0 -m-4 rounded-full pointer-events-none opacity-40"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.4), transparent, hsl(var(--primary) / 0.4))",
                filter: "blur(20px)",
              }}
            />
            <img
              src={profileImg}
              alt="Mohamed Mahmoud Seliem"
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] object-contain"
              style={{
                filter:
                  "drop-shadow(0 20px 40px hsl(var(--primary) / 0.25)) drop-shadow(0 8px 20px hsl(0 0% 0% / 0.35))",
              }}
            />
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
