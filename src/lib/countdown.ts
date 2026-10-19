export type Countdown = {
  /** Секунд до начала; 0, если событие уже началось. */
  totalSeconds: number;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  /** Доля текущей минуты (0–1) для полоски под секундами. */
  secondsFraction: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function getCountdown(startMs: number, nowMs: number): Countdown {
  const total = Math.floor(Math.max(0, startMs - nowMs) / 1000);
  return {
    totalSeconds: total,
    days: String(Math.floor(total / 86400)),
    hours: pad(Math.floor((total % 86400) / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
    secondsFraction: (total % 60) / 60,
  };
}
