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

  const hasActions =
    permissions.canUpdate ||
    permissions.canAdjustStock ||
    permissions.canViewHistory;

  return (

    <>

      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}

      <div className="hidden md:block">

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

              <TableHead className="text-center">
                Status
              </TableHead>

              {hasActions && (

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
                getInventoryStatus(
                  available,
                  item.minimum_quantity
                );

              return (

                <TableRow key={item.id}>

                  <TableCell className="font-medium">
                    {item.name}
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

                  <TableCell className="text-center">

                    <InventoryStatus
                      status={status}
                    />

                  </TableCell>

                  {hasActions && (

                    <TableCell className="space-x-2 text-right">

                      {permissions.canAdjustStock && (

                        <Button
                          size="sm"
                          onClick={() =>
                            onAdjustStock?.(item)
                          }
                        >
                          Stock
                        </Button>

                      )}

                      {permissions.canViewHistory && (

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            onViewHistory?.(item)
                          }
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

      </div>


      {/* =====================================================
          MOBILE CARDS
      ====================================================== */}

      <div className="space-y-3 md:hidden">

        {inventory.length === 0 && (

          <div className="rounded-lg border py-10 text-center text-sm text-muted-foreground">

            No inventory found.

          </div>

        )}

        {inventory.map((item) => {

          const available =
            item.quantity -
            item.reserved_quantity;

          const status =
            getInventoryStatus(
              available,
              item.minimum_quantity
            );

          return (

            <div
              key={item.id}
              className="rounded-xl border bg-background p-4"
            >

              {/* ---------------------------------------------
                  Name + Status
              ---------------------------------------------- */}

              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                  <p className="truncate font-semibold">

                    {item.name}

                  </p>

                </div>

                <InventoryStatus
                  status={status}
                />

              </div>


              {/* ---------------------------------------------
                  Inventory Numbers
              ---------------------------------------------- */}

              <div className="mt-4 grid grid-cols-3 gap-2">

                <InventoryValue
                  label="Total"
                  value={item.quantity}
                />

                <InventoryValue
                  label="Reserved"
                  value={item.reserved_quantity}
                />

                <InventoryValue
                  label="Available"
                  value={available}
                  emphasize
                />

              </div>


              {/* ---------------------------------------------
                  Actions
              ---------------------------------------------- */}

              {hasActions && (

                <div className="mt-4 flex gap-2">

                  {permissions.canAdjustStock && (

                    <Button
                      className="h-9 flex-1"
                      size="sm"
                      onClick={() =>
                        onAdjustStock?.(item)
                      }
                    >
                      Stock
                    </Button>

                  )}

                  {permissions.canViewHistory && (

                    <Button
                      className="h-9 flex-1"
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        onViewHistory?.(item)
                      }
                    >
                      History
                    </Button>

                  )}

                </div>

              )}

            </div>

          );

        })}

      </div>

    </>

  );

}


/* =========================================================
   Inventory Value
========================================================= */

interface InventoryValueProps {

  label: string;

  value: number;

  emphasize?: boolean;

}

function InventoryValue({
  label,
  value,
  emphasize,
}: InventoryValueProps) {

  return (

    <div className="rounded-lg bg-muted/50 px-2 py-2.5 text-center">

      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">

        {label}

      </p>

      <p
        className={`
          mt-0.5
          text-sm
          ${
            emphasize
              ? "font-bold"
              : "font-semibold"
          }
        `}
      >

        {value}

      </p>

    </div>

  );

}


/* =========================================================
   Inventory Status
========================================================= */

type InventoryStatusType =
  | "Healthy"
  | "Low Stock"
  | "Out of Stock";

function InventoryStatus({
  status,
}: {
  status: InventoryStatusType;
}) {

  if (status === "Healthy") {

    return (

      <span className="whitespace-nowrap rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700 sm:text-xs">

        Healthy

      </span>

    );

  }

  if (status === "Low Stock") {

    return (

      <span className="whitespace-nowrap rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-medium text-yellow-700 sm:text-xs">

        Low Stock

      </span>

    );

  }

  return (

    <span className="whitespace-nowrap rounded-full bg-red-100 px-2 py-1 text-[10px] font-medium text-red-700 sm:text-xs">

      Out of Stock

    </span>

  );

}


/* =========================================================
   Inventory Status Logic
========================================================= */

function getInventoryStatus(
  available: number,
  minimumQuantity: number
): InventoryStatusType {

  if (available === 0) {

    return "Out of Stock";

  }

  if (
    available <=
    minimumQuantity
  ) {

    return "Low Stock";

  }

  return "Healthy";

}