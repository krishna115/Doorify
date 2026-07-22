"use client";

import { useEffect, useState } from "react";

import {
  Inventory,
  InventoryService,
  InventoryStats,
  InventoryTable,
  StockAdjustmentDialog,
} from "@/features/inventory";

import { Button } from "@/components/ui/button";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedItem, setSelectedItem] =
    useState<Inventory | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

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

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Inventory
          </h1>

          <p className="text-muted-foreground">
            Manage board dimensions and stock.
          </p>
        </div>

        <Button>
          Add Dimension
        </Button>

      </div>

      <InventoryStats inventory={inventory} />

      <InventoryTable
        inventory={inventory}
        permissions={{
          canUpdate: true,
          canAdjustStock: true,
          canViewHistory: false,
        }}
        onAdjustStock={(item) => {
          setSelectedItem(item);
          setDialogOpen(true);
        }}
      />

      <StockAdjustmentDialog
        open={dialogOpen}
        inventory={selectedItem}
        onOpenChange={setDialogOpen}
        onSuccess={loadInventory}
      />

    </div>
  );
}