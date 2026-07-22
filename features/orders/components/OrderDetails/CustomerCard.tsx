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

export function CustomerCard({
  order,
}: Props) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>

          Customer Details

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Name
          </span>

          <span className="font-medium">
            {order.customer_name}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Phone
          </span>

          <span className="font-medium">
            {order.customer_phone}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Estimated
          </span>

          <span className="font-medium">

            {order.estimated_days
              ? `${order.estimated_days} Days`
              : "--"}

          </span>

        </div>

      </CardContent>

    </Card>
  );
}