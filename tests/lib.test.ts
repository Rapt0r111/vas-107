import { describe, expect, it } from "vitest";
import { buildIcs, googleCalendarUrl, icsDataUrl, toUtcStamp } from "@/lib/calendar";
import { event } from "@/config/event";
import { getCountdown } from "@/lib/countdown";
import { dayAndMonth, yearAndWeekday } from "@/lib/format";
import { yandexMapsUrl } from "@/lib/maps";
import { getPhase } from "@/lib/phase";
import { programStatus } from "@/lib/program";

const start = Date.parse(event.startsAt);

describe("countdown", () => {
  it("считает дни, часы, минуты и секунды", () => {
    const c = getCountdown(start, start - ((17 * 24 + 5) * 3600 + 42 * 60 + 9) * 1000);
    expect([c.days, c.hours, c.minutes, c.seconds]).toEqual(["17", "05", "42", "09"]);
    expect(c.secondsFraction).toBeCloseTo(9 / 60);
  });
  it("после начала не уходит в минус", () => {
    expect(getCountdown(start, start + 5000).totalSeconds).toBe(0);
  });
});

describe("calendar", () => {
  it("переводит МСК в UTC", () => {
    expect(toUtcStamp(event.startsAt)).toBe("20261106T063000Z");
    expect(toUtcStamp(event.endsAt)).toBe("20261106T140000Z");
  });
  it("ICS: CRLF, экранирование, строки не длиннее 75 октетов", () => {
    const ics = buildIcs();
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("DTSTART:20261106T063000Z");
    expect(ics.replace(/\r\n /g, "")).toContain("Тихорецкий проспект\\, 3");
    for (const line of ics.split("\r\n")) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    expect(decodeURIComponent(icsDataUrl().split(",")[1])).toBe(ics);
  });
  it("ссылка Google и карта содержат время и место", () => {
    expect(googleCalendarUrl()).toContain("dates=20261106T063000Z/20261106T140000Z");
    expect(decodeURIComponent(yandexMapsUrl())).toContain("Тихорецкий проспект, 3");
  });
});

describe("format", () => {
  it("дата по-русски", () => {
    expect(dayAndMonth()).toBe("6 ноября");
    expect(yearAndWeekday()).toBe("2026, пятница");
  });
});

describe("program", () => {
  const at = (hhmm: string) => Date.parse(`2026-11-06T${hhmm}:00+03:00`);
  it("до начала подсвечивает первый пункт, но он ещё не идёт", () => {
    expect(programStatus(at("08:00") - 86400000)).toEqual({ active: 0, live: false });
  });
  it("во время пункта он идёт, в паузе — ближайший следующий", () => {
    expect(programStatus(at("10:00"))).toEqual({ active: 0, live: true });
    expect(programStatus(at("10:25"))).toEqual({ active: 1, live: false });
    expect(programStatus(at("12:00"))).toEqual({ active: 2, live: true });
  });
  it("после последнего пункта подсветки нет", () => {
    expect(programStatus(at("17:00"))).toEqual({ active: -1, live: false });
  });
});

describe("phase", () => {
  it("до, во время и после торжества", () => {
    expect(getPhase(start - 1)).toBe("before");
    expect(getPhase(start)).toBe("live");
    expect(getPhase(Date.parse(event.endsAt))).toBe("after");
  });
});
