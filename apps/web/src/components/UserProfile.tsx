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
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Titolo del profilo (stile Admin/Bets) */}
      <h1 className="text-3xl sm:text-4xl font-cinzel-decorative gold-shimmer text-center mb-8">
        {t("profile.title")}
      </h1>

      {/* Wallet Card centrata */}
      <div className="flex justify-center mb-8">
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