"use client";

import {
  InventoryLookupItem,
} from "@/features/inventory";

import {
  OrderDoor,
} from "../..";

import {
  Button,
} from "@/components/ui/button";

import {
  DoorSelectionCard,
} from "./DoorSelectionCard";

interface Props {

  inventory: InventoryLookupItem[];

  inventoryLoading: boolean;

  doors: OrderDoor[];

  onDoorsChange: (
    doors: OrderDoor[]
  ) => void;

  onAddDoor: () => void;

  onRemoveDoor: (
    index: number
  ) => void;

  onUpdateDoor: (
    index: number,
    door: OrderDoor
  ) => void;

}

export function DoorSelectionList({

  inventory,

  inventoryLoading,

  doors,

  onDoorsChange,

  onAddDoor,

  onRemoveDoor,

  onUpdateDoor,

}: Props) {

  return (

    <div className="space-y-4">

      {doors.map((door, index) => (

        <DoorSelectionCard
          key={index}
          inventory={inventory}
          inventoryLoading={inventoryLoading}
          door={door}
          removable={doors.length > 1}
          onRemove={() =>
            onRemoveDoor(index)
          }
          onChange={(door) =>
            onUpdateDoor(
              index,
              door
            )
          }
        />

      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onAddDoor}
      >
        + Add Another Door
      </Button>

    </div>

  );

}