"use client";

import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "..";

interface Props {
  status: OrderStatus;
}

export function OrderStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary">
          Pending
        </Badge>
      );

    case "accepted":
      return (
        <Badge>
          Accepted
        </Badge>
      );

    case "manufacturing":
      return (
        <Badge>
          Manufacturing
        </Badge>
      );

    case "completed":
      return (
        <Badge>
          Completed
        </Badge>
      );

    case "cancelled":
      return (
        <Badge variant="destructive">
          Cancelled
        </Badge>
      );

    default:
      return (
        <Badge>
          Unknown
        </Badge>
      );
  }
}