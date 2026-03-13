"use client";

import { useEffect, useState } from "react";

interface PageLoaderProps {
  /** When false, plays exit animation then calls onExit */
  visible: boolean;
  onExit?: () => void;
  /** Коли true — показує "Натисніть щоб продовжити", тап викликає onTapToContinue (для iOS unlock) */
  readyForTap?: boolean;
  onTapToContinue?: () => void;
}

export default function PageLoader({ visible, onExit, readyForTap, onTapToContinue }: PageLoaderProps) {
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (!visible && mounted) {
      setExiting(true);
    }
  }, [visible, mounted]);

  const handleAnimationEnd = () => {
    if (exiting) {
      setMounted(false);
      onExit?.();
    }
  };

  useEffect(() => {
    if (visible) setMounted(true);
  }, [visible, exiting]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  const handleTap = () => {
    if (readyForTap && onTapToContinue && !exiting) onTapToContinue();
  };

  return (
    <div
      role={readyForTap ? "button" : undefined}
      tabIndex={readyForTap ? 0 : undefined}
      onClick={handleTap}
      onKeyDown={(e) => readyForTap && (e.key === "Enter" || e.key === " ") && handleTap()}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-500 ${
        exiting ? "pointer-events-none opacity-0 scale-110" : "opacity-100 scale-100"
      } ${readyForTap ? "cursor-pointer" : ""}`}
      onTransitionEnd={exiting ? handleAnimationEnd : undefined}
      aria-hidden={exiting}
      aria-busy={!exiting}
      aria-label={readyForTap ? "Натисніть щоб продовжити" : undefined}
    >
      {/* Outer track circle */}
      <div className="relative">
        <svg
          className="h-32 w-32 -rotate-90 sm:h-40 sm:w-40"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="276.5"
            strokeDashoffset="276.5"
            style={
              exiting
                ? undefined
                : { animation: "loader-draw 1.8s ease-in-out infinite" }
            }
          />
        </svg>
        {/* Inner dot that pulses */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            exiting ? "" : "animate-loader-pulse"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2" />
        </div>
      </div>

      <p
        className={`mt-8 text-sm tracking-[0.35em] uppercase ${
          exiting ? "" : "animate-loader-fade"
        } ${readyForTap ? "text-white/80" : "text-white/50"}`}
      >
        {readyForTap ? "Натисніть щоб продовжити" : "Завантаження"}
      </p>
    </div>
  );
}
