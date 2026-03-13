"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.body.addEventListener("mouseleave", onLeave);
    document.body.addEventListener("mouseenter", onEnter);

    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden
    >
      <svg
        className="-translate-x-1/2 -translate-y-1/2"
        width="28"
        height="28"
        viewBox="0 0 28 28"
      >
        <circle
          cx="14"
          cy="14"
          r="12"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          className="origin-center transition-transform duration-200 ease-out"
          style={{
            transform: pressed ? "scale(0.5)" : "scale(1)",
            animation: pressed ? "none" : "cursor-pulse 2s ease-in-out infinite",
          }}
        />
        <circle
          cx="14"
          cy="14"
          r="2"
          fill="white"
          className="origin-center transition-transform duration-200 ease-out"
          style={{
            transform: pressed ? "scale(0.6)" : "scale(1)",
          }}
        />
      </svg>
    </div>
  );
}
