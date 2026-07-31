"use client";

import {
  Inventory,
} from "../types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export interface InventoryTablePermissions {
  canUpdate?: boolean;
  canAdjustStock?: boolean;
  canViewHistory?: boolean;
}

interface InventoryTableProps {
  inventory: Inventory[];

  permissions: InventoryTablePermissions;

  onUpdate?: (item: Inventory) => void;

  onAdjustStock?: (item: Inventory) => void;

  onViewHistory?: (item: Inventory) => void;
}

export function InventoryTable({
  inventory,
  permissions,
  onUpdate,
  onAdjustStock,
  onViewHistory,
}: InventoryTableProps) {
  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>
            Name
          </TableHead>

          <TableHead className="text-right">
            Total
          </TableHead>

          <TableHead className="text-right">
            Reserved
          </TableHead>

          <TableHead className="text-right">
            Available
          </TableHead>

          <TableHead className="text-right">
            Minimum
          </TableHead>

          <TableHead className="text-center">
            Status
          </TableHead>

          {(permissions.canUpdate ||
            permissions.canAdjustStock ||
            permissions.canViewHistory) && (

            <TableHead className="text-right">
              Actions
            </TableHead>

          )}

        </TableRow>

      </TableHeader>

      <TableBody>

        {inventory.map((item) => {

          const available =
            item.quantity -
            item.reserved_quantity;

          const status =
            available === 0
              ? "Out of Stock"
              : available <=
                item.minimum_quantity
              ? "Low Stock"
              : "Healthy";

          return (

            <TableRow key={item.id}>


              <TableCell className="font-medium">
                {item.height} × {item.width}
              </TableCell>

              <TableCell className="text-right font-semibold">
                {item.quantity}
              </TableCell>

              <TableCell className="text-right">
                {item.reserved_quantity}
              </TableCell>

              <TableCell className="text-right font-semibold">
                {available}
              </TableCell>

              <TableCell className="text-right">
                {item.minimum_quantity}
              </TableCell>

              <TableCell className="text-center">

                {status === "Healthy" && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Healthy
                  </span>
                )}

                {status === "Low Stock" && (
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                    Low Stock
                  </span>
                )}

                {status === "Out of Stock" && (
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Out of Stock
                  </span>
                )}

              </TableCell>

              {(permissions.canUpdate ||
                permissions.canAdjustStock ||
                permissions.canViewHistory) && (

                <TableCell className="space-x-2 text-right">

                  {permissions.canUpdate && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdate?.(item)}
                    >
                      Edit
                    </Button>
                  )}

                  {permissions.canAdjustStock && (
                    <Button
                      size="sm"
                      onClick={() => onAdjustStock?.(item)}
                    >
                      Stock
                    </Button>
                  )}

                  {permissions.canViewHistory && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onViewHistory?.(item)}
                    >
                      History
                    </Button>
                  )}

                </TableCell>

              )}

            </TableRow>

          );
        })}

      </TableBody>

    </Table>
  );
}