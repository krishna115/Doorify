import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest
) {

  const supabase =
    await createClient();

  const orderId =
    request.nextUrl.searchParams.get(
      "orderId"
    );

  const query = supabase
    .from("order_customizations")
    .select("*")
    .order(
      "created_at",
      {
        ascending: true,
      }
    );

  if (orderId) {

    query.eq(
      "order_id",
      orderId
    );

  }

  const {
    data,
    error,
  } = await query;

  if (error) {

    return Response.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

  return Response.json(data);

}

export async function POST(
  request: NextRequest
) {

  const supabase =
    await createClient();

  const body =
    await request.json();

  const {
    data,
    error,
  } = await supabase
    .from(
      "order_customizations"
    )
    .insert(body)
    .select();

  if (error) {

    return Response.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

  return Response.json(data);

}

export async function DELETE(
  request: NextRequest
) {

  const supabase =
    await createClient();

  const orderId =
    request.nextUrl.searchParams.get(
      "orderId"
    );

  if (!orderId) {

    return Response.json(
      {
        error:
          "Order Id required",
      },
      {
        status: 400,
      }
    );

  }

  const { error } =
    await supabase
      .from(
        "order_customizations"
      )
      .delete()
      .eq(
        "order_id",
        orderId
      );

  if (error) {

    return Response.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

  return Response.json({
    success: true,
  });

}