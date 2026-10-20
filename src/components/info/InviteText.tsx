"use client";

import { event } from "@/config/event";
import { dayAndMonth } from "@/lib/format";
import { usePhase } from "@/lib/usePhase";

export function InviteText() {
  const phase = usePhase();
  const year = new Date(event.startsAt).getUTCFullYear();

  return (
    <p className="invite__text">
      {phase === "after"
        ? `Торжественные мероприятия, посвящённые ${event.anniversary} годовщине со дня образования академии, состоялись ${dayAndMonth().replace(" ", "\u00A0")} ${year} года.`
        : `Приглашаем Вас на торжественное мероприятие, посвящённое ${event.anniversary} годовщине со дня образования академии.`}
    </p>
  );
}
