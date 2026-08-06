"use client";

import {
  RefObject,
} from "react";

import {
  InvoiceData,
} from "../types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Download,
  Printer,
  MessageCircle,
  X,
} from "lucide-react";

interface Props {

  open: boolean;

  invoice: InvoiceData;

  invoiceRef: RefObject<HTMLDivElement | null>;

  onOpenChange: (
    open: boolean
  ) => void;

  onPrint: (
  ) => void;

  onDownload: (
    ref: RefObject<HTMLDivElement | null>
  ) => void;

  onWhatsapp: (
    ref: RefObject<HTMLDivElement | null>,
    phone?: string
  ) => void;

}

export function ShareInvoiceDialog({

  open,

  invoice,

  invoiceRef,

  onOpenChange,

  onPrint,

  onDownload,

  onWhatsapp,

}: Props) {

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>

            Share Invoice

          </DialogTitle>

          <DialogDescription>

            Invoice for Order #

            <strong>

              {invoice.order.order_number}

            </strong>

            {" "}is ready.

            Choose how you would like to proceed.

          </DialogDescription>

        </DialogHeader>

        {/* Summary */}

        <div className="rounded-lg border bg-muted/30 p-4 space-y-2 text-sm">

          <div className="flex justify-between">

            <span>

              Customer

            </span>

            <span className="font-medium">

              {invoice.customer.name}

            </span>

          </div>

          <div className="flex justify-between">

            <span>

              Phone

            </span>

            <span className="font-medium">

              {invoice.customer.phone || "-"}

            </span>

          </div>

          <div className="flex justify-between">

            <span>

              Total Amount

            </span>

            <span className="font-semibold">

              ₹{invoice.payment.total.toLocaleString()}

            </span>

          </div>

        </div>

        {/* Actions */}

        <div className="grid gap-3">

          <Button
            className="justify-start"
            onClick={() =>
              onWhatsapp(
                invoiceRef,
                invoice.customer.phone
              )
            }
          >

            <MessageCircle className="mr-2 h-5 w-5" />

            Share on WhatsApp

          </Button>

          <Button
            variant="outline"
            className="justify-start"
            onClick={() =>
              onDownload(
                invoiceRef
              )
            }
          >

            <Download className="mr-2 h-5 w-5" />

            Download PDF

          </Button>

          <Button
            variant="outline"
            className="justify-start"
            onClick={() =>
              onPrint(
              )
            }
          >

            <Printer className="mr-2 h-5 w-5" />

            Print Invoice

          </Button>

        </div>

        <DialogFooter>

          <Button
            variant="ghost"
            onClick={() =>
              onOpenChange(false)
            }
          >

            <X className="mr-2 h-4 w-4" />

            Close

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}