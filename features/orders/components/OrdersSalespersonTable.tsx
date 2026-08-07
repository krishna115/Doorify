"use client";

import Link from "next/link";

import {
  Order,
} from "@/features/orders";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Button,
} from "@/components/ui/button";

import {
  OrderStatusBadge,
} from "./OrderStatusBadge";

interface Props {

  orders: Order[];

  basePath: string;

  permissions: {

    canEdit?: boolean;

    canDelete?: boolean;

  };

  onEdit?: (
    order: Order
  ) => void;

  onDelete?: (
    order: Order
  ) => void;

}

/*
-----------------------------------------
Salesperson Table
-----------------------------------------
*/

export function OrdersSalespersonTable({

  orders,

  basePath,

  permissions,

  onEdit,

  onDelete,

}: Props) {

  /*
  ---------------------------------------
  Group Orders
  ---------------------------------------
  */

  const groupedOrders =
    orders.reduce(

      (
        groups,
        order
      ) => {

        const salespersonId =
          order.created_by ??
          "unknown";

        if (
          !groups[salespersonId]
        ) {

          groups[salespersonId] = [];

        }

        groups[salespersonId].push(
          order
        );

        return groups;

      },

      {} as Record<
        string,
        Order[]
      >

    );

  /*
  ---------------------------------------
  Sort Salespeople
  ---------------------------------------
  */

  const salespersonGroups =
    Object.entries(
      groupedOrders
    ).sort(
      (
        [, ordersA],
        [, ordersB]
      ) => {

        const nameA =
          getSalespersonName(
            ordersA[0]
          );

        const nameB =
          getSalespersonName(
            ordersB[0]
          );

        return nameA.localeCompare(
          nameB
        );

      }
    );

  /*
  ---------------------------------------
  Empty
  ---------------------------------------
  */

  if (
    salespersonGroups.length === 0
  ) {

    return (

      <div className="rounded-lg border p-10 text-center text-muted-foreground">

        No orders found.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      {salespersonGroups.map(

        ([salespersonId, salespersonOrders]) => {

          const salespersonName =
            getSalespersonName(
              salespersonOrders[0]
            );

          return (

            <div
              key={salespersonId}
              className="overflow-hidden rounded-lg border"
            >

              {/* =========================
                  Salesperson Header
              ========================== */}

              <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">

                <div>

                  <h2 className="font-semibold">

                    {salespersonName}

                  </h2>

                  <p className="text-xs text-muted-foreground">

                    {salespersonOrders.length}{" "}

                    {salespersonOrders.length === 1
                      ? "Order"
                      : "Orders"}

                  </p>

                </div>

              </div>

              {/* =========================
                  Orders Table
              ========================== */}

              <Table>

                <TableHeader>

                  <TableRow>

                    <TableHead>
                      #
                    </TableHead>

                    <TableHead>
                      Customer
                    </TableHead>

                    <TableHead>
                      Doors
                    </TableHead>

                    <TableHead>
                      Total Qty
                    </TableHead>

                    <TableHead>
                      Status
                    </TableHead>

                    <TableHead>
                      Est.
                    </TableHead>

                    <TableHead className="text-right">
                      Actions
                    </TableHead>

                  </TableRow>

                </TableHeader>

                <TableBody>

                  {salespersonOrders.map(
                    order => {

                      const totalQuantity =
                        order.doors.reduce(
                          (
                            sum,
                            door
                          ) =>
                            sum +
                            door.quantity,
                          0
                        );

                      return (

                        <TableRow
                          key={
                            order.id
                          }
                        >

                          <TableCell>

                            #
                            {order.order_number}

                          </TableCell>

                          <TableCell>

                            <div>

                              <p className="font-medium">

                                {
                                  order.customer_name
                                }

                              </p>

                              <p className="text-xs text-muted-foreground">

                                {
                                  order.customer_phone ||
                                  "--"
                                }

                              </p>

                            </div>

                          </TableCell>

                          <TableCell>

                            {
                              order.doors.length
                            }

                          </TableCell>

                          <TableCell className="font-semibold">

                            {
                              totalQuantity
                            }

                          </TableCell>

                          <TableCell>

                            <OrderStatusBadge
                              status={
                                order.status
                              }
                            />

                          </TableCell>

                          <TableCell>

                            {
                              order.estimated_days
                                ? `${order.estimated_days} Days`
                                : "--"
                            }

                          </TableCell>

                          <TableCell className="text-right">

                            <div className="flex justify-end gap-2">

                              <Button
                                size="sm"
                                variant="outline"
                              >

                                <Link
                                  href={`${basePath}/${order.id}`}
                                >
                                  View
                                </Link>

                              </Button>

                              {permissions.canEdit && (

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    onEdit?.(
                                      order
                                    )
                                  }
                                >

                                  Edit

                                </Button>

                              )}

                              {permissions.canDelete && (

                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    onDelete?.(
                                      order
                                    )
                                  }
                                >

                                  Delete

                                </Button>

                              )}

                            </div>

                          </TableCell>

                        </TableRow>

                      );

                    }
                  )}

                </TableBody>

              </Table>

            </div>

          );

        }

      )}

    </div>

  );

}

/*
-----------------------------------------
Salesperson Name
-----------------------------------------
*/

function getSalespersonName(
  order: Order
): string {

  /*
   * Preferred:
   * order.created_by_name
   *
   * If your API returns a nested
   * creator object, use that instead.
   */

  if (
    "created_by_name" in order &&
    typeof order.created_by_name === "string"
  ) {

    return order.created_by_name;

  }

  return "Unknown Salesperson";

}