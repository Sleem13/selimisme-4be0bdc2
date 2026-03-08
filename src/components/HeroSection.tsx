import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Phone, Linkedin, MapPin, Download, ChevronDown } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

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

const HeroSection = () => {
  const { t, isRTL, lang } = useLanguage();

  const typingWordsEn = ["Data Analyst", "Problem Solver", "Business Intelligence", "ML Engineer"];
  const typingWordsAr = ["محلل بيانات", "حلّال مشكلات", "ذكاء أعمال", "مهندس تعلم آلي"];
  const typingText = useTypingAnimation(lang === "ar" ? typingWordsAr : typingWordsEn, 80, 50, 2000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute inset-0 -m-2 rounded-full" style={{
            background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
            opacity: 0.6, filter: "blur(6px)",
          }} />
          <div className="absolute inset-0 -m-0.5 rounded-full" style={{
            background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
          }} />
          <img src={profileImg} alt="Mohamed Mahmoud Seliem"
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background"
            style={{ boxShadow: "var(--shadow-glow)" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className={`gradient-text font-heading text-sm md:text-base tracking-[0.25em] uppercase mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t("hero.tagline")}
          </p>
        </motion.div>

        <motion.h1
          className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 tracking-tight text-foreground ${isRTL ? 'font-arabic' : 'font-heading'}`}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {t("hero.name.first")}{" "}
          <span className="gradient-text">{t("hero.name.last")}</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          className="mb-6 h-10 md:h-12 flex items-center justify-center"
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
          className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isRTL ? 'font-arabic' : 'font-body'}`}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {t("hero.description")}
        </motion.p>

        {/* Contact pills */}
        <motion.div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}>
          {[
            { href: "mailto:muhammadsleem03@gmail.com", icon: Mail, text: "muhammadsleem03@gmail.com" },
            { href: "tel:+201020754883", icon: Phone, text: "+201020754883" },
            { href: "https://www.linkedin.com/in/sleemisme", icon: Linkedin, text: "LinkedIn", external: true },
          ].map((item) => (
            <a key={item.text} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/30 hover:shadow-sm">
              <item.icon className="w-3.5 h-3.5" /> {item.text}
            </a>
          ))}
          <span className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-card border border-border">
            <MapPin className="w-3.5 h-3.5" /> DK, Egypt
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <a href="/Mohamed_Mahmoud_Seliem_CV.pdf" download
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:shadow-lg"
            style={{ boxShadow: "var(--shadow-glow)" }}>
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            {t("hero.download")}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
