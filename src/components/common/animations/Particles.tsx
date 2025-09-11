"use client";
import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

export default function Particles({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };
    const onLeave = () => (mouse.current.active = false);
    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1.2,
    }));

    function tick() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(37,99,235,0.9)"; // #2563eb
      const { x: mx, y: my, active } = mouse.current;
      for (const p of particles) {
        // simple motion
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // mouse repel
        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          const r = 120;
          if (d2 < r * r) {
            const d = Math.sqrt(d2) || 1;
            p.vx += (dx / d) * 0.08;
            p.vy += (dy / d) * 0.08;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // light connections
      ctx.strokeStyle = "rgba(139,92,246,0.25)"; // #8b5cf6
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const maxDistance = 120;
          if (d2 < maxDistance * maxDistance) {
            ctx.globalAlpha = (1 - d2 / (maxDistance * maxDistance)) * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas className={`particles ${className ?? ""}`} ref={canvasRef} />;
}

