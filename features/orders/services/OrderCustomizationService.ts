import { createClient } from "@/utils/supabase/client";

import {
  CustomizationItem,
  OrderCustomization,
} from "../types";

const BUCKET = "customizations";

export class OrderCustomizationService {

  // ---------------------------------
  // Storage
  // ---------------------------------

  static async uploadImage(
    orderId: string,
    file: File
  ): Promise<string> {

    const supabase =
      createClient();

    const extension =
      file.name
        .split(".")
        .pop();

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const filePath =
      `${orderId}/${fileName}`;

    const { error } =
      await supabase.storage
        .from(BUCKET)
        .upload(
          filePath,
          file
        );

    if (error) {
      throw error;
    }

    return filePath;

  }

  static async deleteImage(
    filePath: string
  ) {

    if (!filePath) {
      return;
    }

    const supabase =
      createClient();

    const { error } =
      await supabase.storage
        .from(BUCKET)
        .remove([
          filePath,
        ]);

    if (error) {
      throw error;
    }

  }

  static async getImageUrl(
    filePath: string | null
  ): Promise<string> {

    if (!filePath) {
      return "";
    }

    const supabase =
      createClient();

    const {
      data,
      error,
    } =
      await supabase.storage
        .from(BUCKET)
        .createSignedUrl(
          filePath,
          60 * 60
        );

    if (error || !data) {
      return "";
    }

    return data.signedUrl;

  }

  // ---------------------------------
  // Database
  // ---------------------------------

  static async getByOrder(
    orderId: string
  ): Promise<OrderCustomization[]> {

    const response =
      await fetch(
        `/api/orders/${orderId}/customizations`
      );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch customizations."
      );
    }

    const list: OrderCustomization[] =
      await response.json();

    for (const item of list) {

      item.image =
        await this.getImageUrl(
          item.image_url
        );

    }

    return list;

  }

  static async save(
    orderId: string,
    customizations: CustomizationItem[]
  ) {

    const payload = [];

    for (const item of customizations) {

      let imagePath:
        | string
        | null = null;

      if (item.image) {

        imagePath =
          await this.uploadImage(
            orderId,
            item.image
          );

      }

      payload.push({

        instruction:
          item.instruction,

        image_url:
          imagePath,

      });

    }

    const response =
      await fetch(
        `/api/orders/${orderId}/customizations`,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),

        }
      );

    if (!response.ok) {

      throw new Error(
        "Failed to save customizations."
      );

    }

  }

  static async replace(
    orderId: string,
    customizations: CustomizationItem[]
  ) {

    const existing =
      await this.getByOrder(
        orderId
      );

    for (const item of existing) {

      if (item.image_url) {

        await this.deleteImage(
          item.image_url
        );

      }

    }

    await fetch(
      `/api/orders/${orderId}/customizations`,
      {
        method: "DELETE",
      }
    );

    await this.save(
      orderId,
      customizations
    );

  }

}