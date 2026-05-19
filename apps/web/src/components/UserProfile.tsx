"use client";
import { trpc } from "@/lib/trpc/react";
import BadgeCollection from "./BadgeCollection";
import Skeleton from "./ui/Skeleton";
import ErrorMessage from "./ui/ErrorMessage";
import { useT } from "@/hooks/useTranslation";
import GdprRights from "./GdprRights";

export default function UserProfile({ userId }: { userId: string }) {
  const { t } = useT();
  const { data: profile, isLoading, isError, error } = trpc.user.profile.useQuery();

  if (isLoading) return <Skeleton className="h-48 w-full" />;
  if (isError) return <ErrorMessage message={error?.message || t("profile.loadingFailed")} />;
  if (!profile) return <p>{t("profile.noProfile")}</p>;

  return (
    <div className="space-y-8">
      {/* Solo Wallet Card */}
      <div className="flex justify-center">
        <div className="bg-surface-dark aztec-border p-8 rounded-xl w-full max-w-md text-center">
          <h2 className="text-2xl font-cinzel-decorative gold-shimmer mb-4">💰 {t("profile.trumpBucks")}</h2>
          <p className="text-5xl font-extrabold text-gold-400">{profile.trumpbucksBalance}</p>
          <p className="text-gold-600 mt-2">{t("profile.sacredTreasury")}</p>
        </div>
      </div>

      <BadgeCollection userId={userId} />
      <GdprRights />
    </div>
  );
}