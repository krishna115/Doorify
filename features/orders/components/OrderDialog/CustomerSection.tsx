"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  customerName: string;

  customerPhone: string;

  onCustomerNameChange: (
    value: string
  ) => void;

  onCustomerPhoneChange: (
    value: string
  ) => void;
}

export function CustomerSection({
  customerName,
  customerPhone,
  onCustomerNameChange,
  onCustomerPhoneChange,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <div className="space-y-2">

        <Label>
          Customer Name
        </Label>

        <Input
          value={customerName}
          onChange={(e) =>
            onCustomerNameChange(
              e.target.value
            )
          }
        />

      </div>

      <div className="space-y-2">

        <Label>
          Customer Phone
        </Label>

        <Input
          value={customerPhone}
          onChange={(e) =>
            onCustomerPhoneChange(
              e.target.value
            )
          }
        />

      </div>

    </div>
  );
}