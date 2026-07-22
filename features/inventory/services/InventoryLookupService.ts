import { InventoryLookupItem } from "../types";


export class InventoryLookupService {
  static async getAll(): Promise<
    InventoryLookupItem[]
  > {
    const response = await fetch(
      "/api/inventory/list"
    );

    if (!response.ok) {
      throw new Error(
        await response.text()
      );
    }

    return response.json();
  }
}