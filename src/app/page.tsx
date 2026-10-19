import { PointerParallax } from "@/components/effects/PointerParallax";
import { Hero } from "@/components/hero/Hero";
import { Info } from "@/components/info/Info";
import { Intro } from "@/components/intro/Intro";
import { Program } from "@/components/program/Program";
import { Slogan } from "@/components/ui/Slogan";

export default function Page() {
  return (
    <div className="page">
      <Intro />
      <main className="card">
        <Hero />
        <Info />
        <Program />
        <Slogan />
      </main>
      <PointerParallax />
    </div>
  );
}
