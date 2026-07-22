"use client";

import { Order } from "../..";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  order: Order;
}

export function DoorDetailsCard({
  order,
}: Props) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>

          Door Details

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Size
          </span>

          <span className="font-medium">

            {order.height}"
            {" × "}
            {order.width}"

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Quantity
          </span>

          <span className="font-medium">

            {order.quantity}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Inventory ID
          </span>

          <span className="font-medium text-xs">

            {order.inventory_id}

          </span>

        </div>

      </CardContent>

    </Card>
  );
}