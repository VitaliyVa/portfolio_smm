"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "Про мене" },
  { href: "#skills", label: "Навички" },
  { href: "#portfolio-sites", label: "Сайти" },
  // { href: "#portfolio-cases", label: "Кейси" },
  { href: "#testimonials", label: "Відгуки" },
  { href: "#contact", label: "Контакт" },
];

interface HeaderProps {
  isMusicPlaying?: boolean;
  onMusicToggle?: () => void;
}

export default function Header({ isMusicPlaying = false, onMusicToggle }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="text-lg font-medium text-white transition hover:text-white/80"
        >
          Портфоліо
        </Link>
        <div className="flex items-center gap-2 md:gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-white/80 transition hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {onMusicToggle && (
            <button
            type="button"
            onClick={onMusicToggle}
            className="flex items-center justify-center rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label={isMusicPlaying ? "Вимкнути музику" : "Увімкнути музику"}
          >
            {isMusicPlaying ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
          </button>
          )}
        </div>
      </nav>
    </header>
  );
}
