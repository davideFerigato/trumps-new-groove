"use client";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc/react";
import Skeleton from "./ui/Skeleton";

export default function GlobalClickCounter() {
  const { data: count, isLoading, refetch } = trpc.clicks.globalCount.useQuery();

  // Poll every 5 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => refetch(), 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <Skeleton variant="heading" className="w-48 mx-auto" />;

  const displayCount = count ?? 0;
  const sunGlyphs = Math.min(Math.floor(displayCount / 1000), 10);

  return (
    <div className="text-center my-8">
      <p className="text-sm font-uncial text-gold-400 uppercase tracking-widest mb-2">
        Total Prophecies Invoked
      </p>
      <span className="text-5xl sm:text-7xl font-cinzel-decorative font-extrabold gold-shimmer">
        {displayCount.toLocaleString()}
      </span>
      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: sunGlyphs }).map((_, i) => (
          <span key={i} className="text-2xl text-gold-500">⊙</span>
        ))}
      </div>
    </div>
  );
}