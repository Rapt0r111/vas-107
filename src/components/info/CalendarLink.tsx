"use client";

import { useSyncExternalStore } from "react";
import { PlusIcon } from "@/components/ui/icons";

const noopSubscribe = () => () => {};
// iPadOS в режиме «как на компьютере» называет себя Macintosh, но имеет тачскрин
const isApple = () =>
  /iP(hone|ad|od)/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);

type Props = { googleUrl: string; icsUrl: string };

/** Одна кнопка: на устройствах Apple отдаёт .ics (открывается в Календаре), везде остальное — Google Календарь. */
export function CalendarLink({ googleUrl, icsUrl }: Props) {
  const apple = useSyncExternalStore(noopSubscribe, isApple, () => false);

  return (
    <a
      className="tile__link stretch"
      href={apple ? icsUrl : googleUrl}
      {...(apple ? { download: "vas-107.ics" } : { target: "_blank", rel: "noopener noreferrer" })}
    >
      <PlusIcon />
      Добавить в календарь
    </a>
  );
}
