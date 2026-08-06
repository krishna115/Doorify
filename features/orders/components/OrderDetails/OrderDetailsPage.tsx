"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  OrderDetails,
  OrderWorkflowService,
} from "../..";

import {
  OrderDetailsService,
} from "../../services/OrderDetailsService";

import {
  OrderHeader,
} from "./OrderHeader";

import {
  OrderWorkflowCard,
} from "./OrderWorkflowCard";

import {
  CustomerCard,
} from "./CustomerCard";

import {
  DoorDetailsCard,
} from "./DoorDetailsCard";

import {
  CustomizationCard,
} from "./CustomizationCard";

import {
  OrderTimeline,
} from "./OrderTimeline";

interface Props {

  orderId: string;

}

export function OrderDetailsPage({

  orderId,

}: Props) {

  const router =
    useRouter();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    details,
    setDetails,
  ] =
    useState<OrderDetails | null>(
      null
    );

  const [
    estimatedDays,
    setEstimatedDays,
  ] = useState(0);

  async function loadOrder() {

    try {

      setLoading(true);

      const response =
        await OrderDetailsService.getById(
          orderId
        );

      setDetails(response);

      setEstimatedDays(
        response.order.estimated_days ??
          0
      );

    } catch (e) {

      if (
        e instanceof Error
      ) {

        alert(
          e.message
        );

      }

    } finally {

      setLoading(
        false
      );

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

      {/* -------------------------------- */}
      {/* Workflow */}
      {/* -------------------------------- */}

      <OrderWorkflowCard
        order={
          details.order
        }
        estimatedDays={
          estimatedDays
        }
        onEstimatedDaysChange={
          setEstimatedDays
        }
        onAction={async () => {

          console.log(
            "Workflow Button Clicked"
          );

          console.log(
            "Current Status:",
            details.order.status
          );

          console.log(
            "Estimated Days:",
            estimatedDays
          );

         await OrderWorkflowService.nextStep(details.order,estimatedDays);

            await loadOrder();
        }}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <CustomerCard
          order={
            details.order
          }
        />

        <DoorDetailsCard
          order={
            details.order
          }
        />

      </div>

      <CustomizationCard
        customizations={
          details.customizations
        }
        editable={true}
        onRefresh={
          loadOrder
        }
      />

      <OrderTimeline
        logs={details.logs.map(
          (
            log
          ) => ({

            ...log,

            description:
              log.description ??
              "",

          })
        )}
      />

    </div>

  );

}