import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const linkKeys = [
  { key: "nav.story", href: "#story" },
  { key: "nav.services", href: "#services" },
  { key: "nav.how", href: "#how" },
  { key: "nav.experience", href: "#experience" },
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
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm" : ""
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <a href="#" className="font-heading text-lg font-bold gradient-text tracking-tight">MS</a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card/60 backdrop-blur px-1.5 py-1.5">
          {linkKeys.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground hover:bg-secondary px-3.5 py-1.5 rounded-full transition-colors font-body">
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle scrolled={true} />
          <a href="#contact"
            className="text-sm font-heading font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:shadow-md transition-all">
            {t("nav.contact")}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
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
            <a key={link.href} href={link.href}
              className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}>
              {t(link.key)}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <ThemeToggle scrolled={true} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
