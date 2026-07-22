import { NextRequest, NextResponse } from "next/server";

import { admin } from "@/lib/admin";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {

    const { id } = await params;

    // Order

    const {
      data: order,
      error: orderError,
    } = await admin
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (orderError) {

      return NextResponse.json(
        {
          message: orderError.message,
        },
        {
          status: 400,
        }
      );

    }

    // Customizations

    const {
      data: customizations,
      error: customizationError,
    } = await admin
      .from("order_customizations")
      .select("*")
      .eq("order_id", id)
      .order("created_at");

    if (customizationError) {

      return NextResponse.json(
        {
          message:
            customizationError.message,
        },
        {
          status: 400,
        }
      );

    }

    // Logs

    const {
      data: logs,
      error: logsError,
    } = await admin
      .from("order_logs")
      .select("*")
      .eq("order_id", id)
      .order("created_at", {
        ascending: true,
      });

    if (logsError) {

      return NextResponse.json(
        {
          message:
            logsError.message,
        },
        {
          status: 400,
        }
      );

    }

    return NextResponse.json({
      order,
      customizations,
      logs,
    });

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