"use client";
import React from "react";

export default function LogoSpotlight() {
  return (
    <div className="logo-spotlight" data-reveal>
      <div className="spot" aria-hidden />
      <svg
        width="260"
        height="260"
        viewBox="0 0 100 100"
        role="img"
        aria-label="RIDE ON AI ロゴ"
        onMouseMove={(e) => {
          const target = (e.currentTarget.parentElement?.querySelector(
            ".spot"
          ) as HTMLElement)!;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          target.style.setProperty("--x", `${x}%`);
          target.style.setProperty("--y", `${y}%`);
        }}
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="url(#g)" />
        <text x="50" y="57" textAnchor="middle" fontSize="30" fill="#fff" fontFamily="var(--font-montserrat)">
          RAI
        </text>
      </svg>
    </div>
  );
}

