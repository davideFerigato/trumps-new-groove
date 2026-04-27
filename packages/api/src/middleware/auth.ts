import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});

export const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  // In production, check Clerk metadata for role.
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});