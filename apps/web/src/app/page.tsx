import TheButton from "@/components/TheButton";
import PhraseDisplay from "@/components/PhraseDisplay";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function HomePage() {
  return (
    <article className="flex flex-col items-center gap-8 py-12">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-600 via-blue-600 to-yellow-500 bg-clip-text text-transparent">
          The Trump&apos;s New Groove
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Click the button to discover what absurd thing he just did.
        </p>
      </section>
      <TheButton />
      <PhraseDisplay />
      <NewsletterSignup />
    </article>
  );
}