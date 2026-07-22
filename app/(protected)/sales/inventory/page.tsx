"use client";

import { useEffect, useState } from "react";

import {
  Inventory,
  InventoryService,
  InventoryStats,
  InventoryTable,
} from "@/features/inventory";

export default function SalesInventoryPage() {

  const [inventory, setInventory] =
    useState<Inventory[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadInventory() {

    try {

      setLoading(true);

      const data =
        await InventoryService.getAll();

      setInventory(data);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    loadInventory();
  }, []);

  if (loading) {

    return (
      <div className="p-6">
        Loading inventory...
      </div>
    );

  }

  return (

    <div className="space-y-6 p-6">

      <div>

        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <p className="text-muted-foreground">
          View available door stock.
        </p>

      </div>

      <InventoryStats
        inventory={inventory}
      />

      <InventoryTable
        inventory={inventory}
        permissions={{
          canUpdate: false,
          canAdjustStock: false,
          canViewHistory: false,
        }}
      />

    </div>

  );

}