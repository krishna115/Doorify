"use client";

import { Inventory } from "../types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  inventory: Inventory[];
}

export function InventoryStats({ inventory }: Props) {
  const totalDimensions = inventory.length;

  const totalStock = inventory.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const outOfStock = inventory.filter(
    (item) => item.quantity === 0
  ).length;

  const lowStock = inventory.filter(
  (item) =>
    item.quantity - item.reserved_quantity > 0 &&
    item.quantity - item.reserved_quantity <= item.minimum_quantity
).length;

  const stats = [
    {
      title: "Dimensions",
      value: totalDimensions,
    },
    {
      title: "Total Stock",
      value: totalStock,
    },
    {
      title: "Out of Stock",
      value: outOfStock,
    },
    {
      title: "Low Stock",
      value: lowStock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}