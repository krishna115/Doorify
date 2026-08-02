"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  createClient,
} from "@/utils/supabase/client";

import type {
  AuthUser,
  UserRole,
} from "@/lib/auth";

interface AuthContextValue {

  user: AuthUser | null;

  loading: boolean;

  refresh: () => Promise<void>;

  logout: () => Promise<void>;

}

export const AuthContext =
  createContext<AuthContextValue | null>(
    null
  );

interface Props {

  children: ReactNode;

}

export function AuthProvider({
  children,
}: Props) {

  const [user, setUser] =
    useState<AuthUser | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const supabase =
    createClient();

  const loadUser =
    useCallback(async () => {

      try {

        setLoading(true);

        const {
          data: {
            user: authUser,
          },
        } =
          await supabase.auth.getUser();

        if (!authUser) {

          setUser(null);

          return;

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
            .eq(
              "id",
              authUser.id
            )
            .single();

        if (
          error ||
          !profile
        ) {

          setUser(null);

          return;

        }

        setUser({

          id: authUser.id,

          name: profile.name,

          role:
            profile.role as UserRole,

          is_active:
            profile.is_active,

        });

      } finally {

        setLoading(false);

      }

    }, [supabase]);

  useEffect(() => {

    loadUser();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        () => {

          loadUser();

        }
      );

    return () => {

      listener.subscription.unsubscribe();

    };

  }, [loadUser, supabase]);

  async function logout() {

    await supabase.auth.signOut();

    setUser(null);

  }

  return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        refresh:
          loadUser,

        logout,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}