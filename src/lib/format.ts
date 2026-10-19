import { event } from "@/config/event";

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("ru-RU", { timeZone: event.timeZone, ...opts }).format(new Date(event.startsAt));

/** «6 ноября» */
export const dayAndMonth = () => fmt({ day: "numeric", month: "long" });
/** «2026, пятница» */
export const yearAndWeekday = () => `${fmt({ year: "numeric" })}, ${fmt({ weekday: "long" })}`;
