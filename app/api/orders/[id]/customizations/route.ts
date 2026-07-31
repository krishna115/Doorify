import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// ----------------------------------
// GET
// ----------------------------------

export async function GET(
  request: NextRequest,
  { params }: Params
) {

  const { id } =
    await params;

  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase
      .from(
        "order_customizations"
      )
      .select("*")
      .eq(
        "order_id",
        id
      )
      .order(
        "created_at",
        {
          ascending: true,
        }
      );

  if (error) {

    return NextResponse.json(
      {
        message:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

  return NextResponse.json(
    data
  );

}

// ----------------------------------
// POST
// ----------------------------------

export async function POST(
  request: NextRequest,
  { params }: Params
) {

  const { id } =
    await params;

  const body =
    await request.json();

  const supabase =
    await createClient();

  const payload =
    body.map(
      (
        item: {
          instruction: string;
          image_url: string | null;
        }
      ) => ({
        order_id: id,

        instruction:
          item.instruction,

        image_url:
          item.image_url,

        is_completed:
          false,
      })
    );

  const {
    data,
    error,
  } =
    await supabase
      .from(
        "order_customizations"
      )
      .insert(payload)
      .select();

  if (error) {

    return NextResponse.json(
      {
        message:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

  return NextResponse.json(
    data
  );

}

// ----------------------------------
// DELETE
// ----------------------------------

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {

  const { id } =
    await params;

  const supabase =
    await createClient();

  const { error } =
    await supabase
      .from(
        "order_customizations"
      )
      .delete()
      .eq(
        "order_id",
        id
      );

  if (error) {

    return NextResponse.json(
      {
        message:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

  return NextResponse.json({
    success: true,
  });

}