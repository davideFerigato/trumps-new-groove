import { t } from "../trpc";
import { phrasesRouter } from "./phrases";
import { clicksRouter } from "./clicks";
import { betsRouter } from "./bets";
import { userRouter } from "./user";
import { newsletterRouter } from "./newsletter";
import { adminRouter } from "./admin";

// nel router finale
export const appRouter = t.router({
  phrases: phrasesRouter,
  clicks: clicksRouter,
  bets: betsRouter,
  user: userRouter,
  newsletter: newsletterRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;