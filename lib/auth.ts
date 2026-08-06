import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type UserRole =
  | "admin"
  | "sales"
  | "manufacturer";

export interface AuthUser {
  id: string;

  name: string;

  role: UserRole;

  is_active: boolean;
}

/*
-----------------------------------------
Current Auth User
-----------------------------------------
*/

export async function requireAuth(): Promise<AuthUser> {

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const {
    data: profile,
    error,
  } =
    await supabase
      .from("profiles")
      .select(
        "name, role, is_active"
      )
      .eq("id", user.id)
      .single();

  if (
    error ||
    !profile
  ) {
    redirect("/login");
  }

  if (
    !profile.is_active
  ) {
    redirect("/login");
  }

  return {
    id: user.id,

    name: profile.name,

    role:
      profile.role as UserRole,

    is_active:
      profile.is_active,
  };

}

/*
-----------------------------------------
Role Guard
-----------------------------------------
*/

export async function requireRole(
  role: UserRole
) {

  console.log(
    "========== REQUIRE ROLE =========="
  );

  console.log(
    "Required Role:",
    role
  );

  const user = await requireAuth();

  console.log(
    "Authenticated User:",
    user
  );

  console.log(
    "User Role:",
    user.role
  );

  if (
    user.role !== role
  ) {

    console.log(
      "❌ Role Mismatch"
    );

    console.log(
      "Expected:",
      role
    );

    console.log(
      "Received:",
      user.role
    );

    console.log(
      "Redirecting to /"
    );

    redirect("/");

  }

  console.log(
    "✅ Role Authorized"
  );

  console.log(
    "==============================="
  );

  return user;

}

/*
-----------------------------------------
Helpers
-----------------------------------------
*/

export async function getCurrentUserId() {

  return (
    await requireAuth()
  ).id;

}

export async function getCurrentUserName() {

  return (
    await requireAuth()
  ).name;

}

export async function getCurrentUserRole() {

  return (
    await requireAuth()
  ).role;

}

export async function getCurrentProfile() {

  return await requireAuth();

}

/*
-----------------------------------------
Optional Role Helpers
-----------------------------------------
*/

export async function isAdmin() {

  return (
    (
      await requireAuth()
    ).role === "admin"
  );

}

export async function isSales() {

  return (
    (
      await requireAuth()
    ).role === "sales"
  );

}

export async function isManufacturer() {

  return (
    (
      await requireAuth()
    ).role ===
    "manufacturer"
  );

}

/*
---------------------------------------
Get Username By User ID
---------------------------------------
*/

export async function getUserNameById(
  id: string
): Promise<string | null> {

  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data.name;

}

/*
---------------------------------------
Get All Profiles As Map
---------------------------------------
*/

export async function getProfilesMap() {

  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("profiles")
    .select(
      "id, name, role, is_active"
    );

  if (error || !data) {
    return {};
  }

  return data.reduce(
    (map, profile) => {

      map[profile.id] = profile;

      return map;

    },
    {} as Record<
      string,
      {
        id: string;
        name: string;
        role: UserRole;
        is_active: boolean;
      }
    >
  );

}