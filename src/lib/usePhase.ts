"use client";

import { getPhase, type Phase } from "@/lib/phase";
import { useNow } from "@/lib/useNow";

/** Пока время неизвестно (сервер, гидратация), считаем, что торжество впереди. */
export function usePhase(): Phase {
  const now = useNow();
  return now === 0 ? "before" : getPhase(now);
}
