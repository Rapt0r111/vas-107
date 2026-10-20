"use client";

import { useSyncExternalStore } from "react";
import { rise } from "@/lib/css";
import { usePhase } from "@/lib/usePhase";
import { ArrowIcon, PlusIcon } from "./icons";

const noopSubscribe = () => () => {};
const isIos = () => /iP(hone|ad|od)/.test(navigator.userAgent);

type Props = { googleUrl: string; icsUrl: string; mapUrl: string };

/** Закреплённые кнопки на телефоне. iPhone получает .ics (открывается в Календаре), остальные — Google. */
export function Dock({ googleUrl, icsUrl, mapUrl }: Props) {
  const ios = useSyncExternalStore(noopSubscribe, isIos, () => false);
  const phase = usePhase();
  if (phase === "after") return null;

  return (
    <nav className="dock rise" style={rise("1.2s")} aria-label="Быстрые действия">
      <a
        className="dock__btn dock__btn--primary"
        href={ios ? icsUrl : googleUrl}
        {...(ios ? { download: "vas-107.ics" } : { target: "_blank", rel: "noopener noreferrer" })}
      >
        <PlusIcon />В календарь
      </a>
      <a className="dock__btn" href={mapUrl} target="_blank" rel="noopener noreferrer">
        <ArrowIcon />
        Маршрут
      </a>
    </nav>
  );
}
