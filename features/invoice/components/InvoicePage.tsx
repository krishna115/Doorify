"use client";

import { InvoiceCustomerSection } from "../pdf/InvoiceCustomerSection";
import { InvoiceCustomizations } from "../pdf/InvoiceCustomizations";
import { InvoiceDoors } from "../pdf/InvoiceDoors";
import { InvoiceFooter } from "../pdf/InvoiceFooter";
import { InvoiceHeader } from "../pdf/InvoiceHeader";
import { InvoicePriceBreakdown } from "../pdf/InvoicePriceBreakdown";
import {
  InvoiceData,
} from "../types";

interface Props {

  invoice: InvoiceData;

}

export function InvoicePage({

  invoice,

}: Props) {

  return (

    <div className="mx-auto max-w-5xl rounded-xl bg-white p-10 text-black shadow-lg">

      {/* -----------------------------
          Header
      ----------------------------- */}

      <InvoiceHeader

        invoice={invoice}

      />

      {/* -----------------------------
          Customer
      ----------------------------- */}

      {invoice.options.showCustomer && (

        <InvoiceCustomerSection

          invoice={invoice}

        />

      )}

      {/* -----------------------------
          Doors
      ----------------------------- */}

      <InvoiceDoors

        invoice={invoice}

      />

      {/* -----------------------------
          Customizations
      ----------------------------- */}

      {invoice.options.showCustomizations && (

        <InvoiceCustomizations

          invoice={invoice}

        />

      )}

      {/* -----------------------------
          Price Breakdown
      ----------------------------- */}

      {invoice.options.showPriceBreakdown && (

        <InvoicePriceBreakdown

          invoice={invoice}

        />

      )}

      {/* -----------------------------
          Footer
      ----------------------------- */}

      <InvoiceFooter

        invoice={invoice}

      />

    </div>

  );

}