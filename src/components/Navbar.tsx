import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const linkKeys = [
  { key: "nav.story", href: "#story" },
  { key: "nav.services", href: "#services" },
  { key: "nav.how", href: "#how" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.quality", href: "#quality" },
  { key: "nav.compliance", href: "#compliance" },
  { key: "nav.contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 50;
      setScrolled(isScrolled);

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background/95 backdrop-blur-md ${
        scrolled ? "border-b border-border/10" : "border-b border-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-sm bg-[#00F2FF] text-[14px] font-black uppercase tracking-[0.2em] text-black">
            MS
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#00F2FF]">
            M Seliem
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {linkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground px-2 py-2 transition-colors font-body"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/recruiter"
            className="flex items-center gap-2 rounded-2xl border border-[#00F2FF]/15 bg-[#0b1821]/80 px-4 py-2 text-sm font-semibold text-[#00F2FF] transition-all hover:border-[#00F2FF]/35 hover:bg-[#0b1821]/95"
            title="One-pager for recruiters"
          >
            <FileText className="w-4 h-4 text-[#00F2FF]" />
            1-Pager
          </a>
          <a
            href="#contact"
            className="text-sm font-heading font-semibold px-4 py-2 rounded-full bg-[#00F2FF] text-black transition-all hover:bg-[#00d5ff]"
          >
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
          className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border/10 px-6 pb-6"
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
          <a
            href="/recruiter"
            className="block rounded-2xl border border-[#00F2FF]/15 bg-[#0b1821]/80 px-4 py-3 text-sm font-semibold text-[#00F2FF] transition-all hover:border-[#00F2FF]/35 hover:bg-[#0b1821]/95"
            onClick={() => setOpen(false)}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00F2FF]" />
              Recruiter 1-Pager
            </div>
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
