"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const splitIntoChars = (text: unknown): string[] =>
  (typeof text === "string" ? text : "").split("");

export type AnimatedTextProps = {
  children?: string | null;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
  triggerEl?: HTMLElement | null;
  start?: string;
  inline?: boolean;
  /** Якщо true — анімація запускається одразу, без ScrollTrigger */
  playImmediately?: boolean;
};

export default function AnimatedText({
  children,
  as: Tag = "span",
  className = "",
  triggerEl,
  start = "top bottom-=80",
  inline = true,
  playImmediately = false,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const letters = lettersRef.current.filter(Boolean);
    if (!container || !letters.length) return;

    gsap.set(letters, { opacity: 0, y: 20 });
    const tl = gsap.timeline({ paused: true });
    tl.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: "power2.out",
    });

    if (playImmediately) {
      tl.play();
      return;
    }

    const trigger = triggerEl ?? container.closest("section") ?? container;
    const st = ScrollTrigger.create({
      trigger,
      start,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
    };
  }, [children, triggerEl, start, playImmediately]);

  const chars = splitIntoChars(children);

  return (
    <Tag ref={containerRef as never} className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            lettersRef.current[i] = el;
          }}
          className={inline ? "inline-block" : ""}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
