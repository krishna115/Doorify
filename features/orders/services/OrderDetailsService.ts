import {
  OrderDetails,
} from "../types";

import { OrderCustomizationService } from "./OrderCustomizationService";

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
        data.message ??
        "Failed to load order."
      );

    }

    data.customizations =
      await OrderCustomizationService.getByOrder(
        id
      );

    return data as OrderDetails;

  }

}