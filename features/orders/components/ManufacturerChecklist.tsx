"use client";

import { useState } from "react";

import {
  OrderCustomization,
  OrderService,
} from "..";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  checklist: OrderCustomization[];

  onRefresh?: () => void;
}

export function ManufacturerChecklist({
  checklist,
  onRefresh,
}: Props) {

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  async function toggle(
    item: OrderCustomization
  ) {
    try {

      setLoadingId(item.id);

      await OrderService.toggleChecklist(
        item.id,
        !item.is_completed
      );

      onRefresh?.();

    } finally {

      setLoadingId(null);

    }
  }

  return (
    <div className="space-y-3">

      <h3 className="font-semibold">
        Manufacturing Checklist
      </h3>

      {checklist.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No checklist available.
        </p>
      )}

      {checklist.map((item) => (

        <div
          key={item.id}
          className="flex items-center gap-3 rounded-lg border p-3"
        >

          <Checkbox
            checked={item.is_completed}
            disabled={
              loadingId === item.id
            }
            onCheckedChange={() =>
              toggle(item)
            }
          />

          <span
            className={
              item.is_completed
                ? "line-through text-muted-foreground"
                : ""
            }
          >
            {item.instruction}
          </span>

        </div>

      ))}

    </div>
  );
}