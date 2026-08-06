"use client";

import Image from "next/image";

import {
  InvoiceData,
} from "../types";

interface Props {
  invoice: InvoiceData;
}

export function InvoiceHeader({
  invoice,
}: Props) {

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  return (

    <div className="rounded-xl border bg-white p-8 shadow-sm">

      <div className="flex items-start justify-between">

        {/* ----------------------------------
            Company
        ---------------------------------- */}

        <div className="flex items-center gap-5">

          <Image
            src="/doorify_logo.jpeg"
            alt="Doorify"
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />

          <div>

            <h1 className="text-3xl font-bold tracking-tight">

              Doorify

            </h1>

            <p className="mt-1 text-sm text-muted-foreground">

              Order Confirmation

            </p>

            <div className="mt-4 space-y-1 text-sm text-muted-foreground">

              <p>

                Door Manufacturing Solution

              </p>

              <p>

                Kanpur, Uttar Pradesh

              </p>

            </div>

          </div>

        </div>

        {/* ----------------------------------
            Invoice Details
        ---------------------------------- */}

        <div className="rounded-lg border bg-muted/30 p-5 text-right">

          <p className="text-xs uppercase tracking-widest text-muted-foreground">

            Invoice

          </p>

          <h2 className="mt-2 text-3xl font-bold">

            #{invoice.order.order_number}

          </h2>

          <div className="mt-6 space-y-2 text-sm">

            <div className="flex justify-between gap-8">

              <span className="text-muted-foreground">

                Date

              </span>

              <span className="font-medium">

                {today}

              </span>

            </div>

            <div className="flex justify-between gap-8">

              <span className="text-muted-foreground">

                Status

              </span>

              <span className="font-semibold capitalize">

                {invoice.order.status.replaceAll(
                  "_",
                  " "
                )}

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ----------------------------------
          Divider
      ---------------------------------- */}

      <div className="my-8 border-t" />

      {/* ----------------------------------
          Title
      ---------------------------------- */}

      <div className="text-center">

        <h2 className="text-2xl font-bold">

          CUSTOMER INVOICE

        </h2>

        <p className="mt-2 text-sm text-muted-foreground">

          Thank you for choosing us.
          Below are the details of your order.

        </p>

      </div>

    </div>

  );

}