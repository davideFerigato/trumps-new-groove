import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BettingForm from "@/components/BettingForm";

export default async function BettingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Place Your Bet</h1>
      <BettingForm />
    </div>
  );
}