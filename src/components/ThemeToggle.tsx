import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = ({ scrolled }: { scrolled: boolean }) => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <motion.button
      onClick={() => setDark(!dark)}
      className={`p-2 rounded-lg transition-colors ${
        scrolled
          ? "text-muted-foreground hover:text-foreground hover:bg-muted"
          : "text-white/60 hover:text-white hover:bg-white/10"
      }`}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.9 }}
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </motion.button>
  );
};

export default ThemeToggle;
