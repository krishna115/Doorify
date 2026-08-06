import {
  NextRequest,
  NextResponse,
} from "next/server";

import { admin } from "@/lib/admin";
import { requireAuth } from "@/lib/auth";

import {
  consumeDoors,
} from "@/features/orders/server/inventory";

import {
  OrderLogs,
} from "@/features/orders/server/orderLogs";

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const currentUser =
      await requireAuth();

    const {
      id,
    } = await context.params;

    const body =
      await request.json();

    const {

      estimatedDays,

    } = body;

    /*
    ---------------------------------------
    Load Order
    ---------------------------------------
    */

    const {

      data: order,

      error,

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
      error ||
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

    /*
    ---------------------------------------
    Pending -> Accepted
    ---------------------------------------
    */

    if (
      order.status ===
      "pending"
    ) {

      await admin
        .from("orders")
        .update({

          status:
            "accepted",

          assigned_to:
            currentUser.id,

          accepted_by:
            currentUser.id,

          estimated_days:
            estimatedDays,

          accepted_at:
            new Date().toISOString(),

          updated_at:
            new Date().toISOString(),

        })
        .eq(
          "id",
          id
        );

      await OrderLogs.orderAccepted(

        id,

        currentUser.id

      );

      return NextResponse.json({

        success: true,

      });

    }

    /*
    ---------------------------------------
    Accepted -> Manufacturing
    ---------------------------------------
    */

    if (
      order.status ===
      "accepted"
    ) {

      await consumeDoors(

        order.doors,

        order.order_number

      );

      await admin
        .from("orders")
        .update({

          status:
            "manufacturing",

          manufacturing_started_at:
            new Date().toISOString(),

          updated_at:
            new Date().toISOString(),

        })
        .eq(
          "id",
          id
        );

      await OrderLogs.productionStarted(

        id,

        currentUser.id

      );

      return NextResponse.json({

        success: true,

      });

    }

        /*
    ---------------------------------------
    Manufacturing -> Completed
    ---------------------------------------
    */

    if (
      order.status ===
      "manufacturing"
    ) {

      await admin
        .from("orders")
        .update({

          status:
            "completed",

          manufacturing_completed_at:
            new Date().toISOString(),

          updated_at:
            new Date().toISOString(),

        })
        .eq(
          "id",
          id
        );

      await OrderLogs.productionCompleted(

        id,

        currentUser.id

      );

      return NextResponse.json({

        success: true,

      });

    }

    /*
    ---------------------------------------
    Completed -> Ready For Dispatch
    ---------------------------------------
    */

    if (
      order.status ===
      "completed"
    ) {

      await admin
        .from("orders")
        .update({

          status:
            "ready_for_dispatch",

          ready_for_dispatch_at:
            new Date().toISOString(),

          updated_at:
            new Date().toISOString(),

        })
        .eq(
          "id",
          id
        );

      await OrderLogs.orderReady(

        id,

        currentUser.id

      );

      return NextResponse.json({

        success: true,

      });

    }

    /*
    ---------------------------------------
    Workflow Completed
    ---------------------------------------
    */

    return NextResponse.json(

      {

        message:
          "Workflow already completed.",

      },

      {

        status: 400,

      }

    );

  } catch (e) {

    console.error(

      "ORDER WORKFLOW ERROR"

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

          status: 500,

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