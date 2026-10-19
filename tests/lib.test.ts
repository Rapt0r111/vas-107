import { describe, expect, it } from "vitest";
import { buildIcs, googleCalendarUrl, icsDataUrl, outlookCalendarUrl, toUtcStamp } from "@/lib/calendar";
import { event } from "@/config/event";
import { getCountdown } from "@/lib/countdown";
import { dayAndMonth, yearAndWeekday } from "@/lib/format";
import { yandexMapsUrl } from "@/lib/maps";

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
  it("ссылки Google и Outlook содержат время и место", () => {
    expect(googleCalendarUrl()).toContain("dates=20261106T063000Z/20261106T140000Z");
    expect(outlookCalendarUrl()).toContain("startdt=2026-11-06T09%3A30%3A00%2B03%3A00");
    expect(decodeURIComponent(yandexMapsUrl())).toContain("Тихорецкий проспект, 3");
  });
});

describe("format", () => {
  it("дата по-русски", () => {
    expect(dayAndMonth()).toBe("6 ноября");
    expect(yearAndWeekday()).toBe("2026, пятница");
  });
});
