"use client";

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { InvoiceData } from "../types";

interface Props {

  invoice: InvoiceData;

}

export function InvoicePriceBreakdown({

  invoice,

}: Props) {

  const {

    payment,

    doors,

    options,

  } = invoice;

  return (

    <div className="mt-8 rounded-lg border">

      <div className="border-b bg-muted/40 px-4 py-3">

        <h2 className="text-lg font-semibold">

          Price Breakdown

        </h2>

      </div>

      <div className="p-4">

        {/* ---------------------------------------
            Door Calculations
        --------------------------------------- */}

        <table className="w-full border-collapse text-sm">

          <thead>

            <tr className="border-b">

              <th className="py-2 text-left">

                Door

              </th>

              <th className="py-2 text-right">

                Size

              </th>

              <th className="py-2 text-right">

                Qty

              </th>

              <th className="py-2 text-right">

                Area

              </th>

              <th className="py-2 text-right">

                Rate

              </th>

              <th className="py-2 text-right">

                Total

              </th>

            </tr>

          </thead>

          <tbody>

            {doors.map(

              (
                door: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; height: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; width: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; area: number; pricePerSqft: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; total: number; },
                index: Key | null | undefined
              ) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-3">

                    {door.name}

                  </td>

                  <td className="py-3 text-right">

                    {door.height}
                    {" × "}
                    {door.width}

                  </td>

                  <td className="py-3 text-right">

                    {door.quantity}

                  </td>

                  <td className="py-3 text-right">

                    {door.area.toFixed(2)}

                  </td>

                  <td className="py-3 text-right">

                    ₹
                    {door.pricePerSqft}

                  </td>

                  <td className="py-3 text-right font-medium">

                    ₹
                    {door.total.toFixed(2)}

                  </td>

                </tr>

              )

            )}

          </tbody>

        </table>

        {/* ---------------------------------------
            Summary
        --------------------------------------- */}

        <div className="mt-8 ml-auto max-w-md space-y-2">

          <div className="flex justify-between">

            <span>

              Subtotal

            </span>

            <span>

              ₹
              {payment.subtotal.toFixed(
                2
              )}

            </span>

          </div>

          {options.showAddons &&
            payment.addons.length >
              0 && (

              <>

                {payment.addons.map(

                  (
                    addon: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; amount: any; },
                    index: Key | null | undefined
                  ) => (

                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >

                      <span>

                        {addon.name}

                      </span>

                      <span>

                        + ₹
                        {Number(
                          addon.amount
                        ).toFixed(
                          2
                        )}

                      </span>

                    </div>

                  )

                )}

                <div className="flex justify-between font-medium">

                  <span>

                    Addons Total

                  </span>

                  <span>

                    ₹
                    {payment.addonsTotal.toFixed(
                      2
                    )}

                  </span>

                </div>

              </>

            )}

          {options.showDiscount &&
            payment.discount >
              0 && (

              <div className="flex justify-between text-red-600">

                <span>

                  Discount

                </span>

                <span>

                  − ₹
                  {payment.discount.toFixed(
                    2
                  )}

                </span>

              </div>

            )}

          <div className="border-t pt-3 flex justify-between text-lg font-semibold">

            <span>

              Grand Total

            </span>

            <span>

              ₹
              {payment.total.toFixed(
                2
              )}

            </span>

          </div>

          {options.showAdvance && (

            <>

              <div className="flex justify-between">

                <span>

                  Advance Paid

                </span>

                <span className="text-green-700">

                  ₹
                  {payment.advance.toFixed(
                    2
                  )}

                </span>

              </div>

              <div className="flex justify-between font-semibold">

                <span>

                  Remaining

                </span>

                <span>

                  ₹
                  {payment.remaining.toFixed(
                    2
                  )}

                </span>

              </div>

            </>

          )}

        </div>

      </div>

    </div>

  );

}