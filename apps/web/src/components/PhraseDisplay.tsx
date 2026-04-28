"use client";
import { trpc } from "@/lib/trpc/react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "./ui/Skeleton";
import ErrorMessage from "./ui/ErrorMessage";
import EmptyState from "./ui/EmptyState";

export default function PhraseDisplay() {
  const { data: phrase, isLoading, isError, error } = trpc.phrases.random.useQuery();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Skeleton key="skeleton" className="h-12 w-80 rounded-lg" />
      ) : isError ? (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <ErrorMessage message={error?.message || "Failed to load phrase"} />
        </motion.div>
      ) : phrase ? (
        <motion.blockquote
          key={phrase.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-2xl font-bold text-center max-w-xl italic border-l-4 border-yellow-500 pl-4"
        >
          “{phrase.text}”
        </motion.blockquote>
      ) : (
        <EmptyState key="empty" message="No phrase available. Click the button!" />
      )}
    </AnimatePresence>
  );
}
