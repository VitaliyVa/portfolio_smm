"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const KOLLECT_ENDPOINT = "https://kollect.app/f/FMlY2pHUUw";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formElRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formElRef.current;
    if (!form || status === "submitting") return;

    const gotcha = (form.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    if (gotcha) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "",
    };

    try {
      const res = await fetch(KOLLECT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (res.ok && data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? `Помилка ${res.status}`);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Помилка мережі. Спробуйте пізніше.");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative border-t border-white/10 bg-black/60 py-24 md:py-32 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-xl px-6">
        <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">
          <AnimatedText as="span">Напишіть мені</AnimatedText>
        </h2>
        <p className="mx-auto mt-4 text-center text-[var(--muted)]">
          <AnimatedText as="span" className="block">
            Опишіть задачу — відповім і запропоную варіанти
          </AnimatedText>
        </p>
        <div ref={formRef} className="mt-12">
          {status === "success" && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">Повідомлення надіслано. Відповім найближчим часом!</p>
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{errorMsg}</p>
            </div>
          )}
          <form
            ref={formElRef}
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            {/* Honeypot for spam protection */}
            <input
              type="text"
              name="_gotcha"
              className="absolute -left-[9999px] opacity-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-[var(--muted)]">
                <AnimatedText as="span">Ім'я</AnimatedText>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ваше ім'я"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 backdrop-blur-sm focus:border-white/50 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-[var(--muted)]">
                <AnimatedText as="span">Email</AnimatedText>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email@example.com"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 backdrop-blur-sm focus:border-white/50 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-[var(--muted)]">
                <AnimatedText as="span">Повідомлення</AnimatedText>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Опишіть проєкт або питання..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 backdrop-blur-sm focus:border-white/50 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? (
                <span className="text-sm">Відправка...</span>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <AnimatedText as="span">Надіслати</AnimatedText>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
