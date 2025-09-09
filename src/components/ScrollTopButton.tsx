"use client";
import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="トップへ戻る"
      className="scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        width: 44,
        height: 44,
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,.1)",
        background: "var(--color-light)",
        boxShadow: "var(--shadow)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 12}px)`,
        transition: "opacity .2s ease, transform .2s ease",
      }}
    >
      ↑
    </button>
  );
}

