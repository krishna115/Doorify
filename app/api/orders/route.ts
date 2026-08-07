import { NextRequest, NextResponse } from "next/server";

import { admin } from "@/lib/admin";

import {
  requireAuth,
} from "@/lib/auth";

import {
  reserveDoors,
  consumeDoors,
  releaseDoors,
  adjustDoorReservations,
} from "@/features/orders/server/inventory";

import {
  createOrderLog,
  OrderLogs,
} from "@/features/orders/server/orderLogs";
import { PaymentService } from "@/features/orders/services/PaymentService";

export async function GET() {

  try {

    const { data, error } =
      await admin
        .from("orders")
        .select(`
          *,
          created_by_profile:profiles!orders_created_by_fkey (
            id,
            name
          )
        `)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );


    if (error) {

      throw error;

    }


    return NextResponse.json(
      data
    );


  } catch (e) {

    console.error(e);


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

    console.log("========== CREATE ORDER ==========");

    const currentUser =
      await requireAuth();

    console.log(
      "STEP 1 : Current User",
      currentUser
    );

    const body =
      await request.json();

    console.log(
      "STEP 2 : Body Received",
      body
    );

    const {

      customer_name,

      customer_phone,

      estimated_days,

      doors,price_per_sqft,
  discount,
  addons,
  total_amount,

    } = body;

    /*
    ----------------------------------
    Validation
    ----------------------------------
    */

    if (!customer_name?.trim()) {

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

    if (!customer_phone?.trim()) {

      return NextResponse.json(
        {
          message:
            "Customer phone is required.",
        },
        {
          status: 400,
        }
      );

    }

    if (
      !Array.isArray(
        doors
      ) ||
      doors.length === 0
    ) {

      return NextResponse.json(
        {
          message:
            "Please add at least one door.",
        },
        {
          status: 400,
        }
      );

    }

    for (const door of doors) {

      if (
        !door.inventory_id
      ) {

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
        door.quantity <= 0
      ) {

        return NextResponse.json(
          {
            message:
              "Door quantity should be greater than zero.",
          },
          {
            status: 400,
          }
        );

      }

    }

    console.log(
      "STEP 3 : Validation Passed"
    );

    /*
    ----------------------------------
    Create Order First
    ----------------------------------
    */

    const {

      data: order,

      error,

    } =
      await admin
        .from("orders")
        .insert({

  customer_name,
  customer_phone,

  estimated_days,

  doors,

  price_per_sqft,
  discount,
  addons,

  total_amount,

  status: "pending",

  created_by: currentUser.id,

})
        .select()
        .single();

    if (error) {

      console.error(
        "Create Order Error",
        error
      );

      throw error;

    }

    console.log(
      "STEP 4 : Order Created",
      order
    );

    /*
    ----------------------------------
    Reserve Inventory
    ----------------------------------
    */

    try {

      await reserveDoors(

        doors,

        order.order_number

      );

      console.log(
        "STEP 5 : Inventory Reserved"
      );

    } catch (e) {

      console.error(
        "Inventory Reservation Failed",
        e
      );

      await admin
        .from("orders")
        .delete()
        .eq(
          "id",
          order.id
        );

      throw e;

    }

    /*
    ----------------------------------
    Logs
    ----------------------------------
    */

    OrderLogs.orderCreated(order.id, order.order_number, currentUser.id);


    console.log(
      "STEP 6 : Order Log Added"
    );

    await createOrderLog(

      order.id,

      "Inventory Reserved",

      "Inventory reserved successfully.",

      currentUser.id

    );

    console.log(
      "STEP 7 : Inventory Log Added"
    );

    console.log(
      "========== ORDER CREATED =========="
    );



    return NextResponse.json(
      order
    );

  } catch (e) {

    console.error(
      "POST ERROR"
    );

    console.error(e);

    if (
      e instanceof Error
    ) {

      console.error(
        e.stack
      );

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

    console.log("========== UPDATE ORDER ==========");

    const currentUser =
      await requireAuth();

    console.log(
      "STEP 1 : Current User",
      currentUser
    );

    const body =
      await request.json();

    console.log(
      "STEP 2 : Body",
      body
    );

    const {

      id,

      customer_name,

      customer_phone,

      estimated_days,

      status,

      doors,
      price_per_sqft,
  discount,
  addons,
  total_amount,

    } = body;

    /*
    ----------------------------------
    Get Existing Order
    ----------------------------------
    */

    const {

      data: existing,

      error: existingError,

    } =
      await admin
        .from("orders")
        .select("*")
        .eq(
          "id",
          id
        )
        .single();

    if (
      existingError ||
      !existing
    ) {

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

    console.log(
      "STEP 3 : Existing Order Loaded"
    );

    /*
    ----------------------------------
    Update Reservations
    ----------------------------------
    */

    if (

      existing.status !==
        "manufacturing" &&

      existing.status !==
        "completed"

    ) {

      await adjustDoorReservations(

        existing.doors,

        doors,

        existing.order_number

      );

      console.log(
        "STEP 4 : Reservations Updated"
      );

    }

    /*
    ----------------------------------
    Manufacturing Started
    ----------------------------------
    */

    let assignedTo =
      existing.assigned_to;

    if (

      existing.status !==
        "manufacturing" &&

      status ===
        "manufacturing"

    ) {

      await consumeDoors(

        doors,

        existing.order_number

      );

      console.log(
        "STEP 5 : Inventory Consumed"
      );

      assignedTo =
        currentUser.id;

      await createOrderLog(

        id,

        "Manufacturing Started",

        "Inventory consumed.",

        currentUser.id

      );

      console.log(
        "STEP 6 : Manufacturing Log Added"
      );

    }

    /*
    ----------------------------------
    Cancelled
    ----------------------------------
    */

    if (

      existing.status !==
        "cancelled" &&

      status ===
        "cancelled" &&

      existing.status !==
        "manufacturing" &&

      existing.status !==
        "completed"

    ) {

      await releaseDoors(

        existing.doors,

        existing.order_number

      );

      console.log(
        "STEP 7 : Inventory Released"
      );

      await createOrderLog(

        id,

        "Cancelled",

        "Inventory released.",

        currentUser.id

      );

      console.log(
        "STEP 8 : Cancel Log Added"
      );

    }

    /*
    ----------------------------------
    Update Order
    ----------------------------------
    */

    const {

      error,

    } =
      await admin
        .from("orders")
        .update({

          customer_name,

          customer_phone,

          estimated_days,

          status,

          doors,
           price_per_sqft,
  discount,
  addons,

  total_amount,


          assigned_to:
            assignedTo,

          updated_at:
            new Date().toISOString(),

        })
        .eq(
          "id",
          id
        );

    if (error) {

      console.error(
        "Update Error",
        error
      );

      throw error;

    }

    console.log(
      "STEP 9 : Order Updated"
    );


    
    await createOrderLog(

      id,

      "Order Updated",

      "Order updated successfully.",

      currentUser.id

    );

    console.log(
      "STEP 10 : Update Log Added"
    );

    console.log(
      "========== ORDER UPDATED =========="
    );

    return NextResponse.json({

      success: true,

    });

  } catch (e) {

    console.error(
      "PUT ERROR"
    );

    console.error(e);

    if (
      e instanceof Error
    ) {

      console.error(
        e.stack
      );

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

export async function DELETE(
  request: NextRequest
) {

  try {

    console.log("========== DELETE ORDER ==========");

    const currentUser =
      await requireAuth();

    console.log(
      "STEP 1 : Current User",
      currentUser
    );

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

    console.log(
      "STEP 2 : Order Id",
      id
    );

    /*
    ----------------------------------------
    Get Order
    ----------------------------------------
    */

    const {

      data: order,

      error: orderError,

    } =
      await admin
        .from("orders")
        .select("*")
        .eq(
          "id",
          id
        )
        .single();

    if (
      orderError ||
      !order
    ) {

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

    console.log(
      "STEP 3 : Order Loaded"
    );

    /*
    ----------------------------------------
    Prevent deleting manufactured orders
    ----------------------------------------
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
            "Manufacturing or completed orders cannot be deleted.",
        },
        {
          status: 400,
        }
      );

    }

    /*
    ----------------------------------------
    Release Reserved Inventory
    ----------------------------------------
    */

    if (
      order.status !==
      "cancelled"
    ) {

      await releaseDoors(

        order.doors,

        order.order_number

      );

      console.log(
        "STEP 4 : Inventory Released"
      );

    }

    /*
    ----------------------------------------
    Delete Customizations
    ----------------------------------------
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

    console.log(
      "STEP 5 : Customizations Deleted"
    );

    /*
    ----------------------------------------
    Delete Payments
    ----------------------------------------
    */

    await admin
      .from(
        "order_payments"
      )
      .delete()
      .eq(
        "order_id",
        order.id
      );

    console.log(
      "STEP 6 : Payments Deleted"
    );

    /*
    ----------------------------------------
    Delete Logs
    ----------------------------------------
    */

    await admin
      .from("order_logs")
      .delete()
      .eq(
        "order_id",
        order.id
      );

    console.log(
      "STEP 7 : Logs Deleted"
    );

    /*
    ----------------------------------------
    Delete Order
    ----------------------------------------
    */

    const {

      error,

    } =
      await admin
        .from("orders")
        .delete()
        .eq(
          "id",
          order.id
        );

    if (error) {

      console.error(
        "Delete Error",
        error
      );

      throw error;

    }

    console.log(
      "STEP 8 : Order Deleted"
    );

    console.log(
      "========== ORDER DELETED =========="
    );

    return NextResponse.json({

      success: true,

    });

  } catch (e) {

    console.error(
      "DELETE ERROR"
    );

    console.error(e);

    if (
      e instanceof Error
    ) {

      console.error(
        e.stack
      );

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

