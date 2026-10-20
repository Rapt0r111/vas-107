import { event } from "@/config/event";

export type Phase = "before" | "live" | "after";

/** Где мы относительно торжества: до начала, идёт, завершено. */
export function getPhase(nowMs: number): Phase {
  if (nowMs < Date.parse(event.startsAt)) return "before";
  return nowMs < Date.parse(event.endsAt) ? "live" : "after";
}
