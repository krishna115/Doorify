import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in
  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // No profile found
  if (!profile) {
    redirect("/login");
  }

  switch (profile.role) {
    case "admin":
      redirect("/admin");

    case "sales":
      redirect("/sales");

    case "manufacturer":
      redirect("/manufacturer");

    default:
      redirect("/login");
  }
}