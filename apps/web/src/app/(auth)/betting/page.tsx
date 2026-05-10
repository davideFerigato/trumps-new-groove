import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MyBetsList from "@/components/MyBetsList";

export default async function BettingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-cinzel-decorative gold-shimmer mb-6 text-center">Your Imperial Bets</h1>
      <MyBetsList />
    </div>
  );
}