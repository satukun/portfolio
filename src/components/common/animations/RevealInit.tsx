"use client";
import { useEffect } from "react";

/**
 * Initializes scroll reveal after hydration to avoid SSR/CSR mismatch.
 * Enhanced with smoother animations and better timing.
 */
export default function RevealInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            
            // Add a small delay for smoother appearance
            setTimeout(() => {
              target.classList.add("is-visible");
            }, 100);
            
            // Unobserve after animation to improve performance
            io.unobserve(target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger animation slightly before element is fully visible
      }
    );

    // Observe all elements with data-reveal
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}

