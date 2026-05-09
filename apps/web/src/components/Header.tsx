"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
//import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import SoundToggle from "./SoundToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-obsidian/80 border-b border-gold-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Simple golden llama icon (geometric, cartoonish) */}
          <img
            src="/images/logo.png"
            alt="Trump's New Groove Logo"
            width={40}
           height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
          <span className="hidden sm:block text-sm sm:text-lg font-cinzel-decorative font-bold gold-shimmer">
            THE TRUMP&apos;S NEW GROOVE
          </span>
          <span className="sm:hidden text-sm font-cinzel-decorative gold-shimmer">
            TTNG
          </span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <SoundToggle />
          <DarkModeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian font-cinzel-decorative text-sm uppercase rounded-lg hover:golden-glow transition-all">
                ENTER THE PALACE
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "ring-2 ring-gold-500 hover:ring-gold-300 transition-all",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}