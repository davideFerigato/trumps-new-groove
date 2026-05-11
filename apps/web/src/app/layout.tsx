import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/lib/trpc/react";
import { LanguageProvider } from "@/hooks/useTranslation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
  signInFallbackRedirectUrl="/"
  appearance={{
    variables: {
      colorPrimary: '#eab308',           // oro principale
      colorBackground: '#3d1f00',        // marrone più chiaro di obsidian
      colorInputBackground: '#2d1500',   // input leggermente più scuro
      colorInputText: '#fef9c3',
      colorText: '#fef9c3',
      colorTextSecondary: '#ca8a04',
      borderRadius: '0.5rem',
      fontFamily: 'Cinzel, serif',
    },
    elements: {
      card: 'shadow-[0_0_40px_rgba(234,179,8,0.2)] border border-yellow-600/30',
      formButtonPrimary: 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-obsidian font-cinzel',
      socialButtonsBlockButton: 'bg-opacity-50 hover:bg-opacity-70',
    },
  }}
>
      <html lang="en" data-theme="dark" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
          <LanguageProvider>
            <TRPCProvider>
              <Header />
              <main className="mx-auto">{children}</main>
              <Footer />
            </TRPCProvider>
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}