"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 8);
      
      // heroエリアの高さを取得してヘッダーの表示状態を制御
      const heroElement = document.querySelector('.hero') as HTMLElement;
      if (heroElement) {
        const heroHeight = heroElement.offsetHeight;
        setPastHero(scrollY > heroHeight - 100); // heroエリアを通過したかどうか
      }
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.documentElement.classList.add("menu-open");
    else document.documentElement.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${pastHero ? "past-hero" : ""}`}>
      <div className="container header-inner">
        <Link href="#" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-avatar">
            <img src="/profile_image/sandaga.svg" alt="YOUSUKE" width={32} height={32} />
          </span>
          <span className="brand-text">YOUSUKE</span>
        </Link>
        <nav className={`nav ${open ? "open" : ""}`}>
          <Link href="#profile" onClick={() => setOpen(false)}>
            <span className="material-symbols-outlined" aria-hidden>person</span>プロフィール
          </Link>
          <Link href="#posts" onClick={() => setOpen(false)}>
            <span className="material-symbols-outlined" aria-hidden>article</span>記事
          </Link>
          <Link href="#contact" onClick={() => setOpen(false)}>
            <span className="material-symbols-outlined" aria-hidden>person_add</span>フォロー
          </Link>
          {/* <a className="btn cta" href="#posts" onClick={() => setOpen(false)}>
            記事を読む
          </a> */}
        </nav>
        <div className="header-controls">
          <ThemeSwitcher />
          <button
            aria-label="メニュー"
            className={`hamburger ${open ? "active" : ""}`}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
