"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-14 h-7 rounded-full bg-muted border border-border" />; // Prevention of hydration mismatch
  }

  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 border border-border
        ${isDark ? "bg-slate-950" : "bg-indigo-100"}
      `}
      role="switch"
      aria-checked={isDark}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setTheme(isDark ? "light" : "dark");
        }
      }}
    >
      <div
        className={`
          absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300
          ${isDark ? "translate-x-7" : "translate-x-0"}
        `}
      >
        {isDark ? (
           <Moon className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500/20" />
        ) : (
           <Sun className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
        )}
      </div>
      
      {/* Background Icons for decoration */}
      <div className="absolute inset-0 flex justify-between items-center px-1.5 pointer-events-none">
        <Sun className={`h-3 w-3 text-amber-500/50 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`} />
        <Moon className={`h-3 w-3 text-indigo-400/50 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`} />
      </div>
    </div>
  );
}
