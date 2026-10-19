import Image from "next/image";

/** Короткая заставка: чистый CSS, сама скрывается через ~1,8 с (см. styles/intro.css). */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <Image src="/brand/vas-logo-white.svg" alt="" width={570} height={707} unoptimized loading="eager" />
      <div className="intro__years font-display">{"107 лет"}</div>
      <div className="intro__bar" />
    </div>
  );
}
