"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const casesList = [
  { src: "/assets/cases/case1.jpg", title: "Кейс 1", desc: "Опис проєкту та результатів" },
  { src: "/assets/cases/case2.jpg", title: "Кейс 2", desc: "Задача, рішення, метрики" },
  { src: "/assets/cases/case3.jpg", title: "Кейс 3", desc: "Повний цикл від ідеї до запуску" },
  { src: "/assets/cases/case4.jpg", title: "Кейс 4", desc: "SMM та контент-стратегія" },
  { src: "/assets/cases/case5.jpg", title: "Кейс 5", desc: "Ребрендинг та новий сайт" },
  { src: "/assets/cases/case6.jpg", title: "Кейс 6", desc: "Реклама та масштабування" },
];

export default function PortfolioCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current?.children;
    if (!section || !items?.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 30%",
          scrub: 1.5,
        },
      }
    );

    const triggers: ScrollTrigger[] = [];
    Array.from(items).forEach((article) => {
      const img = (article as HTMLElement).querySelector("img");
      if (img) {
        triggers.push(
          ScrollTrigger.create({
            trigger: article,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              gsap.set(img, {
                objectPosition: `50% ${self.progress * 100}%`,
              });
            },
          })
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio-cases"
      className="relative border-t border-white/10 bg-black/60 py-24 md:py-32 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">
          <AnimatedText as="span">Кейси</AnimatedText>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--muted)]">
          <AnimatedText as="span" className="block">
            Як ми досягли результатів разом із клієнтами
          </AnimatedText>
        </p>
        <div
          ref={itemsRef}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {casesList.map(({ src, title, desc }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm transition hover:border-white/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectPosition: "50% 0%" }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-medium text-white">
                  <AnimatedText as="span">{title}</AnimatedText>
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  <AnimatedText as="span" className="block">{desc}</AnimatedText>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
