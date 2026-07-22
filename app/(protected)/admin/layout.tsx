import { ReactNode } from "react";


import { AppShell } from "@/components/layout/AppShell";

import { adminNavigation } from "@/config/navigation/admin";
import { requireRole } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole("admin");

  return (
    <AppShell
      title="Admin"
      navigation={adminNavigation}
    >
      {children}
    </AppShell>
  );
}