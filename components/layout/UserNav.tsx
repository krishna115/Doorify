"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ChevronsUpDown,
  LogOut,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "@/components/ui/sidebar";

export function UserNav() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  };

  return (
    <DropdownMenu>

  <SidebarMenuButton
    render={<DropdownMenuTrigger />}
    size="lg"
    className="w-full"
  >

    <Avatar className="h-8 w-8">
      <AvatarFallback>
        U
      </AvatarFallback>
    </Avatar>

    <div className="flex flex-1 flex-col items-start text-left">

      <span className="truncate text-sm font-medium">
        User
      </span>

      <span className="truncate text-xs text-muted-foreground">
        Doorify
      </span>

    </div>

    <ChevronsUpDown className="ml-auto h-4 w-4" />

  </SidebarMenuButton>

  <DropdownMenuContent
    align="end"
    side="top"
    className="w-56"
  >

    <DropdownMenuLabel>
      My Account
    </DropdownMenuLabel>

    <DropdownMenuSeparator />

    <DropdownMenuItem>

      <User className="mr-2 h-4 w-4" />

      Profile

    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem
      onClick={handleLogout}
      disabled={loading}
      className="text-red-600 focus:text-red-600"
    >

      <LogOut className="mr-2 h-4 w-4" />

      {loading
        ? "Logging out..."
        : "Logout"}

    </DropdownMenuItem>

  </DropdownMenuContent>

</DropdownMenu>
  );
}