import { trpc } from "@/lib/trpc/react";

export function useGlobalClicks() {
  return trpc.clicks.globalCount.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });
}
