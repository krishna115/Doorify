"use client";

import { useEffect, useMemo, useState } from "react";

import {
  CreateOrderRequest,
  CustomizationItem,
  Order,
  OrderService,
  UpdateOrderRequest,
} from "../..";

import {
  InventoryLookupItem,
  InventoryLookupService,
} from "@/features/inventory";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { CustomerSection } from "./CustomerSection";

import { DoorSelectionSection } from "./DoorSelectionSection";

import { OrderDetailsSection } from "./OrderDetailsSection";

import { OrderStatusSection } from "./OrderStatusSection";

import { CustomizationSection } from "./CustomizationSection";
import { OrderCustomizationService } from "../../services/OrderCustomizationService";

interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  order?: Order | null;

  onSuccess?: () => void;
}

export function OrderDialog({
  open,
  onOpenChange,
  order,
  onSuccess,
}: Props) {
  const isEdit = !!order;

  const [loading, setLoading] =
    useState(false);

  const [
    inventoryLoading,
    setInventoryLoading,
  ] = useState(false);

  const [inventory, setInventory] =
    useState<
      InventoryLookupItem[]
    >([]);

  const [
    selectedInventoryId,
    setSelectedInventoryId,
  ] = useState("");

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    customerPhone,
    setCustomerPhone,
  ] = useState("");

  const [quantity, setQuantity] =
    useState(1);

    const [originalQuantity, setOriginalQuantity] =
  useState(0);

  const [
    estimatedDays,
    setEstimatedDays,
  ] = useState(10);

  const [status, setStatus] =
    useState<
      | "pending"
      | "accepted"
      | "manufacturing"
      | "completed"
      | "cancelled"
    >("pending");
const [
  customizations,
  setCustomizations,
] = useState<CustomizationItem[]>([]);

  function resetForm() {
    setCustomerName("");

    setCustomerPhone("");

    setSelectedInventoryId("");

    setQuantity(1);
    setOriginalQuantity(0);

    setEstimatedDays(10);

    setStatus("pending");

    setCustomizations([]);
  }

  async function loadInventory() {
    try {
      setInventoryLoading(true);

      const data =
        await InventoryLookupService.getAll();

      setInventory(data);
    } catch (e) {
      console.error(e);

      alert(
        "Unable to load inventory."
      );
    } finally {
      setInventoryLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    loadInventory();

    if (!order) {
      resetForm();
      return;
    }

    setCustomerName(
      order.customer_name
    );

    setCustomerPhone(
      order.customer_phone
    );

    setQuantity(order.quantity);
    setOriginalQuantity(order.quantity);

    setEstimatedDays(
      order.estimated_days ?? 10
    );

    setStatus(order.status);

    setCustomizations([]);

    // @ts-ignore
    setSelectedInventoryId(
      order.inventory_id ?? ""
    );
  }, [open, order]);

  const selectedInventory =
    useMemo(() => {
      return inventory.find(
        (item) =>
          item.id ===
          selectedInventoryId
      );
    }, [
      inventory,
      selectedInventoryId,
    ]);

let availableQuantity =
  selectedInventory
    ? Math.max(
        0,
        selectedInventory.quantity -
          (
            isEdit
              ? selectedInventory.reserved_quantity -
                originalQuantity +
                quantity
              : selectedInventory.reserved_quantity
          )
      )
    : 0;

let exceedsInventory =
  quantity > availableQuantity;

  async function handleSave() {
    try {
      setLoading(true);

      if (
        !customerName.trim()
      ) {
        alert(
          "Customer name is required."
        );
        return;
      }

      if (
        !customerPhone.trim()
      ) {
        alert(
          "Customer phone is required."
        );
        return;
      }

      if (
        !selectedInventory
      ) {
        alert(
          "Please select a door size."
        );
        return;
      }

      if (
        exceedsInventory
      ) {
        alert(
          `Only ${availableQuantity} doors are available for ${selectedInventory.width} × ${selectedInventory.height}.`
        );

        return;
      }

      if (isEdit) {
        const request: UpdateOrderRequest =
          {
            id: order!.id,

            // @ts-ignore
            inventory_id:
              selectedInventory.id,

            customer_name:
              customerName,

            customer_phone:
              customerPhone,

            width:
              selectedInventory.width,

            height:
              selectedInventory.height,

            quantity,

            estimated_days:
              estimatedDays,

            status,
          };

        await OrderService.update(
          request
        );

        await OrderCustomizationService.save(order!.id,customizations);

      } else {
        const request: CreateOrderRequest =
          {
            // @ts-ignore
            inventory_id:
              selectedInventory.id,

            customer_name:
              customerName,

            customer_phone:
              customerPhone,

            width:
              selectedInventory.width,

            height:
              selectedInventory.height,

            quantity,

            estimated_days:
              estimatedDays,

          };

        const createdOrder = await OrderService.create(
          request
        );

        await OrderCustomizationService.save(createdOrder.id,customizations);
      }

      await loadInventory();

      resetForm();

      onOpenChange(false);

      onSuccess?.();
    } catch (e) {
      if (
        e instanceof Error
      ) {
        alert(e.message);
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
<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>

          <DialogTitle>

            {isEdit
              ? "Edit Order"
              : "Create Order"}

          </DialogTitle>

        </DialogHeader>

                <div className="space-y-6">

          <CustomerSection
            customerName={customerName}
            customerPhone={customerPhone}
            onCustomerNameChange={setCustomerName}
            onCustomerPhoneChange={setCustomerPhone}
          />

          <DoorSelectionSection
                      inventoryLoading={inventoryLoading}
                      inventory={inventory}
                      selectedInventoryId={selectedInventoryId}
                      quantity={quantity}
                      onInventoryChange={setSelectedInventoryId}
                      onQuantityChange={setQuantity} isEdit={isEdit} originalQuantity={originalQuantity}          />

          <OrderDetailsSection
            estimatedDays={estimatedDays}
            quantity={quantity}
            onEstimatedDaysChange={setEstimatedDays}
          />

          {isEdit && (
            <OrderStatusSection
              status={status}
              onStatusChange={setStatus}
            />
          )}

          {!isEdit && (
            <CustomizationSection
              value={customizations}
              onChange={setCustomizations}
            />
          )}

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>

          <Button
            disabled={
              loading ||
              exceedsInventory ||
              !selectedInventory
            }
            onClick={handleSave}
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Order"
              : "Create Order"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}