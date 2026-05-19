import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return <UserProfile userId={userId} />;
}