import { admin } from "@/lib/admin";

import {
  OrderDoor,
} from "../types";


/*
---------------------------------------
Get Inventory
---------------------------------------
*/

export async function getInventory(
  inventoryId: string
) {
  const { data, error } =
    await admin
      .from("inventory")
      .select("*")
      .eq("id", inventoryId)
      .single();

  if (error || !data) {
    throw new Error(
      "Inventory not found."
    );
  }

  return data;
}


/*
---------------------------------------
Reserve Single Inventory
---------------------------------------
*/

export async function reserveInventory(
  inventoryId: string,
  quantity: number
) {
  const inventory =
    await getInventory(inventoryId);


  const { error } =
    await admin
      .from("inventory")
      .update({
        reserved_quantity:
          inventory.reserved_quantity +
          quantity,
      })
      .eq("id", inventoryId);


  if (error) {
    throw error;
  }
}


/*
---------------------------------------
Release Single Reservation
---------------------------------------
*/

export async function releaseReservation(
  inventoryId: string,
  quantity: number
) {
  const inventory =
    await getInventory(inventoryId);


  const { error } =
    await admin
      .from("inventory")
      .update({
        reserved_quantity:
          inventory.reserved_quantity -
          quantity,
      })
      .eq("id", inventoryId);


  if (error) {
    throw error;
  }
}


/*
---------------------------------------
Consume Single Inventory
---------------------------------------
*/

export async function consumeInventory(
  inventoryId: string,
  quantity: number
) {
  const inventory =
    await getInventory(inventoryId);


  const { error } =
    await admin
      .from("inventory")
      .update({
        quantity:
          inventory.quantity -
          quantity,

        reserved_quantity:
          inventory.reserved_quantity -
          quantity,
      })
      .eq("id", inventoryId);


  if (error) {
    throw error;
  }
}


/*
---------------------------------------
Inventory Transaction
---------------------------------------
*/

export async function addInventoryTransaction(
  inventoryId: string,
  quantity: number,
  type: string,
  note: string
) {

  const { error } =
    await admin
      .from(
        "inventory_transactions"
      )
      .insert({
        inventory_id:
          inventoryId,

        quantity,

        type,

        note,
      });


  if (error) {
    throw error;
  }
}


/*
=======================================
DOOR LEVEL FUNCTIONS
=======================================
*/


/*
---------------------------------------
Reserve Doors
---------------------------------------
*/

export async function reserveDoors(
  doors: OrderDoor[],
  orderNumber?: number
) {

  for (const door of doors) {

    if (!door.inventory_id) {
      continue;
    }


    await reserveInventory(
      door.inventory_id,
      door.quantity
    );


    await addInventoryTransaction(
      door.inventory_id,
      door.quantity,
      "reserve",
      orderNumber
        ? `Manufacturing Order #${orderNumber}`
        : "Manufacturing"
    );
  }
}


/*
---------------------------------------
Release Doors
---------------------------------------
*/

export async function releaseDoors(
  doors: OrderDoor[],
  orderNumber?: number
) {

  for (const door of doors) {

    if (!door.inventory_id) {
      continue;
    }


    await releaseReservation(
      door.inventory_id,
      door.quantity
    );


    await addInventoryTransaction(
      door.inventory_id,
      door.quantity,
      "unreserve",
      orderNumber
        ? `Reservation released for Order #${orderNumber}`
        : "Reservation released"
    );
  }
}


/*
---------------------------------------
Consume Doors
---------------------------------------
*/

export async function consumeDoors(
  doors: OrderDoor[],
  orderNumber?: number
) {

  for (const door of doors) {

    if (!door.inventory_id) {
      continue;
    }


    await consumeInventory(
      door.inventory_id,
      door.quantity
    );


    await addInventoryTransaction(
      door.inventory_id,
      door.quantity,
      "consume",
      orderNumber
        ? `Manufacturing Order #${orderNumber}`
        : "Manufacturing"
    );
  }
}


/*
---------------------------------------
Adjust Door Reservations
---------------------------------------
*/

export async function adjustDoorReservations(
  oldDoors: OrderDoor[],
  newDoors: OrderDoor[],
  orderNumber?: number
) {

  const inventoryMap =
    new Map<
      string,
      {
        oldQuantity:number;
        newQuantity:number;
      }
    >();


  /*
  Old state
  */

  for (const door of oldDoors) {

    if (!door.inventory_id)
      continue;


    inventoryMap.set(
      door.inventory_id,
      {
        oldQuantity:
          door.quantity,

        newQuantity:
          0,
      }
    );
  }


  /*
  New state
  */

  for (const door of newDoors) {

    if (!door.inventory_id)
      continue;


    const existing =
      inventoryMap.get(
        door.inventory_id
      );


    if(existing){

      existing.newQuantity =
        door.quantity;

    } else {

      inventoryMap.set(
        door.inventory_id,
        {
          oldQuantity:0,
          newQuantity:
            door.quantity,
        }
      );
    }
  }



  /*
  Apply Difference
  */

  for(
    const [
      inventoryId,
      quantity
    ]
    of inventoryMap
  ){

    const difference =
      quantity.newQuantity -
      quantity.oldQuantity;


    if(
      difference === 0
    ){
      continue;
    }



    if(
      difference > 0
    ){

      await reserveInventory(
        inventoryId,
        difference
      );


      await addInventoryTransaction(
        inventoryId,
        difference,
        "reserve",
        orderNumber
          ? `Reservation increased for Order #${orderNumber}`
          : "Reservation increased"
      );

    }



    if(
      difference < 0
    ){

      const releaseQty =
        Math.abs(
          difference
        );


      await releaseReservation(
        inventoryId,
        releaseQty
      );


      await addInventoryTransaction(
        inventoryId,
        releaseQty,
        "unreserve",
        orderNumber
          ? `Reservation decreased for Order #${orderNumber}`
          : "Reservation decreased"
      );
    }
  }
}

/*
---------------------------------------
Add Inventory
---------------------------------------
*/

export async function addInventory(
  inventoryId: string,
  quantity: number
) {

  const inventory =
    await getInventory(
      inventoryId
    );

  const { error } =
    await admin
      .from("inventory")
      .update({

        quantity:
          inventory.quantity +
          quantity,

      })
      .eq(
        "id",
        inventoryId
      );

  if (error) {
    throw error;
  }

}