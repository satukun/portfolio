"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  code: string;
  speed?: number; // ms per char
  withSound?: boolean;
};

export default function TypewriterCode({ code, speed = 18, withSound = true }: Props) {
  const [text, setText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunks = useMemo(() => code.split(""), [code]);

  useEffect(() => {
    let i = 0;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      if (now - last >= speed && i < chunks.length) {
        setText((t) => t + chunks[i]);
        last = now;
        i++;
        if (withSound && audioRef.current) {
          try {
            const a = audioRef.current;
            a.currentTime = 0;
            a.play().catch(() => {});
          } catch {}
        }
      }
      if (i < chunks.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [chunks, speed, withSound]);

  return (
    <div className="code-editor">
      <div className="code-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="filename">index.ts</span>
      </div>
      <pre className="code"><code>{text}</code></pre>
      {/* tiny click sampled as base64 wav */}
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRmQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABYAaW5mbyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg\
GhlYWRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg\
YXRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA="
        preload="auto"
      />
    </div>
  );
}

