"use client";

import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";

import { assetUrl } from "@/lib/paths";

const MUSIC_SRC = assetUrl("/assets/kr-youll-never-know-t.ogg");

export interface BackgroundMusicHandle {
  play: () => Promise<void>;
  pause: () => void;
}

interface BackgroundMusicProps {
  onLoaded?: () => void;
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, BackgroundMusicProps>(
  function BackgroundMusic({ onLoaded }, ref) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      wasPlayingRef.current = true;
    } catch (e) {
      console.warn("BackgroundMusic play failed (iOS may require user gesture):", e);
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    wasPlayingRef.current = false;
  }, []);

  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.3;

    const handleCanPlay = () => onLoadedRef.current?.();
    const handleError = () => onLoadedRef.current?.();
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.load();

    audioRef.current = audio;
    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        wasPlayingRef.current = !audio.paused;
        audio.pause();
      } else if (wasPlayingRef.current) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useImperativeHandle(ref, () => ({ play, pause }), [play, pause]);

  return null;
});

export default BackgroundMusic;
