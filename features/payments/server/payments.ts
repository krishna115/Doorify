import { admin } from "@/lib/admin";

import {
  OrderLogs,
} from "@/features/orders/server/orderLogs";

/*
=======================================
Get Payment
=======================================
*/

export async function getPayment(
  paymentId: string
) {

  const { data, error } =
    await admin
      .from("payments")
      .select(`
        *,
        orders:order_id (
          id,
          order_number,
          customer_name,
          customer_phone,
          total_amount
        )
      `)
      .eq("id", paymentId)
      .single();

  if (error || !data) {
    throw new Error(
      "Payment not found."
    );
  }

  return data;

}

/*
=======================================
Get Payments
=======================================
*/

export async function getPayments(
  orderId?: string
) {

  let query =
    admin
      .from("payments")
      .select(`
        *,
        orders:order_id (
          id,
          order_number,
          customer_name,
          customer_phone,
          total_amount
        )
      `)
      .order(
        "received_at",
        {
          ascending: false,
        }
      );

  if (orderId) {
    query =
      query.eq(
        "order_id",
        orderId
      );
  }

  const { data, error } =
    await query;

  if (error) {
    throw error;
  }

  return data ?? [];

}

/*
=======================================
Get Order Paid Amount
=======================================
*/

export async function getOrderPaidAmount(
  orderId: string
) {

  const { data, error } =
    await admin
      .from("payments")
      .select("amount")
      .eq(
        "order_id",
        orderId
      );

  if (error) {
    throw error;
  }

  return (
    data ?? []
  ).reduce(

    (
      total,
      payment
    ) =>
      total +
      Number(
        payment.amount
      ),

    0

  );

}

/*
=======================================
Get Remaining Amount
=======================================
*/

export async function getOrderRemainingAmount(
  orderId: string
) {

  const { data: order } =
    await admin
      .from("orders")
      .select(
        "total_amount"
      )
      .eq(
        "id",
        orderId
      )
      .single();

  if (!order) {
    throw new Error(
      "Order not found."
    );
  }

  const paid =
    await getOrderPaidAmount(
      orderId
    );

  return (
    Number(
      order.total_amount
    ) - paid
  );

}

/*
=======================================
Create Payment
=======================================
*/

interface CreatePaymentParams {

  orderId: string;

  amount: number;

  paymentMethod?: string;

  note?: string;

  receivedBy?: string;

}

export async function createPayment({

  orderId,

  amount,

  paymentMethod,

  note,

  receivedBy,

}: CreatePaymentParams) {

  if (amount <= 0) {
    throw new Error(
      "Amount must be greater than zero."
    );
  }

  const remaining =
    await getOrderRemainingAmount(
      orderId
    );

  if (amount > remaining) {
    throw new Error(
      `Remaining amount is ₹${remaining}.`
    );
  }

  const { data, error } =
    await admin
      .from("payments")
      .insert({

        order_id:
          orderId,

        amount,

        payment_method:
          paymentMethod,

        note:
          note ?? null,

        received_by:
          receivedBy ?? null,

      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  await OrderLogs.paymentReceived(
    orderId,
    amount,
    paymentMethod,
    receivedBy
  );

  return data;

}

/*
=======================================
Update Payment
=======================================
*/

export async function updatePayment(
  paymentId: string,
  values: {

    amount?: number;

    paymentMethod?: string;

    note?: string;

  }
) {

  const { data, error } =
    await admin
      .from("payments")
      .update({

        amount:
          values.amount,

        payment_method:
          values.paymentMethod,

        note:
          values.note,

      })
      .eq(
        "id",
        paymentId
      )
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;

}

/*
=======================================
Delete Payment
=======================================
*/

export async function deletePayment(
  paymentId: string
) {

  const payment =
    await getPayment(
      paymentId
    );

  const { error } =
    await admin
      .from("payments")
      .delete()
      .eq(
        "id",
        paymentId
      );

  if (error) {
    throw error;
  }

  await OrderLogs.paymentDeleted(
    payment.order_id
  );

}