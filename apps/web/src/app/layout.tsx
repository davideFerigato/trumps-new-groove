import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/lib/trpc/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
  signInFallbackRedirectUrl="/"
  appearance={{
    variables: {
      colorPrimary: '#eab308',
      colorBackground: '#2d1500',
      colorInputBackground: '#1a0a00',
      colorInputText: '#fef9c3',
      colorText: '#fef9c3',
      colorTextSecondary: '#ca8a04',
      borderRadius: '0.5rem',
      fontFamily: 'Cinzel, serif',
    },
  }}
>
      <html lang="en" data-theme="dark" suppressHydrationWarning>
        <body className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
          <TRPCProvider>
            <Header />
            <main className="mx-auto">{children}</main>
            <Footer />
          </TRPCProvider>
        </body>
      </html>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
    </ClerkProvider>
  );
}