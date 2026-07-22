"use client";

import { useEffect, useState } from "react";

import {
  Order,
  OrderDialog,
  OrdersTable,
  OrderService,
} from "@/features/orders";

import { Button } from "@/components/ui/button";

export default function SalesPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  async function loadOrders() {
    try {
      setLoading(true);

      const data =
        await OrderService.getAll();

      setOrders(data);
    } catch (e) {
      console.error(e);
      alert("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function handleCreate() {
    setSelectedOrder(null);
    setDialogOpen(true);
  }

  function handleEdit(order: Order) {
    setSelectedOrder(order);
    setDialogOpen(true);
  }

  async function handleDelete(order: Order) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await OrderService.delete(order.id);

    await loadOrders();
  } catch (e) {
    if (e instanceof Error) {
      alert(e.message);
    }
  }
}

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="text-muted-foreground">
            Create and manage customer
            orders.
          </p>

        </div>

        <Button onClick={handleCreate}>
          New Order
        </Button>

      </div>

      {loading ? (
  <div className="flex h-40 items-center justify-center">
    Loading orders...
  </div>
) : (
  <OrdersTable
  orders={orders}
  basePath="/sales/orders"
  permissions={{}}
/>
)}
      <OrderDialog
        open={dialogOpen}
        order={selectedOrder}
        onOpenChange={setDialogOpen}
        onSuccess={loadOrders}
      />

    </div>
  );
}