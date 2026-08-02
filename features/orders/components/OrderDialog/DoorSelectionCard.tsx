"use client";

import {
  InventoryLookupItem,
} from "@/features/inventory";

import {
  OrderDoor,
} from "../..";

import {
  Card,
  CardContent,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface Props {
  door: OrderDoor;

  inventory: InventoryLookupItem[];

  inventoryLoading: boolean;

  onChange: (
    value: OrderDoor
  ) => void;

  onRemove: () => void;

  removable: boolean;
}

export function DoorSelectionCard({

  door,

  inventory,

  inventoryLoading,

  onChange,

  onRemove,

  removable,

}: Props) {

  const selectedInventory =
    inventory.find(
      (item) =>
        item.id ===
        door.inventory_id
    );

  /*
  ---------------------------------------
  Inventory Status
  ---------------------------------------
  */

  const available =
    selectedInventory
      ? selectedInventory.quantity -
        selectedInventory.reserved_quantity
      : 0;

  const shortage =
    selectedInventory
      ? Math.max(
          0,
          door.quantity - available
        )
      : 0;

  const hasShortage =
    shortage > 0;

  return (

    <Card>

      <CardContent className="space-y-5 pt-6">

        {/* -----------------------------
            Door Selection
        ----------------------------- */}

        <div className="space-y-2">

          <Label>

            Door Size

          </Label>

          <Select
            value={door.inventory_id}
            disabled={
              inventoryLoading
            }
            onValueChange={(
              value
            ) =>
              onChange({
                ...door,
                inventory_id: value,
                name: selectedInventory?.name ?? ""
              })
            }
          >

            <SelectTrigger>

              <span className="truncate">

                {selectedInventory
                  ? selectedInventory.name
                  : inventoryLoading
                  ? "Loading..."
                  : "Select Door Size"}

              </span>

            </SelectTrigger>

            <SelectContent>

              {inventory.map(
                (item) => {

                  const availableStock =
                    item.quantity -
                    item.reserved_quantity;

                  return (

                    <SelectItem
                      key={item.id}
                      value={item.id}
                    >

                      {item.name}

                      {" • "}

                      {availableStock}

                      {" Available"}

                    </SelectItem>

                  );

                }
              )}

            </SelectContent>

          </Select>

        </div>

        {/* -----------------------------
            Inventory Details
        ----------------------------- */}

        {selectedInventory && (

          <div className="grid grid-cols-3 gap-4">

            <div>

              <Label>

                Total

              </Label>

              <Input
                disabled
                value={
                  selectedInventory.quantity
                }
              />

            </div>

            <div>

              <Label>

                Reserved

              </Label>

              <Input
                disabled
                value={
                  selectedInventory.reserved_quantity
                }
              />

            </div>

            <div>

              <Label>

                Available

              </Label>

              <Input
                disabled
                value={
                  available
                }
                className={
                  available < 0
                    ? "border-red-500 text-red-600 font-semibold"
                    : available === 0
                    ? "border-yellow-500 text-yellow-700 font-semibold"
                    : ""
                }
              />

            </div>

          </div>

        )}

        {/* -----------------------------
            Quantity
        ----------------------------- */}

        <div className="space-y-2">

          <Label>

            Quantity

          </Label>

          <Input
            type="number"
            min={1}
            value={
              door.quantity === 0
                ? ""
                : door.quantity
            }
            onChange={(
              e
            ) => {

              const value =
                e.target.value;

              onChange({

                ...door,

                quantity:
                  value === ""
                    ? 0
                    : Number(
                        value
                      ),

              });

            }}
            onBlur={() => {

              if (
                door.quantity <=
                0
              ) {

                onChange({

                  ...door,

                  quantity: 1,

                });

              }

            }}
          />

        </div>

        {/* -----------------------------
            Inventory Warning
        ----------------------------- */}

        {hasShortage && (

          <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">

            <p className="font-semibold">

              Inventory Warning

            </p>

            <div className="mt-2 space-y-1">

              <p>

                Available:
                {" "}
                <strong>

                  {available}

                </strong>

              </p>

              <p>

                Requested:
                {" "}
                <strong>

                  {door.quantity}

                </strong>

              </p>

              <p>

                Shortage:
                {" "}
                <strong>

                  {shortage}

                </strong>

              </p>

            </div>

            <p className="mt-3">

              This order can still be
              created. Inventory will
              become negative until
              additional stock is
              received.

            </p>

          </div>

        )}

        {/* -----------------------------
            Remove
        ----------------------------- */}

        {removable && (

          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={onRemove}
          >

            Remove Door

          </Button>

        )}

      </CardContent>

    </Card>

  );

}