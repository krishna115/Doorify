import {
  CreateOrderRequest,
  UpdateOrderRequest,
  Order,
  OrderCustomization,
  OrderLog,
} from "../types";

export class OrderService {
  static async getAll(): Promise<Order[]> {
    const response = await fetch("/api/orders");

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  static async getById(id: string): Promise<Order> {
    const response = await fetch(`/api/orders/${id}`);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  static async create(request: CreateOrderRequest) {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  static async update(request: UpdateOrderRequest) {
    const response = await fetch("/api/orders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  static async delete(id: string) {
    const response = await fetch(`/api/orders?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }

  static async getTimeline(
    orderId: string
  ): Promise<OrderLog[]> {
    const response = await fetch(
      `/api/orders/${orderId}/timeline`
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  static async getChecklist(
    orderId: string
  ): Promise<OrderCustomization[]> {
    const response = await fetch(
      `/api/orders/${orderId}/checklist`
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  static async toggleChecklist(
    id: string,
    completed: boolean
  ) {
    const response = await fetch(
      "/api/orders/checklist",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          completed,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }
}