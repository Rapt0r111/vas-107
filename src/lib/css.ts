import type { CSSProperties } from "react";

/** Типизированная передача CSS-переменных через style. */
export const cssVars = (vars: Record<`--${string}`, string>) => vars as CSSProperties;

/** Задержка и длительность входной анимации `.rise` (см. styles/motion.css). */
export const rise = (delay: string, duration?: string) =>
  cssVars({ "--d": delay, ...(duration ? { "--dur": duration } : {}) });
