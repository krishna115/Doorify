"use client";

import {
  InvoiceData,
} from "../types";

interface Props {
  invoice: InvoiceData;
}

export function InvoiceDoors({
  invoice,
}: Props) {

  return (

    <div className="rounded-xl border bg-white">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">

          Door Details

        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-muted/40">

            <tr>

              <th className="px-4 py-3 text-left text-sm font-semibold">

                Door

              </th>

              <th className="px-4 py-3 text-center text-sm font-semibold">

                Size

              </th>

              <th className="px-4 py-3 text-center text-sm font-semibold">

                Qty

              </th>

              <th className="px-4 py-3 text-center text-sm font-semibold">

                Area / Door

              </th>

              <th className="px-4 py-3 text-center text-sm font-semibold">

                Total Area

              </th>

              <th className="px-4 py-3 text-right text-sm font-semibold">

                Price / Sq.Ft.

              </th>

              <th className="px-4 py-3 text-right text-sm font-semibold">

                Total

              </th>

            </tr>

          </thead>

          <tbody>

            {invoice.doors.map(

              (
                door,
                index
              ) => {

                const areaPerDoor =
                  (
                    door.width *
                    door.height
                  ) / 144;

                const totalArea =
                  areaPerDoor *
                  door.quantity;

                const total =
                  totalArea *
                  invoice.payment.pricePerSqft;

                return (

                  <tr
                    key={index}
                    className="border-t"
                  >

                    <td className="px-4 py-4">

                      <div className="font-medium">

                        {door.name ??

                          `Door ${index + 1}`}

                      </div>

                    </td>

                    <td className="px-4 py-4 text-center">

                      {door.height}"

                      {" × "}

                      {door.width}"

                    </td>

                    <td className="px-4 py-4 text-center">

                      {door.quantity}

                    </td>

                    <td className="px-4 py-4 text-center">

                      {areaPerDoor.toFixed(
                        2
                      )} sq.ft.

                    </td>

                    <td className="px-4 py-4 text-center">

                      {totalArea.toFixed(
                        2
                      )} sq.ft.

                    </td>

                    <td className="px-4 py-4 text-right">

                      ₹
                      {invoice.payment.pricePerSqft.toLocaleString()}

                    </td>

                    <td className="px-4 py-4 text-right font-semibold">

                      ₹
                      {Math.round(
                        total
                      ).toLocaleString()}

                    </td>

                  </tr>

                );

              }

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}