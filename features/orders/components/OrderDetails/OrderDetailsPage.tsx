"use client";

import { useEffect, useState } from "react";

import {
  OrderDetails,
} from "../..";

import { useRouter } from "next/navigation";

import { OrderHeader } from "./OrderHeader";

import { CustomerCard } from "./CustomerCard";

import { DoorDetailsCard } from "./DoorDetailsCard";

import { CustomizationCard } from "./CustomizationCard";

import { OrderTimeline } from "./OrderTimeline";
import { OrderDetailsService } from "../../services/OrderDetailsService";

interface Props {
  orderId: string;
}

export function OrderDetailsPage({
  orderId,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [details, setDetails] =
    useState<OrderDetails | null>(null);

  async function loadOrder() {

    try {

      setLoading(true);

      const response =
        await OrderDetailsService.getById(
          orderId
        );

      setDetails(response);

    } catch (e) {

      if (e instanceof Error) {

        alert(e.message);

      }

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadOrder();

  }, [orderId]);

  if (loading) {

    return (

      <div className="flex h-96 items-center justify-center">

        Loading Order...

      </div>

    );

  }

  if (!details) {

    return (

      <div className="flex h-96 items-center justify-center">

        Order not found.

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-7xl space-y-6 p-6">

      <OrderHeader
        order={details.order}
        onBack={() =>
          router.back()
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <CustomerCard
          order={details.order}
        />

        <DoorDetailsCard
          order={details.order}
        />

      </div>

      <CustomizationCard
    customizations={details.customizations}
    editable={true}
    onRefresh={loadOrder}
/>

     <OrderTimeline
  logs={details.logs.map((log) => ({
    ...log,
    description: log.description ?? "",
  }))}
/>
    </div>

  );

}