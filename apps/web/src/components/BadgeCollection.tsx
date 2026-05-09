"use client";
import { trpc } from "@/lib/trpc/react";
import EmptyState from "./ui/EmptyState";
import { Award } from "lucide-react";
import { motion } from "framer-motion";

//const badgeIcons: Record<string, string> = {
//  "First Click": "Feather",
//  "Click Addict": "Zap",
//  "True Believer": "Mail",
//  Prophet: "Eye",
//  Whale: "Crown",
//};

export default function BadgeCollection({ userId: _userId }: { userId: string }) {
  const { data: badges, isLoading } = trpc.user.badges.useQuery();

  if (isLoading) return <p className="text-gold-600">Loading...</p>;
  if (!badges || badges.length === 0)
    return (
      <EmptyState
        icon={Award}
        title="No honors yet"
        description="Consult the oracle to begin your legacy."
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
            {/* Use Lucide icon based on badge name */}
            <span className="text-3xl">🏅</span>
          </div>
          <h3 className="mt-2 font-cinzel-decorative text-gold-400 text-sm">{badge.name}</h3>
          <p className="text-gold-600 text-xs mt-1">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
}