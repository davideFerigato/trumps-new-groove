"use client";
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import SoundToggle from "./SoundToggle";
import { useT } from "@/hooks/useTranslation";

export default function Header() {
  const { userId } = useAuth();
  const { t } = useT();

  // Verifica se l'utente è admin (leggi da env pubblico)
  const adminIds = process.env.NEXT_PUBLIC_ADMIN_USER_IDS?.split(",").map(id => id.trim()) ?? [];
  const isAdmin = userId ? adminIds.includes(userId) : false;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-obsidian/80 border-b border-gold-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="TTNG" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          <span className="hidden sm:block text-sm sm:text-lg font-cinzel-decorative font-bold gold-shimmer">
            THE TRUMP&apos;S NEW GROOVE
          </span>
          <span className="sm:hidden text-sm font-cinzel-decorative gold-shimmer">TTNG</span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <SoundToggle />
          <DarkModeToggle />

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian font-cinzel-decorative text-sm uppercase rounded-lg hover:golden-glow transition-all">
                {t("header.signIn")}
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-2">
              <Link href="/profile" className="text-gold-400 hover:text-gold-300 text-sm font-cinzel-decorative uppercase">
                {t("header.profile")}
              </Link>
              <Link href="/betting" className="text-gold-400 hover:text-gold-300 text-sm font-cinzel-decorative uppercase">
                {t("header.betting")}
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-gold-400 hover:text-gold-300 text-sm font-cinzel-decorative uppercase">
                  {t("header.admin")}
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale } = useT();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      className="bg-obsidian border border-gold-600 text-gold-400 rounded px-2 py-1 text-sm font-cinzel-decorative"
    >
      <option value="en">EN</option>
      <option value="it">IT</option>
      <option value="fr">FR</option>
      <option value="es">ES</option>
      <option value="ja">日本語</option>
    </select>
  );
}