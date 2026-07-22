import { NextRequest, NextResponse } from "next/server";

import { admin } from "@/lib/admin";

async function getInventory(
  inventoryId: string
) {
  const { data, error } = await admin
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

async function reserveInventory(
  inventoryId: string,
  quantity: number
) {
  const inventory =
    await getInventory(inventoryId);

  const available =
    inventory.quantity -
    inventory.reserved_quantity;

  if (quantity > available) {
    throw new Error(
      `Only ${available} doors available.`
    );
  }

  await admin
    .from("inventory")
    .update({
      reserved_quantity:
        inventory.reserved_quantity +
        quantity,
    })
    .eq("id", inventoryId);
}

async function releaseReservation(
  inventoryId: string,
  quantity: number
) {
  const inventory =
    await getInventory(inventoryId);

  await admin
    .from("inventory")
    .update({
      reserved_quantity: Math.max(
        0,
        inventory.reserved_quantity -
          quantity
      ),
    })
    .eq("id", inventoryId);
}

async function consumeInventory(
  inventoryId: string,
  quantity: number
) {
  const inventory =
    await getInventory(inventoryId);

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
}

async function addInventoryTransaction(
  inventoryId: string,
  quantity: number,
  type: string,
  note: string
) {
  await admin
    .from("inventory_transactions")
    .insert({
      inventory_id:
        inventoryId,

      quantity,

      type,

      note,
    });
}

async function addOrderLog(
  orderId: string,
  action: string,
  description: string
) {
  await admin
    .from("order_logs")
    .insert({
      order_id: orderId,

      action,

      description,
    });
}

export async function GET() {
  try {
    const { data, error } =
      await admin
        .from("orders")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      return NextResponse.json(
        {
          message:
            error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      data
    );
  } catch {
    return NextResponse.json(
      {
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      inventory_id,
      customer_name,
      customer_phone,
      width,
      height,
      quantity,
      estimated_days,
      customizations,
    } = body;

    if (!inventory_id) {
      return NextResponse.json(
        {
          message:
            "Please select a door size.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !customer_name?.trim()
    ) {
      return NextResponse.json(
        {
          message:
            "Customer name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      quantity <= 0
    ) {
      return NextResponse.json(
        {
          message:
            "Quantity should be greater than zero.",
        },
        {
          status: 400,
        }
      );
    }

    const inventory =
      await getInventory(
        inventory_id
      );

    const available =
      inventory.quantity -
      inventory.reserved_quantity;

    if (
      quantity > available
    ) {
      return NextResponse.json(
        {
          message: `Only ${available} doors available.`,
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: order,
      error,
    } = await admin
      .from("orders")
      .insert({
        inventory_id,

        customer_name,

        customer_phone,

        width,

        height,

        quantity,

        estimated_days,

        status: "pending",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          message:
            error.message,
        },
        {
          status: 400,
        }
      );
    }

    try {
      // Reserve inventory

      await reserveInventory(
        inventory_id,
        quantity
      );

      await addInventoryTransaction(
        inventory_id,
        quantity,
        "reserve",
        `Reserved for Order #${order.order_number}`
      );

      // Customizations

      if (
        customizations &&
        customizations.length > 0
      ) {
        const rows =
          customizations.map(
            (
              item: string
            ) => ({
              order_id:
                order.id,

              title: item,
            })
          );

        await admin
          .from(
            "order_customizations"
          )
          .insert(rows);
      }

      await addOrderLog(
        order.id,
        "Order Created",
        "Order created successfully."
      );

      await addOrderLog(
        order.id,
        "Inventory Reserved",
        `${quantity} doors reserved.`
      );

      return NextResponse.json(
        order
      );
    } catch (e) {
      // Rollback

      await admin
        .from("orders")
        .delete()
        .eq("id", order.id);

      throw e;
    }
  } catch (e) {
    if (
      e instanceof Error
    ) {
      return NextResponse.json(
        {
          message:
            e.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      id,
      inventory_id,
      customer_name,
      customer_phone,
      width,
      height,
      quantity,
      estimated_days,
      status,
    } = body;

    const {
      data: existing,
      error: existingError,
    } = await admin
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (existingError || !existing) {
      return NextResponse.json(
        {
          message: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
    -----------------------------------
    Reservation Adjustment
    -----------------------------------
    */

    if (
      existing.status !== "manufacturing" &&
      existing.status !== "completed"
    ) {

      /*
      Door Size Changed
      */

      if (
        existing.inventory_id !== inventory_id
      ) {

        await releaseReservation(
          existing.inventory_id,
          existing.quantity
        );

        await addInventoryTransaction(
          existing.inventory_id,
          existing.quantity,
          "unreserve",
          `Moved to another door size (Order #${existing.order_number})`
        );

        await reserveInventory(
          inventory_id,
          quantity
        );

        await addInventoryTransaction(
          inventory_id,
          quantity,
          "reserve",
          `Reserved for Order #${existing.order_number}`
        );

      }

      /*
      Same Door Size

      Quantity Changed
      */

      else {

        const difference =
          quantity -
          existing.quantity;

        if (difference > 0) {

          await reserveInventory(
            inventory_id,
            difference
          );

          await addInventoryTransaction(
            inventory_id,
            difference,
            "reserve",
            `Extra reservation for Order #${existing.order_number}`
          );

        }

        if (difference < 0) {

          await releaseReservation(
            inventory_id,
            Math.abs(difference)
          );

          await addInventoryTransaction(
            inventory_id,
            Math.abs(difference),
            "unreserve",
            `Reservation reduced for Order #${existing.order_number}`
          );

        }

      }

    }

    /*
    -----------------------------------
    Manufacturing Started
    -----------------------------------
    */

    if (
      existing.status !== "manufacturing" &&
      status === "manufacturing"
    ) {

      await consumeInventory(
        inventory_id,
        quantity
      );

      await addInventoryTransaction(
        inventory_id,
        quantity,
        "consume",
        `Manufacturing Order #${existing.order_number}`
      );

      await addOrderLog(
        id,
        "Manufacturing Started",
        "Inventory consumed."
      );

    }

    /*
    -----------------------------------
    Cancelled
    -----------------------------------
    */

    if (
      existing.status !== "cancelled" &&
      status === "cancelled" &&
      existing.status !== "manufacturing" &&
      existing.status !== "completed"
    ) {

      await releaseReservation(
        inventory_id,
        quantity
      );

      await addInventoryTransaction(
        inventory_id,
        quantity,
        "unreserve",
        `Cancelled Order #${existing.order_number}`
      );

      await addOrderLog(
        id,
        "Cancelled",
        "Inventory released."
      );

    }

    const { error } =
      await admin
        .from("orders")
        .update({
          inventory_id,

          customer_name,

          customer_phone,

          width,

          height,

          quantity,

          estimated_days,

          status,

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    await addOrderLog(
      id,
      "Order Updated",
      "Order updated."
    );

    return NextResponse.json({
      success: true,
    });

  } catch (e) {

    if (e instanceof Error) {
      return NextResponse.json(
        {
          message: e.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );

  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    const id =
      request.nextUrl.searchParams.get(
        "id"
      );

    if (!id) {
      return NextResponse.json(
        {
          message:
            "Order id is required.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: order,
      error: orderError,
    } = await admin
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        {
          message:
            "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
    ---------------------------------------
    Prevent deleting manufactured orders
    ---------------------------------------
    */

    if (
      order.status ===
        "manufacturing" ||
      order.status ===
        "completed"
    ) {
      return NextResponse.json(
        {
          message:
            "Manufacturing/Completed orders cannot be deleted.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ---------------------------------------
    Release reservation
    ---------------------------------------
    */

    if (
      order.status !==
      "cancelled"
    ) {
      await releaseReservation(
        order.inventory_id,
        order.quantity
      );

      await addInventoryTransaction(
        order.inventory_id,
        order.quantity,
        "unreserve",
        `Deleted Order #${order.order_number}`
      );
    }

    /*
    ---------------------------------------
    Delete child records
    ---------------------------------------
    */

    await admin
      .from(
        "order_customizations"
      )
      .delete()
      .eq(
        "order_id",
        order.id
      );

    await admin
      .from("order_logs")
      .delete()
      .eq(
        "order_id",
        order.id
      );

    /*
    ---------------------------------------
    Delete Order
    ---------------------------------------
    */

    const { error } =
      await admin
        .from("orders")
        .delete()
        .eq(
          "id",
          order.id
        );

    if (error) {
      return NextResponse.json(
        {
          message:
            error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        {
          message:
            e.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}