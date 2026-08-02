import {
  Payment,
  CreatePaymentRequest,
} from "../types";

export class PaymentService {

  /*
  =======================================
  Get Payments
  =======================================
  */

  static async getPayments(
    orderId?: string
  ): Promise<Payment[]> {

    const url = orderId
      ? `/api/payments?orderId=${orderId}`
      : "/api/payments";

    const response =
      await fetch(url);

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ??
        "Failed to load payments."
      );

    }

    return data;

  }

  /*
  =======================================
  Create Payment
  =======================================
  */

  static async create(
    request: CreatePaymentRequest
  ): Promise<Payment> {

    const response =
      await fetch(
        "/api/payments",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            request
          ),

        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ??
        "Failed to create payment."
      );

    }

    return data;

  }

  /*
  =======================================
  Delete Payment
  =======================================
  */

  static async delete(
    id: string
  ) {

    const response =
      await fetch(
        `/api/payments/${id}`,
        {
          method: "DELETE",
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ??
        "Failed to delete payment."
      );

    }

    return data;

  }

}