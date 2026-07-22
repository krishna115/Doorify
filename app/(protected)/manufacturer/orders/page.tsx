"use client";

import { useEffect, useState } from "react";

import {
  Order,
  OrderDialog,
  OrderService,
  OrdersTable,
} from "@/features/orders";

import { Button } from "@/components/ui/button";

export default function PendingOrdersPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  async function loadOrders() {

    try {

      setLoading(true);

      const data =
        await OrderService.getAll();

      setOrders(
        data
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    loadOrders();
  }, []);

  function handleEdit(
    order: Order
  ) {

    setSelectedOrder(order);

    setDialogOpen(true);

  }

    const [status, setStatus] =
    useState<
      | "pending"
      | "accepted"
      | "manufacturing"
      | "completed"
      | "cancelled"
    >("pending");


  async function handleAccept(
    order: Order
  ) {

    const confirmed =
      confirm(
        `Accept Order #${order.order_number}?`
      );

    if (!confirmed) return;

    try {
      order.status = "accepted";

      await OrderService.update(order);

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
        Loading pending orders...
      </div>
    );

  }

  return (

    <div className="space-y-6 p-6">

      <div>

        <h1 className="text-3xl font-bold">
          Pending Orders
        </h1>

        <p className="text-muted-foreground">
          Orders waiting for manufacturing approval.
        </p>

      </div>

     <OrdersTable
  orders={orders}
  basePath="/manufacturer/orders"
  permissions={{
    canAccept: true,
  }}
  onAccept={handleAccept}
/>
      <OrderDialog
        open={dialogOpen}
        order={selectedOrder}
        onOpenChange={(open) => {

          setDialogOpen(open);

          if (!open) {

            setSelectedOrder(null);

            loadOrders();

          }

        }}
      />

    </div>

  );

}