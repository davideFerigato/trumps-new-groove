"use client";
import { useGlobalClicks } from "@/hooks/useGlobalClicks";

export default function GlobalClickCounter() {
  const { data: count, isLoading } = useGlobalClicks();

  return (
    <p className="text-lg font-semibold text-yellow-500">
      {isLoading ? "..." : `Total worldwide clicks: ${count ?? 0}`}
    </p>
  );
}
