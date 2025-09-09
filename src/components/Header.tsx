"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.documentElement.classList.add("menu-open");
    else document.documentElement.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="#" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-avatar">
            <img src="/profile_image/akira-papa-profile.jpg" alt="あきらパパ" width={32} height={32} />
          </span>
          <span className="brand-text">あきらパパ</span>
        </Link>
        <nav className={`nav ${open ? "open" : ""}`}>
          <Link href="#profile" onClick={() => setOpen(false)}>
            <span className="material-symbols-outlined" aria-hidden>person</span>プロフィール
          </Link>
          <Link href="#community" onClick={() => setOpen(false)}>
            <span className="material-symbols-outlined" aria-hidden>hub</span>コミュニティ
          </Link>
          <Link href="#twitter" onClick={() => setOpen(false)}>
            <span className="material-symbols-outlined" aria-hidden>forum</span>ツイート
          </Link>
          <Link href="#contact" onClick={() => setOpen(false)}>
            <span className="material-symbols-outlined" aria-hidden>person_add</span>フォロー
          </Link>
          <a className="btn cta" href="#community" onClick={() => setOpen(false)}>
            参加する
          </a>
        </nav>
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
    </header>
  );
}
