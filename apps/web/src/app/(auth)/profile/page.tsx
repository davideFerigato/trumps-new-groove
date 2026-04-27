import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";

export default async function ProfilePage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  return <UserProfile userId={userId} />;
}