import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Портфоліо | Сайти та SMM для бізнесу",
  description:
    "Швидка розробка сайтів для бізнесу, ведення соцмереж, креативні рішення під ваш проєкт.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={outfit.variable}>
      <body className="font-sans antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
