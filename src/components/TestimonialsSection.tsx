"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Дуже швидко зробили сайт під наш сервіс. Все зрозуміло, без зайвих питань. Рекомендую.",
    author: "Олена К.",
    role: "Засновниця сервісу",
  },
  {
    text: "Велике спасибі за ведення Instagram та контент. Відгуки та охоплення виросли помітно.",
    author: "Андрій М.",
    role: "Власник кав'ярні",
  },
  {
    text: "Від макету до запуску — один місяць. Сайт працює, заявки йдуть. Задоволений.",
    author: "Марія Т.",
    role: "Керівник стоматології",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.fromTo(
      track.parentElement,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const percent = (index * 100) / testimonials.length;
    gsap.to(track, {
      xPercent: -percent,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [index]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative border-t border-white/10 bg-black/60 py-24 md:py-32 backdrop-blur-sm overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">
          <AnimatedText as="span">Відгуки клієнтів</AnimatedText>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--muted)]">
          <AnimatedText as="span" className="block">
            Що кажуть ті, хто вже співпрацював
          </AnimatedText>
        </p>
        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full"
              style={{ width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map(({ text, author, role }) => (
                <div
                  key={author}
                  className="flex-shrink-0 px-2 md:px-4"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <blockquote className="relative rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm h-full">
                    <Quote className="absolute right-6 top-6 h-10 w-10 text-white/10" />
                    <p className="relative text-[var(--foreground)]/90 leading-relaxed">
                      <AnimatedText as="span" className="block">{text}</AnimatedText>
                    </p>
                    <footer className="mt-6">
                      <cite className="not-italic font-medium text-white">
                        <AnimatedText as="span">{author}</AnimatedText>
                      </cite>
                      <p className="text-sm text-[var(--muted)]">
                        <AnimatedText as="span" className="block">{role}</AnimatedText>
                      </p>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="rounded-full border border-white/20 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Попередній відгук"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Відгук ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="rounded-full border border-white/20 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Наступний відгук"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
