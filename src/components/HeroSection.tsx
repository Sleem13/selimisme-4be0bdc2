import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Mail, Phone, Linkedin, MapPin, Download } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

// Typing animation hook
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

// Animated data visualization SVG
const AnimatedDataViz = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" viewBox="0 0 800 600">
    <motion.path d="M0,400 Q100,350 200,380 T400,300 T600,320 T800,250" fill="none" stroke="url(#lineGrad1)" strokeWidth="2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }} />
    <motion.path d="M0,450 Q150,400 300,420 T500,350 T700,370 T800,300" fill="none" stroke="url(#lineGrad2)" strokeWidth="1.5"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 4, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }} />
    <motion.path d="M0,500 Q200,430 350,460 T550,380 T750,400 T800,340" fill="none" stroke="url(#lineGrad3)" strokeWidth="1"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 5, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }} />
    {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
      <motion.rect key={x} x={x - 10} y={500} width="20" rx="2" fill="url(#barGrad)"
        initial={{ height: 0 }} animate={{ height: [0, 30 + i * 12, 20 + i * 8] }}
        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
        style={{ transformOrigin: `${x}px 500px`, transform: "scaleY(-1)" }} />
    ))}
    {[
      { cx: 150, cy: 370 }, { cx: 350, cy: 310 }, { cx: 550, cy: 340 },
      { cx: 250, cy: 400 }, { cx: 450, cy: 280 }, { cx: 650, cy: 350 },
    ].map((p, i) => (
      <motion.circle key={i} cx={p.cx} cy={p.cy} r="3" fill="#06b6d4"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, repeatDelay: 1 }} />
    ))}
    <defs>
      <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" /><stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);

const HeroSection = () => {
  const { t, isRTL, lang } = useLanguage();

  const typingWordsEn = ["Data Analyst", "Problem Solver", "Business Intelligence", "ML Engineer"];
  const typingWordsAr = ["محلل بيانات", "حلّال مشكلات", "ذكاء أعمال", "مهندس تعلم آلي"];
  const typingText = useTypingAnimation(lang === "ar" ? typingWordsAr : typingWordsEn, 80, 50, 2000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #030712 0%, #0a0f24 40%, #0d1117 100%)" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.5) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <AnimatedDataViz />

      {/* Parallax ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)" }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)" }}
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Profile image with gradient circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute inset-0 -m-3 rounded-full animate-spin" style={{
            background: "conic-gradient(from 0deg, #06b6d4, #8b5cf6, #3b82f6, #06b6d4)",
            animationDuration: "6s", filter: "blur(8px)", opacity: 0.6,
          }} />
          <div className="absolute inset-0 -m-1 rounded-full" style={{
            background: "conic-gradient(from 0deg, #06b6d4, #8b5cf6, #3b82f6, #06b6d4)",
          }} />
          <img src={profileImg} alt="Mohamed Mahmoud Seliem"
            className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-black/50"
            style={{ boxShadow: "0 0 40px rgba(6, 182, 212, 0.3), 0 0 80px rgba(139, 92, 246, 0.15)" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className={`bg-clip-text text-transparent font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4 ${isRTL ? 'font-arabic' : ''}`}
            style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}>
            {t("hero.tagline")}
          </p>
        </motion.div>

        <motion.h1
          className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 tracking-tight text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {t("hero.name.first")}{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6, #3b82f6)" }}>
            {t("hero.name.last")}
          </span>
        </motion.h1>

        {/* Typing animation headline */}
        <motion.div
          className="mb-6 h-10 md:h-12 flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <span className={`text-xl md:text-2xl font-heading font-semibold bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}
            style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #a78bfa)" }}>
            {typingText}
          </span>
          <motion.span
            className="inline-block w-0.5 h-6 md:h-7 bg-cyan-400 ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>

        <motion.p
          className={`text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isRTL ? 'font-arabic' : 'font-body'}`}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {t("hero.description")}
        </motion.p>

        <motion.div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}>
          <a href="mailto:muhammadsleemo2@gmail.com" className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors">
            <Mail className="w-4 h-4" /> muhammadsleemo2@gmail.com
          </a>
          <a href="tel:+201020754883" className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors">
            <Phone className="w-4 h-4" /> +201020754883
          </a>
          <a href="https://www.linkedin.com/in/sleemisme" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" /> DK, Egypt
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <a href="/Mohamed_Mahmoud_Seliem_CV.pdf" download
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-heading font-semibold transition-all duration-300 text-white"
            style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", boxShadow: "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(139, 92, 246, 0.15)" }}>
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            {t("hero.download")}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-cyan-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
