import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <UserProfile userId={userId} />
    </div>
  );
}