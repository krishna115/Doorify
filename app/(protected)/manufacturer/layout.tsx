import { ReactNode } from "react";


import { AppShell } from "@/components/layout/AppShell";

import { manufacturerNavigation } from "@/config/navigation/manufacturer";
import { requireRole } from "@/lib/auth";

export default async function ManufacturerLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole("manufacturer");

  return (
    <AppShell
      title="Manufacturer"
      navigation={manufacturerNavigation}
    >
      {children}
    </AppShell>
  );
}