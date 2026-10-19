import { event } from "@/config/event";
import { rise } from "@/lib/css";

export function Slogan() {
  return (
    <footer className="slogan font-display rise" style={rise("2s")}>
      {event.slogan}
    </footer>
  );
}
