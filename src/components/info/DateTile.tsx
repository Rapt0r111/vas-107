import { googleCalendarUrl, icsDataUrl, outlookCalendarUrl } from "@/lib/calendar";
import { rise } from "@/lib/css";
import { dayAndMonth, yearAndWeekday } from "@/lib/format";
import { PlusIcon } from "@/components/ui/icons";

export function DateTile() {
  return (
    <div className="tile tile--date tile--interactive rise" style={rise(".65s")}>
      <div className="tile__label font-display">Дата</div>
      <div className="tile__body">
        <div className="tile__date font-display">{dayAndMonth()}</div>
        <div className="tile__year">{yearAndWeekday()}</div>
        <a className="tile__link stretch" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
          <PlusIcon />
          Добавить в календарь
        </a>
        <div className="tile__alt">
          <span>Также:</span>
          <a className="tile__alt-link" href={icsDataUrl()} download="vas-107.ics">
            Apple и другие (.ics)
          </a>
          <a className="tile__alt-link" href={outlookCalendarUrl()} target="_blank" rel="noopener noreferrer">
            Outlook
          </a>
        </div>
      </div>
    </div>
  );
}
