"use client";

import { useEffect } from "react";

/** Лёгкий параллакс эмблемы и «107»: пишет положение курсора в --px/--py на <html>. Только мышь, без reduced-motion. */
export function PointerParallax() {
  useEffect(() => {
    const ok = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok) return;

    const root = document.documentElement.style;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        root.setProperty("--px", (e.clientX / innerWidth - 0.5).toFixed(3));
        root.setProperty("--py", (e.clientY / innerHeight - 0.5).toFixed(3));
      });
    };

    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
