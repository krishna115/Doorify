import { NextResponse } from "next/server";
import { admin } from "@/lib/admin";

export async function GET() {
  try {
    const { data, error } = await admin
  .from("inventory")
  .select(`
    id,
    name,
    width,
    height,
    reserved_quantity,
    quantity
  `)
  .gt("quantity", 0)
  .order("width")
  .order("height");

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch {
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