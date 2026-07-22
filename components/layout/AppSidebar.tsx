"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


import { NavItem } from "@/types/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserNav } from "./UserNav";

interface AppSidebarProps {
  navigation: NavItem[];
}

export function AppSidebar({
  navigation,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">

      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-2 py-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            D
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">
              Doorify
            </span>

          </div>

        </div>
      </SidebarHeader>

      <SidebarContent>

        <SidebarMenu>

          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <SidebarMenuItem key={item.href}>

                <SidebarMenuButton
                  isActive={active}
                  tooltip={item.title}
                >
                  <Link href={item.href}>

                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

              </SidebarMenuItem>
            );
          })}

        </SidebarMenu>

      </SidebarContent>

      <SidebarFooter className="border-t">

        <UserNav />

      </SidebarFooter>

    </Sidebar>
  );
}