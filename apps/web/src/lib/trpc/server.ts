import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers as nextHeaders } from "next/headers";
import { cache } from "react";
import { createTRPCContext } from "@repo/api/context"; // da adattare
import { appRouter, type AppRouter } from "@repo/api/routers";
import { createQueryClient } from "@trpc/react-query/ssr";

export const getQueryClient = cache(() => createQueryClient());

export const { trpc: serverTrpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  appRouter,
  async () => {
    const headers = await nextHeaders();
    const ctx = await createTRPCContext({ headers });
    return ctx; // adattare al contesto
  }
);