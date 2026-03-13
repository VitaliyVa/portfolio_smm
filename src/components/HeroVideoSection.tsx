"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoSectionProps {
  loaderExited?: boolean;
}

export default function HeroVideoSection({ loaderExited = false }: HeroVideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      aria-label="Головний екран"
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10">
        <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          <AnimatedText as="span" playImmediately={loaderExited} className="block">
            Сайти та SMM
          </AnimatedText>
          <br />
          <span className="text-white/90">
            <AnimatedText as="span" playImmediately={loaderExited}>
              для вашого бізнесу
            </AnimatedText>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
          <AnimatedText as="span" playImmediately={loaderExited} className="block">
            Швидка розробка, ведення соцмереж і креатив під ваш проєкт
          </AnimatedText>
        </p>
        <a
          href="#contact"
          className="mt-10 inline-block rounded-full border-2 border-white/80 bg-white/10 px-8 py-3 text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          <AnimatedText as="span" playImmediately={loaderExited}>Зв&apos;язатися</AnimatedText>
        </a>
      </div>
    </section>
  );
}
