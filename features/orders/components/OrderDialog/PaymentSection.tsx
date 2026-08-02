"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

interface Props {

  totalAmount: number;

  amountPaid: number;

  onTotalAmountChange: (
    value: number
  ) => void;

  onAmountPaidChange: (
    value: number
  ) => void;

}

export function PaymentSection({

  totalAmount,

  amountPaid,

  onTotalAmountChange,

  onAmountPaidChange,

}: Props) {

  const exceeds =
    amountPaid >
    totalAmount;

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Payment Details

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5">

        <div className="space-y-2">

          <Label>

            Total Amount

          </Label>

          <Input
            type="number"
            min={0}
            placeholder="0"
            value={
              totalAmount === 0
                ? ""
                : totalAmount
            }
            onChange={(e) => {

              const value =
                e.target.value;

              onTotalAmountChange(

                value === ""
                  ? 0
                  : Number(value)

              );

            }}
          />

        </div>

        <div className="space-y-2">

          <Label>

            Amount Paid

          </Label>

          <Input
            type="number"
            min={0}
            placeholder="0"
            value={
              amountPaid === 0
                ? ""
                : amountPaid
            }
            onChange={(e) => {

              const value =
                e.target.value;

              onAmountPaidChange(

                value === ""
                  ? 0
                  : Number(value)

              );

            }}
          />

        </div>

        {exceeds && (

          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">

            Amount paid cannot exceed the total amount.

          </div>

        )}

      </CardContent>

    </Card>

  );

}