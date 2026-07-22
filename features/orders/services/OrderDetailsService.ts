import {
  OrderDetails,
} from "../types";

export class OrderDetailsService {

  static async getById(
    id: string
  ): Promise<OrderDetails> {

    const response =
      await fetch(
        `/api/orders/${id}`
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.message
      );

    }

    return data;

  }

}