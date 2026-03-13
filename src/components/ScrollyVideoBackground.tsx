"use client";

import { useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { assetUrl } from "@/lib/paths";

const ScrollyVideo = dynamic(
  () =>
    import("scrolly-video/dist/ScrollyVideo.esm.jsx").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div
        className="sticky top-0 h-screen w-full bg-black"
        style={{ minHeight: "100vh" }}
      />
    ),
  }
);

const VIDEO_SRC = assetUrl("/assets/spiral.webm");

/** Поріг px/ms — вище = швидкий скрол, збільшуємо transitionSpeed */
const FAST_SCROLL_THRESHOLD = 2;
/** transitionSpeed при швидкому скролі */
const FAST_TRANSITION_SPEED = 24;
const NORMAL_TRANSITION_SPEED = 8;
/** Тротл при скролі вгору (WebM без WebCodecs = seek кожного кадру = лаги) */
const SCROLL_UP_THROTTLE_MS = 90;

interface ScrollyVideoBackgroundProps {
  onReady?: () => void;
}

export default function ScrollyVideoBackground({ onReady }: ScrollyVideoBackgroundProps) {
  const scrollyRef = useRef<{ setVideoPercentage: (p: number, opts?: { transitionSpeed?: number; jump?: boolean }) => void } | null>(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const lastScrollUpUpdate = useRef(0);

  const handleScroll = useCallback(() => {
    const setVideoPercentage = scrollyRef.current?.setVideoPercentage;
    if (!setVideoPercentage) return;

    const container = document.querySelector("[data-scrolly-container]");
    if (!container?.parentElement) return;

    const rect = container.parentElement.getBoundingClientRect();
    const scrollRange = rect.height - window.innerHeight;
    if (scrollRange <= 0) return;

    const scrollPercent = Math.max(0, Math.min(1, -rect.top / scrollRange));
    const now = performance.now();
    const dt = now - lastScrollTime.current;
    const scrollDelta = window.scrollY - lastScrollY.current;
    const isScrollingUp = scrollDelta < 0;

    lastScrollY.current = window.scrollY;
    lastScrollTime.current = now;

    if (isScrollingUp) {
      if (now - lastScrollUpUpdate.current < SCROLL_UP_THROTTLE_MS) return;
      lastScrollUpUpdate.current = now;
      setVideoPercentage(scrollPercent, { transitionSpeed: NORMAL_TRANSITION_SPEED, jump: true });
      return;
    }

    const velocity = dt > 0 ? Math.abs(scrollDelta) / dt : 0;
    const isFastScroll = velocity > FAST_SCROLL_THRESHOLD;
    const transitionSpeed = isFastScroll ? FAST_TRANSITION_SPEED : NORMAL_TRANSITION_SPEED;
    const jump = isFastScroll && Math.abs(scrollDelta) > 80;

    setVideoPercentage(scrollPercent, { transitionSpeed, jump });
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();
    window.addEventListener("scroll", handleScroll, { passive: true });
    const init = () => requestAnimationFrame(handleScroll);
    init();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <ScrollyVideo
      {...({ ref: scrollyRef } as object)}
      src={VIDEO_SRC}
      sticky
      full
      cover
      trackScroll={false}
      transitionSpeed={NORMAL_TRANSITION_SPEED}
      onReady={onReady}
    />
  );
}
