"use client";

import { useEffect, useState } from "react";

import {
  CreateOrderRequest,
  CustomizationItem,
  Order,
  OrderDoor,
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

import { DoorSelectionList } from "./DoorSelectionList";

import { OrderDetailsSection } from "./OrderDetailsSection";

import { OrderStatusSection } from "./OrderStatusSection";

import { CustomizationSection } from "./CustomizationSection";

import { OrderCustomizationService } from "../../services/OrderCustomizationService";
import { PaymentSection } from "./PaymentSection";
import { PaymentService } from "../../services/PaymentService";
import { InvoiceData, InvoicePreviewDialog, InvoiceService, ShareInvoiceDialog } from "@/features/invoice";
import { OrderDetailsService } from "../../services/OrderDetailsService";



interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  order?: Order | null;
  onCreated?: (
    orderId: string,
    invoice: InvoiceData
  ) => void;
  

  onSuccess?: () => void;
  
}

export function OrderDialog({
  open,
  onOpenChange,
  order,
  onSuccess,
  onCreated
}: Props) {

    const [

  invoice,

  setInvoice,

] = useState<InvoiceData | null>(null);

const [

  previewOpen,

  setPreviewOpen,

] = useState(false);

const [

  shareOpen,

  setShareOpen,

] = useState(false);

  const isEdit = !!order;

  const [loading, setLoading] =
    useState(false);

  const [
    inventoryLoading,
    setInventoryLoading,
  ] = useState(false);

  const [inventory, setInventory] =
    useState<InventoryLookupItem[]>([]);

    const [totalAmount,setTotalAmount,] = useState(0);

    const [amountPaid,setAmountPaid,] = useState(0);

    const [pricePerSqft, setPricePerSqft] =
  useState(0);

const [discount, setDiscount] =
  useState(0);

const [addons, setAddons] =
  useState<
    {
      name: string;
      amount: number;
    }[]
  >([]);

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    customerPhone,
    setCustomerPhone,
  ] = useState("");

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
      | "ready_for_dispatch"
    >("pending");

  const [
    doors,
    setDoors,
  ] = useState<OrderDoor[]>([
    {
      inventory_id: "",
      quantity: 1,
      width: 1,
      height: 1,
      name: ""
    },
  ]);

  const [
    customizations,
    setCustomizations,
  ] =
    useState<
      CustomizationItem[]
    >([]);

  function resetForm() {

    setCustomerName("");

    setCustomerPhone("");

    setEstimatedDays(10);

    setStatus("pending");

    setDoors([
      {
        inventory_id: "",
        quantity: 1,
        width: 1,
        height: 1,
        name: ""
      },
    ]);

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

    if (!open) {
      return;
    }

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

    setEstimatedDays(
      order.estimated_days ??
        10
    );

    setStatus(
      order.status
    );

    setDoors(
      order.doors?.length
        ? order.doors
        : [
            {
              inventory_id: "",
              quantity: 1,
              name: "",
              width: 1,
              height: 1
            },
          ]
    );

    setCustomizations([]);

  }, [
    open,
    order,
  ]);

  function updateDoor(
    index: number,
    value: Partial<OrderDoor>
  ) {

    setDoors((prev) =>
      prev.map((door, i) =>
        i === index
          ? {
              ...door,
              ...value,
            }
          : door
      )
    );

  }

  function addDoor() {

    setDoors((prev) => [
      ...prev,
      {
        inventory_id: "",
        quantity: 1,
        width: 1,
        height: 1,
        name: ""
      },
    ]);

  }

  function removeDoor(
    index: number
  ) {

    setDoors((prev) =>
      prev.filter(
        (_, i) =>
          i !== index
      )
    );

  }

  function validateDoors() {

    for (const door of doors) {

      if (
        !door.inventory_id
      ) {

        alert(
          "Please select all door sizes."
        );

        return false;

      }

      const inventoryItem =
        inventory.find(
          (item) =>
            item.id ===
            door.inventory_id
        );

      if (!inventoryItem) {

        alert(
          "Invalid door selected."
        );

        return false;

      }

      const available =
        inventoryItem.quantity -
        inventoryItem.reserved_quantity;

    //   if (
    //     door.quantity >
    //     available
    //   ) {

    //     alert(
    //       `${inventoryItem.name} has only ${available} doors available.`
    //     );

    //     return false;

    //   }

    }

    return true;

  }
  async function handleSave() {

  try {

    setLoading(true);

    if (!customerName.trim()) {

      alert(
        "Customer name is required."
      );

      return;

    }

    if (!customerPhone.trim()) {

      alert(
        "Customer phone is required."
      );

      return;

    }

    if (doors.length === 0) {

      alert(
        "Please add at least one door."
      );

      return;

    }

    if (!validateDoors()) {
      return;
    }

    if (isEdit) {

      const request: UpdateOrderRequest = {

        id: order!.id,

        customer_name:
          customerName,

        customer_phone:
          customerPhone,

        estimated_days:
          estimatedDays,

        status,

        doors,

      };

      await OrderService.update(
        request
      );

      await OrderCustomizationService.replace(
        order!.id,
        customizations
      );

    } else {

      const request: CreateOrderRequest = {

        customer_name:
          customerName,

        customer_phone:
          customerPhone,

        estimated_days:
          estimatedDays,

        doors,
         amount_paid: amountPaid,

         price_per_sqft: pricePerSqft,
  discount,
  addons,

  total_amount: totalAmount,

      };

      const createdOrder =
        await OrderService.create(
          request
        );

        if (amountPaid > 0) {

  await PaymentService.create({

    orderId:
      createdOrder.id,

    amount:
      amountPaid,

    paymentMethod:
      null,

    note:
      amountPaid >= totalAmount
        ? "Full Payment"
        : "Advance Payment",

  });
}

      await OrderCustomizationService.save(
        createdOrder.id,
        customizations
      );

 const details =
  await OrderDetailsService.getById(
    createdOrder.id
  );

  

  

const invoice =
  InvoiceService.build(details, amountPaid);

      onCreated?.(
        createdOrder.id,
        invoice
      );

    }

    await loadInventory();

    resetForm();

    onOpenChange(false);

    onSuccess?.();

  } catch (e) {

    if (e instanceof Error) {

      alert(
        e.message
      );

    }

  } finally {

    setLoading(false);

  }

}
return (

  <>

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

          <DoorSelectionList
            inventory={inventory}
            inventoryLoading={inventoryLoading}
            doors={doors}
            onDoorsChange={setDoors}
            onAddDoor={addDoor}
            onRemoveDoor={removeDoor}
            onUpdateDoor={updateDoor}
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

          <PaymentSection
            doors={doors}
            totalAmount={totalAmount}
            amountPaid={amountPaid}
            pricePerSqft={pricePerSqft}
            discount={discount}
            addons={addons}
            onTotalAmountChange={setTotalAmount}
            onAmountPaidChange={setAmountPaid}
            onPricePerSqftChange={setPricePerSqft}
            onDiscountChange={setDiscount}
            onAddonsChange={setAddons}
          />

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
              doors.length === 0
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

    {/* ---------------------------------------
        Invoice Preview
    --------------------------------------- */}

    {/* {invoice && (

      <InvoicePreviewDialog

        open={previewOpen}

        invoice={invoice}

        onOpenChange={setPreviewOpen}

        onShare={() => {

          setPreviewOpen(false);

          setShareOpen(true);

        }}

      />

    )} */}

    {/* ---------------------------------------
        Share Invoice
    --------------------------------------- */}

    {/* {invoice && (

      <ShareInvoiceDialog

        open={shareOpen}

        invoice={invoice}

        onOpenChange={setShareOpen}

        onPrint={() => {

          console.log("Print Invoice");

        }}

        onDownload={() => {

          console.log("Download PDF");

        }}

        onWhatsapp={() => {

          console.log("Share on WhatsApp");

        }}

      />

    )} */}




  </>

);
}