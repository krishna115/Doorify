"use client";

import { useState } from "react";

import {
  Inventory,
  InventoryTransactionType,
  InventoryService,
} from "..";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  inventory: Inventory | null;

  createdBy?: string;

  onSuccess?: () => void;
}

export function StockAdjustmentDialog({
  open,
  onOpenChange,
  inventory,
  createdBy,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState("");

  const [type, setType] =
    useState<InventoryTransactionType>("receive");

  const [note, setNote] = useState("");

  async function handleSave() {
    if (!inventory) return;

    try {
      setLoading(true);

      let qty = Number(quantity);

      if (isNaN(qty) || qty <= 0) {
        alert("Enter a valid quantity.");
        return;
      }

      if (
        type === "consume" ||
        type === "damage"
      ) {
        qty *= -1;
      }

      await InventoryService.adjustStock({
        inventoryId: inventory.id,
        quantity: qty,
        type,
        note,
        createdBy,
      });

      onOpenChange(false);

      setQuantity("");
      setNote("");

      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>
            Adjust Inventory
          </DialogTitle>

          <DialogDescription>
            {inventory
              ? `${inventory.height}" × ${inventory.width}"`
              : ""}
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5">

          <div className="space-y-2">

            <Label>
              Transaction Type
            </Label>

            <Select
              value={type}
              onValueChange={(value) =>
                setType(
                  value as InventoryTransactionType
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="receive">
                  Receive Stock
                </SelectItem>

                <SelectItem value="consume">
                  Consume Stock
                </SelectItem>

                <SelectItem value="damage">
                  Damaged
                </SelectItem>

                <SelectItem value="adjustment">
                  Manual Adjustment
                </SelectItem>

              </SelectContent>
            </Select>

          </div>

          <div className="space-y-2">

            <Label>
              Quantity
            </Label>

            <Input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              Note
            </Label>

            <Textarea
              rows={4}
              placeholder="Optional..."
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
            />

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={handleSave}
          >
            {loading
              ? "Saving..."
              : "Save"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}