import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";

const linkKeys = [
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.experience", href: "#experience" },
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
        <a href="#" className="flex items-center gap-3 group">
          <span className="grid h-11 w-11 place-items-center rounded-sm border border-primary/40 bg-primary/10 text-[13px] font-heading italic text-primary">
            MS
          </span>
          <span className="text-sm font-heading italic tracking-wide text-foreground/90">
            Mohamed Seliem
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {linkKeys.map((link) => {
            const isProjects = link.key === "nav.projects";
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm px-2 py-2 transition-colors font-body ${
                  isProjects
                    ? "text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(link.key)}
                {isProjects && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[hsl(var(--primary))]" />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/recruiter"
            className="flex items-center gap-2 rounded-2xl border border-[hsl(var(--primary))]/15 bg-[hsl(var(--card))]/80 px-4 py-2 text-sm font-semibold text-[hsl(var(--primary))] transition-all hover:border-[hsl(var(--primary))]/35 hover:bg-[hsl(var(--card))]/95"
            title="One-pager for recruiters"
          >
            <FileText className="w-4 h-4 text-[hsl(var(--primary))]" />
            1-Pager
          </a>
          <a
            href="#contact"
            className="text-sm font-heading font-semibold px-4 py-2 rounded-full bg-[hsl(var(--primary))] text-black transition-all hover:bg-[hsl(var(--primary))]"
            onClick={() =>
              trackEvent({
                action: "contact_click",
                category: "navbar",
                label: "navbar_desktop",
              })
            }
          >
            {t("nav.contact")}
          </a>
        </div>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="#contact"
            className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full bg-[hsl(var(--primary))] text-black transition-all hover:bg-[hsl(var(--primary))]"
            onClick={() => {
              setOpen(false);
              trackEvent({
                action: "contact_click",
                category: "navbar",
                label: "navbar_mobile",
              });
            }}
          >
            {t("nav.contact")}
          </a>
          <button
            className="text-foreground p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border/10 px-6 pb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {linkKeys.map((link) => {
            const isProjects = link.key === "nav.projects";
            return (
              <a
                key={link.href}
                href={link.href}
                className={`block py-3 text-sm transition-colors ${
                  isProjects
                    ? "text-[hsl(var(--primary))] font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
                {isProjects && (
                  <span className="ml-2 inline-block w-4 h-0.5 rounded-full bg-[hsl(var(--primary))] align-middle" />
                )}
              </a>
            );
          })}
          <a
            href="/recruiter"
            className="block rounded-2xl border border-[hsl(var(--primary))]/15 bg-[hsl(var(--card))]/80 px-4 py-3 text-sm font-semibold text-[hsl(var(--primary))] transition-all hover:border-[hsl(var(--primary))]/35 hover:bg-[hsl(var(--card))]/95"
            onClick={() => setOpen(false)}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[hsl(var(--primary))]" />
              Recruiter 1-Pager
            </div>
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
