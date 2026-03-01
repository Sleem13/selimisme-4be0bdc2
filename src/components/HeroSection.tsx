import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Download } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Subtle gold geometric accent */}
      <div className="absolute top-20 right-10 md:right-20 opacity-[0.06]">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" stroke="hsl(var(--gold))" strokeWidth="1" fill="none" />
          <polygon points="100,30 170,70 170,130 100,170 30,130 30,70" stroke="hsl(var(--gold))" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img
            src={profileImg}
            alt="Mohamed Mahmoud Seliem"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover mx-auto border-4 border-gold/40 shadow-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className={`text-gold font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t("hero.tagline")}
          </p>
        </motion.div>

        <motion.h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white ${isRTL ? 'font-arabic' : 'font-heading'}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {t("hero.name.first")}{" "}
          <span className="gradient-accent-text">{t("hero.name.last")}</span>
        </motion.h1>

        <motion.p
          className={`text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isRTL ? 'font-arabic' : 'font-body'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <a href="mailto:muhammadsleemo2@gmail.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
            <Mail className="w-4 h-4" /> muhammadsleemo2@gmail.com
          </a>
          <a href="tel:+201020754883" className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
            <Phone className="w-4 h-4" /> +201020754883
          </a>
          <a href="https://www.linkedin.com/in/sleemisme" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <span className="flex items-center gap-2 text-sm text-white/60">
            <MapPin className="w-4 h-4" /> DK, Egypt
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="/Mohamed_Mahmoud_Seliem_CV.pdf"
            download
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gold text-accent-foreground font-heading font-medium hover:bg-gold/90 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" />
            {t("hero.download")}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
