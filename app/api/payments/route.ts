import { NextRequest, NextResponse } from "next/server";


import {
  createPayment,
  getPayments,
} from "@/features/payments/server/payments";
import { requireAuth } from "@/lib/auth";

/*
=======================================
GET
=======================================
*/

export async function GET(
  request: NextRequest
) {
  try {

    const user =
      await requireAuth();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } =
      new URL(request.url);

    const orderId =
      searchParams.get(
        "orderId"
      );

    const payments =
      await getPayments(
        orderId ?? undefined
      );

    return NextResponse.json(
      payments
    );

  } catch (error) {

    console.error(
      "GET PAYMENTS ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch payments.",
      },
      {
        status: 500,
      }
    );

  }
}

/*
=======================================
POST
=======================================
*/

export async function POST(
  request: NextRequest
) {

  try {

    const user =
      await requireAuth();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (
      user.role !== "admin" &&
      user.role !== "sales"
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      await request.json();

    const payment =
      await createPayment({

        orderId:
          body.orderId,

        amount:
          body.amount,

        paymentMethod:
          body.paymentMethod,

        note:
          body.note,

        receivedBy:
          user.id,

      });

    return NextResponse.json(
      payment,
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(
      "CREATE PAYMENT ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create payment.",
      },
      {
        status: 500,
      }
    );

  }

}