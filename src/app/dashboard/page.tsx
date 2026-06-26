import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const rolesResult = await getRoles();
  const roles = Array.isArray(rolesResult) ? rolesResult : [];
  const roleKeys = roles.map((r: { key: string }) => r.key?.toLowerCase());
  const isAdmin = roleKeys.includes("admin");
  const isTutor = roleKeys.includes("tutor");

  if (isAdmin) redirect("/dashboard/admin");
  if (isTutor) redirect("/dashboard/tutor");
  redirect("/dashboard/parent");
}
