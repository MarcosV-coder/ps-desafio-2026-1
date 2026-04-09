"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setIsDark(currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      setIsDark(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme} 
      style={{
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid var(--card-border)',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }}
    >
      {isDark ? '☀️'  : '🌙'}
    </button>
  );
}