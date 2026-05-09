import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";

const adminIds = process.env.ADMIN_USER_IDS?.split(",").map(id => id.trim()) ?? [];

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  if (!adminIds.includes(userId)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-cinzel-decorative gold-shimmer mb-4">Access Denied</h1>
        <p className="text-gold-600">You are not authorized to view this page.</p>
      </div>
    );
  }

  return <AdminPanel />;
}