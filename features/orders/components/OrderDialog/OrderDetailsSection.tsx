"use client";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

interface Props {
  estimatedDays: number;

  quantity: number;

  onEstimatedDaysChange: (
    value: number
  ) => void;
}

export function OrderDetailsSection({
  estimatedDays,
  quantity,
  onEstimatedDaysChange,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <div className="space-y-2">

        <Label>
          Order Quantity
        </Label>

        <Input
          disabled
          value={quantity}
        />

      </div>

      <div className="space-y-2">

        <Label>
          Estimated Days
        </Label>

        <Input
          type="number"
          min={1}
          value={estimatedDays}
          onChange={(e) =>
            onEstimatedDaysChange(
              Number(
                e.target.value
              )
            )
          }
        />

      </div>

    </div>
  );
}