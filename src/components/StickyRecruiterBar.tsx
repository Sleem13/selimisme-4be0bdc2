import { useEffect, useState } from "react";
import { Download, Mail, Linkedin, ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const StickyRecruiterBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 md:gap-3 rounded-full border border-border bg-card/95 backdrop-blur-md pl-4 pr-2 py-2 shadow-xl">
        <span className="hidden sm:flex flex-col leading-tight pr-2 border-r border-border/60">
          <span className="text-xs font-heading font-semibold text-foreground">
            Mohamed Seliem
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Data Analyst · ML
          </span>
        </span>
        <a
          href="/Mohamed_Mahmoud_Seliem_CV.pdf"
          download
          onClick={() =>
            trackEvent({ action: "cv_download", category: "sticky_bar", label: "cv" })
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
        >
          <Download className="w-3.5 h-3.5" /> CV
        </a>
        <a
          href="mailto:muhammadsleem03@gmail.com"
          onClick={() =>
            trackEvent({ action: "email_click", category: "sticky_bar", label: "email" })
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
        >
          <Mail className="w-3.5 h-3.5" /> Email
        </a>
        <a
          href="https://www.linkedin.com/in/sleemisme"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent({ action: "linkedin_click", category: "sticky_bar", label: "linkedin" })
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
        >
          <Linkedin className="w-3.5 h-3.5" />
          <span className="hidden md:inline">LinkedIn</span>
        </a>
        <a
          href="/recruiter"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-semibold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition"
        >
          <ExternalLink className="w-3.5 h-3.5" /> 1-Pager
        </a>
      </div>
    </div>
  );
};

export default StickyRecruiterBar;
