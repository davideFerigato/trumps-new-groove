import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/profile(.*)", "/betting(.*)", "/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  console.log("⚡ Middleware in esecuzione su:", req.nextUrl.pathname);
  if (isProtected(req)) {
    console.log("🔒 Rotta protetta, richiamo auth.protect()");
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Matcha tutte le richieste tranne statici, _next, e le route di autenticazione
    "/((?!_next|sign-in|sign-up|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Matcha esplicitamente api e trpc
    "/(api|trpc)(.*)",
  ],
};
