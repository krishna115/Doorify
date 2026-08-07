"use client";

import OrdersPage2 from "@/features/orders/components/OrdersPage2";

export default function Page() {

  return (

    <OrdersPage2

      basePath="/manufacturer/orders/pending"

      permissions={{
        canCreate: false,
        canEdit: false,
        canDelete: false,
      }}

      filters={{
        status: "pending",
      }}

    />

  );

}