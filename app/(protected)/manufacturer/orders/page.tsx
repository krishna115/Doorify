"use client";

import {
  useEffect,
  useState,
} from "react";

import OrdersPage2 from "@/features/orders/components/OrdersPage2";

import { AuthService } from "@/features/auth";

export default function Page() {

  const [
    userId,
    setUserId,
  ] = useState<string | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    async function loadUser() {

      try {

        const {
          session,
        } =
          await AuthService.getSession();

        if (!session?.user?.id) {

          throw new Error(
            "Unable to identify the current user."
          );

        }

        setUserId(
          session.user.id
        );

      } catch (error) {

        console.error(
          "Unable to load current user:",
          error
        );

      } finally {

        setLoading(false);

      }

    }

    loadUser();

  }, []);

  if (loading) {

    return (

      <div className="flex h-40 items-center justify-center">

        Loading orders...

      </div>

    );

  }

  if (!userId) {

    return (

      <div className="flex h-40 items-center justify-center text-muted-foreground">

        Unable to load your account.

      </div>

    );

  }

  return (

    <OrdersPage2

      basePath="/manufacturer/orders"

      permissions={{
        canCreate: false,
        canEdit: false,
        canDelete: false,
      }}

      filters={{
        acceptedBy: userId,
      }}

    />

  );

}