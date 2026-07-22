import { ReactNode } from "react";

import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/layout/AppShell";

import { salesNavigation } from "@/config/navigation/sales";

export default async function SalesLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole("sales");

  return (
    <AppShell
      title="Sales"
      navigation={salesNavigation}
    >
      {children}
    </AppShell>
  );
}