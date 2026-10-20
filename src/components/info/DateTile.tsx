import { googleCalendarUrl, icsDataUrl } from "@/lib/calendar";
import { rise } from "@/lib/css";
import { dayAndMonth, yearAndWeekday } from "@/lib/format";
import { CalendarLink } from "./CalendarLink";

export function DateTile() {
  return (
    <div className="tile tile--date tile--interactive rise" style={rise(".65s")}>
      <div className="tile__label font-display">Дата</div>
      <div className="tile__body">
        <div className="tile__date font-display">{dayAndMonth()}</div>
        <div className="tile__year">{yearAndWeekday()}</div>
        <CalendarLink googleUrl={googleCalendarUrl()} icsUrl={icsDataUrl()} />
      </div>
    </div>
  );
}
