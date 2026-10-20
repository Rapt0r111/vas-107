import { rise } from "@/lib/css";
import { Timeline } from "./Timeline";

export function Program() {
  return (
    <section className="program rise" style={rise(".85s")}>
      <h2 className="program__heading font-display">Программа</h2>
      <Timeline />
    </section>
  );
}
