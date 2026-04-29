"use client";
import { trpc } from "@/lib/trpc/react";
import { motion } from "framer-motion";
import EmptyState from "./ui/EmptyState";

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = trpc.bets.leaderboard.useQuery();

  if (isLoading) return <p>Loading leaderboard...</p>;
  if (!leaderboard || leaderboard.length === 0) return <EmptyState message="No believers yet. Start clicking!" />;

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Top TrumpBucks Holders</h2>
      <ul className="space-y-2">
        {leaderboard.map((entry, index) => (
          <motion.li
            layout
            key={entry.userId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex justify-between items-center p-3 rounded bg-blue-50 dark:bg-blue-900/30"
          >
            <span className="font-semibold">
              {index + 1}. {entry.userId.slice(0, 8)}…
            </span>
            <span className="font-bold text-yellow-600">{entry.score} TrumpBucks</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
