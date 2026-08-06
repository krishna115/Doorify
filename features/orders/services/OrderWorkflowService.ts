import {
  Order,
  OrderStatus,
} from "../types";

interface UpdateWorkflowRequest {

  orderId: string;

  estimatedDays?: number;

}

export class OrderWorkflowService {

  /*
  ---------------------------------------
  Next Status
  ---------------------------------------
  */

  static getNextStatus(
    status: OrderStatus
  ): OrderStatus | null {

    switch (status) {

      case "pending":
        return "accepted";

      case "accepted":
        return "manufacturing";

      case "manufacturing":
        return "completed";

      case "completed":
        return "ready_for_dispatch";

      default:
        return null;

    }

  }

  /*
  ---------------------------------------
  Advance Workflow
  ---------------------------------------
  */

  static async nextStep(
    order: Order,
    estimatedDays?: number
  ): Promise<Order> {

    const nextStatus =
      this.getNextStatus(
        order.status
      );

    if (!nextStatus) {

      throw new Error(
        "This order cannot be progressed any further."
      );

    }

    const request: UpdateWorkflowRequest = {

      orderId:
        order.id,

      estimatedDays,

    };

    const response =
      await fetch(
        `/api/orders/${order.id}/workflow`,
        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body:
            JSON.stringify(
              request
            ),

        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(

        data.message ??
          "Failed to update workflow."

      );

    }

    return data;

  }

}