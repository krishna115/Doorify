export interface Inventory {
  id: string;

  width: number;

  height: number;

  quantity: number;
  name: string;

  reserved_quantity: number;

  minimum_quantity: number;

  created_at: string;

  updated_at: string;
}

export interface InventoryLookupItem {
  id: string;

  width: number;

  height: number;

  quantity: number;
  name: string;

  reserved_quantity: number;

  minimum_quantity: number;
}

export type InventoryTransactionType =
  | "receive"
  | "reserve"
  | "unreserve"
  | "consume"
  | "adjustment"
  | "damage";

export interface InventoryTransaction {
  id: string;

  inventory_id: string;

  quantity: number;

  type: InventoryTransactionType;

  note?: string;

  created_by?: string;

  created_at: string;
}

export interface AdjustStockRequest {
  inventoryId: string;

  quantity: number;

  type: InventoryTransactionType;

  note?: string;

  createdBy?: string;
}