import { useState, useEffect } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = "light" | "dark" | "galaxy";

const ThemeToggle = ({ scrolled }: { scrolled: boolean }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as ThemeMode | null;
      if (stored && ["light", "dark", "galaxy"].includes(stored)) return stored;
      return "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "galaxy");
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "galaxy") {
      root.classList.add("dark", "galaxy");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const cycle = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "galaxy";
      return "light";
    });
  };

  const icon = theme === "light" ? <Moon className="w-4 h-4" /> 
    : theme === "dark" ? <Sparkles className="w-4 h-4" /> 
    : <Sun className="w-4 h-4" />;

  const label = theme === "light" ? "Dark mode" : theme === "dark" ? "Galaxy mode" : "Light mode";

  return (
    <motion.button
      onClick={cycle}
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label={label}
      title={label}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {icon}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
