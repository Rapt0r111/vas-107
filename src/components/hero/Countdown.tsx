"use client";

import { getCountdown } from "@/lib/countdown";
import { cssVars } from "@/lib/css";
import { dayAndMonth } from "@/lib/format";
import { getPhase } from "@/lib/phase";
import { useNow } from "@/lib/useNow";

type Props = { startsAt: string };

export function Countdown({ startsAt }: Props) {
  const current = useNow();
  const pending = current === 0;
  const phase = pending ? "before" : getPhase(current);

  if (phase !== "before") return <Announcement phase={phase} />;

  const c = getCountdown(Date.parse(startsAt), pending ? Date.parse(startsAt) : current);

  return (
    <div className="countdown" role="timer" aria-label="Время до начала торжества" data-pending={pending || undefined}>
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
    </div>
  );
}

/** Вместо отсчёта: торжество идёт или уже завершилось. */
function Announcement({ phase }: { phase: "live" | "after" }) {
  const live = phase === "live";
  return (
    <div className="countdown" role="status">
      <span className="countdown__caption font-display">
        {live ? `Сегодня, ${dayAndMonth()}` : "Торжественные мероприятия завершены"}
      </span>
      <div className="announce">
        {live && <span className="announce__dot" aria-hidden="true" />}
        <span className="announce__text font-display">
          {live ? "Торжественные мероприятия идут прямо сейчас" : `Спасибо, что были с нами`}
        </span>
      </div>
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
      {/* key пересоздаёт узел при смене секунды и заново запускает короткий «переворот» */}
      <div key={seconds ? value : undefined} className={seconds ? "countdown__value countdown__value--tick font-display" : "countdown__value font-display"}>
        {value}
      </div>
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
