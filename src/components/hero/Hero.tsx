import Image from "next/image";
import { event } from "@/config/event";
import { rise } from "@/lib/css";
import { Countdown } from "./Countdown";

export function Hero() {
  return (
    <section className="hero rise" style={rise("0s")}>
      <i className="hero__waves hero__waves--top" aria-hidden="true" />
      <i className="hero__waves hero__waves--bottom" aria-hidden="true" />

      <div className="hero__num rise" style={rise(".15s", ".9s")}>
        <div className="hero__107 font-display gold-text">{event.anniversary}</div>
        <div className="hero__years-row">
          <div className="hero__years font-display gold-text">лет</div>
          <div className="hero__eyebrow">со&nbsp;дня образования</div>
        </div>
      </div>

      <div className="hero__title rise" style={rise(".3s", ".9s")}>
        <h1 className="hero__h1 gold-text">Военная академия связи</h1>
        <Countdown startsAt={event.startsAt} />
      </div>

      <div className="hero__mark rise" style={rise(".45s", ".9s")}>
        <Image
          src="/brand/vas-emblem.webp"
          alt="Эмблема Военной академии связи"
          width={600}
          height={746}
          unoptimized
          loading="eager"
        />
      </div>
    </section>
  );
}
