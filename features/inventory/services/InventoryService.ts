import { createClient } from "@/utils/supabase/client";

import {
  AdjustStockRequest,
  Inventory,
} from "../types";

export class InventoryService {
  private static supabase = createClient();

  static async getAll(): Promise<Inventory[]> {
    const { data, error } = await this.supabase
      .from("inventory")
      .select("*")
      .order("height")
      .order("width");

    if (error) throw new Error(error.message);

    return data as Inventory[];
  }

  static async getById(id: string): Promise<Inventory> {
    const { data, error } = await this.supabase
      .from("inventory")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return data as Inventory;
  }

  static async adjustStock(request: AdjustStockRequest) {
    const item = await this.getById(request.inventoryId);

    const updatedQuantity =
      item.quantity + request.quantity;

    if (updatedQuantity < 0) {
      throw new Error("Insufficient stock.");
    }

    const { error: inventoryError } =
      await this.supabase
        .from("inventory")
        .update({
          quantity: updatedQuantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", request.inventoryId);

    if (inventoryError) {
      throw new Error(inventoryError.message);
    }

    const { error: transactionError } =
      await this.supabase
        .from("inventory_transactions")
        .insert({
          inventory_id: request.inventoryId,
          quantity: request.quantity,
          type: request.type,
          note: request.note,
          created_by: request.createdBy,
        });

    if (transactionError) {
      throw new Error(transactionError.message);
    }
  }

  static async getTransactions(inventoryId: string) {
    const { data, error } = await this.supabase
      .from("inventory_transactions")
      .select("*")
      .eq("inventory_id", inventoryId)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw new Error(error.message);

    return data;
  }
}