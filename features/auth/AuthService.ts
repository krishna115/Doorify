import { createClient } from "@/utils/supabase/client";

import {
  LoginResult,
  UserProfile,
  UserRole,
} from "./auth.types";

export class AuthService {
  private static supabase = createClient();

  static async login(
    email: string,
    password: string
  ): Promise<LoginResult> {
    const { data, error } =
      await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw new Error(error.message);
    }

    const profile = await this.getProfile(
      data.user.id
    );

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      profile,
    };
  }

  static async logout() {
    const { error } =
      await this.supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  }

  static async getProfile(
    userId: string
  ): Promise<UserProfile> {
    const { data, error } =
      await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
      throw new Error("Unable to load your profile.");
    }

    return data as UserProfile;
  }

  static async getCurrentUser() {

  /*
  -----------------------------------------
  Get current Supabase session
  -----------------------------------------
  */

  const {
    session,
  } = await this.getSession();


  if (!session) {

    throw new Error(
      "No active session."
    );

  }


  /*
  -----------------------------------------
  Get user profile
  -----------------------------------------
  */

  const {
    data: profile,
    error,
  } = await this.supabase
    .from("profiles")
    .select(`
      id,
      name,
      role
    `)
    .eq(
      "id",
      session.user.id
    )
    .single();


  if (error) {

    console.error(
      "Failed to load current user profile:",
      error
    );

    throw new Error(
      "Unable to load your profile."
    );

  }


  /*
  -----------------------------------------
  Return user + profile
  -----------------------------------------
  */

  return {

    user: session.user,

    profile,

  };

}

  static getDashboard(
    role: UserRole
  ) {
    switch (role) {
      case "admin":
        return "/admin";

      case "sales":
        return "/sales";

      case "manufacturer":
        return "/manufacturer";

      default:
        return "/login";
    }
  }

 static async getSession() {

  const {
    data,
    error,
  } =
    await this.supabase.auth.getSession();

  if (error) {

    throw new Error(
      error.message
    );

  }

  return data;

}
}