"use client";
import { trpc } from "@/lib/trpc/react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "./ui/Skeleton";
import ErrorMessage from "./ui/ErrorMessage";
import EmptyState from "./ui/EmptyState";
import { ScrollText } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useT } from "@/hooks/useTranslation";

export default function PhraseDisplay() {
  const { t } = useT();
  const { isSignedIn } = useAuth();
  const { data: phrase, isLoading, isError, error, refetch } = trpc.phrases.random.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="max-w-2xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            <Skeleton variant="text" className="w-full h-6" />
            <Skeleton variant="text" className="w-3/4 h-6 mx-auto" />
          </motion.div>
        ) : isError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <ErrorMessage
              message={error?.message || t("home.theOracleError")}
              onRetry={() => refetch()}
            />
          </motion.div>
        ) : phrase ? (
          <motion.blockquote
            key={phrase.id}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative bg-surface-dark aztec-border p-8 rounded-xl"
          >
            <p className="text-xl sm:text-2xl font-cinzel text-bone-white leading-relaxed text-center italic">
              “{phrase.text}”
            </p>
            <div className="flex justify-center mt-6">
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold-500">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
                <text x="20" y="26" textAnchor="middle" fontSize="14" fill="currentColor" fontFamily="serif">
                  D
                </text>
              </svg>
            </div>

            {/* Pulsante per scommettere (solo se autenticato) */}
            {isSignedIn && (
              <div className="mt-6 text-center">
                <Link
                  href={`/bet?phraseId=${phrase.id}`}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian font-cinzel-decorative uppercase text-sm rounded-lg hover:golden-glow transition-all"
                >
                  {t("home.betOnThis")}
                </Link>
              </div>
            )}
          </motion.blockquote>
        ) : (
          <EmptyState
            icon={ScrollText}
            title={t("home.pressButton")}
            description={t("home.oracleDescription")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}