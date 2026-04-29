"use client";
import { trpc } from "@/lib/trpc/react";
import BadgeCollection from "./BadgeCollection";
import Skeleton from "./ui/Skeleton";

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const { data: profile, isLoading } = trpc.user.profile.useQuery();

  if (isLoading) return <Skeleton className="h-48 w-full" />;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">💰 Wallet</h2>
          <p className="text-3xl font-extrabold text-yellow-600">{profile.trumpbucksBalance} TrumpBucks</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">🖱️ Total Clicks</h2>
          <p className="text-3xl font-extrabold">{profile.totalClicks}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">🏅 Badges</h2>
        <BadgeCollection userId={userId} />
      </div>
    </div>
  );
}
