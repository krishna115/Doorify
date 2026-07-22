"use client";

import { useEffect, useState } from "react";

import {
  Order,
  OrderDialog,
  OrdersTable,
  OrderService,
} from "@/features/orders";

import { Button } from "@/components/ui/button";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

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

  function handleEdit(
    order: Order
  ) {

    setSelectedOrder(order);

    setDialogOpen(true);

  }

  async function handleDelete(
    order: Order
  ) {

    const confirmed =
      confirm(
        `Delete Order #${order.order_number}?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await OrderService.delete(
        order.id
      );

      await loadOrders();

    } catch (e) {

      if (e instanceof Error) {
        alert(e.message);
      }

    }

  }

  if (loading) {

    return (
      <div className="p-6">
        Loading orders...
      </div>
    );

  }

  return (

    <div className="space-y-6 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="text-muted-foreground">
            Manage customer orders.
          </p>

        </div>

        <Button
          onClick={handleCreate}
        >
          Create Order
        </Button>

      </div>

      <OrdersTable
        orders={orders}
        basePath="/admin/orders"
        permissions={{
          canEdit: true,
          canDelete: true,
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <OrderDialog
        open={dialogOpen}
        order={selectedOrder}
        onOpenChange={setDialogOpen}
        onSuccess={loadOrders}
      />

    </div>

  );

}