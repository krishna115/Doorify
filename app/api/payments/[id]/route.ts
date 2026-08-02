import {
  NextRequest,
  NextResponse,
} from "next/server";


import {

  getPayment,

  updatePayment,

  deletePayment,

} from "@/features/payments/server/payments";
import { requireAuth } from "@/lib/auth";

/*
=======================================
GET
=======================================
*/

export async function GET(

  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }

) {

  try {

    const user =
      await requireAuth();

    if (!user) {

      return NextResponse.json(

        {
          error:
            "Unauthorized",
        },

        {
          status: 401,
        }

      );

    }

    const { id } =
      await params;

    const payment =
      await getPayment(id);

    return NextResponse.json(
      payment
    );

  } catch (error) {

    console.error(
      error
    );

    return NextResponse.json(

      {
        error:
          "Failed to fetch payment.",
      },

      {
        status: 500,
      }

    );

  }

}

/*
=======================================
PATCH
=======================================
*/

export async function PATCH(

  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }

) {

  try {

    const user =
      await requireAuth();

    if (!user) {

      return NextResponse.json(

        {
          error:
            "Unauthorized",
        },

        {
          status: 401,
        }

      );

    }

    if (
      user.role !==
      "admin"
    ) {

      return NextResponse.json(

        {
          error:
            "Forbidden",
        },

        {
          status: 403,
        }

      );

    }

    const body =
      await request.json();

    const { id } =
      await params;

    const payment =
      await updatePayment(

        id,

        body

      );

    return NextResponse.json(
      payment
    );

  } catch (error) {

    console.error(
      error
    );

    return NextResponse.json(

      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update payment.",
      },

      {
        status: 500,
      }

    );

  }

}

/*
=======================================
DELETE
=======================================
*/

export async function DELETE(

  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }

) {

  try {

    const user =
      await requireAuth();

    if (!user) {

      return NextResponse.json(

        {
          error:
            "Unauthorized",
        },

        {
          status: 401,
        }

      );

    }

    if (
      user.role !==
      "admin"
    ) {

      return NextResponse.json(

        {
          error:
            "Forbidden",
        },

        {
          status: 403,
        }

      );

    }

    const { id } =
      await params;

    await deletePayment(
      id
    );

    return NextResponse.json(
      {
        success: true,
      }
    );

  } catch (error) {

    console.error(
      error
    );

    return NextResponse.json(

      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete payment.",
      },

      {
        status: 500,
      }

    );

  }

}