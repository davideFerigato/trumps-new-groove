import Link from "next/link";

export default function ConfirmSuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-surface-dark aztec-border p-8 rounded-xl max-w-md">
        <div className="text-6xl mb-4">📬</div>
        <h1 className="text-3xl font-cinzel-decorative gold-shimmer mb-4">
          Subscription Confirmed!
        </h1>
        <p className="text-gold-400 mb-6">
          You are now a True Believer. The Emperor’s dispatches will reach your inbox.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian font-cinzel-decorative uppercase rounded-lg hover:golden-glow transition-all"
        >
          Return to the Palace
        </Link>
      </div>
    </div>
  );
}
