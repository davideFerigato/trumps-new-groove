import { Resend } from "resend";
import { env } from "@repo/config/env";

export const resend = new Resend(env.RESEND_API_KEY ?? "");