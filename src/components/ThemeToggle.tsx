import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = "light" | "dark";

const ThemeToggle = ({ scrolled }: { scrolled: boolean }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return "dark";
      return "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") {
      root.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const cycle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const icon =
    theme === "light" ? (
      <Moon className="w-4 h-4" />
    ) : (
      <Sun className="w-4 h-4" />
    );
  const label = theme === "light" ? "Enable dark mode" : "Enable light mode";

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
