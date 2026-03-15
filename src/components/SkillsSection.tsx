"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/AnimatedText";
import { Globe, Share2, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: Globe,
    title: "Розробка сайтів",
    desc: "Створюю сайти під ключ на платформах Wix та Weblium, адаптуючи їх під ваші потреби.",
  },
  {
    icon: Share2,
    title: "SMM-просування",
    desc: "Будую стратегії, створюю контент-плани та веду сторінки в Instagram, TikTok та Facebook.",
  },
  {
    icon: BarChart3,
    title: "Реклама",
    desc: "Налаштовую таргетовану та Google рекламу для залучення цільової аудиторії.",
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.children;
    if (!section || !cards?.length) return;

    gsap.fromTo(
      cards,
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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative border-t border-white/10 bg-black/60 py-24 md:py-32 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">
          <AnimatedText as="span">Чим займаюся</AnimatedText>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--muted)]">
          <AnimatedText as="span" className="block">
            Допомагаю бізнесу виходити онлайн та створюю інструменти, які перетворюють
            глядачів на клієнтів:
          </AnimatedText>
        </p>
        <div
          ref={cardsRef}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition hover:border-white/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-black/30 text-white">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-white">
                <AnimatedText as="span">{title}</AnimatedText>
              </h3>
              <p className="mt-2 text-[var(--muted)]">
                <AnimatedText as="span" className="block">{desc}</AnimatedText>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
