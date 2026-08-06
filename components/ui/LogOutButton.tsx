"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  LogOut,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { AuthService } from "@/features/auth";

export function LogoutButton() {

  const router =
    useRouter();

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function handleLogout() {

    try {

      setLoading(true);

      await AuthService.logout();

      router.replace("/login");

      router.refresh();

    } catch (error) {

      console.error(error);

      alert("Failed to logout.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={loading}
      className="gap-2"
    >

      {loading ? (

        <Loader2 className="h-4 w-4 animate-spin" />

      ) : (

        <LogOut className="h-4 w-4" />

      )}

      {loading
        ? "Logging Out..."
        : "Logout"}

    </Button>

  );

}