"use client";
import { trpc } from "@/lib/trpc/react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "./ui/Skeleton";

export default function PhraseDisplay() {
  const { data, isLoading, error } = trpc.phrases.random.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Skeleton className="h-12 w-80 rounded-lg" />
      ) : error ? (
        <motion.p
          key="error"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-red-500"
        >
          Could not summon prophecy right now.
        </motion.p>
      ) : data ? (
        <motion.blockquote
          key={data.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-2xl font-bold text-center max-w-xl italic border-l-4 border-yellow-500 pl-4"
        >
          “{data.text}”
        </motion.blockquote>
      ) : null}
    </AnimatePresence>
  );
}