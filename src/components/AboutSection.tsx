"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { assetUrl } from "@/lib/paths";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      avatarRef.current,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 40%",
          scrub: 1.5,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative border-t border-white/10 bg-black/60 py-24 md:py-32 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          <div
            ref={avatarRef}
            className="flex justify-center md:justify-end"
          >
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-white/20 bg-black/40 backdrop-blur-sm">
              <Image
                src={assetUrl("/assets/me.jpg")}
                alt="Автор портфоліо"
                fill
                className="object-cover"
                sizes="192px"
                priority
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              <AnimatedText as="span">Про мене</AnimatedText>
            </h2>
            <div className="mt-6 space-y-4 text-[var(--muted)]">
              <p className="text-lg leading-relaxed">
                <AnimatedText as="span" className="block">
                  Привіт, я Софія! Допомагаю малому та великому бізнесу ставати
                  помітними та успішними у маркетингу.
                </AnimatedText>
              </p>
              <p className="leading-relaxed">
                <AnimatedText as="span" className="block">
                  Я впевнена, що кожен проєкт має бути не лише функціональним, але й
                  приємним для користувача. Тому в кожній роботі для мене важлива
                  увага до деталей та готовність підлаштуватися під ваші цілі.
                  Працюю швидко і зрозуміло — без зайвого жаргону.
                </AnimatedText>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
