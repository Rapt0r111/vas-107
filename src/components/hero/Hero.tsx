import Image from "next/image";
import { event } from "@/config/event";
import { rise } from "@/lib/css";
import { Countdown } from "./Countdown";

export function Hero() {
  return (
    <section className="hero rise" style={rise("0s")}>
      <Image
        className="hero__wave"
        src="/brand/vas-wave-pattern.svg"
        alt=""
        width={12418}
        height={5142}
        unoptimized
        aria-hidden="true"
      />
      <div className="hero__chip font-display">
        {event.foundedYear}–{new Date(event.startsAt).getUTCFullYear()}
      </div>

      <div className="hero__num rise" style={rise(".15s", ".9s")}>
        <div className="hero__107 font-display">{event.anniversary}</div>
        <div className="hero__years font-display">лет</div>
      </div>

      <div className="hero__title rise" style={rise(".3s", ".9s")}>
        <div className="hero__eyebrow">со&nbsp;дня образования</div>
        <h1 className="hero__h1 font-display">Военная академия связи</h1>
        <Countdown startsAt={event.startsAt} />
      </div>

      <div className="hero__mark rise" style={rise(".45s", ".9s")}>
        <div className="ring" aria-hidden="true" />
        <div className="ring" aria-hidden="true" style={{ animationDelay: "1.8s" }} />
        <div className="ring" aria-hidden="true" style={{ animationDelay: "3.6s" }} />
        <Image
          src="/brand/vas-logo-white.svg"
          alt="Эмблема Военной академии связи"
          width={570}
          height={707}
          unoptimized
          loading="eager"
        />
      </div>
    </section>
  );
}
