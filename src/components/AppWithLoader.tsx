"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ScrollyVideoBackground from "@/components/ScrollyVideoBackground";
import PageLoader from "@/components/PageLoader";
import BackgroundMusic from "@/components/BackgroundMusic";
import Header from "@/components/Header";
import HeroVideoSection from "@/components/HeroVideoSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSitesSection from "@/components/PortfolioSitesSection";
import PortfolioCasesSection from "@/components/PortfolioCasesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const LOADER_MAX_MS = 10000;
/** Затримка після onReady відео */
const READY_DELAY_MS = 300;

export default function AppWithLoader() {
  const [videoReady, setVideoReady] = useState(false);
  const [musicLoaded, setMusicLoaded] = useState(false);
  const [userUnlocked, setUserUnlocked] = useState(false);
  const [loaderExited, setLoaderExited] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicRef = useRef<{ play: () => Promise<void>; pause: () => void } | null>(null);

  const allReady = videoReady && musicLoaded;

  const handleVideoReady = useCallback(() => {
    setTimeout(() => setVideoReady(true), READY_DELAY_MS);
  }, []);

  const handleLoaderExit = useCallback(() => {
    setLoaderExited(true);
    const hero = document.getElementById("hero");
    hero?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleTapToContinue = useCallback(() => {
    setUserUnlocked(true);
    musicRef.current?.play().then(() => setIsMusicPlaying(true));
  }, []);

  const handleMusicToggle = useCallback(() => {
    if (isMusicPlaying) {
      musicRef.current?.pause();
      setIsMusicPlaying(false);
    } else {
      setUserUnlocked(true);
      musicRef.current?.play().then(() => setIsMusicPlaying(true));
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setVideoReady(true);
      setMusicLoaded(true);
    }, LOADER_MAX_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <BackgroundMusic ref={musicRef} onLoaded={() => setMusicLoaded(true)} />
      <div className="relative">
        <ScrollyVideoBackground onReady={handleVideoReady} />
        <Header
          isMusicPlaying={isMusicPlaying}
          onMusicToggle={handleMusicToggle}
        />
        <main className="relative z-10">
          <HeroVideoSection loaderExited={loaderExited} />
          <AboutSection />
          <SkillsSection />
          <PortfolioSitesSection />
          <PortfolioCasesSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <footer className="relative z-10 border-t border-white/10 bg-zinc-900/95 py-8 text-center text-sm text-white/70 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-6">
            © {new Date().getFullYear()} Портфоліо. Всі права захищені.
          </div>
        </footer>
      </div>
      <PageLoader
        visible={!allReady || !userUnlocked}
        onExit={handleLoaderExit}
        readyForTap={allReady && !userUnlocked}
        onTapToContinue={handleTapToContinue}
      />
    </>
  );
}
