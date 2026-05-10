import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BetOnPhraseForm from "@/components/BetOnPhraseForm";

export default async function BetPage({
  searchParams,
}: {
  searchParams: Promise<{ phraseId?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const params = await searchParams;
  const phraseId = params.phraseId ? Number(params.phraseId) : null;

  if (!phraseId || isNaN(phraseId)) {
    return (
      <div className="text-center py-12">
        <p className="text-gold-600">No phrase selected.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <BetOnPhraseForm phraseId={phraseId} />
    </div>
  );
}