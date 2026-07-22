"use client";

import { Order } from "../..";

import { Button } from "@/components/ui/button";

import { OrderStatusBadge } from "../OrderStatusBadge";

interface Props {
  order: Order;

  onBack?: () => void;
}

export function OrderHeader({
  order,
  onBack,
}: Props) {
  return (
    <div className="flex items-center justify-between">

      <div className="space-y-1">

        {onBack && (
          <Button
            variant="ghost"
            className="mb-2 px-0"
            onClick={onBack}
          >
            ← Back
          </Button>
        )}

        <h1 className="text-3xl font-bold">

          Order #{order.order_number}

        </h1>

        <p className="text-muted-foreground">

          Created on{" "}
          {new Date(
            order.created_at
          ).toLocaleDateString()}

        </p>

      </div>

      <OrderStatusBadge
        status={order.status}
      />

    </div>
  );
}