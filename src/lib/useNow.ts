"use client";

import { useSyncExternalStore } from "react";

/** Общее хранилище «сейчас»: один интервал на всех подписчиков, снимок стабилен между тиками. */
let now = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) clearInterval(timer);
  };
}

const getSnapshot = () => now;
/** На сервере и при гидратации «сейчас» неизвестно: 0 = ещё не знаем. */
const getServerSnapshot = () => 0;

/** Текущее время в мс или 0, пока оно неизвестно (сервер, гидратация). */
export const useNow = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
