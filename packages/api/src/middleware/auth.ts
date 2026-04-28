import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});

export const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
  // In produzione, verificare il ruolo con Clerk
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});