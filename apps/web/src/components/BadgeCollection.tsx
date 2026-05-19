"use client";
import { trpc } from "@/lib/trpc/react";
import EmptyState from "./ui/EmptyState";
import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { useT } from "@/hooks/useTranslation";
import Image from "next/image";

// Mappa dal nome del badge al file SVG corrispondente
const badgeImages: Record<string, string> = {
  "First Click": "/images/badges/first-click.svg",
  "Click Addict": "/images/badges/click-addict.svg",
  "True Believer": "/images/badges/true-believer.svg",
  "Prophet": "/images/badges/prophet.svg",
  "Whale": "/images/badges/whale.svg",
};

export default function BadgeCollection({ userId }: { userId: string }) {
  const { t } = useT();
  const { data: badges, isLoading } = trpc.user.badges.useQuery();

  if (isLoading) return <p className="text-gold-600">{t("common.loading")}</p>;
  if (!badges || badges.length === 0)
    return (
      <EmptyState
        icon={Award}
        title={t("profile.noBadges")}
        description={t("profile.noBadgesDescription")}
      />
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <motion.div
          key={badge.id}
          whileHover={{ scale: 1.05 }}
          className="aztec-border bg-surface-dark p-4 rounded-lg text-center"
        >
          <div className="w-12 h-12 mx-auto text-gold-400 flex items-center justify-center">
            <Image
              src={badgeImages[badge.name] ?? "/images/badges/default.svg"}
              alt={badge.name}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h3 className="mt-2 font-cinzel-decorative text-gold-400 text-sm">{badge.name}</h3>
          <p className="text-gold-600 text-xs mt-1">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
}