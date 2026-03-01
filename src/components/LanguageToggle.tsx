import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = ({ scrolled }: { scrolled: boolean }) => {
  const { lang, setLang } = useLanguage();

  return (
    <motion.button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className={`px-2.5 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors ${
        scrolled
          ? "text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
          : "text-white/60 hover:text-white hover:bg-white/10 border border-white/20"
      }`}
      aria-label="Toggle language"
      whileTap={{ scale: 0.9 }}
    >
      {lang === "en" ? "عربي" : "EN"}
    </motion.button>
  );
};

export default LanguageToggle;
