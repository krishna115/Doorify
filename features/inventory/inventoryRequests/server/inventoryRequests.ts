import { admin } from "@/lib/admin";

import {
  addInventory,
  addInventoryTransaction,
  getInventory,
} from "@/features/orders/server/inventory";

import {
  OrderLogs,
} from "@/features/orders/server/orderLogs";
import { OrderDoor } from "@/features/orders";

/*
=======================================
Get Inventory Request
=======================================
*/

export async function getInventoryRequest(
  requestId: string
) {

  const { data, error } =
    await admin
      .from("inventory_requests")
      .select("*")
      .eq("id", requestId)
      .single();

  if (error || !data) {
    throw new Error(
      "Inventory request not found."
    );
  }

  return data;

}

/*
=======================================
Get Pending Requests
=======================================
*/

export async function getPendingInventoryRequests() {

  const { data, error } =
    await admin
      .from("inventory_requests")
      .select(`
        *,
        inventory:inventory_id (
          id,
          name
        ),
        orders:order_id (
          id,
          order_number
        )
      `)
      .eq(
        "status",
        "pending"
      )
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  if (error) {
    throw error;
  }

  return data ?? [];

}

/*
=======================================
Get Order Requests
=======================================
*/

export async function getOrderInventoryRequests(
  orderId: string
) {

  const { data, error } =
    await admin
      .from("inventory_requests")
      .select(`
        *,
        inventory:inventory_id (
          id,
          name
        )
      `)
      .eq(
        "order_id",
        orderId
      )
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  if (error) {
    throw error;
  }

  return data ?? [];

}

/*
=======================================
Check Pending Request
=======================================
*/

export async function hasPendingInventoryRequest(
  orderId: string,
  inventoryId: string
) {

  const { data } =
    await admin
      .from("inventory_requests")
      .select("id")
      .eq(
        "order_id",
        orderId
      )
      .eq(
        "inventory_id",
        inventoryId
      )
      .eq(
        "status",
        "pending"
      )
      .maybeSingle();

  return !!data;

}

/*
=======================================
Create Inventory Request
=======================================
*/

interface CreateInventoryRequestParams {

  orderId: string;

  inventoryId: string;

  requestedQuantity: number;

  note?: string;

  requestedBy?: string;

  orderNumber: number;

  doorName: string;

}

export async function createInventoryRequest({

  orderId,

  inventoryId,

  requestedQuantity,

  note,

  requestedBy,

  orderNumber,

  doorName,

}: CreateInventoryRequestParams) {

  const alreadyExists =
    await hasPendingInventoryRequest(
      orderId,
      inventoryId
    );

  if (alreadyExists) {
    throw new Error(
      "A pending inventory request already exists."
    );
  }

  const { data, error } =
    await admin
      .from("inventory_requests")
      .insert({

        order_id:
          orderId,

        inventory_id:
          inventoryId,

        requested_quantity:
          requestedQuantity,

        note:
          note ?? null,

        requested_by:
          requestedBy ?? null,

        status:
          "pending",

      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  await OrderLogs.inventoryRequestCreated(
    orderId,
    doorName,
    requestedQuantity,
    requestedBy
  );

  await OrderLogs.inventoryShortage(
    orderId,
    doorName,
    requestedQuantity,
    requestedBy
  );

  return data;

}

/*
=======================================
Approve Inventory Request
=======================================
*/

interface ApproveInventoryRequestParams {

  requestId: string;

  approvedBy: string;

}

export async function approveInventoryRequest({

  requestId,

  approvedBy,

}: ApproveInventoryRequestParams) {

  const request =
    await getInventoryRequest(
      requestId
    );

  if (
    request.status ===
    "approved"
  ) {
    throw new Error(
      "Inventory request has already been approved."
    );
  }

  /*
  --------------------------
  Add Inventory
  --------------------------
  */

  await addInventory(
    request.inventory_id,
    request.requested_quantity
  );

  /*
  --------------------------
  Transaction
  --------------------------
  */

  await addInventoryTransaction(

    request.inventory_id,

    request.requested_quantity,

    "add",

    "Inventory request approved"

  );

  /*
  --------------------------
  Approve Request
  --------------------------
  */

  const { error } =
    await admin
      .from(
        "inventory_requests"
      )
      .update({

        status:
          "approved",

        approved_by:
          approvedBy,

        approved_at:
          new Date()
            .toISOString(),

      })
      .eq(
        "id",
        requestId
      );

  if (error) {
    throw error;
  }

  return true;

}

/*
=======================================
Cancel Request
=======================================
*/

export async function cancelInventoryRequest(
  requestId: string
) {

  const { error } =
    await admin
      .from(
        "inventory_requests"
      )
      .update({
        status:
          "cancelled",
      })
      .eq(
        "id",
        requestId
      );

  if (error) {
    throw error;
  }

}

/*
=======================================
Create Inventory Requests For Order
=======================================
*/

interface CreateInventoryRequestsForOrderParams {

  orderId: string;

  orderNumber: number;

  doors: OrderDoor[];

  requestedBy?: string;

}

export async function createInventoryRequestsForOrder({

  orderId,

  orderNumber,

  doors,

  requestedBy,

}: CreateInventoryRequestsForOrderParams) {

  for (const door of doors) {

    if (!door.inventory_id) {
      continue;
    }

    /*
    --------------------------
    Current Inventory
    --------------------------
    */

    const inventory = await getInventory(door.inventory_id);

    if (
      inventory.error ||
      !inventory.data
    ) {
      throw new Error(
        "Inventory not found."
      );
    }

    /*
    --------------------------
    Available After Reservation
    --------------------------
    */

    const available =
      inventory.data.quantity -
      inventory.data.reserved_quantity;

    /*
    --------------------------
    No Shortage
    --------------------------
    */

    if (available >= 0) {
      continue;
    }

    /*
    --------------------------
    Create Request
    --------------------------
    */

    await createInventoryRequest({

      orderId,

      inventoryId:
        inventory.data.id,

      requestedQuantity:
        Math.abs(
          available
        ),

      requestedBy,

      orderNumber,

      doorName:
        inventory.data.name,

      note:
        `Required for Order #${orderNumber}`,

    });

  }

}