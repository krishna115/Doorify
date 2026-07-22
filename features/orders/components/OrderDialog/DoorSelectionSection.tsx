"use client";

import { InventoryLookupItem } from "@/features/inventory";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  inventoryLoading: boolean;

  inventory: InventoryLookupItem[];

  selectedInventoryId: string;

  quantity: number;

  originalQuantity: number;

  isEdit: boolean;

  onInventoryChange: (
    id: string
  ) => void;

  onQuantityChange: (
    quantity: number
  ) => void;
}

export function DoorSelectionSection({
  inventoryLoading,
  inventory,
  selectedInventoryId,
  quantity,
  originalQuantity,
  isEdit,
  onInventoryChange,
  onQuantityChange,
}: Props) {

  const selectedInventory =
    inventory.find(
      (item) =>
        item.id === selectedInventoryId
    );

  const totalStock =
    selectedInventory?.quantity ?? 0;

  const inventoryReserved =
    selectedInventory?.reserved_quantity ?? 0;

  const reservedStock =
    isEdit
      ? Math.max(
          0,
          inventoryReserved -
            originalQuantity +
            quantity
        )
      : inventoryReserved;

  const availableStock =
    Math.max(
      0,
      totalStock - reservedStock
    );

  const exceedsStock =
    quantity > availableStock + originalQuantity;

  return (
    <div className="space-y-4">

      {/* Door Size */}

      <div className="space-y-2">

        <Label>
          Door Size
        </Label>

        <Select
          value={selectedInventoryId}
          onValueChange={(value) => {
            if (value) {
              onInventoryChange(value);
            }
          }}
        >

          <SelectTrigger>

            <SelectValue
              placeholder={
                inventoryLoading
                  ? "Loading..."
                  : "Select Door Size"
              }
            />

          </SelectTrigger>

          <SelectContent>

            {inventory.map((item) => {

              const reserved =
                isEdit &&
                item.id ===
                  selectedInventoryId
                  ? Math.max(
                      0,
                      item.reserved_quantity -
                        originalQuantity +
                        quantity
                    )
                  : item.reserved_quantity;

              const available =
                Math.max(
                  0,
                  item.quantity -
                    reserved
                );

              return (

                <SelectItem
                  key={item.id}
                  value={item.id}
                >

                  {item.width}
                  {" × "}
                  {item.height}
                  {" ("}
                  {available}
                  {" Available)"}

                </SelectItem>

              );

            })}

          </SelectContent>

        </Select>

      </div>

      {/* Inventory Summary */}

      {selectedInventory && (

        <div className="grid grid-cols-3 gap-4">

          <div className="space-y-2">

            <Label>
              Total Stock
            </Label>

            <Input
              disabled
              value={totalStock}
            />

          </div>

          <div className="space-y-2">

            <Label>
              Reserved
            </Label>

            <Input
              disabled
              value={reservedStock}
            />

          </div>

          <div className="space-y-2">

            <Label>
              Available
            </Label>

            <Input
              disabled
              value={availableStock}
            />

          </div>

        </div>

      )}

      {/* Quantity */}

      <div className="space-y-2">

        <Label>
          Order Quantity
        </Label>

        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) =>
            onQuantityChange(
              Number(
                e.target.value
              )
            )
          }
        />

      </div>

      {/* Warning */}

      {selectedInventory &&
        exceedsStock && (

        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">

          Only{" "}
          <strong>
            {availableStock}
          </strong>{" "}
          doors of size{" "}
          <strong>
            {selectedInventory.width}
            {" × "}
            {selectedInventory.height}
          </strong>{" "}
          are available.

          <br />

          Please request more doors of this size before updating this order.

        </div>

      )}

    </div>
  );
}