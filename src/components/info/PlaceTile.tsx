import { event } from "@/config/event";
import { rise } from "@/lib/css";
import { yandexMapsUrl } from "@/lib/maps";
import { ArrowIcon } from "@/components/ui/icons";

export function PlaceTile() {
  return (
    <div className="tile tile--place tile--interactive rise" style={rise(".75s")}>
      <div className="tile__label font-display">Место</div>
      <div className="tile__body tile__body--place">
        <div className="tile__venue">{event.venue}</div>
        <div className="tile__address">
          КПП: {event.streetShort}, <span className="nowrap">{event.city}</span>
        </div>
        <a className="tile__link stretch" href={yandexMapsUrl()} target="_blank" rel="noopener noreferrer">
          <ArrowIcon />
          Открыть на карте
        </a>
      </div>
    </div>
  );
}
