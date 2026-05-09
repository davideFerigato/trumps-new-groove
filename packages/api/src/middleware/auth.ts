import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

const adminIds = process.env.ADMIN_USER_IDS?.split(",").map(id => id.trim()) ?? [];

export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});

export const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  if (!adminIds.includes(ctx.userId)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});