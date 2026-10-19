import { program } from "@/config/program";
import { rise } from "@/lib/css";

export function Program() {
  return (
    <section className="program rise" style={rise(".85s")}>
      <h2 className="program__heading font-display">Программа</h2>
      <ol className="timeline">
        {program.map((item, i) => {
          const delay = `${(1.1 + i * 0.15).toFixed(2)}s`;
          return (
            <li key={item.time} className="timeline__item rise" style={rise(delay, ".7s")}>
              <span className={item.key ? "timeline__dot timeline__dot--on" : "timeline__dot"} aria-hidden="true" />
              <div className="timeline__time">{item.time}</div>
              <div className={item.key ? "timeline__title timeline__title--key" : "timeline__title"}>{item.title}</div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
