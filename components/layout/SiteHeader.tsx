"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";

import {
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserNav } from "./UserNav";

interface SiteHeaderProps {
  title: string;
}

export function SiteHeader({
  title,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">

      {/* Left */}

      <div className="flex items-center gap-3">

        <SidebarTrigger />

        <div className="hidden h-5 w-px bg-border md:block" />

        {isMobile ? (
          <h1 className="text-lg font-semibold">
            {title}
          </h1>
        ) : (
          <Breadcrumb>

            <BreadcrumbList>

              <BreadcrumbItem>

                <BreadcrumbPage>
                  {title}
                </BreadcrumbPage>

              </BreadcrumbItem>

              {segments.slice(1).map((segment) => (
                <React.Fragment key={segment}>

                  <BreadcrumbSeparator />

                  <BreadcrumbItem>

                    <BreadcrumbPage className="capitalize">

                      {segment.replace("-", " ")}

                    </BreadcrumbPage>

                  </BreadcrumbItem>

                </React.Fragment>
              ))}

            </BreadcrumbList>

          </Breadcrumb>
        )}

      </div>

      {/* Right */}

      <div className="flex items-center gap-2">

        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <UserNav />

      </div>

    </header>
  );
}