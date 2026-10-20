import { event } from "@/config/event";
import { program } from "@/config/program";

/** «09:30–10:20» → [начало, конец] в мс (дата и пояс берутся из события). */
function bounds(time: string): [number, number] {
  const day = event.startsAt.slice(0, 10);
  const offset = event.startsAt.slice(-6);
  const [from, to] = time.split("–");
  return [Date.parse(`${day}T${from}:00${offset}`), Date.parse(`${day}T${to}:00${offset}`)];
}

export type ProgramStatus = {
  /** Индекс идущего сейчас или ближайшего пункта; −1, если всё закончилось. */
  active: number;
  /** Пункт `active` идёт прямо сейчас (а не только ожидается). */
  live: boolean;
};

export function programStatus(nowMs: number): ProgramStatus {
  const active = program.findIndex((item) => bounds(item.time)[1] > nowMs);
  return { active, live: active >= 0 && bounds(program[active].time)[0] <= nowMs };
}
