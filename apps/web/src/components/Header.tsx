import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b bg-white dark:bg-gray-900">
      <h1 className="text-xl font-extrabold text-red-600">Trump's New Groove</h1>
      <div className="flex items-center gap-2">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
