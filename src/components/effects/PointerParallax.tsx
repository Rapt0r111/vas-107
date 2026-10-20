"use client";

import { useEffect } from "react";

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * Лёгкий параллакс: положение курсора (--px/--py) двигает эмблему и «107»,
 * наклон телефона (--tx/--ty) двигает волны. Пишет в <html>, без перерисовки React.
 * Наклон работает там, где браузер отдаёт его без запроса разрешения (Android).
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
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      set({ "--tx": clamp(e.gamma / 30).toFixed(3), "--ty": clamp((e.beta - 45) / 30).toFixed(3) });
    };

    if (matchMedia("(hover: hover) and (pointer: fine)").matches) addEventListener("pointermove", onMove, { passive: true });
    else addEventListener("deviceorientation", onTilt, { passive: true });

    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("deviceorientation", onTilt);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
