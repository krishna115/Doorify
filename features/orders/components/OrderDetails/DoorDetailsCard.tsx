"use client";

import { useEffect, useState } from "react";

import {
  Order,
} from "../..";

import {
    Inventory,
  InventoryLookupItem,
  InventoryService,
} from "@/features/inventory";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  order: Order;
}

export function DoorDetailsCard({
  order,
}: Props) {

  const [
    inventory,
    setInventory,
  ] = useState<
    Inventory[]
  >([]);

  /*
  ---------------------------------------
  Load Inventory
  ---------------------------------------
  */

  useEffect(() => {

    async function load() {

      try {

        const data =
          await InventoryService.getAll();

        setInventory(
          data
        );

      } catch (error) {

        console.error(
          error
        );

      }

    }

    load();

  }, []);

  /*
  ---------------------------------------
  Helpers
  ---------------------------------------
  */

  function getDoorName(
    inventoryId: string | null
  ) {

    return (
      inventory.find(
        (item) =>
          item.id ===
          inventoryId
      )?.name ??
      inventoryId
    );

  }

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Door Details

        </CardTitle>

      </CardHeader>

      <CardContent>

        {order.doors.length ===
        0 ? (

          <p className="text-sm text-muted-foreground">

            No doors added.

          </p>

        ) : (

          <div className="space-y-4">

            {order.doors.map(
              (
                door,
                index
              ) => (

                <div
                  key={index}
                  className="rounded-lg border p-4"
                >

                  <div className="mb-3 font-medium">

                    Door{" "}
                    {index + 1}

                  </div>

                  <div className="space-y-2">

                    <div className="flex justify-between">

                      <span className="text-muted-foreground">

                        Door Size

                      </span>

                      <span className="font-medium">

                        {getDoorName(
                          door.inventory_id
                        )}

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-muted-foreground">

                        Inventory ID

                      </span>

                      <span className="font-medium text-xs break-all">

                        {
                          door.inventory_id
                        }

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-muted-foreground">

                        Quantity

                      </span>

                      <span className="font-medium">

                        {
                          door.quantity
                        }

                      </span>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </CardContent>

    </Card>

  );

}