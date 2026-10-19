"use client";

import { useSyncExternalStore } from "react";
import { getCountdown } from "@/lib/countdown";
import { cssVars } from "@/lib/css";

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
/** На сервере и при гидратации «сейчас» неизвестно: показываем скрытую заготовку без сдвига вёрстки. */
const getServerSnapshot = () => 0;

type Props = { startsAt: string };

export function Countdown({ startsAt }: Props) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pending = current === 0;
  const c = getCountdown(Date.parse(startsAt), pending ? Date.parse(startsAt) : current);
  const started = !pending && c.totalSeconds === 0;

  return (
    <div
      className="countdown"
      role="timer"
      aria-label="Время до начала торжества"
      data-pending={pending || undefined}
    >
      {started ? (
        <span className="countdown__caption font-display">Торжественные мероприятия начались</span>
      ) : (
        <>
          <span className="countdown__caption font-display">До начала торжества</span>
          <div className="countdown__row">
            <Unit value={pending ? "17" : c.days} label="дней" />
            <Separator />
            <Unit value={pending ? "00" : c.hours} label="часов" />
            <Separator />
            <Unit value={pending ? "00" : c.minutes} label="минут" />
            <Separator />
            <Unit value={pending ? "00" : c.seconds} label="секунд" seconds fraction={c.secondsFraction} />
          </div>
        </>
      )}
    </div>
  );
}

function Unit({
  value,
  label,
  seconds,
  fraction = 0,
}: {
  value: string;
  label: string;
  seconds?: boolean;
  fraction?: number;
}) {
  return (
    <div className={seconds ? "countdown__unit countdown__unit--seconds" : "countdown__unit"}>
      <div className="countdown__value font-display">{value}</div>
      <div className="countdown__label">{label}</div>
      {seconds && <div className="countdown__bar" style={cssVars({ "--f": fraction.toFixed(3) })} />}
    </div>
  );
}

function Separator() {
  return (
    <div className="countdown__sep" aria-hidden="true">
      <i />
      <i />
    </div>
  );
}
