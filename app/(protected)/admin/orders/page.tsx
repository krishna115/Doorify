"use client";

import {
} from "@/features/orders";
import OrdersPage from "@/features/orders/components/OrdersPage";
import OrdersPage2 from "@/features/orders/components/OrdersPage2";

export default function Page() {

  return (

    <OrdersPage2
      basePath="/admin/orders"
      permissions={{

        canCreate: true,

        canEdit: true,

        canDelete: true,

      }}
    />

  );

}