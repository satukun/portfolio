"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // 初期テーマを設定
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = (savedTheme as "light" | "dark") || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label={`${theme === "light" ? "ダーク" : "ライト"}テーマに切り替え`}
      title={`${theme === "light" ? "ダーク" : "ライト"}テーマに切り替え`}
    >
      <span className="material-symbols-outlined">
        {theme === "light" ? "dark_mode" : "light_mode"}
      </span>
    </button>
  );
}