"use client";
import TheButton from "@/components/TheButton";
import PhraseDisplay from "@/components/PhraseDisplay";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useT } from "@/hooks/useTranslation";

export default function HomePage() {
  const { t } = useT();

  return (
    <article className="flex flex-col items-center gap-8 py-12 px-4">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-cinzel-decorative font-extrabold gold-shimmer">
          {t("home.title")}
        </h1>
        <p className="mt-4 text-lg text-gold-400 italic">
          {t("home.subtitle")}
        </p>
      </section>
      <TheButton />
      <PhraseDisplay />
      <NewsletterSignup />
    </article>
  );
}