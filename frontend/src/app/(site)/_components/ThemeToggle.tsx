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
        border: '1px solid var(--card-bg)',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }}
    >
      {isDark ? (<i className="fa-solid fa-sun fa-spin" style={{ animationDuration: '3s' }}></i>) 
      : (<i className="fa-solid fa-moon fa-bounce" style={{ animationDuration: '2s' }}></i>)}
    </button>
  );
}