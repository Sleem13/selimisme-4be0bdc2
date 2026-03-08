import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const linkKeys = [
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.education", href: "#education" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-0 border-b border-white/5"
          : "py-0"
      }`}
      style={scrolled ? {
        background: "rgba(10, 15, 30, 0.8)",
        backdropFilter: "blur(20px) saturate(1.2)",
      } : {}}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-heading text-lg font-bold gradient-text">
          MS
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {linkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors font-body ${
                scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
              }`}
            >
              {t(link.key)}
            </a>
          ))}
          <LanguageToggle scrolled={scrolled} />
          <ThemeToggle scrolled={scrolled} />
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          className="md:hidden bg-card/95 backdrop-blur-lg border-b border-border px-6 pb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {linkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <LanguageToggle scrolled={true} />
            <ThemeToggle scrolled={true} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
