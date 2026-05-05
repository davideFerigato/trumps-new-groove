"use client";
import { trpc } from "@/lib/trpc/react";
import BadgeCollection from "./BadgeCollection";
import Skeleton from "./ui/Skeleton";
import ErrorMessage from "./ui/ErrorMessage";

export default function UserProfile({ userId }: { userId: string }) {
  const { data: profile, isLoading, isError, error } = trpc.user.profile.useQuery();

  if (isLoading) return <Skeleton className="h-48 w-full" />;
  if (isError) return <ErrorMessage message={error?.message || "Failed to load profile"} />;
  if (!profile) return <p>No profile found. Try clicking the button first!</p>;

  return (
    <div className="space-y-8">
      {/* Solo Wallet Card */}
      <div className="flex justify-center">
        <div className="bg-surface-dark aztec-border p-8 rounded-xl w-full max-w-md text-center">
          <h2 className="text-2xl font-cinzel-decorative gold-shimmer mb-4">💰 TrumpBucks</h2>
          <p className="text-5xl font-extrabold text-gold-400">{profile.trumpbucksBalance}</p>
          <p className="text-gold-600 mt-2">Your Sacred Treasury</p>
        </div>
      </div>

      <BadgeCollection userId={userId} />
    </div>
  );
}