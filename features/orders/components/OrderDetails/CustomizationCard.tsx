"use client";

import { useState } from "react";

import {
  OrderCustomization,
  OrderService,
} from "../..";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  customizations: OrderCustomization[];

  editable?: boolean;

  onRefresh?: () => void;
}

export function CustomizationCard({
  customizations,
  editable = false,
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

    <Card>

      <CardHeader>

        <CardTitle>
          Customizations
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-4">

        {customizations.length === 0 && (

          <p className="text-sm text-muted-foreground">
            No customizations added.
          </p>

        )}

        {customizations.map((item) => (

          <div
            key={item.id}
            className="space-y-3 rounded-lg border p-4"
          >

            <div className="flex items-start gap-3">

              <Checkbox
                checked={item.is_completed}
                disabled={
                  !editable ||
                  loadingId === item.id
                }
                onCheckedChange={() =>
                  editable &&
                  toggle(item)
                }
              />

              <div className="flex-1">

                <p
                  className={
                    item.is_completed
                      ? "line-through text-muted-foreground"
                      : ""
                  }
                >
                  {item.instruction}
                </p>

              </div>

            </div>

            {item.image && (

              <img
                src={item.image}
                alt="Customization"
                className="max-h-72 w-full rounded-lg border object-contain"
              />

            )}

          </div>

        ))}

      </CardContent>

    </Card>

  );

}