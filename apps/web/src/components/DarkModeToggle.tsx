"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-12 h-6 rounded-full bg-surface-dark-2 border border-gold-600/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
      aria-label="Toggle color theme"
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-gold-400 shadow-md flex items-center justify-center"
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Simplified Aztec moon (dark) / sun (light) */}
        {isDark ? (
          <svg viewBox="0 0 20 20" className="w-3 h-3">
            <path
              d="M16 12A6 6 0 1 1 12 4a4 4 0 0 0 4 8Z"
              fill="var(--color-obsidian)"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" className="w-3 h-3">
            <circle cx="10" cy="10" r="4" fill="var(--color-obsidian)" />
            <path d="M10 2V4M10 16V18M2 10H4M16 10H18M4.93 4.93L6.34 6.34M13.66 13.66L15.07 15.07M4.93 15.07L6.34 13.66M13.66 6.34L15.07 4.93" stroke="var(--color-obsidian)" strokeWidth="1.5" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}