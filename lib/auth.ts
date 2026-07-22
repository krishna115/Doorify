import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type UserRole = "admin" | "sales" | "manufacturer";

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  is_active: boolean;
}

export async function requireAuth(): Promise<AuthUser> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name, role, is_active")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/login");
  }

  if (!profile.is_active) {
    redirect("/login");
  }

  return {
    id: user.id,
    name: profile.name,
    role: profile.role as UserRole,
    is_active: profile.is_active,
  };
}

export async function requireRole(role: UserRole) {
  const user = await requireAuth();

  if (user.role !== role) {
    redirect("/");
  }

  return user;
}