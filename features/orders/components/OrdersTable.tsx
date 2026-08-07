"use client";

import Link from "next/link";

import { Order } from "..";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { OrderStatusBadge } from "./OrderStatusBadge";

export interface OrdersTablePermissions {
  canEdit?: boolean;
  canDelete?: boolean;
  canAccept?: boolean;
}

interface Props {
  orders: Order[];

  basePath: string;

  permissions: OrdersTablePermissions;

  onEdit?: (order: Order) => void;

  onDelete?: (order: Order) => void;

  onAccept?: (order: Order) => void;
}

export function OrdersTable({
  orders,
  basePath,
  permissions,
  onEdit,
  onDelete,
  onAccept,
}: Props) {

  /*
  ---------------------------------------
  Empty State
  ---------------------------------------
  */

  if (orders.length === 0) {
    return (
      <div className="rounded-lg border bg-background px-4 py-12 text-center text-sm text-muted-foreground">
        No orders found.
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="space-y-3 md:hidden">

        {orders.map((order) => {

          const totalQuantity =
            order.doors.reduce(
              (sum, door) =>
                sum + door.quantity,
              0
            );

          return (
            <div
              key={order.id}
              className="rounded-xl border bg-background p-4 shadow-sm"
            >

              {/* ---------------------------------------
                  Top
              --------------------------------------- */}

              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                  <p className="text-xs font-medium text-muted-foreground">
                    Order
                  </p>

                  <p className="text-lg font-semibold">
                    #{order.order_number}
                  </p>

                </div>

                <OrderStatusBadge
                  status={order.status}
                />

              </div>

              {/* ---------------------------------------
                  Customer
              --------------------------------------- */}

              <div className="mt-4">

                <p className="truncate font-medium">
                  {order.customer_name}
                </p>

                {order.customer_phone && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {order.customer_phone}
                  </p>
                )}

              </div>

              {/* ---------------------------------------
                  Order Stats
              --------------------------------------- */}

              <div className="mt-4 grid grid-cols-3 divide-x rounded-lg border bg-muted/20">

                <div className="px-3 py-3 text-center">

                  <p className="text-xs text-muted-foreground">
                    Doors
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.doors.length}
                  </p>

                </div>

                <div className="px-3 py-3 text-center">

                  <p className="text-xs text-muted-foreground">
                    Qty
                  </p>

                  <p className="mt-1 font-semibold">
                    {totalQuantity}
                  </p>

                </div>

                <div className="px-3 py-3 text-center">

                  <p className="text-xs text-muted-foreground">
                    Est.
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.estimated_days
                      ? `${order.estimated_days}d`
                      : "--"}
                  </p>

                </div>

              </div>

              {/* ---------------------------------------
                  Actions
              --------------------------------------- */}

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">

                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0"
                >
                  <Link
                    href={`${basePath}/${order.id}`}
                  >
                    View
                  </Link>
                </Button>

                {permissions.canAccept &&
                  order.status === "pending" && (

                  <Button
                    size="sm"
                    onClick={() =>
                      onAccept?.(order)
                    }
                    className="shrink-0"
                  >
                    Accept
                  </Button>

                )}

                {permissions.canEdit && (

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onEdit?.(order)
                    }
                    className="shrink-0"
                  >
                    Edit
                  </Button>

                )}

                {permissions.canDelete && (

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      onDelete?.(order)
                    }
                    className="shrink-0"
                  >
                    Delete
                  </Button>

                )}

              </div>

            </div>
          );

        })}

      </div>

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div className="hidden md:block">

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

            {orders.map((order) => {

              const totalQuantity =
                order.doors.reduce(
                  (sum, door) =>
                    sum + door.quantity,
                  0
                );

              return (

                <TableRow key={order.id}>

                  <TableCell>
                    #{order.order_number}
                  </TableCell>

                  <TableCell>

                    <div>

                      <p className="font-medium">
                        {order.customer_name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {order.customer_phone}
                      </p>

                    </div>

                  </TableCell>

                  <TableCell>

                    {order.doors.length}

                    {" "}

                    {order.doors.length === 1
                      ? "Door"
                      : "Doors"}

                  </TableCell>

                  <TableCell>
                    {totalQuantity}
                  </TableCell>

                  <TableCell>

                    <OrderStatusBadge
                      status={order.status}
                    />

                  </TableCell>

                  <TableCell>

                    {order.estimated_days
                      ? `${order.estimated_days} Days`
                      : "--"}

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

                      {permissions.canAccept &&
                        order.status === "pending" && (

                        <Button
                          size="sm"
                          onClick={() =>
                            onAccept?.(order)
                          }
                        >
                          Accept
                        </Button>

                      )}

                      {permissions.canEdit && (

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            onEdit?.(order)
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
                            onDelete?.(order)
                          }
                        >
                          Delete
                        </Button>

                      )}

                    </div>

                  </TableCell>

                </TableRow>

              );

            })}

          </TableBody>

        </Table>

      </div>
    </>
  );
}