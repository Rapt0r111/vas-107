import Image from "next/image";

/** Короткая заставка: чистый CSS, сама скрывается через ~1,8 с (см. styles/intro.css). */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <Image src="/brand/vas-emblem.webp" alt="" width={600} height={746} unoptimized loading="eager" />
      <div className="intro__years font-display">{"107 лет"}</div>
      <div className="intro__bar" />
    </div>
  );
}
