"use client";

import { useEffect } from "react";

/**
 * Лёгкий параллакс: положение курсора (--px/--py) двигает эмблему и «107».
 * Пишет в <html>, без перерисовки React. Только для мыши: на телефоне нет ни эффекта, ни подписки.
 */
export function PointerParallax() {
  useEffect(() => {
    if (!matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const root = document.documentElement.style;
    let raf = 0;
    let pending: Record<string, string> = {};
    const set = (vars: Record<string, string>) => {
      Object.assign(pending, vars);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        for (const [k, v] of Object.entries(pending)) root.setProperty(k, v);
        pending = {};
      });
    };

    const onMove = (e: PointerEvent) =>
      set({ "--px": (e.clientX / innerWidth - 0.5).toFixed(3), "--py": (e.clientY / innerHeight - 0.5).toFixed(3) });

    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    addEventListener("pointermove", onMove, { passive: true });

    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
