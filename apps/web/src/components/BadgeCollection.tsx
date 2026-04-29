"use client";
import { trpc } from "@/lib/trpc/react";
import EmptyState from "./ui/EmptyState";
import Image from "next/image";

interface BadgeCollectionProps {
  userId: string;
}

export default function BadgeCollection({ userId }: BadgeCollectionProps) {
  const { data: badges, isLoading } = trpc.user.badges.useQuery();

  if (isLoading) return <p>Loading badges...</p>;
  if (!badges || badges.length === 0) return <EmptyState message="No badges yet. Start your journey!" />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <div key={badge.id} className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Image
            src={badge.imageUrl ?? "/images/badges/default.svg"}
            alt={badge.name}
            width={64}
            height={64}
            className="w-16 h-16 mb-2"
          />
          <span className="font-semibold text-sm">{badge.name}</span>
          <span className="text-xs text-gray-500">{badge.description}</span>
        </div>
      ))}
    </div>
  );
}
