import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/lib/trpc/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
          <TRPCProvider>
            <Header />
            <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
            <Footer />
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}