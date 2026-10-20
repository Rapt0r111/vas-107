import { event, fullAddress } from "@/config/event";

/** 2026-11-06T09:30:00+03:00 → 20261106T063000Z */
export const toUtcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");

const enc = encodeURIComponent;

export function googleCalendarUrl(): string {
  const params = [
    "action=TEMPLATE",
    `text=${enc(event.title)}`,
    `dates=${toUtcStamp(event.startsAt)}/${toUtcStamp(event.endsAt)}`,
    `details=${enc(event.description)}`,
    `location=${enc(fullAddress)}`,
  ];
  return `https://calendar.google.com/calendar/render?${params.join("&")}`;
}

const escapeText = (s: string) => s.replace(/[\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

/** RFC 5545: строки не длиннее 75 октетов, продолжение начинается с пробела. */
function fold(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let bytes = 0;
  let limit = 75;
  for (const ch of line) {
    const size = encoder.encode(ch).length;
    if (bytes + size > limit) {
      parts.push(current);
      current = "";
      bytes = 0;
      limit = 74; // ведущий пробел продолжения тоже считается
    }
    current += ch;
    bytes += size;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

export function buildIcs(): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VAS//107//RU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:vas-107-20261106@vas.invite",
    `DTSTAMP:${toUtcStamp(event.startsAt)}`,
    `DTSTART:${toUtcStamp(event.startsAt)}`,
    `DTEND:${toUtcStamp(event.endsAt)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(fullAddress)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Через час начало торжества",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

/** Ссылка-файл для Apple Календаря и любых клиентов, умеющих .ics. */
export const icsDataUrl = () => `data:text/calendar;charset=utf-8,${enc(buildIcs())}`;
