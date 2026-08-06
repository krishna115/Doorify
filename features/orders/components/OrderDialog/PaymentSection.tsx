"use client";

import {
  useEffect,
  useMemo,
} from "react";

import {
  Plus,
  Trash2,
} from "lucide-react";

import {
  OrderDoor,
} from "../..";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

interface Addon {

  name: string;

  amount: number;

}

interface Props {

  doors: OrderDoor[];

  totalAmount: number;

  amountPaid: number;

  pricePerSqft: number;

  discount: number;

  addons: Addon[];

  onTotalAmountChange: (
    value: number
  ) => void;

  onAmountPaidChange: (
    value: number
  ) => void;

  onPricePerSqftChange: (
    value: number
  ) => void;

  onDiscountChange: (
    value: number
  ) => void;

  onAddonsChange: (
    value: Addon[]
  ) => void;

}

export function PaymentSection({

  doors,

  totalAmount,

  amountPaid,

  pricePerSqft,

  discount,

  addons,

  onTotalAmountChange,

  onAmountPaidChange,

  onPricePerSqftChange,

  onDiscountChange,

  onAddonsChange,

}: Props) {

  /*
  ---------------------------------------
  Total Area
  ---------------------------------------
  */

  const totalArea =
    useMemo(() => {

      return doors.reduce(

        (
          total,
          door
        ) => {

          const area =
            (
              door.height *
              door.width
            ) / 144;

          return (
            total +
            area *
              door.quantity
          );

        },

        0

      );

    }, [doors]);

  /*
  ---------------------------------------
  Addons Total
  ---------------------------------------
  */

  const addonsTotal =
    addons.reduce(

      (
        total,
        addon
      ) =>
        total +
        addon.amount,

      0

    );

  /*
  ---------------------------------------
  Total
  ---------------------------------------
  */

  const calculatedTotal =
    Math.max(

      0,

      Math.round(

        totalArea *
          pricePerSqft +

          addonsTotal -

          discount

      )

    );

  useEffect(() => {

    onTotalAmountChange(
      calculatedTotal
    );

  }, [

    calculatedTotal,

    onTotalAmountChange,

  ]);

  const exceeds =
    amountPaid >
    calculatedTotal;

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Payment Details

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-6">

        {/* -----------------------------
            Price
        ----------------------------- */}

        <div className="space-y-2">

          <Label>

            Price Per Sq. Ft.

          </Label>

          <Input
            type="number"
            min={0}
            value={
              pricePerSqft === 0
                ? ""
                : pricePerSqft
            }
            onChange={(e) =>

              onPricePerSqftChange(

                Number(
                  e.target.value
                )

              )

            }
          />

        </div>

        {/* -----------------------------
            Addons
        ----------------------------- */}

        <div className="space-y-3">

          <div className="flex items-center justify-between">

            <Label>

              Addons

            </Label>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>

                onAddonsChange([

                  ...addons,

                  {

                    name: "",

                    amount: 0,

                  },

                ])

              }
            >

              <Plus className="mr-2 h-4 w-4" />

              Add Addon

            </Button>

          </div>

          {addons.map(
            (
              addon,
              index
            ) => (

              <div
                key={index}
                className="flex gap-2"
              >

                <Input
                  placeholder="Addon Name"
                  value={
                    addon.name
                  }
                  onChange={(e) => {

                    const copy =
                      [...addons];

                    copy[index] = {

                      ...copy[index],

                      name:
                        e.target.value,

                    };

                    onAddonsChange(
                      copy
                    );

                  }}
                />

                <Input
                  type="number"
                  min={0}
                  className="w-36"
                  placeholder="Amount"
                  value={
                    addon.amount === 0
                      ? ""
                      : addon.amount
                  }
                  onChange={(e) => {

                    const copy =
                      [...addons];

                    copy[index] = {

                      ...copy[index],

                      amount:
                        Number(
                          e.target.value
                        ),

                    };

                    onAddonsChange(
                      copy
                    );

                  }}
                />

                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() =>

                    onAddonsChange(

                      addons.filter(

                        (
                          _,
                          i
                        ) =>
                          i !==
                          index

                      )

                    )

                  }
                >

                  <Trash2 className="h-4 w-4" />

                </Button>

              </div>

            )
          )}

        </div>

        {/* -----------------------------
            Discount
        ----------------------------- */}

        <div className="space-y-2">

          <Label>

            Discount

          </Label>

          <Input
            type="number"
            min={0}
            value={
              discount === 0
                ? ""
                : discount
            }
            onChange={(e) =>

              onDiscountChange(

                Number(
                  e.target.value
                )

              )

            }
          />

        </div>

        {/* -----------------------------
            Summary
        ----------------------------- */}

        <div className="rounded-lg border bg-muted/40 p-4 space-y-2">

          <div className="flex justify-between">

            <span>

              Total Area

            </span>

            <span>

              {totalArea.toFixed(
                2
              )} sq.ft.

            </span>

          </div>

          <div className="flex justify-between">

            <span>

              Addons

            </span>

            <span>

              ₹{addonsTotal}

            </span>

          </div>

          <div className="flex justify-between">

            <span>

              Discount

            </span>

            <span>

              ₹{discount}

            </span>

          </div>

          <div className="border-t pt-2 flex justify-between font-semibold text-base">

            <span>

              Total Amount

            </span>

            <span>

              ₹{calculatedTotal}

            </span>

          </div>

        </div>

        {/* -----------------------------
            Amount Paid
        ----------------------------- */}

        <div className="space-y-2">

          <Label>

            Amount Paid

          </Label>

          <Input
            type="number"
            min={0}
            value={
              amountPaid === 0
                ? ""
                : amountPaid
            }
            onChange={(e) =>

              onAmountPaidChange(

                Number(
                  e.target.value
                )

              )

            }
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