import TheButton from "@/components/TheButton";
import PhraseDisplay from "@/components/PhraseDisplay";
import NewsletterSignup from "@/components/NewsletterSignup";
import GlobalClickCounter from "@/components/GlobalClickCounter";

export default function HomePage() {
  return (
    <article className="flex flex-col items-center gap-8 py-12 px-4">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-cinzel-decorative font-extrabold gold-shimmer">
          The Trump&apos;s New Groove
        </h1>
        <p className="mt-4 text-lg text-gold-400 italic">
          Where Every Decree is a Prophecy
        </p>
        <GlobalClickCounter />
      </section>
      <TheButton />
      <PhraseDisplay />
      <NewsletterSignup />
    </article>
  );
}