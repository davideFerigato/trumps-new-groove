export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl sm:text-9xl font-cinzel-decorative font-extrabold gold-shimmer mb-6">
        404
      </div>
      <p className="text-xl text-gold-400 max-w-md">
        Even the Oracle doesn&apos;t know this page.
      </p>
      <p className="text-gold-600 mt-2">
        Perhaps it was sacrificed to the gods.
      </p>
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian font-cinzel-decorative uppercase rounded-lg hover:golden-glow transition-all"
      >
        Return to the Palace
      </a>
    </div>
  );
}