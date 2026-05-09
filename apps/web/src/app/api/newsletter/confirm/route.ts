import { NextResponse } from "next/server";
import { appRouter } from "@repo/api/routers";
import { createContext } from "@repo/api/context";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token mancante" }, { status: 400 });
  }

  try {
    const ctx = await createContext({ req } as any);
    const caller = appRouter.createCaller(ctx);
    await caller.newsletter.confirm({ token });

    // Redirect alla pagina di successo
    return NextResponse.redirect(new URL("/newsletter/confirm/success", req.url));
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Token non valido" }, { status: 400 });
  }
}
