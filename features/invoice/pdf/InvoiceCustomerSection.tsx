"use client";

import {
  InvoiceData,
} from "../types";

interface Props {
  invoice: InvoiceData;
}

export function InvoiceCustomerSection({
  invoice,
}: Props) {

  return (

    <div className="grid gap-6 md:grid-cols-2">

      {/* ----------------------------------
          Customer Details
      ---------------------------------- */}

      <div className="rounded-xl border bg-white p-6">

        <h3 className="mb-5 text-lg font-semibold">

          Customer Details

        </h3>

        <div className="space-y-4">

          {invoice.options.showCustomer && (

            <div>

              <p className="text-xs uppercase tracking-wide text-muted-foreground">

                Customer Name

              </p>

              <p className="mt-1 text-base font-medium">

                {invoice.customer.name}

              </p>

            </div>

          )}

          {invoice.options.showPhone && (

            <div>

              <p className="text-xs uppercase tracking-wide text-muted-foreground">

                Phone Number

              </p>

              <p className="mt-1 text-base font-medium">

                {invoice.customer.phone || "-"}

              </p>

            </div>

          )}

        </div>

      </div>

      {/* ----------------------------------
          Order Details
      ---------------------------------- */}

      <div className="rounded-xl border bg-white p-6">

        <h3 className="mb-5 text-lg font-semibold">

          Order Details

        </h3>

        <div className="space-y-4">

          {invoice.options.showOrderNumber && (

            <div className="flex justify-between">

              <span className="text-muted-foreground">

                Order Number

              </span>

              <span className="font-semibold">

                #{invoice.order.order_number}

              </span>

            </div>

          )}

          {invoice.options.showDate && (

            <div className="flex justify-between">

              <span className="text-muted-foreground">

                Order Date

              </span>

              <span>

                {new Date(
                  invoice.order.created_at
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}

              </span>

            </div>

          )}

          {invoice.options.showSalesperson && (

            <div className="flex justify-between">

              <span className="text-muted-foreground">

                Salesperson

              </span>

              <span>

                {invoice.salesperson.name || "-"}

              </span>

            </div>

          )}

          <div className="flex justify-between">

            <span className="text-muted-foreground">

              Status

            </span>

            <span className="font-medium capitalize">

              {invoice.order.status.replaceAll(
                "_",
                " "
              )}

            </span>

          </div>

          {invoice.order.estimated_days && (

            <div className="flex justify-between">

              <span className="text-muted-foreground">

                Estimated Delivery

              </span>

              <span>

                {invoice.order.estimated_days} Days

              </span>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}