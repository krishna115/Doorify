"use client";

import Image from "next/image";

import {
  InvoiceData,
} from "../types";

interface Props {
  invoice: InvoiceData;
}

export function InvoiceCustomizations({
  invoice,
}: Props) {

  const customizations =
    invoice.customizations.filter(
      (item) => item.selected
    );

  if (
    customizations.length === 0
  ) {

    return null;

  }

  return (

    <div className="rounded-xl border bg-white">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">

          Customizations

        </h2>

        <p className="mt-1 text-sm text-muted-foreground">

          Requested door customizations.

        </p>

      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        {customizations.map(
          (item) => (

            <div
              key={item.id}
              className="overflow-hidden rounded-lg border"
            >

              {item.image && (

                <div className="relative aspect-[4/3] w-full bg-muted">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />

                </div>

              )}

              <div className="space-y-2 p-4">

                <h3 className="font-semibold">

                  {item.name}

                </h3>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}