"use client";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  status:
    | "pending"
    | "accepted"
    | "manufacturing"
    | "completed"
    | "cancelled"
    | "ready_for_dispatch";

  onStatusChange: (
    value:
      | "pending"
      | "accepted"
      | "manufacturing"
      | "completed"
      | "cancelled"
      | "ready_for_dispatch"
  ) => void;
}

export function OrderStatusSection({
  status,
  onStatusChange,
}: Props) {
  return (
    <div className="space-y-2">

      <Label>
        Order Status
      </Label>

      <Select
        value={status}
        onValueChange={(value) =>
          onStatusChange(
            value as Props["status"]
          )
        }
      >

        <SelectTrigger>

          <SelectValue />

        </SelectTrigger>

        <SelectContent>

          <SelectItem value="pending">
            Pending
          </SelectItem>

          <SelectItem value="accepted">
            Accepted
          </SelectItem>

          <SelectItem value="manufacturing">
            Manufacturing
          </SelectItem>

          <SelectItem value="completed">
            Completed
          </SelectItem>

          <SelectItem value="cancelled">
            Cancelled
          </SelectItem>

        </SelectContent>

      </Select>

    </div>
  );
}