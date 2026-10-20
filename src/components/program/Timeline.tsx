"use client";

import { program } from "@/config/program";
import { rise } from "@/lib/css";
import { programStatus } from "@/lib/program";
import { useNow } from "@/lib/useNow";

export function Timeline() {
  const now = useNow();
  // Пока время неизвестно (сервер, гидратация), ничего не подсвечиваем
  const { active, live } = now === 0 ? { active: -1, live: false } : programStatus(now);
  const finished = now !== 0 && active === -1;

  return (
    <ol className="timeline">
      {program.map((item, i) => {
        const delay = `${(1.1 + i * 0.15).toFixed(2)}s`;
        const past = finished || (active !== -1 && i < active);
        const isActive = i === active;
        const itemClass = past ? "timeline__item timeline__item--past rise" : "timeline__item rise";
        const dotClass = isActive ? "timeline__dot timeline__dot--on" : past ? "timeline__dot timeline__dot--done" : "timeline__dot";
        return (
          <li key={item.time} className={itemClass} style={rise(delay, ".7s")}>
            <span className={dotClass} aria-hidden="true" />
            <div className="timeline__head">
              <div className="timeline__time">{item.time}</div>
              {isActive && live && <span className="timeline__live font-display">Идёт сейчас</span>}
            </div>
            <div className={item.key ? "timeline__title timeline__title--key" : "timeline__title"}>{item.title}</div>
          </li>
        );
      })}
    </ol>
  );
}
