"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/AnimatedText";
import { assetUrl } from "@/lib/paths";

gsap.registerPlugin(ScrollTrigger);

const sites = [
  { src: assetUrl("/assets/sites/site1.jpg"), title: "Сайт 1", tag: "Лендинг" },
  { src: assetUrl("/assets/sites/site2.jpg"), title: "Сайт 2", tag: "Корпоративний" },
  { src: assetUrl("/assets/sites/site3.jpg"), title: "Сайт 3", tag: "E-commerce" },
];

export default function PortfolioSitesSection() {
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

    const tweens: gsap.core.Tween[] = [];
    Array.from(items).forEach((article) => {
      const img = (article as HTMLElement).querySelector("img");
      if (img) {
        const tween = gsap.fromTo(
          img,
          { objectPosition: "50% 0%" },
          {
            objectPosition: "50% 100%",
            duration: 8,
            ease: "none",
            repeat: -1,
          }
        );
        tweens.push(tween);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio-sites"
      className="relative border-t border-white/10 bg-black/60 py-24 md:py-32 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">
          <AnimatedText as="span">Сайти</AnimatedText>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--muted)]">
          <AnimatedText as="span">Приклади реалізованих проєктів</AnimatedText>
        </p>
        <div
          ref={itemsRef}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sites.map(({ src, title, tag }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm transition hover:border-white/30"
            >
              <div className="relative aspect-video overflow-hidden bg-black/30">
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
                <span className="text-sm text-[var(--muted)]">{tag}</span>
                <h3 className="mt-1 text-lg font-medium text-white">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
