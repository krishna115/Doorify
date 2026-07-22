"use client";

import * as React from "react";


import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavItem } from "@/types/navigation";
import { AppSidebar } from "./AppSidebar";
import { SiteHeader } from "./SiteHeader";

interface AppShellProps {
  children: React.ReactNode;
  navigation: NavItem[];
  title: string;
}

export function AppShell({
  children,
  navigation,
  title,
}: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar navigation={navigation} />

      <SidebarInset>

        <SiteHeader title={title} />

        <main className="flex-1 p-6 bg-muted/20 min-h-screen">
          {children}
        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}