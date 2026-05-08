import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@repo/db/client";
import { Redis } from "@upstash/redis";
import { env } from "@repo/config/env";

export async function createContext(opts: FetchCreateContextFnOptions) {

  const { userId } = getAuth(opts.req as any);
  return {
    userId,
    db,
    redis: new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    }),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;