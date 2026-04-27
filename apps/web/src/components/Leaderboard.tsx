"use client";
import { trpc } from "@/lib/trpc/react";
import { motion } from "framer-motion";
import { EmptyState } from "./ui/EmptyState";

export default function Leaderboard() {
  const { data } = trpc.bets.leaderboard.useQuery();
  if (!data?.length) return <EmptyState message="No believers yet. Start clicking!" />;
  return (
    <ul className="space-y-2">
      {data.map(([userId, score], i) => (
        <motion.li
          layout
          key={userId}
          className="flex justify-between p-3 rounded bg-blue-50 dark:bg-blue-900"
        >
          <span className="font-semibold">{i + 1}. {userId.slice(0, 8)}…</span>
          <span className="font-bold text-yellow-600">{score} TrumpBucks</span>
        </motion.li>
      ))}
    </ul>
  );
}