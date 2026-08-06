import { admin } from "@/lib/admin";

/*
---------------------------------------
Add Single Log
---------------------------------------
*/

export async function createOrderLog(
  orderId: string,
  action: string,
  description: string,
  userId?: string | null
) {
  const { error } =
    await admin
      .from("order_logs")
      .insert({
        order_id: orderId,

        action,

        description,

        user_id: userId ?? null,
      });

  if (error) {
    throw error;
  }
}

/*
=======================================
Order Log Helper
=======================================
*/

export class 

OrderLogs {

  /*
  ---------------------------------------
  Order Created
  ---------------------------------------
  */

  static async orderCreated(
    orderId: string,
    orderNumber: number,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "order_created",
      `Order #${orderNumber} created.`,
      userId
    );

  }

    static async orderAccepted(
    orderId: string,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "order_accepted",
      `Order accepted and ready for production.`,
      userId
    );

  }
  /*
  ---------------------------------------
  Inventory Reserved
  ---------------------------------------
  */

  static async inventoryReserved(
    orderId: string,
    doorName: string,
    quantity: number,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "inventory_reserved",
      `${quantity} ${doorName} reserved.`,
      userId
    );

  }

  /*
  ---------------------------------------
  Inventory Shortage
  ---------------------------------------
  */

  static async inventoryShortage(
    orderId: string,
    doorName: string,
    shortage: number,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "inventory_shortage",
      `Waiting for ${shortage} more ${doorName}.`,
      userId
    );

  }

  /*
  ---------------------------------------
  Inventory Request Created
  ---------------------------------------
  */

  static async inventoryRequestCreated(
    orderId: string,
    doorName: string,
    quantity: number,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "inventory_request_created",
      `Inventory request created for ${quantity} ${doorName}.`,
      userId
    );

  }

  /*
  ---------------------------------------
  Inventory Available
  ---------------------------------------
  */

  static async inventoryAvailable(
    orderId: string,
    doorName: string,
    quantity: number,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "inventory_available",
      `${quantity} ${doorName} added to inventory.`,
      userId
    );

  }

  /*
  ---------------------------------------
  Production Started
  ---------------------------------------
  */

  static async productionStarted(
    orderId: string,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "production_started",
      "Production started.",
      userId
    );

  }

  /*
  ---------------------------------------
  Production Completed
  ---------------------------------------
  */

  static async productionCompleted(
    orderId: string,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "production_completed",
      "Production completed.",
      userId
    );

  }

  /*
  ---------------------------------------
  Order Ready
  ---------------------------------------
  */

  static async orderReady(
    orderId: string,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "order_ready",
      "Order marked as ready.",
      userId
    );

  }

  /*
  ---------------------------------------
  Order Dispatched
  ---------------------------------------
  */

  static async orderDispatched(
    orderId: string,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "order_dispatched",
      "Order dispatched.",
      userId
    );

  }

  /*
  ---------------------------------------
  Order Delivered
  ---------------------------------------
  */

  static async orderDelivered(
    orderId: string,
    userId?: string
  ) {

    await createOrderLog(
      orderId,
      "order_delivered",
      "Order delivered.",
      userId
    );

  }

  /*
---------------------------------------
Payment Received
---------------------------------------
*/

static async paymentReceived(
  orderId: string,
  amount: number,
  paymentMethod?: string,
  userId?: string
) {

  await createOrderLog(

    orderId,

    "payment_received",

    `Payment of ₹${amount}.`,

    userId

  );

}

/*
---------------------------------------
Payment Deleted
---------------------------------------
*/

static async paymentDeleted(
  orderId: string,
  userId?: string
) {

  await createOrderLog(

    orderId,

    "payment_deleted",

    "A payment entry was deleted.",

    userId

  );

}

}

