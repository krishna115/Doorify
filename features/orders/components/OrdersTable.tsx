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

  return (

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

        {orders.length === 0 && (

          <TableRow>

            <TableCell
              colSpan={7}
              className="py-12 text-center text-muted-foreground"
            >
              No orders found.
            </TableCell>

          </TableRow>

        )}

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

              <TableCell className="text-right space-x-2">

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

              </TableCell>

            </TableRow>

          );

        })}

      </TableBody>

    </Table>

  );

}